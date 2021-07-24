// Interface is a new type like str or number
// variable that refers to a type

// interface Vehicle {
//   name: string;
//   year: Date;
//   broken: boolean;
//   summary(): string;
// }

// const printVehicle = (vehicle: Vehicle): void => {
//   console.log(vehicle.summary())
// };

/* REFACTORED */
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
// printVehicle(oldCivic);