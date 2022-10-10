import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Product } from './../../../models/product.model';
import { ProductService } from './../../../services/product.service';
import { SearchesService } from 'src/app/services/searches.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: [
    './product.component.css'
  ]
})
export class ProductsComponentMaintenance implements OnInit {


  public products: Product[] = [];

  public totalProducts: number = 0;

  public productTerm: Product[] = [];

  public to: number = 0;

  public loading: boolean = true;

  public imageSubs = Subscription;

  constructor(
    private _productService: ProductService,
    private searchesService: SearchesService
  ) { }

  ngOnInit(): void {

    window.scroll(0,0)

    this.loadProducts();
  }


  
  loadProducts() {
    this.loading = true;

    this._productService.getproducts(this.to).subscribe(({ total, products }) => {
      this.totalProducts = total;
      this.products = products;
      this.productTerm = products;


      this.loading = false;
    })
  }

  changePage(value: number) {
    this.to += value;
    if (this.to < 0) {
      this.to = 0
    } else if (this.to >= this.totalProducts) {
      this.to -= value;
    }

    this.loadProducts();

  }

  search(searchWord: string) {
    if (searchWord.length === 0) {
      return this.loadProducts();
    }
    this.searchesService.search('products', searchWord).subscribe((results: any) => {
      this.products = results;
    },
      error => {


      }
    );
  }

}
