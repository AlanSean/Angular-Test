import { UnaryFunction } from "./types";
//容器
export default class Maybe<T = null | undefined> {
  __value: T;
  constructor(value: T) {
    this.__value = value;
  }
  static of<T>(value: T) {
    return new Maybe<T>(value);
  }
  isNothing(){
    return (this.__value === null || this.__value === undefined);
  }
  map(fn:UnaryFunction<T,T>):Maybe<null|T> {
    return this.isNothing() ? Maybe.of(null) : Maybe.of(fn(this.__value));
  }
}

