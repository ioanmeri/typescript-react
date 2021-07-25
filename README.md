## Type Annotations + Type Inference

- Variables
- Functions
- Objects

## Type Inference

Var Declaration = Var Initialization

```
const color = 'red';
```

If declaration and initialization are **on the same line**,
Typescript will figure out the type of 'color'

```
let apples;
apples = 5; // type: any
```

## When to Use Type annotation

- to declare a variable on one line then initialize it later
- the type of the variable can't be inferred
- a function returns the 'any' type, we need to clarify the value

### Any Type

- A type, just as 'string' or 'boolean' are
- Means TS has no idea what this is - it can't check for correct property references.
- **Avoid variables with 'any' at all costs**

**Use with any type**

1. Function that returns the 'any' type

```
const json = '{"x": 10, "y": 20}';
```

`JSON.parse` can return many different types:

- returns 'any' type

```
const coordinates: {x: number; y: number} = JSON.parse(json)

console.log(coordinates); // {x: 10, y: 20}

coordinates.keyDoesNotExist // throws a ts syntax error
```

### Delayed Initialization

2. When we declare a variable on one line and initializate it later

```
let words = ['red', 'green', 'blue'];
let foundWord; //implicitly has 'any' type

for (let i = 0; i < words.length; i++){
  if (words[i] === 'green'){
    foundWord = true;
  }
}
```

add type annotation:

```
let foundWord: boolean;
```

### When Inference Doesn't Work

3. Variable whose type cannot be inferred correctly

```
let numbers = [-10, -1, 12];
let numbersAboveZero = false;

for (let i = 0; i < numbers.length; i ++){
  if(numbers[i] > 0){
    // Type 'number' is not assignable to type 'boolean'
    numbersAboveZero = numbers[i];
  }
}
```

Variable with boolean or number value.

add type annotation:

```
let numbersAboveZero: boolean | number = false;
```

## Annotations Around Functions

### Type annotations for functions

> Code we add to tell Typescript what type of arguments a function will receive and what type of values it will return

### Type inference for functions

> Typescript tries to figure out what type of value a function **will return - not what args are**

```
const add = (a: number, b: number): number => {
  return a + b;
};
```

- We should annotate every single argument of the function

- Type inference automatically works for the Output, but we always going to annotate output as well

Why ?

```
const subtract = (a: number, b: number) => {
  a - b; // valid, does not return value
};
```

### Annotations for anonymous functions

```
function divide(a: number, b: number): number {
  return a / b;
}
```

```
const multiply = function(a: number, b: number): number {
  return a * b;
}
```

### Void and Never

**Void**: there will be no return value from this function

```
const logger = (message: string): void => {
  console.log(message);
}
```

**Never**: we exit the function early without returning any value

```
const throwError = (message: string): never => {
  throw new Error(message);
}
const throwError2 = (message: string): string => {
  if(!message){
    throw new Error(message);
  }

  return message;
}
```

### Destructuring with Annotations

We first destructuring and then we add the actual annotation

```
const todaysWeather = {
  date: new Date(),
  weather: 'sunny'
};

const logWeather = (forecast: { date: Date, weather: string }): void => {
  console.log(forecast.date);
  console.log(forecast.weather);
}

logWeather(todaysWeather)
```

**Destructuring:**

```
// ES2015
const logWeather2 = ({date, weather}: { date: Date, weather: string }): void => {
  console.log(date);
  console.log(weather);
}
```

## Annotations Around Objects

If we want to use destructuring, we have to write out the expected structure of profile

```
const profile = {
  name: 'alex',
  age: 20,
  coords: {
    lat: 0,
    lng: 15
  },
  setAge(age: number): void {
    this.age = age
  }
};

const { age }: { age: number } = profile;
```

**Nested destructuring**

```
const {
  coords: { lat, lng }
}: { coords: { lat: number, lng: number } } = profile;
```

## Arrays (with types!)

> Typed Arrays: Arrays where each element is some consistent type of value

e.g.: only string or only numbers - **one specific type**

Type inference resolves the type automatically

```
const carMakers = ['ford', 'toyota', 'chevy']
```

or with type annotation:

```
const carMakers: string[] = ['ford', 'toyota', 'chevy']

```

Any type when initialize empty array

### Array of string arrays

Automatic inference:

```
const carsByMake = [
  ['f150'],
  ['corolla'],
  ['camaro']
];
```

