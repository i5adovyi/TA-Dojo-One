"use strict";
class Human {
    constructor(name, age, sex, location) {
        this.name = name;
        this.age = age;
        this.sex = sex;
        this.location = location;
    }
    greet() {
        console.log(`Hello, my name is ${this.name}`);
    }
    run() {
        console.warn(`I'm running and I'm still ${this.age} years young`);
    }
}
const bobHorse = new Human('Bob', 25, 'horse', 'Texas');
bobHorse.greet();
bobHorse.run();
