import * as _ from 'ramda';
import { Maybe, UnaryFunction } from '../index';
console.log('-------------------------------------------');

var m = Maybe.of('bombs').map(_.concat<string>(' away'));

console.log(m);

var safeHead = function (xs: any) {
  return Maybe.of(xs[0]);
};
var map = _.curry(function (f: UnaryFunction<any, any>, maybe: Maybe<any>) {
  return maybe.map(f);
});
var streetName: UnaryFunction<any, any> = _.compose(
  map(_.prop('street')),
  safeHead,
  _.prop('addresses')
);

console.log(streetName({ addresses: [] })); // Maybe(null)

console.log(streetName({ addresses: [{ street: 'Shady Ln.', number: 4201 }] }));

console.log('-------------------------------------------');
var withdraw = _.curry(function (amount, balance) {
  return balance >= amount ? Maybe.of(balance - amount) : Maybe.of(null);
});

const maybe = _.curry(function (x, f, m: Maybe<any>) {
  return m.isNothing() ? x : f(m.__value);
});

var getTwenty: UnaryFunction<number, number> = _.compose(
  maybe('余额不足', (x: number) => x),
  withdraw(20)
);
console.log('balance: ', getTwenty(10));
console.log('balance: ', getTwenty(100));


var topRoute:any = _.compose(Maybe.of, _.reverse);

//  bottomRoute :: String -> Maybe(String)
var bottomRoute:any = _.compose(_.map(_.reverse), Maybe.of as any);
console.log(topRoute('hi'));
console.log(bottomRoute('hi'));