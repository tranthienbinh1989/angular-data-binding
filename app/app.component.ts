import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    styleUrls: ['dist/app/app.component.css'],
    template:`
    <h1>{{title}}</h1>
    <nav>
     <a routerLink="/dashboard">Dashboard</a>
     <a routerLink="/products">Products</a>
   </nav>
    <router-outlet></router-outlet>
    
    <price-calculator></price-calculator>
    
    <h4>Pick a highlight color</h4>
    <div>
      <input type="radio" name="colors" (click)="color='lightgreen'">Green
      <input type="radio" name="colors" (click)="color='yellow'">Yellow
      <input type="radio" name="colors" (click)="color='cyan'">Cyan
    </div>
    <p [myHighlight]="color">Highlight me!</p>
    <p [myHighlight]="color" [defaultColor]="'violet'">
      Highlight me too!
    </p>
  `
})
export class AppComponent {
    title = 'Apple Store';
}
