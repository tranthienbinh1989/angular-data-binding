import { Injectable } from '@angular/core';
import { Product } from './product';
import { PRODUCTS } from './mock-products';
import { Router } from '@angular/router';

@Injectable()
export class ProductService {
  getProducts(): Promise<Product[]> {
    return Promise.resolve(PRODUCTS);
  } // stub

  getProduct(id: number): Promise<Product> {
    return this.getProducts()
              .then(products => products.find(product => product.id === id));
  }
}
