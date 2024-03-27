import { SpecialElements } from '../types';
import { Cars, Winner } from '../../services/api/types';
import { Garage, Winners } from '../../services/stateManager/types';
import * as requests from '../../services/api/requests';
import { AlertMessage } from '../alertMessage';
import { RaceLine } from './raceLine';

// type ElementWithIdentifier<T> = Partial<T> & { getAttribute: string | undefined };

class RacePool {
  private location: HTMLElement;

  private states: Garage;

  private statesWinners: Winners;

  private raceLines: RaceLine[];

  private specialElements: SpecialElements = {};

  constructor(specialElements: SpecialElements, states: Garage, statesWinners: Winners) {
    this.specialElements = specialElements;
    this.states = states;
    this.statesWinners = statesWinners;
    this.location = specialElements['race-pool'];
    this.raceLines = [];
    this.createPool(states.currentPage, states.limitCars);

    this.creatingEventHandlers();
  }

  createPool(page: number, limit: number) {
    fetch(requests.pageGarage(page, limit))
      .then((response) => {
        const totalPages = response.headers.get('X-Total-Count');
        if (totalPages) this.updateTotalCars(parseInt(totalPages));
        return response.json();
      })
      .then((cars: Cars) => {
        this.raceLines = [];
        cars.forEach((car) => this.raceLines.push(new RaceLine(car)));
        const raceLines = this.raceLines.map((car) => car.selling);
        this.location.replaceChildren(...raceLines);
      })
      .catch((error: Error) => {
        console.log(error);
        new AlertMessage('Server is not responding', 5000);
      });
  }

  creatingEventHandlers() {
    this.location.addEventListener('click', (e) => this.onClickHandler(e));
  }

  onClickHandler(e: Event) {
    e.stopPropagation();
    const target = e.target as HTMLElement;
    if (!target) return;
    const targetIdentifier = target.getAttribute('identifier');
    if (!targetIdentifier) return;
    if (targetIdentifier !== 'car-remove-button' && targetIdentifier !== 'car-select-button') return;
    const carID = target.parentElement?.parentElement?.dataset.carId;
    if (!carID) return;
    if (targetIdentifier === 'car-remove-button') this.deleteCar(parseInt(carID));
    else this.selectCar(parseInt(carID));
  }

  deleteCar(carID: number) {
    requests
      .deleteCar(carID)
      .then((response) => {
        if (!response.ok) {
          const error = response.status;
          return Promise.reject(error);
        }
        this.deleteWinner(carID);
        this.updateTotalCars(this.states.totalCars - 1);
        this.createPool(this.states.currentPage, this.states.limitCars);
      })
      .catch((error: Error) => {
        console.log(error);
        new AlertMessage(error.name, 2000);
      });
  }

  deleteWinner(carID: number) {
    requests
      .getWinners()
      .then((response) => {
        if (!response.ok) {
          const error = response.status;
          return Promise.reject(error);
        }
        return response.json();
      })
      .then((winners) => {
        if (winners.find((winner: Winner) => winner.id === carID)) {
          requests.deleteWinner(carID);
          this.statesWinners.totalCars -= 1;
          if (this.statesWinners.totalCars < 0) this.statesWinners.totalCars = 0;
          const maxPage = Math.ceil(this.statesWinners.totalCars / this.statesWinners.limitCars);
          if (this.statesWinners.currentPage > maxPage) this.statesWinners.currentPage = maxPage;
        }
      })
      .catch(() => {});
  }

  selectCar(carID: number) {
    this.states.currentCarId = carID;
    const selectesCar = this.raceLines.find((line) => line.car.id === carID);
    if (!selectesCar) return;
    const namePicker = this.specialElements['car-update-name'] as HTMLInputElement;
    namePicker.value = selectesCar?.car.name;
    const colorPicker = this.specialElements['car-update-color'] as HTMLInputElement;
    colorPicker.value = selectesCar?.car.color;
  }

  updateTotalCars(totalCars: number) {
    this.states.totalCars = totalCars;
    const totalPages = Math.ceil(this.states.totalCars / this.states.limitCars);
    if (this.states.currentPage > totalPages) this.states.currentPage = totalPages;
    // if (this.states.currentPage < 1) this.states.currentPage = 1;
    this.specialElements['garage-page-number'].innerText = `Page #${this.states.currentPage} of ${totalPages}`;
  }
}

export default RacePool;
