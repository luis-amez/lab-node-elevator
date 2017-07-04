/*jshint esversion: 6 */

class Elevator {
  constructor(){
    this.floor        = 0;
    this.MAXFLOOR     = 10;
    this.requests     = [];
    this.waitingList  = [];
    this.passengers   = [];
    this.direction    = "up";
    this.intervalID   = "";
  }

  start() {
    this.intervalID = setInterval(() => this.update(), 1000);
    // this.intervalID = setInterval(this.update(), 1000);
  }
  stop() {
    clearInterval(this.intervalID);
  }
  update() {
    this.log();
    this._checkPassengerLeave();
    this._checkPassengerEnter();
    if (this._isRequestPending()) {
      this._listenRequest();
    } else {
      this.stop();
    }
  }
  _passengersEnter(person) {
    this._removeElementFromArray(person, this.waitingList);
    this.passengers.push(person);
    this._removeElementFromArray(person.originFloor, this.requests);
    this.requests.push(person.destinationFloor);
    console.log(`${person.name} has enter the elevator.`);
  }
  _passengersLeave(person) {
    this._removeElementFromArray(person, this.passengers);
    this._removeElementFromArray(person.destinationFloor, this.requests);
    console.log(`${person.name} has leave the elevator.`);
  }
  floorUp() {
    if(this.floor < this.MAXFLOOR) {
      this.floor++;
      this.direction = "up";
    }
  }
  floorDown() {
    if(this.floor > 0) {
      this.floor--;
      this.direction = "down";
    }
  }
  call(person) {
    this.waitingList.push(person);
    this.requests.push(person.originFloor);
  }
  log() {
    console.log(`Direction: ${this.direction}. | Floor: ${this.floor}.`);
  }
  _checkPassengerLeave() {
    this.passengers.forEach((passenger) => {
      if (passenger.destinationFloor === this.floor) {
        this._passengersLeave(passenger);
      }
    });
  }
  _checkPassengerEnter() {
    this.waitingList.forEach((passenger) => {
      if (passenger.originFloor === this.floor) {
        this._passengersEnter(passenger);
      }
    });
  }
  _isRequestPending() {
    if (this.requests.length === 0) {
      return false;
    }
    return true;
  }
  _listenRequest() {
    if (this.floor < this.requests[0]) {
      this.floorUp();
    } else if (this.floor > this.requests[0]) {
      this.floorDown();
    }
  }
  _removeElementFromArray(element, array) {
    let i = array.indexOf(element);
    if(i != -1) {
      array.splice(i, 1);
    }
  }
  _checkPassengerDirection(person) {
    if (person.originFloor < person.destinationFloor) {
      return "up";
    } else {
      return "down";
    }
  }
}

module.exports = Elevator;
