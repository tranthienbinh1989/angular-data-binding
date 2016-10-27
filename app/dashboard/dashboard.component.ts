import { Component, OnInit } from '@angular/core';

import { Product } from '../product/product';
import { ProductService } from '../product/product.service';
import { Router } from '@angular/router';
import { CarouselModule } from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: [ 'dashboard.component.css' ],
})
export class DashboardComponent implements OnInit {
  public products: Product[] = [];
  public myInterval:number = 5000;
  public noWrapSlides:boolean = false;
  
  constructor(
      private router: Router,
      private productService: ProductService,
  ) {
  }

  ngOnInit(): void {
    this.productService.getProducts()
      .then(products => {
        this.products = products.slice(1, 5);
        this.products.forEach(function(product) {
          let apiUrl = "http://localhost:3000/";
          if(typeof product.image !== "undefined") {
            product.image = apiUrl + product.image;
          } else {
            product.image = "http://placehold.it/300x200/000/fff";
          }
        });
       }
      );
  }

  gotoDetail(product: Product): void {
    let link = ['/detail', product._id];
    this.router.navigate(link);
  }
}
