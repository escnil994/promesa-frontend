import { UserService } from 'src/app/services/user.service';
import { Product } from './../../models/product.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Doctor } from 'src/app/models/doctors.model';
import { User } from 'src/app/models/user.model';
import { SearchesService } from 'src/app/services/searches.service';

@Component({
  selector: 'app-searches',
  templateUrl: './searches.component.html',
  styles: [
  ]
})
export class SearchesComponent implements OnInit {

  public users: User[] = [];

  public user: User;

  public catgories: Category[] = [];

  public products: Product[] = [];

  public totalProducts: number = 0;

  public totalUsers: number = 0;

  public totalCategories: number = 0;

  public param: string = 'home';


  constructor(
    private activatedRoute: ActivatedRoute,
    private searchesService: SearchesService,
    private router: Router,
    private userService: UserService
  ) {
    this.user = userService.user;

    
   }

  ngOnInit(): void {

    if (localStorage.getItem('token')) {
      this.param = 'dashboard';
    }
    this.activatedRoute.params.subscribe(({ term }) => this.globalSearch(term));

  }
  globalSearch(term) {


    if (term == '') {
      this.router.navigateByUrl(`/dashboard`)
    } else {

      this.searchesService.globalSearch(term).subscribe((res: any) => {        

        this.users = res.users;
        this.totalUsers = res.totalUsers;

        this.products = res.products;

        this.catgories = res.categories;

      });

    }


  }

}
