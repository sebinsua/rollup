import { mult } from './dep2.js';

export function fn (num) {
  return num * mult(num);
}

export function dynamic (num) {
  return import('execa')
  .then(dep => {
    console.log(dep);
  });
}