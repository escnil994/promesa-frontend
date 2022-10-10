import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public session:boolean =  false; 

  constructor() { }

  ngOnInit(): void {

    if (localStorage.getItem('token')) {
      this.session = true;
    }

    
  }

}
