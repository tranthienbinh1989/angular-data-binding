import { Injectable } from '@angular/core';

import { Headers, Http } from '@angular/http';
import { Router } from '@angular/router';
import { Configuration } from '../app.config';
import { Logger } from "angular2-logger/core";

import 'rxjs/add/operator/toPromise';

import { Product } from '../product/product';
import { Order } from './order';

@Injectable()
export class OrderService {
  constructor(
    private http: Http,
    private config: Configuration,
    private logger: Logger
  ) { }
  private headers = new Headers({'Content-Type': 'application/json', 'Accept': 'application/json'});
  
  private orderUrl = this.config.serverWithApiUrl + '/orders';

  getOrder(): Promise<Order> {
    return this.http.get(this.orderUrl)
               .toPromise()
               .then(response => response.json().data as Order)
               .catch(this.handleError);
  }

  create(order: Order): Promise<Product> {
    return this.http
      .post(this.orderUrl, JSON.stringify(order), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}