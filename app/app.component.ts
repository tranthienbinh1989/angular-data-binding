import { Component, OnInit } from '@angular/core';
import { User } from './user/user';
import { SharedService } from './shared.service';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    styleUrls: ['app.component.css'],
    templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
    title = 'Apple Store';
    loginBtn = "Login";
    register = false;
    currentUser: User;
    constructor(
        private sharedService: SharedService
    ) {
         this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
         if(this.currentUser !== null) {
             this.loginBtn = 'Logout';
             this.register = true;
         }
    }

    ngOnInit() {
    this.subscription = this.sharedService.getEmittedValue()
      .subscribe(item => {
          if(item) {
                this.register = item;
                this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
                if(this.currentUser !== null) {
                    this.loginBtn = 'Logout';
                    this.register = true;
                }
          } else {
              this.loginBtn = 'Login';
              this.register = false;
          }
        });
    }
}
