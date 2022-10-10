import {Component, OnInit} from '@angular/core';
import {SettingsService} from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';
import { User } from 'src/app/models/user.model';
import { UserService } from './../services/user.service';


declare function customInitFunctions(): any;


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {


  public user: User;

  public visibles:boolean = false;

  constructor(
    private settingService: SettingsService,
    private sidebarService: SidebarService,
    private userService: UserService
  ) {
    this.user = userService.user;
  }

  ngOnInit() {

    
    customInitFunctions();
    
    this.sidebarService.getMenu();
    

  }


}
