import { Injectable } from '@angular/core';

import { Headers, Http } from '@angular/http';
import { Router } from '@angular/router';
import { Configuration } from '../app.config';
import { Logger } from "angular2-logger/core";

import 'rxjs/add/operator/toPromise';

import { Product } from './product';

@Injectable()
export class ProductService {
  constructor(
    private http: Http,
    private config: Configuration,
    private logger: Logger
  ) { }

  private headers = new Headers({'Content-Type': 'application/json', 'Accept': 'application/json'});
  
  private productsUrl = this.config.serverWithApiUrl + '/products';

  getProducts(): Promise<Product[]> {
    return this.http.get(this.productsUrl)
               .toPromise()
               .then(response => response.json() as Product[])
               .catch(this.handleError);
  }

  getProduct(id: string): Promise<Product> {
    return this.http.get(this.productsUrl + "/" + id)
               .toPromise()
               .then(response => response.json() as Product)
               .catch(this.handleError);
  }

   delete(id: string): Promise<void> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }


  update(product: Product): Promise<Product> {
    const url = `${this.productsUrl}/${product._id}`;
    return this.http
      .put(url, JSON.stringify(product), {headers: this.headers})
      .toPromise()
      .then(response => response.json() as Product)
      .catch(this.handleError);
  }

  create(name: string): Promise<Product> {
    return this.http
      .post(this.productsUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
