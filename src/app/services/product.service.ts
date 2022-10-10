import { Product } from './../models/product.model';
import { loadProductInterface } from './../interfaces/load-product.inteface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { environment } from "../../environments/environment";

import { map, delay } from 'rxjs/operators';


const base_url = environment.base_url;

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    public product: Product;

    constructor(
        private http: HttpClient
    ) { }

    get token(): string {
        return localStorage.getItem('token' || '');
    }

    get uid(): string {
        return this.product.uid;
    }

    get headers() {
        return {
            headers: {
                'x-token': this.token
            }
        }
    }


    getProduct(code: string) {
        const url = `${base_url}/products/product/${code}`;


        return this.http.get(url).pipe(
            map((res: { ok: boolean, productFound: Product[] }) => {
                
                return res.productFound;
            
            })
        )
    }

    getproducts(to: number) {
        const url = `${base_url}/products/since?from=${to}`
        return this.http.get<loadProductInterface>(url).pipe(
            map(res => {

                const products = res.products.map(
                    products => new Product(
                        products.name,
                        products.description,
                        products.price,
                        products.status,
                        products.code,
                        products.discount,
                        products.details,
                        products.image,
                        products.image_1,
                        products.image_2,
                        products.image_3,
                        products.image_4,
                        products.user,
                        products.category,
                    ));

                return {
                    total: res.total,
                    products
                }
            })
        )
    }



    createProduct(product: { name: string, category: string}) {
        
        const url = `${base_url}/products`;

        return this.http.post(url, product, this.headers);

    }


    updateProduct(product: Product) {

        const url = `${base_url}/products/${product.uid}`;


        return this.http.put(url, product, this.headers);
    }





    getproductsByCategory(to: number, category: string) {

        const url = `${base_url}/products/category/${category}/since?from=${to}`
        return this.http.get<loadProductInterface>(url).pipe(
            map((res:any) => {
                                

                const products = res.products.map(
                    products => new Product(
                        products.name,
                        products.description,
                        products.price,
                        products.status,
                        products.code,
                        products.discount,
                        products.details,
                        products.image,
                        products.image_1,
                        products.image_2,
                        products.image_3,
                        products.image_4,
                        products.user,
                        products.category,
                    ));

                return {
                    total: res.total,
                    products
                }
            })
        )
    }




    deleteProduct(product: string){
        const url = `${base_url}/products/${product}`;

        return this.http.delete(url, this.headers);
    }

}