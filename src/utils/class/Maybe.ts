import { Functor } from "./Functor";
import { UnaryFunction } from "./types";

//容器
export default class Maybe<T = null | undefined> extends Functor<T>{
  isNothing(){
    return (this.__value === null || this.__value === undefined);
  }
  map(fn:UnaryFunction<T,any>){
    return this.isNothing() ? Maybe.of(null) : Maybe.of(fn(this.__value));
  }
}

