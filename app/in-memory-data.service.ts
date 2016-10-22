import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let products = [
        { id: 11, name: 'Iphone 7S' },
        { id: 12, name: 'Iphone 6S' },
        { id: 13, name: 'Ipad Air' },
        { id: 14, name: 'Macbook Pro' },
        { id: 15, name: 'Macbook Air' },
        { id: 16, name: 'Apple TV' }
    ];
    return {products};
  }
}
