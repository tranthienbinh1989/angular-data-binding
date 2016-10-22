import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    styleUrls: ['dist/app/app.component.css'],
    template:`
    <h1>{{title}}</h1>
    <nav>
     <a routerLink="/dashboard">Dashboard</a>
     <a routerLink="/products">Products</a>
     <a routerLink="/highlight">High Light Directive</a>
     <a routerLink="/calculator">Price Calculator Pipe</a>
   </nav>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
    title = 'Apple Store';
}
