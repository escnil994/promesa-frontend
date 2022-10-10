import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommentsService } from './../../services/comments.service';
import { Comment } from './../../models/comment.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  public user : User;

  public link11: boolean = false;

  public role:  string = '';

  public to: number = 0;

  public totalComments: number = 0;

  public comment: Comment[];

  public commentsForm: FormGroup;

  public exito: string = '';

  public close: string = ''; 

  public screen_w: boolean = false;

  constructor(
    private commentService: CommentsService,
    private userService: UserService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    if (window.screen.width <= 1000 ) {
      this.screen_w = true;
    }
    
    
    this.commentsForm = this.fb.group({
      comment: ['', [Validators.required, Validators.minLength(20)]]
    });

    this.loadComments();

    this.user = this.userService.user;

    if (this.user) {
      
      this.role = this.user.role;
    }
    
  }


  loadComments(){

     this.commentService.getComments(this.to).subscribe( (res: any) => {

      this.comment = res.com;

      this.totalComments = res.tot;
    })
    
  }


  saveComment(){

    this.link11 = false;
    if (!this.userService.user) {
      document.getElementById('success').innerHTML=`Lo siento no puedes comentar 
      si no has iniciado sesión, pero puedes comentar con facebook, o puedes iniciar sesión:`;
      this.link11 = true

      return;
    }
    
    
    if (this.userService.user.commented && this.role === "USER") {
      document.getElementById('success').innerHTML='Lo siento ya no puedes comentar por ahora, solo puedes comentar cada cierto tiempo. Pero no te preocupes puedes dejarnos tus comentarios con tu cuenta de facebook, en el otro formulario';
     this.commentsForm.reset();
     this.exito = 'success';
     this.close = 'mdi mdi-close float-right';
      return false;
    }

    this.commentService.newComment(this.commentsForm.value).subscribe( (res: any) => {
      document.getElementById('success').innerHTML=res.msg;
      this.exito = 'success';
      this.close = 'mdi mdi-close float-right';
      localStorage.setItem('created', res.comment.created );
      
      this.commentsForm.disable();
      this.commentsForm.reset();

      this.loadComments();
    }, error => {
      document.getElementById('success').innerHTML=error.msg;
    })
      
  }
  change(){
    this.close = '';
    this.exito = '';
    document.getElementById('success').innerHTML='';

  }

  
  changePage( value: number){
    
    this.to += value;
    if (this.to < 0) {
      this.to = 0
    } else if( this.to >= this.totalComments ){
      this.to -= value;
    }

    this.loadComments();

  }

  deleteComment(comment){
      Swal.fire({
        title: '¿Estás seguro?',
        text: "Una vez borrado ya no podras recuperarlo",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, borrar!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.commentService.deleteComment(comment).subscribe( res => {
            this.loadComments();
            Swal.fire(
              'Borrado!',
              'El comentario ha sido borrado',
              'success'
            )
          })
        } else{
          Swal.fire(
            'No se borró!',
            'El comentario no se borró',
            'success'
          )
        }
      })
  }
}
