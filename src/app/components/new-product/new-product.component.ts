import { Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';
import { Product } from '../../models/product'
import { MainService } from "../../services/main.service";
import { from } from 'rxjs';
import { API } from 'src/app/services/api.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
  providers: [MainService]
})
export class NewProductComponent implements OnInit {

  public product: Product;
  public url: string;
  public status: string;

  constructor(
    private principalService: MainService,
  ) {
    this.product = new Product('','','','','');
    this.url = API.url;
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.principalService.createProduct(this.product).subscribe(res => {
      console.log(res);
      if (res.status === 'success') {
        this.status = 'success';
        this.product = res.products;

      }
    }, error => {
      console.log(error);
    });
  }
}
