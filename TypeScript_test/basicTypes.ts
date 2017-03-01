let isDone: boolean = false;

let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

let color: string = "blue";
color = 'red';

let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${fullName}.

I'll be ${ age + 1} years old next month.`

let list: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];

let x: [string, number];
x = ["hello", 10];

console.log(x[0].substr(1));

x[3] = "world";


enum Color { Red, Green, Blue };
let c: Color = Color.Green;
let colorName: string = Color[2];
console.log(colorName);

// let notSure: any = 4;
// notSure = "maybe a string instead";
// notSure = false;

let notSure: any = 4;
notSure.ifItExists();
notSure.toFixed();

let prettySure: Object = 4;
// prettySure.toFixed(); 

let list3: any[] = [1, true, "free"];
list3[1] = 100;

function warnUser(): void {
  console.log("This is my warning message");
}
let unusable: void = undefined;

// never

// Function returning never must have unreachable end point
function error(message: string): never {
  throw new Error(message);
}

function fail() {
  return error("Something failed");
}

function infiniteLoop(): never {
  while (true) {
  }
}

// type assertion
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

let someValue1: any = "this is a string";
let strLength1: number = (someValue as string).length;