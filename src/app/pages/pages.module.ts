import { ServicesComponent } from './services/services.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

//Modules
import { AboutComponent } from './../pages/about/about.component';
import {ComponentsModule} from '../components/components.module';
import {SharedModule} from '../shared/shared.module';
import { ContactComponent } from './contact/contact.component';

import { PipesModule } from './../pipes/pipes.module';


import {ProgressComponent} from './progress/progress.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {Grafica1Component} from './grafica1/grafica1.component';
import {PagesComponent} from './pages.component';
import {AppRoutingModule} from '../app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './maintenances/users/users.component';
import { CategoryComponent } from './maintenances/categories/category.component';
import { SearchesComponent } from './searches/searches.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';

import { AngularFileUploaderModule } from "angular-file-uploader";
import { ProductsDetailsComponent } from './product-details/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductComponentMaintenances } from './maintenances/products/product.component';
import { ProductsComponentMaintenance } from './maintenances/products/products.component';
import { BannerComponent } from './maintenances/banner/banner.component';



@NgModule({
  declarations: [
    ProgressComponent,
    DashboardComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromisesComponent,
    RxjsComponent,
    ProfileComponent,
    UsersComponent,
    CategoryComponent,
    SearchesComponent,
    AboutComponent,
    ContactComponent, 
    ProductsDetailsComponent, 
    CategoriesComponent,
    ProductComponentMaintenances,
    ProductsComponentMaintenance,
    CategoryDetailsComponent,
    BannerComponent,
    ServicesComponent
  ],
  exports: [
    ProgressComponent,
    DashboardComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    AboutComponent,
    ContactComponent,
    ProductsDetailsComponent,
    CategoriesComponent,
    ProductComponentMaintenances,
    ProductsComponentMaintenance,
    CategoryDetailsComponent,
    BannerComponent, 
    ServicesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule, 
    PipesModule,
    AngularFileUploaderModule,
    
  ]
})
export class PagesModule {
}
