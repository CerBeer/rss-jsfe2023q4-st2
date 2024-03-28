import { SpecialElements } from '../types';
import { Car, Cars, Winner } from '../../services/api/types';
import { Garage, Winners } from '../../services/stateManager/types';
import * as requests from '../../services/api/requests';
import { AlertMessage } from '../alertMessage';
import { RaceLine } from './raceLine';

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
        const timeout = 5000;
        new AlertMessage(`${error.message}`, 'Check that the server is available at http:\\\\172.0.0.1:3000', timeout);
        setTimeout(() => this.createPool(this.states.currentPage, this.states.limitCars), timeout * 2);
      });
  }

  creatingEventHandlers() {
    this.location.addEventListener('click', (e) => this.onClickHandler(e));
    this.specialElements['car-update-button'].addEventListener('click', () => this.updateCar());
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
        this.unSelectCar();
      })
      .catch((error: Error) => {
        console.log(error);
        new AlertMessage(`${error.message}`, 'Check that the server is available at http:\\\\172.0.0.1:3000', 2000);
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
    const selectedCar = this.raceLines.find((line) => line.car.id === carID);
    if (!selectedCar) return;
    this.states.currentCarId = carID;
    const namePicker = this.specialElements['car-update-name'] as HTMLInputElement;
    namePicker.value = selectedCar?.car.name;
    const colorPicker = this.specialElements['car-update-color'] as HTMLInputElement;
    colorPicker.value = selectedCar?.car.color;
  }

  unSelectCar() {
    this.states.currentCarId = 0;
    const namePicker = this.specialElements['car-update-name'] as HTMLInputElement;
    namePicker.value = '';
  }

  updateCar() {
    if (this.states.currentCarId === 0) return;
    const namePicker = this.specialElements['car-update-name'] as HTMLInputElement;
    if (!namePicker.value || namePicker.value.length === 0) return;
    const colorPicker = this.specialElements['car-update-color'] as HTMLInputElement;
    const car = {
      name: namePicker.value,
      color: colorPicker.value,
      id: this.states.currentCarId,
    };
    requests
      .updateCar(car)
      .then((response) => {
        if (!response.ok) {
          const error = response.status;
          return Promise.reject(error);
        }
        return response.json();
      })
      .then((updatedCar: Car) => {
        const selectedCar = this.raceLines.find((line) => line.car.id === this.states.currentCarId);
        if (!selectedCar) return;
        selectedCar.updateCar(updatedCar);
      })
      .catch((error: Error) => {
        console.log(error);
        new AlertMessage(`${error.message}`, 'Check that the server is available at http:\\\\172.0.0.1:3000', 2000);
      });
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
