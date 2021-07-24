const carMakers = ['ford', 'toyota', 'chevy']
const dates = [new Date(), new Date()];


const carsByMake: string[][] = [];

// Help with inference when extracting values
const car = carMakers[0]; // correctly infered is type of str
const myCar = carMakers.pop(); // instance of string

// Prevent incompatible values
// carMakers.push(100); 

// Help with 'map'
carMakers.map((car: string): string => {
  return car;
})

// Flexible types
// String or Date obj
// const importantDates: (string | Date)[]
const importantDates = [new Date(), '2030-10-10 '];

