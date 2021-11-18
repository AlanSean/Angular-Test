import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user = {
    name: '123'
  }
  constructor() { }
}
