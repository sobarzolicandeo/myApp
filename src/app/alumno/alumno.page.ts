import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})

export class AlumnoPage implements OnInit {
  
  users: any = [];

  // usuario = JSON.parse(localStorage.getItem("usuario"));

  constructor(
    private http : HttpClient
  ) { }

  ngOnInit() {
    console.log("hola");
    this.getUsers().subscribe(res=>{
      console.log('Res', res)
      this.users = res;
    });
  }

  getUsers(){
    return this.http
    .get("assets/files/customer.json")
    // .pipe(
    //   map(res:any) =>[
    //     return res.data;
    //   ]
    // )
  }

}
