import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  userData = JSON.parse(localStorage.getItem("userData"));

  constructor() { }

  ngOnInit() {
    console.log('USER', this.userData);
  }

}
