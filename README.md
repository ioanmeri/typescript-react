## Type Inference

```
const color = 'red';
```

Var Declaration = Var Initialization

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
