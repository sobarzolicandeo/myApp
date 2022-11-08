import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { Usuario } from '../interfaces/usuario.interface';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formularioLogin: FormGroup;
  listaUsuarios: any;

  constructor(public fb: FormBuilder,
    private readonly alertController: AlertController,
    private readonly navCtrl: NavController,
    private readonly usuarioService: UsuarioService
  ) {

    this.formularioLogin = this.fb.group({
      'usuario': new FormControl("", Validators.required),
      'contrasena': new FormControl("", Validators.required)
    })

  }

  ngOnInit() {
  }

  async ingresar() {

    let alert;
    const formData = this.formularioLogin.value;

    let userFromDB: Usuario;

    userFromDB = JSON.parse(localStorage.getItem("usuarios"))
      .find((usuario: Usuario) => usuario.user === formData.usuario);

    console.log('USER from local storage', userFromDB);

    if (!userFromDB) {
      userFromDB = (
        await this.usuarioService.obtenerListadoUsuarios()
      ).usuarios
        .find((usuario: Usuario) => usuario.user === formData.usuario);
    }

    if (!userFromDB) {
      alert = await this.alertController.create({
        header: 'Oops!',
        message: 'Usuario no existe. Favor ingresar usuario Correcto o Registrate como usuario',
        buttons: ['Aceptar']
      });
      await alert.present();
      return false;
    }

    if (userFromDB && userFromDB.contrasena !== formData.contrasena) {
      alert = await this.alertController.create({
        header: 'Datos incorrectos',
        message: 'Los datos que ingresaste son incorrectos.',
        buttons: ['Aceptar']
      });
      await alert.present();
      return false;
    }

    console.log('Ingresado');
    delete userFromDB.contrasena;
    localStorage.setItem('userData', JSON.stringify(userFromDB));
    this.navCtrl.navigateRoot('inicio');

  }

}
