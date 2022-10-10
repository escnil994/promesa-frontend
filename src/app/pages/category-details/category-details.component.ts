import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from './../../models/product.model';
import { ProductService } from './../../services/product.service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {

  

  public products: Product[] = [];

  public totalProducts: number = 0;

  public productTerm: Product[] = [];

  public to: number = 0;

  public session: boolean = false;

  public loading: boolean = true;

  public imageSubs = Subscription;

  constructor(
    private _productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    window.scroll(0,0)

    this.activatedRoute.params.subscribe(({ category }) => this.loadProducts(category));


  }


  loadProducts( category: string) {
    this.loading = true;

    this._productService.getproductsByCategory(this.to, category).subscribe(({ total, products }) => {
      if (total === 0) {

        document.getElementById('empty').innerHTML = 'No hay productos disponibles en esta categoría';
      }      
      this.totalProducts = total;
      this.products = products;
      this.productTerm = products;   

      if (localStorage.getItem('token')) {
        this.session = true;
      }
     
      


      this.loading = false;
    })
  }



}
