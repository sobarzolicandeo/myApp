import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController, NavController } from '@ionic/angular';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})

export class AlumnoPage implements OnInit {
  
  listaUsuarios: any;

  constructor(
    private usuarioService: UsuarioService, 
    private http : HttpClient,
    public navCtrl:NavController,
    public alertController: AlertController) {
    this.listarUsuario();
  }

  listarUsuario() {
    this.usuarioService.obtenerListadoUsuarios()
    .then(data => {
      console.log(data['data'])
      this.listaUsuarios = data.data;
    }, 
    (error) => { 
      console.error(error)}
    );
  }

  ngOnInit() {
    console.log("hola");
  }

}