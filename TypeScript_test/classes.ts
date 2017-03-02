class Animal {
  name: string;
  constructor(theName: string) { this.name = theName; }
  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

class Snake extends Animal {
  constructor(name: string) { super(name); }
  move(distanceInMeters = 5) {
    console.log("Slithering...");
    super.move(distanceInMeters);
  }
}

class Horse extends Animal {
  constructor(name: string) { super(name); }
  move(distanceInMeters = 45) {
    console.log("Galloping...");
    super.move(distanceInMeters);
  }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);


// private
class Animal2 {
  private name: string;
  constructor(theName: string) { this.name = theName; }
}

class Rhino extends Animal2 {
  constructor() { super("Rhino"); }
}

class Employee0 {
  private name: string;
  constructor(theName: string) { this.name = theName; }
}

let animal = new Animal2("Goat");
let rhino = new Rhino();
let employee = new Employee0("Bob");

animal = rhino;
// animal = employee;




// protected
class Person {
  protected name: string;
  constructor(name: string) { this.name = name; }
}

class Employee2 extends Person {
  private department: string;

  constructor(name: string, department: string) {
    super(name);
    this.department = department;
  }

  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}.`;
  }
}

let howard = new Employee2("Howard", "Sales");
console.log(howard.getElevatorPitch());
// console.log(howard.name); error


// protected
class Octopus {
  readonly name: string;
  readonly numberOfLegs: number = 8;
  constructor(theName: string) {
    this.name = theName;
  }
}
let dad = new Octopus("Man with the 8 strong legs");
// dad.name = "Man with the 3-piece suit"; // error


//accessors

let passcode = "secret passcode";

class Employee {
  private _fullName: string;

  get fullName(): string {
    return this._fullName;
  }

  set fullName(newName: string) {
    if (passcode && passcode == "secret passcode") {
      this._fullName = newName;
    }
    else {
      console.log("Error: Unauthorized update of employee!");
    }
  }
}

let employee1 = new Employee();
employee1.fullName = "Bob Smith";
if (employee1.fullName) {
  console.log(employee1.fullName);
}


// static
class Grid {
  static origin = { x: 0, y: 0 };
  calculateDistanceFromOrigin(point: { x: number; y: number; }) {
    let xDist = (point.x - Grid.origin.x);
    let yDist = (point.y - Grid.origin.y);
    return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
  }
  constructor(public scale: number) { }
}

let grid1 = new Grid(1.0);  // 1x scale
let grid2 = new Grid(5.0);  // 5x scale

console.log(grid1.calculateDistanceFromOrigin({ x: 10, y: 10 }));
console.log(grid2.calculateDistanceFromOrigin({ x: 10, y: 10 }));
// console.log(grid2.origin);


// abstract
abstract class Animal1 {
  abstract makeSound(): void;
  move(): void {
    console.log("roaming the earth...");
  }
}


abstract class Department {
  constructor(public name: string) {
  }

  printName(): void {
    console.log("Department name: " + this.name);
  }

  abstract printMeeting(): void;
}

class AccountingDepartment extends Department {

  constructor() {
    super("Accounting and Auditing");
  }

  printMeeting(): void {
    console.log("The AAD meets each Monday at 10am.");
  }

  generateReports(): void {
    console.log("Generating ...");
  }
}

let department: Department; 
// department = new Department(); 
department = new AccountingDepartment(); 
department.printName();
department.printMeeting();
// department.generateReports(); 




class Greeter {
  static standardGreeting = "Hello, there";
  greeting: string;
  greet() {
    if (this.greeting) {
      return "Hello, " + this.greeting;
    }
    else {
      return Greeter.standardGreeting;
    }
  }
}

let greeter1: Greeter;
greeter1 = new Greeter();
console.log(greeter1.greet());

let greeterMaker: typeof Greeter = Greeter;
greeterMaker.standardGreeting = "Hey there!";

let greeter2: Greeter = new greeterMaker();
console.log(greeter2.greet());