/*jshint esversion: 6 */

const Elevator = require('./elevator.js');
const Person = require('./person.js');

const elevatorOne = new Elevator();
const Ana = new Person("Ana", 0, 5);
const Bob = new Person("Bob", 3, 8);
const Cris = new Person("Cris", 6, 0);

function test () {
  elevatorOne.start();
  elevatorOne.call(Ana);
  elevatorOne.call(Bob);
  elevatorOne.call(Cris);
}

test();

// elevatorOne.update();
// elevatorOne.start();
// for (let i = 0; i < 12; i++) {
//   elevatorOne.floorUp();
//   elevatorOne.update();
// }
// for (let i = 0; i < 12; i++) {
//   elevatorOne.floorDown();
//   elevatorOne.update();
// }
// elevatorOne.stop();
