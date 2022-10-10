import { map, delay } from 'rxjs/operators';
import { Component, OnInit, ɵɵsanitizeUrlOrResourceUrl, Pipe } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { User } from 'src/app/models/user.model';
import { environment } from './../../../environments/environment';


import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { FileUploadService } from "../../services/file-upload.service";

const base_url = environment.base_url;


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: [
    './profile.component.css'
  ]
})
export class ProfileComponent implements OnInit {


  public profileForm: FormGroup;

  public user: User;

  public imageToUpload: File;

  public imageTemp: any = "";

  public userUid: string;


  public show: Boolean =false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private fileUploadService: FileUploadService
  ) {
    this.user = userService.user;
  }

  ngOnInit(): void {

    window.scroll(0,0)


    
    this.profileForm = this.fb.group({
      name: [this.user.name , Validators.required],
      last_name: [this.user.last_name],
      phone: [this.user.phone],
      whatsapp: [this.user.whatsapp],
      genre: [this.user.genre ],
      direction: [this.user.direction],
      dui: [this.user.dui],
      email: [ this.user.email, [Validators.required, Validators.email]]
    });



  }

  updateProfile() {
    
    this.userService.updateUser(this.profileForm.value).subscribe(
      (res) => {        

        const { name, last_name, phone, whatsapp, genre, direction, dui, email } = this.profileForm.value;

        this.user.name = name;
        this.user.last_name = last_name;
        this.user.phone = phone;
        this.user.whatsapp = whatsapp;
        this.user.genre = genre;
        this.user.direction = direction;
        this.user.dui = dui;
        this.user.email = email;

        Swal.fire('Actualizado correctemente', 'El usuario ha sido actualizado correctamente', 'success')
      }
      , error => {
        Swal.fire('Error', error.error.msg, 'error');
      });

  }


  changeImage(file: File) {
    this.imageToUpload = file;

    if (!file) {
      return this.imageTemp = null;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imageTemp = reader.result

    }




  }
  uploadImage() {    

    this.fileUploadService.updateImage(this.imageToUpload, 'users', this.user.uid)
      .then(image => {        
        this.imageTemp = null;
        this.user.image = image

        Swal.fire('Imagen Actualizada', 'La imagen se ha actuaizado correctamente', 'success');


      }).catch(error => {
        Swal.fire('Error', error.error.msg, 'error');
      });
  }
}




