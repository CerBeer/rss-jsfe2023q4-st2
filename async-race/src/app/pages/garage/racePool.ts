import { SpecialElements } from '../types';
import { Car, Cars, Winner } from '../../services/api/types';
import { Garage, Winners } from '../../services/stateManager/types';
import * as requests from '../../services/api/requests';
import { AlertMessage } from '../alertMessage';
import { RaceLine } from './raceLine';
import { CarDescriptionGenerator } from '../../services/carGenerator/generator';
import { Console } from '../console';

export class RacePool {
  private location: HTMLElement;

  private states: Garage;

  private statesWinners: Winners;

  private nowGenerateCars = false;

  private nowRace = false;

  private carsInRace = 0;

  private lastWinner = { id: 0, time: 0 };

  private raceLines: RaceLine[];

  private specialElements: SpecialElements = {};

  private queryResetInProgress = 0;

  constructor(specialElements: SpecialElements, states: Garage, statesWinners: Winners) {
    this.specialElements = specialElements;
    this.states = states;
    this.statesWinners = statesWinners;
    this.location = specialElements['race-pool'];
    this.raceLines = [];
    this.createPool(states.currentPage, states.limitCars);

    this.creatingEventHandlers();
  }

  get now() {
    return { nowRace: this.nowRace, nowGenerateCars: this.nowGenerateCars };
  }

  get winner() {
    return this.lastWinner;
  }

