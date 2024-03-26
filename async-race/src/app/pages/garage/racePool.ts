import { SpecialElements } from '../types';
import { Cars } from '../../services/api/types';
import { Garage } from '../../services/stateManager/types';
import * as requests from '../../services/api/requests';
import { AlertMessage } from '../alertMessage';
import { RaceLine } from './raceLine';

class RacePool {
  private location: HTMLElement;

  private states: Garage;

  private raceLines: RaceLine[];

  private specialElements: SpecialElements = {};

  constructor(specialElements: SpecialElements, states: Garage) {
    this.specialElements = specialElements;
    this.states = states;
    this.location = specialElements['race-pool'];
    this.raceLines = [];
    this.createPool(states.currentPage, states.limitCars);
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

  updateTotalCars(totalCars: number) {
    this.states.totalCars = totalCars;
    const totalPages = Math.ceil(this.states.totalCars / this.states.limitCars);
    this.specialElements['garage-page-number'].innerText = `Page #${this.states.currentPage} of ${totalPages}`;
  }
}

export default RacePool;
