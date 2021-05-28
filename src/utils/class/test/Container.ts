import * as _ from 'ramda';
import { Functor } from '../index';

var c = Functor.of<string>('bombs').map(_.concat<string>(' away'));

console.log('Functor', c);
