import { Component, Input } from '@angular/core';

import { Product } from '../product/product';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { ProductService } from '../product/product.service';

@Component({
  moduleId: module.id,
  selector: 'my-product-detail',
  templateUrl: 'product-detail.component.html',
})
export class ProductDetailComponent {
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
        .then(product => this.product = product);
    });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.productService.update(this.product)
      .then(() => this.goBack());
  }
}