  winnerRegistration(id: number, name: string, time: number) {
    if (this.lastWinner.id === 0) {
      this.lastWinner.id = id;
      this.lastWinner.time = Math.round(time / 10) / 100;
      if (this.lastWinner.time < 1) return;
      new AlertMessage(`${name} went first`, `time: ${this.lastWinner.time.toFixed(2)}`, 3000);
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
          const winnerExists = winners.find((winner: Winner) => winner.id === id);
          if (winnerExists) {
            const bestTime = Math.min(parseFloat(winnerExists.time), this.lastWinner.time);
            Console.appendText(`Update winner ${parseFloat(winnerExists.id)}: - ${bestTime}`);
            requests.updateWinner(id, winnerExists.wins + 1, bestTime.toFixed(2));
          } else {
            Console.appendText(`Create winner ${id}: - ${this.lastWinner.time}`);
            requests.addWinner(id, 1, this.lastWinner.time.toFixed(2));
          }
        })
        .catch((error: Error) => {
          Console.appendText(`Create winner error ${error.message}`);
        });
    }
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
        cars.forEach((car) => this.raceLines.push(new RaceLine(car, this.states.raceTrackConfiguration, this)));
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
    this.specialElements['car-update-button'].addEventListener('click', () => {
      if (this.specialElements['car-update-button'].classList.contains('disabled-button')) return;
      this.updateCar();
    });
    this.specialElements['car-create-button'].addEventListener('click', () => {
      if (this.specialElements['car-create-button'].classList.contains('disabled-button')) return;
      this.createCar();
    });
    this.specialElements['cars-generate-button'].addEventListener('click', () => {
      if (this.specialElements['cars-generate-button'].classList.contains('disabled-button')) return;
      this.generateCars(this.states.numberCarsToGenerate);
    });
    this.specialElements['cars-race-button'].addEventListener('click', () => {
      if (this.specialElements['cars-race-button'].classList.contains('disabled-button')) return;
      this.nowRace = true;
      this.setAvailableButtons();
      const parentElementWidth = this.specialElements['race-pool'].getBoundingClientRect().width;
      this.raceLines.forEach((line) => line.engineCarStart(parentElementWidth));
    });
    this.specialElements['cars-reset-button'].addEventListener('click', () => {
      if (this.specialElements['cars-reset-button'].classList.contains('disabled-button')) return;
      this.specialElements['cars-reset-button'].classList.add('disabled-button');
      this.raceLines.forEach((line) => line.engineCarReset());
    });
    this.specialElements['pagination-garage-prev'].addEventListener('click', () => {
      if (this.specialElements['pagination-garage-prev'].classList.contains('disabled-button')) return;
      this.pageChange(-1);
    });
    this.specialElements['pagination-garage-next'].addEventListener('click', () => {
      if (this.specialElements['pagination-garage-next'].classList.contains('disabled-button')) return;
      this.pageChange(1);
    });
  }

  setAvailableButtons() {
    if (this.nowGenerateCars || this.nowRace || this.queryResetInProgress > 0) {
      this.specialElements['car-update-button'].classList.add('disabled-button');
      this.specialElements['car-create-button'].classList.add('disabled-button');
      this.specialElements['cars-generate-button'].classList.add('disabled-button');
      this.specialElements['cars-race-button'].classList.add('disabled-button');
    } else {
      this.specialElements['car-update-button'].classList.remove('disabled-button');
      this.specialElements['car-create-button'].classList.remove('disabled-button');
      this.specialElements['cars-generate-button'].classList.remove('disabled-button');
      this.specialElements['cars-race-button'].classList.remove('disabled-button');
    }
    if (this.nowGenerateCars || this.queryResetInProgress > 0) {
      this.specialElements['cars-reset-button'].classList.add('disabled-button');
    } else {
      this.specialElements['cars-reset-button'].classList.remove('disabled-button');
    }
    if (this.nowRace) {
      this.specialElements['pagination-garage-prev'].classList.add('disabled-button');
      this.specialElements['pagination-garage-next'].classList.add('disabled-button');
    } else {
      this.specialElements['pagination-garage-prev'].classList.remove('disabled-button');
      this.specialElements['pagination-garage-next'].classList.remove('disabled-button');
    }
  }

  onClickHandler(e: Event) {
    e.stopPropagation();
    const target = e.target as HTMLElement;
    if (!target) return;
    if (target.classList.contains('disabled-button')) return;
    const targetIdentifier = target.getAttribute('identifier');
    if (!targetIdentifier) return;
    if (
      targetIdentifier !== 'car-remove-button' &&
      targetIdentifier !== 'car-select-button' &&
      targetIdentifier !== 'car-start-engine' &&
      targetIdentifier !== 'car-stop-engine'
    )
      return;
    let carID = target.parentElement?.parentElement?.dataset.carId;
    if (!carID) carID = target.parentElement?.parentElement?.parentElement?.dataset.carId;
    if (!carID) return;
    if (targetIdentifier === 'car-remove-button') this.deleteCar(parseInt(carID));
    else if (targetIdentifier === 'car-select-button') this.selectCar(parseInt(carID));
    else if (targetIdentifier === 'car-start-engine') this.engineCarStart(parseInt(carID));
    else if (targetIdentifier === 'car-stop-engine') this.engineCarReset(parseInt(carID));
  }

  engineCarStart(carID: number) {
    if (this.specialElements['cars-race-button'].classList.contains('disabled-button')) return;
    const selectedCar = this.raceLines.find((line) => line.car.id === carID);
    if (!selectedCar) return;
    // const mainWindowWidth = window.innerWidth;
    // selectedCar.engineCarStart(mainWindowWidth);
    const parentElementWidth = this.specialElements['race-pool'].getBoundingClientRect().width;
    selectedCar.engineCarStart(parentElementWidth);
  }

  engineCarReset(carID: number) {
    if (this.specialElements['cars-reset-button'].classList.contains('disabled-button')) return;
    const selectedCar = this.raceLines.find((line) => line.car.id === carID);
    if (!selectedCar) return;
    selectedCar.engineCarReset();
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
    namePicker.classList.remove('disabled-input');
    colorPicker.classList.remove('disabled-input');
    this.specialElements['car-update-button'].classList.remove('disabled-button');
  }

  unSelectCar() {
    this.states.currentCarId = 0;
    const namePicker = this.specialElements['car-update-name'] as HTMLInputElement;
    const colorPicker = this.specialElements['car-update-color'] as HTMLInputElement;
    namePicker.value = '';
    namePicker.classList.add('disabled-input');
    colorPicker.classList.add('disabled-input');
    this.specialElements['car-update-button'].classList.add('disabled-button');
  }

  updateCar() {
    if (this.specialElements['car-update-button'].classList.contains('disabled-button')) return;
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
        if (selectedCar) selectedCar.updateCar(updatedCar);
        this.unSelectCar();
      })
      .catch((error: Error) => {
        new AlertMessage(`${error.message}`, 'Check that the server is available at http:\\\\172.0.0.1:3000', 2000);
      });
  }

  createCar() {
    if (this.specialElements['car-create-button'].classList.contains('disabled-button')) return;
    const namePicker = this.specialElements['car-create-name'] as HTMLInputElement;
    if (!namePicker.value || namePicker.value.length === 0) return;
    const colorPicker = this.specialElements['car-create-color'] as HTMLInputElement;
    const car = {
      name: namePicker.value,
      color: colorPicker.value,
    };
    requests
      .createCar(car)
      .then((response) => {
        if (!response.ok) {
          const error = response.status;
          return Promise.reject(error);
        }
        return response.json();
      })
      .then((newCar: Car) => {
        this.addCreatedCar(newCar);
        namePicker.value = '';
      })
      .catch((error: Error) => {
        new AlertMessage(`${error.message}`, 'Check that the server is available at http:\\\\172.0.0.1:3000', 2000);
      });
  }

  addCreatedCar(newCar: Car) {
    const newCarImplement = new RaceLine(newCar, this.states.raceTrackConfiguration, this);
    this.updateTotalCars(this.states.totalCars + 1);
    const totalPages = Math.ceil(this.states.totalCars / this.states.limitCars);
    if (this.states.currentPage === 0) this.states.currentPage = totalPages;
    if (this.states.currentPage === totalPages) {
      this.raceLines.push(newCarImplement);
      this.location.appendChild(newCarImplement.selling);
    }
  }

  async generateCars(carToCreate: number) {
    if (this.nowGenerateCars) return;
    this.nowGenerateCars = true;
    this.setAvailableButtons();
    let i = 0;
    while (i < carToCreate) {
      const car = CarDescriptionGenerator.newDescription();
      await requests
        .createCar(car)
        .then((response) => {
          if (!response.ok) {
            const error = response.status;
            return Promise.reject(error);
          }
          return response.json();
        })
        .then((newCar: Car) => {
          this.addCreatedCar(newCar);
        })
        .catch(() => {});
      i += 1;
    }
    this.nowGenerateCars = false;
    this.setAvailableButtons();
  }

  updateTotalCars(totalCars: number) {
    this.states.totalCars = totalCars;
    let totalPages = Math.ceil(this.states.totalCars / this.states.limitCars);
    if (totalPages < 1) totalPages = 1;
    if (this.states.currentPage > totalPages) this.states.currentPage = totalPages;
    if (this.states.currentPage < 1) this.states.currentPage = 1;
    this.specialElements['garage-page-number'].innerText = `Page #${this.states.currentPage} of ${totalPages}`;
    this.specialElements['garage-title'].innerText = `Garage (${this.states.totalCars})`;
  }

  pageChange(bias: number) {
    const nextPage = this.states.currentPage + bias;
    if (nextPage < 1 || nextPage > Math.ceil(this.states.totalCars / this.states.limitCars)) return;
    this.states.currentPage = nextPage;
    this.createPool(this.states.currentPage, this.states.limitCars);
  }

  addCarInRace() {
    if (this.nowRace) this.carsInRace += 1;
  }

  subCarInRace() {
    if (!this.nowRace) {
      return;
    }
    this.carsInRace -= 1;
    if (this.carsInRace <= 0) {
      this.specialElements['cars-reset-button'].classList.remove('disabled-button');
      this.nowRace = false;
      this.lastWinner = { id: 0, time: 0 };
      this.setAvailableButtons();
    }
  }

  addQueryReset() {
    this.specialElements['cars-reset-button'].classList.add('disabled-button');
    this.queryResetInProgress += 1;
    this.setAvailableButtons();
  }

  subQueryReset() {
    this.queryResetInProgress -= 1;
    if (this.queryResetInProgress <= 0) {
      this.queryResetInProgress = 0;
      this.specialElements['cars-reset-button'].classList.remove('disabled-button');
      this.setAvailableButtons();
    }
  }
}
