import { loadCategoriesInterface } from './../interfaces/load-category.inteface';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Category } from '../models/category.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public category: Category;

  public url: string;

  constructor(
    private http: HttpClient
  ) { }


  get token(): string {
    return localStorage.getItem('token' || '');
  }


  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  getCategories( to?: number, limit?: number ) {
  
      this.url= `${base_url}/categories/since?from=${to}&limit=${limit}`;
    
    
    return this.http.get<loadCategoriesInterface>(this.url).pipe(
      map(res => {
        const categories = res.categories.map(
          categories => new Category(categories.name, categories.description,categories.details, categories.uid, categories.image, categories.user, categories.code)
        )        
                
        return{
          total: res.total,
          categories
        }
      })
    );
  }

  CreateCategory(name: string) {
    this.url= `${base_url}/categories`;

    return this.http.post(this.url, { name }, this.headers);

  }



  UpdateCategory(_id: string, name: string, description: string, details: string) {
    this.url= `${base_url}/categories/${_id}`;

    return this.http.put(this.url, { name, description, details }, this.headers);

  }

  deleteCategory(_id: string) {
    this.url= `${base_url}/categories/${_id}`;

    return this.http.delete(this.url, this.headers);

  }

}
