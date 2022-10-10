import { Subscription } from 'rxjs';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';

import { Product } from './../../models/product.model';


@Component({
  selector: 'app-productss',
  templateUrl: './productss.component.html',
  styleUrls: ['./productss.component.css']
})
export class ProductssComponent implements OnInit {

  public products: Product[] = [];

  public totalProducts: number = 0;

  public productTerm: Product[] = [];

  public to: number = 0;

  public loading: boolean = true;

  public imageSubs = Subscription;

  constructor(
    private _productService: ProductService
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



}
