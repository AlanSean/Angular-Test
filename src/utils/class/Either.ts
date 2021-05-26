import { UnaryFunction } from "./types";
//容器
export default class Left<T> {
  __value: T;
  constructor(value: T) {
    this.__value = value;
  }
  static of<T>(value: T) {
    return new Left<T>(value);
  }
  map(fn:UnaryFunction<T,T>):Left<T> {
    return this;
  }
}



