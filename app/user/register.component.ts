import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './user.service';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService
        ) { }

    register() {
        this.loading = true;
        this.model.admin = false;
        this.userService.create(this.model)
            .then(
                 user => {
                    this.router.navigate(['/login']);
                },
            ).catch(

            );
    }
}
