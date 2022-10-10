import { Comment } from './../models/comment.model';
import { map } from 'rxjs/operators';
import { Banner } from './../models/banner.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';


const base_url = environment.base_url;



@Injectable({
  providedIn: 'root'
})
export class CommentsService {


  public comment: Comment[];

  public user: User;


  constructor(
    private http: HttpClient
  ){

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

  getComments(to: number){
    const url = `${base_url}/comments/since?from=${to}`;

    return this.http.get(url).pipe(
      map((res: any) => {

        const com = res.comment;
        const tot = res.total;
        
        
        return{
          com,
          tot
        } 
        

      })
    )
  
  }

  newComment( data: { comment }){
    const url = `${base_url}/comments`;
  
    return this.http.post(url, data, this.headers);
  }

  deleteComment(comment: string){
    const url = `${base_url}/comments/${comment}`;

    return this.http.delete(url, this.headers);
  }


}