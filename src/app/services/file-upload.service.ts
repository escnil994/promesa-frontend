import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class FileUploadService {

  constructor() { }


  async updateImage(
    file: File,
    type: 'users' | 'products' | 'categories',
    id: string
  ){


    try {
      
      const url = `${base_url}/upload/${type}/${id}`;

      const formData = new FormData();

      formData.append('image', file);

      const res = await fetch( url, {
        method: 'POST',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await res.json();

      if (data.ok) {
        
        return data.data.image;
      }else{

        return false;
      }

                  
    } catch (error) {
      return false;
      
    }
  }


  async updateImage2(
    file: File,
    type: 'first' | 'second' | 'third',
    id: string
  ){


    try {
      
      const url = `${base_url}/upload/banner/${type}/${id}`;

      const formData = new FormData();

      formData.append('file0', file);

      const res = await fetch( url, {
        method: 'POST',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await res.json();

      if (data.ok) {
        if (type === 'first') {
          return data.data.image_01;
        }
        if (type === 'second') {
          return data.data.image_02;
        }
        if (type === 'third') {
          return data.data.image_03;
        }

      }else{

        return false;
      }

                  
    } catch (error) {
      return false;
      
    }
  }
}
