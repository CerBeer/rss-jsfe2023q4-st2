import { Cars } from '../../services/api/types';
import { Garage } from '../../services/stateManager/types';
import * as requests from '../../services/api/requests';
import { AlertMessage } from '../alertMessage';
import { RaceLine } from './raceLine';

class RacePool {
  private location: HTMLElement;

  private states: Garage;

  private raceLines: RaceLine[];

  private SpecialElements: { [key: string]: HTMLElement } = {};

  constructor(location: HTMLElement, states: Garage) {
    this.states = states;
    this.location = location;
    this.raceLines = [];
    this.createPool(states.currentPage, states.limitCars);
  }

  createPool(page: number, limit: number) {
    fetch(requests.pageGarage(page, limit))
      .then((response) => response.json())
      .then((cars: Cars) => {
        cars.forEach((car) => this.raceLines.push(new RaceLine(car)));
        const raceLines = this.raceLines.map((car) => car.selling);
        this.location.replaceChildren(...raceLines);
      })
      .catch((error: Error) => {
        console.log(error);
        new AlertMessage('Server is not responding', 5000);
      });
  }
}

export default RacePool;
