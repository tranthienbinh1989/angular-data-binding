import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location }               from '@angular/common';

import { AuthenticationService } from '../_services/index';
import { SharedService } from '../shared.service';

@Component({
    moduleId: module.id,
    selector: 'my-login',
    styleUrls: ['login.component.css'],
    templateUrl: 'login.component.html',
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private sharedService: SharedService,
        private location: Location,
    ) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
        this.sharedService.logout();
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(result => {
                if (result === true) {
                    this.sharedService.login();
                    this.router.navigate(['/']);
                } else {
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
            });
    }
}
