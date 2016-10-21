import { Component, OnInit } from '@angular/core';

import { Product } from './product';

import { PRODUCTS } from './mock-products';

import { ProductService } from './product.service';

@Component({
    selector: 'my-app',
    styles: [`
  .selected {
    background-color: #CFD8DC !important;
    color: white;
  }
  .heroes {
    margin: 0 0 2em 0;
    list-style-type: none;
    padding: 0;
    width: 15em;
  }
  .heroes li {
    cursor: pointer;
    position: relative;
    left: 0;
    background-color: #EEE;
    margin: .5em;
    padding: .3em 0;
    height: 1.6em;
    border-radius: 4px;
  }
  .heroes li.selected:hover {
    background-color: #BBD8DC !important;
    color: white;
  }
  .heroes li:hover {
    color: #607D8B;
    background-color: #DDD;
    left: .1em;
  }
  .heroes .text {
    position: relative;
    top: -3px;
  }
  .heroes .badge {
    display: inline-block;
    font-size: small;
    color: white;
    padding: 0.8em 0.7em 0 0.7em;
    background-color: #607D8B;
    line-height: 1em;
    position: relative;
    left: -1px;
    top: -4px;
    height: 1.8em;
    margin-right: .8em;
    border-radius: 4px 0 0 4px;
  }
`],
    template:`
    <h1>{{title}}</h1>
    <h2>Products avaibale in store</h2>
    <ul class="heroes">
      <li *ngFor="let product of products"
        [class.selected]="product === selectedProduct"
        (click)="onSelect(product)">
        <span class="badge">{{product.id}}</span> {{product.name}}
      </li>
    </ul>
    <my-product-detail [product]="selectedProduct"></my-product-detail>
    <price-calculator></price-calculator>
  `
})
export class AppComponent implements OnInit {
    constructor(private productService: ProductService) {

    }
    title = 'Apple Store';
    product : Product = {
                id: 1,
                name: 'Macbook'
            };
    products : Product[];

    getProducts(): void {
        this.productService.getProducts().then(products => this.products = products);
    }

    ngOnInit(): void {
      this.getProducts();
    }

    selectedProduct: Product;
    onSelect(product: Product): void {
        this.selectedProduct = product;
        }
}
