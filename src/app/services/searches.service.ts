import { loadUsersInterface } from './../interfaces/load-users.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { environment } from './../../environments/environment.prod';
import { delay, map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Doctor } from '../models/doctors.model';
import { Category } from '../models/category.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SearchesService {


  constructor(private http: HttpClient) {
  }


  get token() {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  private transformUsers(results: any[]): User[] {
    return results.map(
      users => new User(users.name, users.email, '', users.image, users.google, users.role, users.uid)
    );
  }

  private transformHospitals(results: any[]): Category[] {
    return results;

  }

  private transformDoctors(results: any[]): Doctor[] {
    return results;

  }


  globalSearch( searchTerm ) {

    const url = `${base_url}/all/${searchTerm}`;

    return this.http.get( url);

  }


  search(
    type:  'products' | 'categories',
    searchTerm: string
  ) {
    const url = `${base_url}/all/${type}/${searchTerm}`;

    return this.http.get<any[]>(url, this.headers).pipe(map(
      (res: any) => {

        
        switch (type) {
          case 'categories':
            return this.transformHospitals(res.results);

          case 'products':
            return this.transformDoctors(res.results);

          default:
            return [];

        }
      }));

  }


  searchUsers(
    type:  'users',
    searchTerm: string
  ) {
    const url = `${base_url}/all/pro/${type}/${searchTerm}`;



    return this.http.get<loadUsersInterface>(url, this.headers).
      pipe(
        map((res:any) => {     
               
          const users = res.results.map(
            users => new User(users.name, users.last_name, users.genre, users.direction, users.phone, users.whatsapp, users.dui, users.email, users.image, users.google, users.uid, users.role)
          );
          return {
            users
          };
        })
      )

   
  }
}