Not automatic:

```
const carsByMake: string[][] = [];
```

### Why Typed Arrays ?

- TS can do type inference when extracting values from an array

```
const car = carMakers[0]; // str
```

- TS can prevent us from adding incompatible values to the array

```
carMakers.push(100); // syntax error
```

- We can get help with 'map', 'forEach', 'reduce' functions

```
carMakers.map((car: string): string => {
  return car;
})
```

- Flexible - arrays can still contain multiple different types

String or Date obj

```
const importantDates: (Date | string)[] = [new Date()];

importantDates.push('2030-10-10')
importantDates.push(new Date());

```

### Where to use typed arrays?

> Any time we need to represent a collection of records with some arbitrary sort order

## Tuples

> Array-like structure where each element represents some property of a record

Object representing a 'drink'

```
color -> brown
carbonated -> true
sugar -> 40
```

with array - loss of label information:

```
['brown', true, 40]
```

**Tuple**: looks like an array and we put the property values in a very specific order.

```
const pepsi: [string, boolean, number] = ['brown', true, 40];
```

Instead of repeating, use a type alias:

```
type Drink = [string, boolean, number];

const pepsi: Drink = ['brown', true, 40];
const sprite: Drink = ['clear', true, 40];
const tea: Drink = ['brown', false, 0];
```

Tuples may be not super useful in TS. Why ?

```
const carSpecs: [number, number] = [400, 3354]
```

but with an object:

```
const carStats = {
  horsepower: 400,
  weight: 3354
};
```

## Interfaces

Interfaces + Classes = How we get really strong code reuse in TS

Interface:

> Creates a new type, describing the property names and value types of an object

Problems:

- Long annotation with objects
- must repeat the annotation for several objects

```
const oldCivic = {
  name: 'civic',
  year: 2000,
  broken: true
};

const printVehicle = (vehicle: { name: string; year: number; broken: boolean }): void => {
  console.log(`Name: ${vehicle.name}`)
  console.log(`Year: ${vehicle.year}`)
  console.log(`Broken?: ${vehicle.broken}`)
};

printVehicle(oldCivic);
```

### Create Interface

Interface is a new type like str or number
variable that refers to a type

```
interface Vehicle {
  name: string;
  year: Date;
  broken: boolean;
  summary(): string;
}

const oldCivic = {
  name: 'civic',
  year: new Date(),
  broken: true,
  summary(): string{
    return `Name: ${this.name}`
  }
};

const printVehicle = (vehicle: Vehicle): void => {
  console.log(vehicle.summary())
};

printVehicle(oldCivic);
```

### Code Reuse with Interfaces

We can reuse a single interface to describe the shape or the different properties of **very different objects**

```
interface Reportable {
  summary(): string;
}

const oldCivic = {
  name: 'civic',
  year: new Date(),
  broken: true,
  summary(): string{
    return `Name: ${this.name}`
  }
};

const drink = {
  color: 'brown',
  carbonated: true,
  sugar: 40,
  summary(): string {
    return `My drink has ${this.sugar} grams of sugar`;
  }
}

const printSummary = (item: Reportable): void => {
   console.log(item.summary());
}

printSummary(oldCivic);
printSummary(drink);
```

### General Plan with Interfaces

General Strategy for Reusable Code in TS

- Create functions that accept arguments that are typed with interfaces

- Objects / classes can decide to 'implement' a given interface to work with a function

## Classes

> Blueprint to create an object with some fields(values) and methods (functions) to represent a 'thing'

### Shorthand for constructor call

```
class Vehicle {
  color: string;

  constructor(color: string){
    this.color = color;
  }
  ...
}
```

equal to:

```
class Vehicle {

  constructor(public color: string){}
  ...
}
```

### Example

```
class Vehicle {

  constructor(public color: string){}

  protected honk(): void {
    console.log('beep')
  }
}

const vehicle = new Vehicle('orange');
console.log(vehicle.color);

class Car extends Vehicle {
  constructor(public wheels: number, color: string){
    super(color);
  }

  private drive(): void { // override
    console.log('vroom');
  }

  startDrivingProcess(): void {
    this.drive();
    this.honk();
  }
}

const car = new Car(4, 'red');
car.startDrivingProcess();

```

### Parcel bundler

```
npm install -g parcel-bundler
```

Definitely Typed Naming Scheme

```
@types/{library name}
```

or

```
npm install @types/faker
```
