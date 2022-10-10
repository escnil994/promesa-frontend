import { loadProductInterface } from './../../../interfaces/load-product.inteface';
import { ModalImagesService } from './../../../services/modal-images.service';
import { CategoryService } from './../../../services/category.service';
import { Category } from 'src/app/models/category.model';
import Swal from 'sweetalert2';
import { delay, map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from './../../../services/product.service';
import { Product } from './../../../models/product.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-maintenances',
  templateUrl: './product.component.html',
  styleUrls: [
    './product.component.css'
  ]
})
export class ProductComponentMaintenances implements OnInit {


  public category: Category[];

  public productForm: FormGroup;

  public categorySelected: Category;

  public codeCate: string;

  public productSelected: Product;

  public titleName: string = '';

  public image1: string;
  public image2: string;
  public image3: string;
  public image4: string;

  public code: string;

  public imageSubs: Subscription;




  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _modalImagesService: ModalImagesService
  ) {
  }

  ngOnInit(): void {
    
    window.scroll(0,0)

    this.activatedRoute.params.subscribe(({ code }) =>{
      
      this.loadProduct(code);
      
      this.code = code;
    });

    
    this.imageSubs = this._modalImagesService.imageChenged.pipe(delay(100)).subscribe((image) => {
      this.loadProduct(this.code);
    })

    


    this.productForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      discount: ['', Validators.required],
      details: ['', Validators.required],
      status: ['', Validators.required],
    });

    this.loadCategories();


    this.productForm.get('category').valueChanges.subscribe(categoryId => {
      this.categorySelected = this.category.find(cate => cate.uid === categoryId)

      this.codeCate = this.categorySelected.code;


    });
    

  }

  ngOnDestroy(): void {
    this.imageSubs.unsubscribe();
  }



  loadCategories() {

    this.categoryService.getCategories().subscribe(({ categories, total }) => {
      this.category = categories;


    });



  }

  loadProduct(code: string) {


    if (code === 'new') {
      return;
    }


    this.productService.getProduct(code).pipe(delay(300)).subscribe((product: any) => {

      localStorage.setItem('12345', product.uid)


      this.image1 = product.image_1;
      this.image2 = product.image_2;
      this.image3 = product.image_3;
      this.image4 = product.image_4;

      if (!product) {
        return this.router.navigateByUrl('/dashboard/products-maintenances');

      }

      const { name, category, description, price, discount, details, status } = product;

      this.productForm.setValue({ name, category, description, price, discount, details, status })

      this.productSelected = product;


    })
  }

  saveProduct() {


    if (this.productSelected) {


      //Update
      const data = {
        ...this.productForm.value,
        uid: this.productSelected.uid,
        categoryCode: this.codeCate
      }
      this.productService.updateProduct(data).subscribe(res => {

        Swal.fire('Exito!!!', `El Producto ${this.productForm.value.name} se actualizó correctamente`, 'success');
      }, error => {
        Swal.fire('Error!', `${error.error.msg}`, 'error');
      })

    } else {

      //Create

      this.productService.createProduct(this.productForm.value).subscribe((res: any) => {

        Swal.fire('Exito!!!', `El médico ${this.productForm.value.name} se creó correctamente`, 'success');
        this.router.navigateByUrl(`dashboard/product-maintenance/${res.productCreated.code}`)
      }, error => {
        Swal.fire('Error!', `${error.error.msg}`, 'error');

      })

    }

  }


  deleteProduct(product: string) {
    Swal.fire({
      title: `Eliminar ${this.productSelected.name}`,
      text: "¡¡¡Si lo eliminas no podras recuperarlo!!!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Estoy seguro',
      cancelButtonText: 'No borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(product).subscribe((res: any) => {
          Swal.fire(
            'Eliminado',
            `El producto ${res.productDeleted.name} ha sido eliminado`,
            'success'
          )
          this.router.navigateByUrl('dashboard/products-maintenances')
        }, error => {
          Swal.fire(
            'Error',
            `No se a podido eliminar debido aun error interno, consulte al administrador`,
            'error'
          )
        })
      }
      else {
        Swal.fire(
          'Tranquilo',
          `El producto ${this.productSelected.name} no se ha eliminado`,
          'success'
        )
      }
    })
  }

  openModal({ uid, image }: Product) {
    this._modalImagesService.openModal('products', uid, image)
    this.loadProduct(this.code);
  }




  afuConfig01 = {
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    formatsAllowed: 'jpg, png, jpeg, PNG',
    uploadAPI: {
      url: `http://localhost:3000/api/upload/products/first/${localStorage.getItem('12345')}`,
      headers: {
        'x-token': localStorage.getItem('token')
    }
    },
    replaceTexts: {
      selectFileBtn: 'Seleccciona una foto',
      uploadBtn: 'Subir',
      afterUploadMsg_success: 'Exito',
      afterUploadMsg_error: 'Error al subir!',
    }
  }

  afuConfig02 = {
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    formatsAllowed: 'jpg, png, jpeg, PNG',
    uploadAPI: {
      url: `http://localhost:3000/api/upload/products/second/${localStorage.getItem('12345')}`,
      headers: {
        'x-token': localStorage.getItem('token')
    }
    },
    replaceTexts: {
      selectFileBtn: 'Seleccciona una foto',
      uploadBtn: 'Subir',
      afterUploadMsg_success: 'Exito',
      afterUploadMsg_error: 'Error al subir!',
    }

  }
  afuConfig03 = {
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    formatsAllowed: 'jpg, png, jpeg, PNG',
    uploadAPI: {
      url: `http://localhost:3000/api/upload/products/third/${localStorage.getItem('12345')}`,
      headers: {
        'x-token': localStorage.getItem('token')
    }
    },
    replaceTexts: {
      selectFileBtn: 'Seleccciona una foto',
      uploadBtn: 'Subir',
      afterUploadMsg_success: 'Exito',
      afterUploadMsg_error: 'Error al subir!',
    },
  }
  afuConfig04 = {
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    formatsAllowed: 'jpg, png, jpeg, PNG',
    uploadAPI: {
      url: `http://localhost:3000/api/upload/products/fourth/${localStorage.getItem('12345')}`,
      headers: {
        'x-token': localStorage.getItem('token')
    }
    },
    replaceTexts: {
      selectFileBtn: 'Seleccciona una foto',
      uploadBtn: 'Subir',
      afterUploadMsg_success: 'Exito',
      afterUploadMsg_error: 'Error al subir!',
    }
  }

}
