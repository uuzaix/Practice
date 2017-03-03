function identity0(arg: any): any {
  return arg;
}

// with type variable => generic 
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("myString");
let output2 = identity("myString"); //type argument interface

function loggingIdentity<T>(arg: T[]): T[] {
  console.log(arg.length);
  return arg;
}

// also possible 
function loggingIdentity1<T>(arg: Array<T>): Array<T> {
  console.log(arg.length);
  return arg;
}

function identity2<T>(arg: T): T {
  return arg;
}

let myIdentity2: <T>(arg: T) => T = identity2;

// the same - 
// function identity<T>(arg: T): T {
//   return arg;
// }
// let myIdentity: <U>(arg: U) => U = identity;

// as a call signature of an object literal type
function identity3<T>(arg: T): T {
  return arg;
}
let myIdentity3: { <T>(arg: T): T } = identity3;


//  generic interface
interface GenericIdentityFn { // or interface GenericIdentityFn<T> {
  <T>(arg: T): T;             //     (arg: T): T;
}

function identity4<T>(arg: T): T {
  return arg;
}

let myIdentity: GenericIdentityFn = identity4; //or let myIdentity: GenericIdentityFn<number> = identity;



// generic classes
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) { return x + y; };

let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function (x, y) { return x + y; };

console.log(stringNumeric.add(stringNumeric.zeroValue, "foo"));


// constraints

interface Lengthwise {
  length: number;
}

function loggingIdentityL<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
loggingIdentityL({ length: 10, value: 3 });


// Type Parameters in Generic Constraints
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a");
// getProperty(x, "m") error