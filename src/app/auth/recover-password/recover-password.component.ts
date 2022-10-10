import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';


const base_url = environment.base_url;
@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styles: [
  ]
})
export class RecoverPasswordComponent implements OnInit {

  public user: User[] =[];

  public param: string;

  public errorCode: string;

  public allow: Boolean = false;
  public allow2: Boolean = false;


  public timeout: number = 0;

  public pass = {
    password: '',
    pass2: ''

  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({ param }) =>{
          this.param = param

    } )

    

    this.userService.getByP(this.param).subscribe(res => {
      
      this.swalAlert();

      
    }, error => {

      this.allow = false;

      this.errorCode = error.error.msg;

      setTimeout(() => {
        this.router.navigate(['/home'])
        
      }, 2000);
      
      
    });




  }

  swalAlert() {
    this.allow = true;

    Swal.mixin({
      input: 'text',
      confirmButtonText: 'Siguiente',
      showCancelButton: true,
      progressSteps: ['1', '2']
    }).queue([
      {
        title: 'Ingresa tu nueva contraseña',
        text: 'Por favor no la olvides'
      },
      {
        title: 'Repite tu nueva contraseña',
        text: 'Asegurate que no se te va a olvidar'
      },
    ]).then((result: any) => {
      
      const pass1 = result.value[0];
      const password = result.value[1];

      this.pass= {
        password: pass1,
        pass2: password
      }      
      if (result.value) {

        if (pass1 !== password) {
          Swal.fire({
            title: 'Error',
            text: 'Las contraseñas no coinciden, intentalo de nuevo',
          })
          location.reload()
        }
        else{
          console.log(pass1);
          
          this.userService.changePassword(this.param, this.pass).subscribe( (res:any) => {
              this.allow2 = true;

              setTimeout(() => {
                this.router.navigate(['/login'])
                
              }, 2000);
          }, error => {
            Swal.fire({
              title: 'Error',
              text: error.error.msg,
            })
          })
        }

      }
    })

  }

}
