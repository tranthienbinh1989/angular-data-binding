import {Product} from '../product/product';

export class Order {
  constructor(
    public _id?: string,
    public username?: string,
    public products?: Array<Product>,
    public total?: number,
    public numProduct?: number,
  ) {  }
}