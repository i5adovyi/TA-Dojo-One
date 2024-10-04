class Human {
  constructor(
    readonly name: string,
    private age: number,
    readonly sex: string,
    private location: string
  ) {}

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
