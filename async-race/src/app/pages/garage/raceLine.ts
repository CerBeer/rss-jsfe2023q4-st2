import { SpecialElements } from '../types';
import { ElementsDefinitions, createElement } from '../../utils/elements';
import { templates } from './template';
import { Car, EngineStates } from '../../services/api/types';
import * as requests from '../../services/api/requests';
import { Console } from '../console';
import { RaceTrackConfiguration } from '../../services/stateManager/types';
import { RacePool } from './racePool';

const CARSTATES = {
  RESET: 'reset',
  STOP: 'stopped',
  START: 'started',
  MOVEMENT: 'drive',
};

type CarStatesKeys = keyof typeof CARSTATES;
type CarStates = (typeof CARSTATES)[CarStatesKeys];

export class RaceLine {
  private _car: Car;

  private racePool: RacePool;

  private carStates: CarStates;

  private engineStates: EngineStates;

  private animationRequestId = 0;

  private animationStart = 0;

  private mainWindowWidth = 0;

  private raceTrackConfiguration: RaceTrackConfiguration;

  private sellingHTML;

  private SpecialElements: SpecialElements = {};

  private startMovement = 0;

  private queryResetInProgress = false;

  private timeLastReset = 0;

  constructor(car: Car, raceTrackConfiguration: RaceTrackConfiguration, racePool: RacePool) {
    this._car = car;
    this.racePool = racePool;
    this.sellingHTML = createElement(templates.templateRaceLine as ElementsDefinitions, this.SpecialElements);
    this.sellingHTML.dataset.carId = `${car.id}`;
    this.setCarName(car.name);
    this.setCarColor(car.color);
    this.carStates = CARSTATES.RESET;
    this.engineStates = { velocity: 0, distance: 0 };
    this.raceTrackConfiguration = raceTrackConfiguration;
  }

  get selling() {
    return this.sellingHTML;
  }

  get car() {
    return this._car;
  }

  updateCar(car: Car) {
    this._car = car;
    this.setCarName(car.name);
    this.setCarColor(car.color);
  }

  setCarColor(color: string) {
    this.SpecialElements['race-track-car'].style.backgroundColor = color;
  }

  setCarName(name: string) {
    this.car.name = name;
    this.SpecialElements['car-name'].innerText = name;
  }

  hide() {
    this.sellingHTML.classList.add('element-none');
  }

  show() {
    this.sellingHTML.classList.remove('element-none');
  }

  async engineCarStart(mainWindowWidth: number) {
    if (this.carStates !== CARSTATES.RESET) return;
    const startRequest = performance.now();
    this.carStates = CARSTATES.START;
    this.SpecialElements['car-select-button'].classList.add('disabled-button');
    this.SpecialElements['car-remove-button'].classList.add('disabled-button');
    this.SpecialElements['car-start-engine'].classList.add('disabled-button');
    this.SpecialElements['car-stop-engine'].classList.toggle('disabled-button', this.racePool.now.nowRace);
    this.mainWindowWidth = mainWindowWidth;
    this.racePool.addCarInRace();
    await requests
      .engineStatus(this._car.id, CARSTATES.START)
      .then((response) => {
        if (!response.ok) {
          const error = response.status;
          return Promise.reject(error);
        }
        return response.json();
      })
      .then((newStates: EngineStates) => {
        this.engineStates = newStates;
      })
      .catch((error: Error) => {
        this.carStates = CARSTATES.STOP;
        Console.appendText(`${this.car.id}: Error car start engine ${error.message}`);
      });

    if (this.carStates !== CARSTATES.START) return;
    if (this.timeLastReset > startRequest) return;
    Console.appendText(`${this.car.id}: Car start movement velocity ${this.engineStates.velocity}`);
    this.carStates = CARSTATES.MOVEMENT;
    this.startMovement = performance.now();
    this.startAnimation();
    await requests
      .engineStatus(this._car.id, CARSTATES.MOVEMENT)
      .then((response) => {
        if (this.timeLastReset > startRequest) return;
        if (!response.ok) {
          const error = response.status;
          return Promise.reject(error);
        }
        return response.json();
      })
      .then((newStates: EngineStates) => {
        if (this.timeLastReset > startRequest) return;
        if (this.carStates === CARSTATES.MOVEMENT) this.carStates = CARSTATES.STOP;
        this.cancelAnimation();
        if (this.racePool.now.nowRace) {
          this.racePool.winnerRegistration(this.car.id, this.car.name, performance.now() - this.startMovement);
        }
        this.startMovement = 0;
        Console.appendText(`${this.car.id}: Car stop movement ${Object.keys(newStates)}`);
      })
      .catch((error: Error) => {
        if (this.timeLastReset > startRequest) return;
        if (this.carStates === CARSTATES.MOVEMENT) this.carStates = CARSTATES.STOP;
        this.cancelAnimation();
        Console.appendText(`${this.car.id}: Engine broken ${error}`);
      });
  }

  async engineCarReset() {
    this.timeLastReset = performance.now();
    if (this.queryResetInProgress) {
      this.racePool.subCarInRace();
      return;
    }
    this.racePool.addQueryReset();
    this.queryResetInProgress = true;
    await requests
      .engineStatus(this._car.id, CARSTATES.STOP)
      .then((response) => {
        if (!response.ok) {
          const error = response.status;
          return Promise.reject(error);
        }
        this.racePool.subQueryReset();
        this.carStates = CARSTATES.RESET;
        this.startMovement = 0;
        this.SpecialElements['race-track-car'].style.removeProperty('transform');
        this.cancelAnimation();
        this.SpecialElements['car-select-button'].classList.remove('disabled-button');
        this.SpecialElements['car-remove-button'].classList.remove('disabled-button');
        this.SpecialElements['car-start-engine'].classList.remove('disabled-button');
        this.SpecialElements['car-stop-engine'].classList.add('disabled-button');
        this.racePool.subCarInRace();
        Console.appendText(`${this.car.id}: Car reset`);
      })
      .catch((error: Error) => {
        this.racePool.subQueryReset();
        Console.appendText(`${this.car.id}: Error car reset ${error.message}`);
      });
    this.queryResetInProgress = false;
  }

  startAnimation() {
    this.animationRequestId = window.requestAnimationFrame((timestamp: number) => this.animate(timestamp));
  }

  animate(timestamp: number) {
    if (this.carStates !== CARSTATES.MOVEMENT) {
      this.cancelAnimation();
    }

    if (!this.animationStart) {
      this.animationStart = timestamp;
    }

    const progress = timestamp - this.animationStart;

    const pxInMlSec = ((this.mainWindowWidth - 180) / this.engineStates.distance) * this.engineStates.velocity;
    const animationBox = this.SpecialElements['race-track-car'];
    animationBox.style.transform = `translateX(${progress * pxInMlSec + this.raceTrackConfiguration.leftIndent}px)`;

    const x = animationBox.getBoundingClientRect().x + 80;

    const rightBound = this.mainWindowWidth - this.raceTrackConfiguration.carWidth / 2;

    if (x < rightBound) {
      this.animationRequestId = window.requestAnimationFrame((timestamp2: number) => this.animate(timestamp2));
    } else {
      this.cancelAnimation();
    }
  }

  cancelAnimation() {
    if (this.animationRequestId > 0) {
      window.cancelAnimationFrame(this.animationRequestId);
    }
    this.animationStart = 0;
    this.animationRequestId = 0;
  }
}

export default RaceLine;
