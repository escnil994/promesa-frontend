import { delay } from 'rxjs/operators';
import { Product } from './../../models/product.model';
import { ProductService } from './../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsDetailsComponent implements OnInit {

  public num1: number = 1;

  public name: string;
  public image: string;
  public price: number;
  public details: any;
  public description: string;
  public image1: string;
  public image2: string;
  public image4: string;
  public image3: string
  public code: string;
  public to_pay: number;
  public discount: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {

    window.scroll(0,0)

  
    this.activatedRoute.params.subscribe(({ product }) => this.loadProduct(product));
  
  }



  loadProduct(product: string) {

    this.productService.getProduct(product).pipe(delay(200)).subscribe((product: any) => {
      this.image = product.image;
      this.image1 = product.image_1;
      this.image2 = product.image_2;
      this.image3 = product.image_3;
      this.image4 = product.image_4;
      this.name = product.name;
      this.code = product.code;
      this.discount = product.discount;
      this.description = product.description;
      this.price = product.price;
      const aa = ((product.price/100)*product.discount);
      this.to_pay = product.price - aa;


      this.details = product.details.split(', ');
      
      
      

    });
  }

  incrementValue(){

    this.num1 = this.num1+1;
    if (this.num1 > 10) {
      this.num1 = 10
    }
    

  }

  decrementValue(){

    this.num1 = this.num1-1;
    if (this.num1 < 0) {
      this.num1 = 0
    }


  }

  buy(){
    Swal.fire({
      title: '<strong>aun no disponible!!!</strong>',
      icon: 'info',
      html:
        'Pero puedes comprar en <b>Facebook</b>: <br>' +
        '<a href="https://www.facebook.com/ProductosMetalicosSanAntonio/" target="_blank">PROMESA EL SALVADOR</a> <br>'+
        'También puedes contactarno en nuestro <b>Número de whatsapp</b>:<br> '+
        '<a href="https://bit.ly/2NXwKwP" target="_blank">PROMESA EL SALVADOR</a> ',
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> ¡Genial!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
    })
    
  }
}
