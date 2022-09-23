import { Component, OnInit } from '@angular/core';

import { NavController, AlertController } from '@ionic/angular';
import { Button } from 'protractor';


@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {

  constructor(public navCtrl: NavController, public alerta: AlertController) {

   }

  ngOnInit() {
  }

  async alertaBasica(){
    let miAlerta = this.alerta.create({
      header: 'Datos incorrectos',
      message: 'Los datos que ingresaste son incorrectos.',
      buttons: ['Aceptar']
    });

     (await miAlerta).present();
  
  }

  async alertaBasica2(){
    let miAlerta = this.alerta.create({
      header: 'Recuperar',
      message: 'Ingresa tu usuario para enviar un codigo verificador a tu correo electronico.',
      inputs: [
       {
        name:'Usuario',
        placeholder: 'Usuario'
       }, 
      ],
      buttons: [
        {
          text: 'Enviar',
          handler: data => {
            console.log('enviar clicked');
          }
        },
         
     ]});

     (await miAlerta).present();
  
  }

}
