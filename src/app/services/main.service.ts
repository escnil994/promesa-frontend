import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { API } from './api.service';

@Injectable()

export class MainService {

  public url: string;


  constructor(    private http: HttpClient    ) {
    this.url = API.url;
   }

   createProduct(product): Observable<any>{
     let params = JSON.stringify(product);
     let headers = new HttpHeaders().set('Content-Type', 'application/json');

     return this.http.post(this.url + 'create-new-product' , params, {headers: headers});
   }
}
