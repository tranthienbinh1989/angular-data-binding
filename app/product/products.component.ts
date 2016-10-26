import { Component, OnInit, Input } from '@angular/core';
import { Product } from './product';
import { ProductService } from './product.service';
import { Router } from '@angular/router';
import { User } from '../user/user';
import { IAlert } from '../ialert';
import { Order } from '../order/order';

@Component({
  moduleId: module.id,
  selector: 'my-products',
  templateUrl: 'products.component.html',
  styleUrls: [ 'products.component.css' ]
})
export class ProductsComponent implements OnInit {
  @Input()
  public alerts: Array<IAlert> = []; 
  products: Product[];
  selectedProduct: Product;
  order: Order;
  currentUser: User;
  isAdmin: Boolean;
  constructor(
    private router: Router,
    private productService: ProductService,
  ) { }

  

  getProducts(): void {
    this.productService.getProducts().then(products => {
      this.products = products;
      this.products.forEach(function(product) {
        let apiUrl = "http://localhost:3000/";
        if(typeof product.image !== "undefined") {
          product.image = apiUrl + product.image;
        } else {
          product.image = "http://placehold.it/300x200/000/fff";
        }
      })
    });
  }
 
ngOnInit(): void {
    this.isAdmin = false;
    this.getProducts();
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(this.currentUser !== null && this.currentUser.admin == true) {
      this.isAdmin = true;
    }
}

  onSelect(product: Product): void {
    this.selectedProduct = product;
    }

  onEdit(product: Product): void {
    this.router.navigate(['/products', product._id]);
  }

  onAddToCart(product: Product): void {
    if(localStorage.getItem('currentOrder') === null) {
        this.order = new Order();
        this.order.products = new Array<Product>();
        product.quantity = 1;
        this.order.products.push(product);
        localStorage.setItem('currentOrder', JSON.stringify(this.order));
    } else {
        this.order = JSON.parse(localStorage.getItem('currentOrder'));
        if (typeof this.order.products === 'undefined') {
           this.order.products = new Array<Product>();
        }
        product.quantity = 1;
        this.order.products.push(product);
        localStorage.setItem('currentOrder', JSON.stringify(this.order));
    }
    this.alerts.pop();
    this.alerts.push({
                    id: 1,
                    type: 'success',
                    message: 'Product was added to your cart.',
                });
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.productService.create(name)
      .then(product => {
        this.products.push(product);
        this.selectedProduct = null;
      });
  }

  delete(product: Product): void {
    this.productService
        .delete(product._id)
        .then(() => {
          this.products = this.products.filter(h => h !== product);
          if (this.selectedProduct === product) { this.selectedProduct = null; }
        });
  }

  public closeAlert(alert: IAlert) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }

}

