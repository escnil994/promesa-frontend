import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LoginFormInterface } from "../interfaces/login-form.interface";
import { RegisterFormInterface } from '../interfaces/register-form.interface';
import { loadUsersInterface } from './../interfaces/load-users.interface';


import { environment } from '../../environments/environment';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';


import { User } from "../models/user.model";


const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public auth2: any;

  public user: User;



  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.googleInit();
    
  }

  saveInLocalStorage(token: string, menu: any) {

    localStorage.setItem('token', token)

    localStorage.setItem('menu', JSON.stringify(menu))

  }

  get role(): 'ADMIN' | 'USER' {
    return this.user.role;
  }

  createUser(formData: RegisterFormInterface) {

    return this.http.post(`${base_url}/users`, formData)
      .pipe(
        tap((res: any) => {

          this.saveInLocalStorage(res.token, res.menu);

        })
      )
  }

  get token(): string {
    return localStorage.getItem('token' || '');
  }

  get uid(): string {
    return this.user.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  loginUser(formData: LoginFormInterface) {
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((res: any) => {


          this.saveInLocalStorage(res.token, res.menu);

        })
      )
  }

  loginGoogleUser(token) {
    return this.http.post(`${base_url}/login/google`, { token })
      .pipe(
        tap((res: any) => {

          this.saveInLocalStorage(res.token, res.menu);

        })
      )
  }

  validateToken(): Observable<boolean> {

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(map((res: any) => {
      const { name, last_name, genre, direction, phone, whatsapp, dui, email, image, google, uid, role, commented } = res.user;

      
      this.user = new User(name, last_name, genre, phone, whatsapp, direction, dui, email, image, google, uid, role, commented );

      this.user = res.user;

      this.saveInLocalStorage(res.token, res.menu);

      return true;
    }),
      catchError(error => of(false)));
  }

  googleInit() {

    return new Promise(resolve => {

      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '963808556047-8r2doqjb26rh6j4rfe2su55ka8d2cip4.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();

      });

    })

  }

  logout() {
    localStorage.removeItem('token');


    this.auth2.signOut().then(() => {

      this.ngZone.run(() => {

        this.router.navigateByUrl('/home');
        location.reload();

      });

    });
  }

  updateUser(formData: { name: string, last_name: string, genre: string, direction: string, phone: string, whatsapp: string, email: string, role: string }) {


    formData = {
      ...formData,
      role: this.user.role
    }

    return this.http.put(`${base_url}/users/${this.uid}`, formData, this.headers);

  }

  getUsers(to: number) {

    const url = `${base_url}/users/since?from=${to}`;
    return this.http.get<loadUsersInterface>(url, this.headers).
      pipe(
        map(res => {
          
          const users = res.users.map(
            users => new User(users.name, users.last_name, users.genre, users.direction, users.phone, users.whatsapp, users.dui, users.email, users.image, users.google, users.uid, users.role)
          );
          return {
            total: res.total,
            users
          };
        })
      )
  }


  getUser(id: string){
    const url = `${base_url}/users/user/${id}`;

    return this.http.get(url, this.headers).pipe(
      map(res => {
        
      })
    )
  }

  deletUser(user: User) {
    return this.http.delete(`${base_url}/users/${user.uid}`, this.headers)
  }

  changeRole(user: User) {

    return this.http.put(`${base_url}/users/${user.uid}`, user, this.headers);

  }


  sendPass(data: {email}){
    
    return this.http.post(`${base_url}/login/recover`, data);
  }

  changePassword( param: string, data: {password} ){
    
    
    const url = `${base_url}/users/update/${param}`;

    
    return this.http.put(url, data);
  }

  getByP(param){
    const url = `${base_url}/users/userBy/${param}`;

    
    return this.http.get(url);

  }
}
