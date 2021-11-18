import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Logger {

  constructor() { }
  log(messgae:string){
    console.log(messgae);
  }
}
