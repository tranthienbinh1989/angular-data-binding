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
    admin = false;
    constructor(
        private sharedService: SharedService
    ) {
         this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
         if(this.currentUser !== null) {
             this.loginBtn = 'Logout';
             this.register = true;
             this.admin = this.currentUser.admin;
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
                    this.admin = this.currentUser.admin;
                }
          } else {
              this.loginBtn = 'Login';
              this.register = false;
              this.admin = false;
          }
        });
    }
}
