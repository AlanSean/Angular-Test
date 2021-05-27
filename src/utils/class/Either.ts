import { Functor } from "./Functor";
import { UnaryFunction } from "./types";
//容器
export default class Left<T>  extends Functor<T>{
  map(fn:UnaryFunction<T,T>):Left<T> {
    return this;
  }
}



