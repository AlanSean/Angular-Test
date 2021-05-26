import { UnaryFunction } from "./types";
//容器
export default class Container<T> {
  __value: T;
  constructor(value: T) {
    this.__value = value;
  }
  static of<T>(value: T) {
    return new Container<T>(value);
  }
  map(fn:UnaryFunction<T,T>):Container<T> {
    return Container.of(fn(this.__value));
  }
}


