import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

//Mudules
import {PagesRoutingModule} from './pages/pages.routing';
import {AuthRoutingModule} from './auth/auth-routing-module';


import {NoPageFoundComponent} from './no-page-found/no-page-found.component';


const routes: Routes = [


  {path: '', redirectTo: '/home', pathMatch: 'full'},

  {path: '**', component: NoPageFoundComponent},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
