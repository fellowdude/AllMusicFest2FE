import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private apiService: ApiService) { }

  getActiveProducts() {
    return this.apiService.get('products/active');
  }
}
