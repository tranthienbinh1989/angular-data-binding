import {Component, Injectable,Input,Output,EventEmitter} from '@angular/core'

@Injectable()
export class SharedService {
  @Output() fire:EventEmitter<any>=new EventEmitter();

   constructor() {
     console.log('shared service started');
   }

   login() {
        this.fire.emit(true);
   }

   logout() {
      this.fire.emit(false);
   }

   getEmittedValue()
   {
     return this.fire;
   }
}