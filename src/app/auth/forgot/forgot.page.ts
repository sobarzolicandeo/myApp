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
      'usuario': new FormControl("",Validators.required),
      'currentPassword': new FormControl("",Validators.required),
      'newPassword': new FormControl("",Validators.required),
      // confirmPassword is not required because it will be compared with newPassword
      'confirmPassword': new FormControl("")
    })

    }

  ngOnInit() {
  }

  async recuperarContrasena(){
    var f = this.formularioOlvido.value;

    let usuarios = JSON.parse(localStorage.getItem("usuarios"));

    const usuario = usuarios.find((usuario:any) => usuario.user === f.usuario);

    if(!usuario){
      const alert = await this.alertController.create({
        header: 'Oops!',
        message: 'Usuario no existe. Favor ingresar usuario Correcto',
        buttons: ['Aceptar']
      });
      await alert.present();
      return false;
    }

    if(usuario.contrasena !== f.currentPassword){
      const alert = await this.alertController.create({
        header: 'Oops!',
        message: 'Contraseña actual incorrecta',
        buttons: ['Aceptar']
      });
      await alert.present();
      return false;
    }

    if(f.newPassword !== f.confirmPassword){
      const alert = await this.alertController.create({
        header: 'Oops!',
        message: 'Las contraseñas no coinciden',
        buttons: ['Aceptar']
      });
      await alert.present();
      return false;
    }

    usuario.contrasena = f.newPassword;

    // replace the user in the array
    usuarios = usuarios.map((usuario:any) => usuario.user === f.usuario ? usuario : usuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    const alert = await this.alertController.create({
      header: 'Contraseña cambiada',
      message: 'La contraseña ha sido cambiada exitosamente',
      buttons: ['Aceptar']
    });
    await alert.present();
    this.navCtrl.navigateRoot('login');
  }

}