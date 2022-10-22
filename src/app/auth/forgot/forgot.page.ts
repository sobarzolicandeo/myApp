import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})

export class ForgotPage implements OnInit {
  formularioOlvido: FormGroup;

  constructor(public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController){ 

    this.formularioOlvido = this.fb.group({
      'usuario': new FormControl("",Validators.required)
    })

    }

  ngOnInit() {
  }

  // async recuperarContrasena(){
  //   var f = this.formularioOlvido.value;

  //   var usuario = JSON.parse(localStorage.getItem('usuario'));

  //   if(usuario.usuario == f.usuario){
  //     const alert = await this.alertController.create({
  //       header: 'Correo enviado',
  //       message: 'Correo enviado a {{usuario.correo}}',
  //       buttons: ['Aceptar']
  //     });
  //     await alert.present();
  //   }
  //   else{
  //     const alert = await this.alertController.create({
  //       header: 'Error',
  //       message: 'Usuario no se encuentra registrado.',
  //       buttons: ['Aceptar']
  //     });
  
  //     await alert.present();
  //   }
  // }

}