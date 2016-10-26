import { Component, OnInit } from '@angular/core';

import { Product } from '../product/product';
import { ProductService } from '../product/product.service';
import { Router } from '@angular/router';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: [ 'dashboard.component.css' ],
  providers: [NgbCarouselConfig],
})
export class DashboardComponent implements OnInit {

  products: Product[] = [];

  constructor(
      private router: Router,
      private productService: ProductService,
      private config: NgbCarouselConfig
  ) {
    // customize default values of carousels used by this component tree
    config.interval = 800;
    config.wrap = true;
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.productService.getProducts()
      .then(products => this.products = products.slice(1, 5));
  }

  gotoDetail(product: Product): void {
    let link = ['/detail', product._id];
    this.router.navigate(link);
  }
}
