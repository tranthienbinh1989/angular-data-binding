import { Component, Input, OnInit } from '@angular/core';

import { Product } from '../product/product';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }                 from '@angular/common';
import { ProductService } from '../product/product.service';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { Order } from '../order/order';
import { OrderService } from '../order/order.service';

@Component({
  moduleId: module.id,
  selector: 'my-order',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css'],
})
export class ProfileComponent implements OnInit  {
  user: User;
  currentUser: User;
  products: Product[];
  orders: Order[];
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService,
    private orderService: OrderService,
  ) {}

  getUser(): void {
    this.userService.getUser(this.currentUser._id).then(user => this.user = user);
  }

  getUserOrders(): void {
    this.orderService.getUserOrders(this.currentUser.username).then(
      (orders) => {
        this.orders = orders;
        console.log(this.orders);
      }
    );
  }

  ngOnInit(): void {
      this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
      this.getUser();
      this.getUserOrders();
  }
}
