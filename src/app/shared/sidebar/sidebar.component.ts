import {Component} from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import {SidebarService} from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent  {

  public user: User;

  public name: any ;

  public second_name: any;

  constructor(
    public sidebarService: SidebarService,
    private userService: UserService
    ) {
    this.user = userService.user;

    this.name = this.user.name.split(' ')[0];

    this.second_name = this.user.last_name.split(' ')[0];    
    
  }



  logout(){
    this.userService.logout();
  }

}
