import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { Logger } from './logger.service';

@Injectable()
export class EvenBetterLoggerService extends Logger {
  constructor(private userService: UserService) {
    super();
  }
  log(messgae:string){
    const {name} = this.userService.user;
    super.log(`Message to ${name}: ${messgae}`);
  }
}
