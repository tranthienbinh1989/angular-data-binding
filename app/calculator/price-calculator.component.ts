import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'price-calculator',
  templateUrl: 'price-calculator.component.html'
})
export class PriceCalculatorComponent {
  price = 5;
  quantity = 1;
}
