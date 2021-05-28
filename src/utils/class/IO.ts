import { ZeroFunction, UnaryFunction } from './types';
import * as _ from 'ramda';

function compose<T, R>(a: UnaryFunction<T, R>,b: ZeroFunction<T>) {
  return function () {
    return a(b());
  };
}
export class IO<T>{
  unsafePerformIO: ZeroFunction<T>;
  constructor(fn: ZeroFunction<T>) {
    this.unsafePerformIO = fn;
  }
  static of<T>(x: T) {
    return new IO<T>(function () {
      return x;
    });
  }
  map(f: any) {
    return new IO(compose(f, this.unsafePerformIO));
  }
}
