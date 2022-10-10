import { delay } from 'rxjs/operators';
import { ModalImagesService } from 'src/app/services/modal-images.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { Category } from 'src/app/models/category.model';

import { CategoryService } from './../../services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponentMain implements OnInit {

  public category: Category[] = [];

  public categoryTerms: Category[] = [];

  public totalCategories: number = 0;

  public to: number = 0;

  public loading: boolean = true;

  public imageSubs: Subscription;

  public option: Boolean = false;


  constructor(
    private _categoryService: CategoryService,
    private modalImageService: ModalImagesService
  ) { }

  ngOnInit(): void {

    window.scroll(0,0)


    this.loadCategories();

    this.imageSubs = this.modalImageService.imageChenged.pipe(delay(100)).subscribe((image) => {
      this.loadCategories();
    })

  }
  
  loadCategories(){

    this.loading = true;
    
    this._categoryService.getCategories(this.to, 3).subscribe(({ total, categories}) => {    
        
      this.totalCategories = total;
      this.category = categories;
      this.categoryTerms = categories;
                

      this.loading = false;
    })
  }



  changePage( value: number){    
    this.to += value;
    if (this.to < 0) {
      this.to = 0
    } else if( this.to >= this.totalCategories ){
      this.to -= value;
    }
    
    this.loadCategories();

  }

}
