'use strict';

function mult (num) {
  return num + 10;
}

function fn (num) {
  return num * mult(num);
}

function dynamic (num) {
  return Promise.resolve({ default: require("execa") })
  .then(dep => {
    console.log(dep);
  });
}

console.log(fn(5));

dynamic(10).then(num => {
  console.log(num);
});
