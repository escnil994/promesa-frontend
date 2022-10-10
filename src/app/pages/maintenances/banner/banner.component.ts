import Swal from 'sweetalert2';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { Banner } from './../../../models/banner.model';
import { Component, OnInit } from '@angular/core';

import { SidebarService } from './../../../services/sidebar.service';



@Component({
  selector: 'app-banner-maintenance',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {


  public imageTemp1: any = "";

  public imageTemp2: any = "";
  
  public imageTemp3: any = "";



  public id: string;

  public image1: string;
  public image2: string;
  public image3: string;

  public imageToUpload: File;



  constructor(
    private sidebarService: SidebarService,
    private fileUploadService: FileUploadService
  ) {




  }

  ngOnInit(): void {

    window.scroll(0,0)

    this.loadBanner();


  }



  loadBanner() {

    this.sidebarService.getBanner().subscribe((banner: any) => {

      this.image1 = banner.banner.image_01;
      this.image2 = banner.banner.image_02;
      this.image3 = banner.banner.image_03;
      this.id = banner.banner.uid;



    })

  }

  changeImage(op ,file: File) {
    this.imageToUpload = file;
    

    if (!file) {
      return this.imageTemp1 = null;
      return this.imageTemp2 = null;
      return this.imageTemp3 = null;

    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      if (op === 'first') {
        
        this.imageTemp1 = reader.result
      } 
      if (op === 'second') {
        
        this.imageTemp2 = reader.result
      }
      if (op === 'third') {
        
        this.imageTemp3 = reader.result
      }

    }

  }

  
 

  uploadImage() {


    this.fileUploadService.updateImage2(this.imageToUpload, 'first', this.id)
      .then(image => {
        this.imageTemp1 = null;
        this.image1 = image

        Swal.fire('Imagen Actualizada', 'La imagen principal se ha actualizado correctamente', 'success');


      }).catch(error => {
        Swal.fire('Error', error.error.msg, 'error');
      });
  }


  uploadImageSecond() {
    this.fileUploadService.updateImage2(this.imageToUpload, 'second', this.id)
    .then(image => {
      this.imageTemp2 = null;
      this.image2 = image

      Swal.fire('Imagen Actualizada', 'La segunda imagen se ha actuaizado correctamente', 'success');


    }).catch(error => {
      Swal.fire('Error', error.error.msg, 'error');
    });

  }


  uploadImageThird() {

    this.fileUploadService.updateImage2(this.imageToUpload, 'third', this.id)
    .then(image => {
      this.imageTemp3 = null;
      this.image3 = image

      Swal.fire('Imagen Actualizada', 'La tercera imagen se ha actuaizado correctamente', 'success');


    }).catch(error => {
      Swal.fire('Error', error.error.msg, 'error');
    });

  }

}