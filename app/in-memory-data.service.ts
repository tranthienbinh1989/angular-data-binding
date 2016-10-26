import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let order = {
      username: 'admin',
      products:
      [
        { id: 11, name: 'Iphone 7S', price: 300, quatity: 1 },
        { id: 12, name: 'Iphone 6S', price: 300, quatity: 1 },
        { id: 13, name: 'Ipad Air', price: 300, quatity: 1 },
        { id: 14, name: 'Macbook Pro', price: 300, quatity: 1 },
        { id: 15, name: 'Macbook Air', price: 300, quatity: 1 },
        { id: 16, name: 'Apple TV', price: 300, quatity: 1 }
      ] 
  };
    return {order};
  }
}
