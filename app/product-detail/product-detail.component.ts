import { Component, Input } from '@angular/core';

import { Product } from '../product/product';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { ProductService } from '../product/product.service';
import { Order } from '../order/order';
import { User } from '../user/user';
import { IAlert } from '../ialert';

@Component({
  moduleId: module.id,
  selector: 'my-product-detail',
  templateUrl: 'product-detail.component.html',
})
export class ProductDetailComponent {
  order: Order;
  currentUser: User;
  public alerts: Array<IAlert> = []; 
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  @Input()
  product: Product;


  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = params['id'];
      this.productService.getProduct(id)
        .then(product => {
            let apiUrl = "http://localhost:3000/";
            if(typeof product.image !== "undefined") {
              product.image = apiUrl + product.image;
            } else {
              product.image = "http://placehold.it/300x200/000/fff";
            }
            this.product = product;
        } );
    });
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  onAddToCart(product: Product): void {
    if(localStorage.getItem('currentOrder') === null) {
        this.order = new Order();
        this.order.products = new Array<Product>();
    } else {
        this.order = JSON.parse(localStorage.getItem('currentOrder'));
        if (typeof this.order.products === 'undefined') {
           this.order.products = new Array<Product>();
        }
    }
    if(this.currentUser != null) {
          this.order.username = this.currentUser.username;
    }

    this.addProduct(product);
    localStorage.setItem('currentOrder', JSON.stringify(this.order));
    this.alerts.pop();
    this.alerts.push({
                    id: 1,
                    type: 'success',
                    message: 'Product was added to your cart.',
                });
  }

   addProduct(obj: Product): void {
      let exist = false;
      for (let i = 0; i < this.order.products.length; i++) {
          if (this.order.products[i]._id === obj._id) {
              this.order.products[i].quantity = this.order.products[i].quantity + 1;
              exist = true;
          }
      }
      if(!exist) {
        obj.quantity = 1;
        this.order.products.push(obj);
      }
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.productService.update(this.product)
      .then(() => this.goBack());
  }

  public closeAlert(alert: IAlert) {
      const index: number = this.alerts.indexOf(alert);
      this.alerts.splice(index, 1);
  }
}
