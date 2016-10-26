import { Component, Input } from '@angular/core';

import { Product } from '../product/product';
import { ActivatedRoute, Params }   from '@angular/router';
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
  ) {}
  hasOrder = false;
  ngOnInit(): void {

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(this.currentUser !== null) {
      
    } else {
      this.order = JSON.parse(localStorage.getItem('currentOrder'));
      if(this.order !== null) {
        this.products = this.order.products;
        this.hasOrder = true;
      }
    }
      // this.orderService.getOrder().then(
      //   (order) => {
      //     console.log(order.products);
      //     this.order = order;
      //     this.products = order.products;
      //     this.hasOrder = false;
      //   }
      // );

  }

  onCheckout(): void {
    
  }
}
