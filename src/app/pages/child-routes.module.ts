import { ProductssComponent } from './../shared/productss/productss.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from "./profile/profile.component";
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ServicesComponent } from './services/services.component';

import { SearchesComponent } from './searches/searches.component';
import { CategoryComponent } from './maintenances/categories/category.component';
import { UsersComponent } from './maintenances/users/users.component';
import { AdminGuard } from "../guards/admin.guard";
import { ProductsDetailsComponent } from './product-details/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponentMaintenance } from './maintenances/products/products.component';
import { ProductComponentMaintenances } from './maintenances/products/product.component';

import { CategoryDetailsComponent } from './category-details/category-details.component';

import { BannerComponent } from './maintenances/banner/banner.component';

import { CategoriesComponentMain } from '../shared/categories/categories.component'


const childRoutes: Routes = [

  { path: '', component: CategoriesComponentMain, data: { title: 'Home' } },
      { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: 'progress', component: ProgressComponent, data: { title: 'Barra de progreso' } },
      { path: 'grafica1', component: Grafica1Component, data: { title: 'Gráfica' } },
      { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Ajustes de cuenta' } },
      { path: 'promises', component: PromisesComponent, data: { title: 'Promesas' } },
      { path: 'rxjs', component: RxjsComponent, data: { title: 'Rxjs' } },
      { path: 'profile', component: ProfileComponent, data: { title: 'Perfil de usuario' } },
      { path: 'contact', component: ContactComponent, data: { title: 'Contacto'} },
      { path: 'services', component: ServicesComponent, data: { title: 'Servicios'} },
      { path: 'about', component: AboutComponent, data: { title: 'Acerca de Promesa'} },
      { path: 'products', component: ProductssComponent, data: { title: 'Listado de productos'} },
      { path: 'categories', component: CategoriesComponent, data: { title: 'Listado de Catgorías'} },


      { path: 'products/:product', component: ProductsDetailsComponent, data: { title: 'Detalle de producto'} },
      { path: 'category/:category', component: CategoryDetailsComponent, data: { title: 'Detalle de categoría'} },



      //Maintenances 
      { path: 'categories-maintenance', component: CategoryComponent, data: { title: 'Categorias' } },
      { path: 'products-maintenances', component: ProductsComponentMaintenance, data: { title: 'Todos los productos' } },
      { path: 'product-maintenance/:code', component: ProductComponentMaintenances, data: { title: 'Producto seleccionado' } },
      { path: 'search/:term', component: SearchesComponent, data: { title: 'resultado de busqueda' } },
      { path: 'banner-maintenances', component: BannerComponent, data: { title: 'Mantenimiento del banner' } },


      //Admin Role 
      { path: 'users-maintenances', canActivate: [AdminGuard], component: UsersComponent, data: { title: 'Usuarios de aplicación' } },



]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
