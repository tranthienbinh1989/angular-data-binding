import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the price
 * Takes an quantity argument that defaults to 1.
 * Usage:
 *   priceUnit | calculatePrice:quantity
 * Example:
 *   {{ 2 |  calculatePrice:10}}
 *   formats to: 20
*/
@Pipe({name: 'calculatePrice'})
export class CalculatePricePipe implements PipeTransform {
  transform(priceUnit: number, quantity: number): number {
      let qty = isNaN(quantity) ? 1 : quantity;
    return priceUnit*qty;
  }
}