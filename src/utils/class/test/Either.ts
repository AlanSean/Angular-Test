import * as _ from 'ramda';
import * as moment from 'moment';
import { Maybe, Either,UnaryFunction,identity } from '../index';

//  getAge :: Date -> User -> Either(String, string)
var getAge:UnaryFunction<any,any> = _.curry(function(now, birthdate) {
  birthdate = moment(birthdate, 'YYYY-MM-DD');
  if(!birthdate.isValid()) return Either.of("Birth date could not be parsed");
  return Maybe.of(now.diff(birthdate, 'years'));
});
var fortune:any = _.compose(_.concat<string>("If you survive, you will be "), _.compose(_.toString, _.add(1)),);
// //  zoltar :: User -> Either(String, _)
// var zoltar:UnaryFunction<string, any> = _.compose(_.map(console.log), getAge(moment()));
// console.log(zoltar('2005-12-12'));
// console.log(zoltar('adasd'));
var c = Maybe.of('rain').map((str) => 'b' + str);
var l = Either.of('rain').map((str) => 'b' + str);

var either = _.curry(function(error,complete,e){
  switch(e.constructor){
    case Either: return error(e.__value);
    case Maybe: return complete(e.__value)
  }
})


var zoltar:UnaryFunction<string, void> = _.compose(console.log,either(identity,fortune), getAge(moment()));
zoltar('adasd'); //Birth date could not be parsed
zoltar('2005-12-12'); //If you survive, you will be 16 