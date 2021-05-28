import { IO, ZeroFunction,UnaryFunction,Maybe } from '../index';
import * as _ from 'ramda';


var url:IO<string> = IO.of(window.location.href);

var toPairs:UnaryFunction<string,string[][]> = _.compose(_.map(_.split('=')),_.split('&'));
var params:UnaryFunction<string,string[][]>  = _.compose(toPairs,_.last,_.split('?'));
var eq:UnaryFunction<string,UnaryFunction<string,boolean>> = function(key){
  return function(x){
    return x ===key
  }
}
var findParam:UnaryFunction<string,IO<Maybe<string[]>>> = function (key:string) {
  return _.map(_.compose(Maybe.of, _.filter(_.compose(eq(key), _.head)), params), url) as IO<Maybe<string[]>>;
};
console.log(findParam('a').unsafePerformIO())

