import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { ProductService } from './product.service';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'my-products',
  templateUrl: 'products.component.html',
  styleUrls: [ 'products.component.css' ]
})
export class ProductsComponent implements OnInit {
  products: Product[];
  selectedProduct: Product;

  constructor(
    private router: Router,
    private productService: ProductService) { }

  getProducts(): void {
    this.productService.getProducts().then(products => this.products = products);
  }

ngOnInit(): void {
    this.getProducts();
}

onSelect(product: Product): void {
    this.selectedProduct = product;
    }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedProduct.id]);
  }


}

