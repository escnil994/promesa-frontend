import { Banner } from './../models/banner.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SidebarService {


  public banner: Banner;
  
  constructor(
    private _http: HttpClient
  ){ }


  public  menu = [];

  getMenu(){
    this.menu = JSON.parse( localStorage.getItem('menu') );
    return this.menu;
  }
  getBanner(){
    return this._http.get(`${base_url}/utils`);
  }
}
