import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit  {

  public user: User;

  public visibles:boolean = false;

  public name: any ;

  public second_name: any ;
  
  public param: string = 'home';

  public screen: boolean = false;

  constructor( 
    private userService: UserService,
    private router: Router
    ) { 
    this.user = userService.user;
    
    if (this.user) {
      this.name = this.user.name.split(' ')[0] ;
  
      this.second_name = this.user.last_name.split(' ')[0];
      
    }
  }
  ngOnInit(): void {   
    
    if (localStorage.getItem('token')) {
      this.param = 'dashboard';
    }
    
    

    if (window.screen.width <= 575 ) {
      this.screen = true;
    }

  }




  logout(){
    this.userService.logout();
  }

  search( term ){

    
    if ( term == '') {
    this.router.navigateByUrl(`/${this.param}/`);
    }

    this.router.navigateByUrl(`/${this.param}/search/${term}`);

    document.getElementById('form').style.display='none';

    
  }



}
