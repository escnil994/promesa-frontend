import { CategoryService } from './../../../services/category.service';
import { Category } from './../../../models/category.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { ModalImagesService } from '../../../services/modal-images.service';
import { SearchesService } from '../../../services/searches.service';


@Component({
  selector: 'app-hospitals',
  templateUrl: './category.component.html',
  styleUrls: [
    './category.component.css'
  ]
})
export class CategoryComponent implements OnInit, OnDestroy {

  public categories: Category[] = [];


  public categoryTerms: Category[] = [];

  public totalCategories: number = 0;

  public loading: boolean = true;

  public to: number = 0;


  public imageSubs: Subscription;


  public show_hide: Boolean = false;

  constructor(
    private _categoryService: CategoryService,
    private modalImageService: ModalImagesService,
    private searchesService: SearchesService
  ) { }


  ngOnInit(): void {

    window.scroll(0,0)

    this.loading = true;

    this.loadCategories();

    this.imageSubs = this.modalImageService.imageChenged.pipe(delay(100)).subscribe((image) => {
      this.loadCategories();
    })

  }

  ngOnDestroy(): void {
    this.imageSubs.unsubscribe();
  }

  loadCategories() {

    this.loading = true;
    this._categoryService.getCategories(this.to, 6).subscribe(({ total, categories }) => {

      this.totalCategories = total;
      this.categories = categories;
      this.categoryTerms = categories;

      

      this.loading = false;
    })
  }



  changePage(value: number) {
    this.to += value;
    if (this.to < 0) {
      this.to = 0
    } else if (this.to >= this.totalCategories) {
      this.to -= value;
    }

    this.loadCategories();

  }

  saveChanges(category: Category) {

    Swal.fire({
      title: '¿Seguro que quieres guardar los cambios?',
      showCancelButton: true,
      confirmButtonText: `Si`,
      cancelButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        this._categoryService.UpdateCategory(category.uid, category.name, category.description, category.details).subscribe(
          res => {


            Swal.fire('Exitoso', 'Cambios guardados correctamente', 'success')

          }, error => {

            Swal.fire('Error', `${error.error.msg}`, 'error')

          }

        )
      } else if (result.isDismissed) {
        Swal.fire('Error', 'Los cambios no fueron guardados', 'info')
      }
    })



  }

  deleteCategory({ uid, name }: Category) {
    Swal.fire({
      title: `¿Seguro que quieres eliminar el hospital ${name}?`,
      showCancelButton: true,
      confirmButtonText: `Si`,
      confirmButtonColor: '#d14529',
      cancelButtonText: `No`,
      cancelButtonColor: '#2778c4'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        this._categoryService.deleteCategory(uid).subscribe(
          res => {

            Swal.fire('Eiminado', `El hospital ${name} fue eliminado`, 'success');

            this.loadCategories();

          }, error => {
            Swal.fire('Error', `${error.error.msg}`, 'error')

          }

        )
      } else if (result.isDismissed) {
        Swal.fire('Tranquilo', `El hospital ${name} no fue eliminado`, 'info')
      }
    })



  }

  async createNewCategory() {
    const { value } = await Swal.fire({
      title: 'Crear nueva categoría',
      input: 'text',
      text: 'Nombre de la categoria',
      inputPlaceholder: 'Ingrese el nombre',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Debes escribir un nombre para esta categoría'
        }
        else {
          this._categoryService.CreateCategory(value).subscribe(res => {
            Swal.fire('Categoría creada correctamente', '', 'success');
            this.loadCategories();

          }, error => {
            Swal.fire(error.error.msg, '', 'error')
          });
        }
      }
    });

  }

  openModal({ uid, image }: Category) {
    
    this.modalImageService.openModal('categories', uid, image);

  }

  search(searchWord: string) {
    if (searchWord.length === 0) {
      return this.loadCategories();
    }
    this.searchesService.search('categories', searchWord).subscribe((results: any) => {
      this.categories = results;
    },
      error => {


      }
    );
  }
}



