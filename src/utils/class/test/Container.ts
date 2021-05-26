import * as _ from 'ramda';
import { Container } from '../index';

var c = Container.of<string>('bombs').map(_.concat<string>(' away'));

console.log('Container', c);
