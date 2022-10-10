import { Component, OnInit } from '@angular/core';

import { Banner } from 'src/app/models/banner.model';

import { SidebarService } from './../../services/sidebar.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: [
    './banner.component.css'
  ]
})
export class BannerComponent implements OnInit {


  public image01: string;
  public image02: string;
  public image03: string;


  constructor( private bannerService: SidebarService) { }

  ngOnInit(): void {
    
    this.bannerService.getBanner().subscribe( (res: any) => {

      this.image01 = res.banner.image_01;
      this.image02 = res.banner.image_02;
      this.image03 = res.banner.image_03;

      
    })

    
  }

}
