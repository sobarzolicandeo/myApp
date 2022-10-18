import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {

  usuario = JSON.parse(localStorage.getItem("usuario"));

  constructor() { }

  ngOnInit() {
  }

}
