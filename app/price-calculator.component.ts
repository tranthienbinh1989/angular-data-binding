import { Component } from '@angular/core';

@Component({
  selector: 'price-calculator',
  template: `
    <h2>Price Calculator</h2>
    <div>Price: <input [(ngModel)]="price"></div>
    <div>quantity: <input [(ngModel)]="quantity"></div>
    <p>
      Product Price: {{price | calculatePrice: quantity}}
    </p>
  `
})
export class PriceCalculatorComponent {
  price = 5;
  quantity = 1;
}
