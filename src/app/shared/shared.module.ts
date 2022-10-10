import { CommentsComponent } from './comments/comments.component';
import { CategoriesComponentMain } from '../shared/categories/categories.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BreadcrumbsComponent} from './breadcrumbs/breadcrumbs.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {HeaderComponent} from './header/header.component';
import {RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BannerComponent } from './banner/banner.component';

import { FooterComponent } from './footer/footer.component';
import { ProductssComponent } from './productss/productss.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    BannerComponent,
    FooterComponent,
    CategoriesComponentMain,
    ProductssComponent,
    SettingsComponent,
    CommentsComponent
  ],
  exports: [
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    BannerComponent,
    FooterComponent,
    CategoriesComponentMain,
    ProductssComponent,
    SettingsComponent, 
    CommentsComponent
    
  ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class SharedModule {
}
