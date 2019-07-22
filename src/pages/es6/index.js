// es5
function addFn(a,b) {
  return a + b;
}

// es6
const addFnArrow = (a,b) => a + b;
const addFn2Arrow = (a,b) => { return a + b; };

const obj = {
  zipcode: 40234,
  name: 'Mike',
  age: 28
};
const { zipcode, name, age } = obj;

const obj1 = {
  zipcode: 11234,
  lastname: 'Merci',
  age: 30,
};
const { lastname, ...props } = obj1;

const arr = [ obj, addFnArrow ];
const [ data, aFn ] = arr;

const arr2 = [ ...props, lastname];
