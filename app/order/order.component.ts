import { Component, Input } from '@angular/core';

import { Product } from '../product/product';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }                 from '@angular/common';
import { ProductService } from '../product/product.service';
import { Order } from './order';
import { OrderService } from './order.service';
import { User } from '../user/user';

@Component({
  moduleId: module.id,
  selector: 'my-order',
  templateUrl: 'order.component.html',
  styleUrls: ['order.component.css'],
})
export class OrderComponent {
  order: Order;
  products: Product[];
  currentUser: User;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private location: Location,
    private orderService: OrderService,
    private router: Router,
  ) {}
  hasOrder = false;
  success = false;
  total = 0;
  ngOnInit(): void {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.order = JSON.parse(localStorage.getItem('currentOrder'));
    if(this.order !== null) {
      this.products = this.order.products;
      this.total = 0;
      for(let i = 0; i < this.products.length; i++) {
        this.total += (this.products[i].quantity*this.products[i].price);
      }
      this.order.total = this.total;
      this.hasOrder = true;
    }
  }

  onChangeQuantity(product, newValue) {
    product.quantity = newValue;
    this.total = 0;
    for(let i = 0; i < this.products.length; i++) {
      if(this.products[i]._id === product._id) {
        this.products[i]._id = newValue;
      }
      this.total += (this.products[i].quantity*this.products[i].price);
    }
    console.log(this.total);
  }

  onCheckout(): void {
    if(this.currentUser === null) {
      this.router.navigate(['/login']);
    } else {
       this.order.username = this.currentUser.username;
       this.order.products = this.products;
       this.order.numProduct = this.products.length;
       this.orderService.create(this.order).then(
        order => {
          if(order != null) {
              this.success = true;
              this.hasOrder = false;
          }
        }
      );
      localStorage.removeItem('currentOrder');
    }
  }

  onDeleteProduct(product: Product): void {
    this.total = 0;
    this.products = this.products.filter(p => p._id !== product._id);
    for(let i = 0; i < this.products.length; i++) {
      this.total += (this.products[i].quantity*this.products[i].price);
    }
    this.order.products = this.products;
    localStorage.setItem('currentOrder', JSON.stringify(this.order));
  }
}
