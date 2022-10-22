import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController) { 

    this.formularioLogin = this.fb.group({
      'usuario': new FormControl("",Validators.required),
      'contrasena': new FormControl("",Validators.required)
    })

    }

  ngOnInit() {
  }

  async ingresar(){
    var f = this.formularioLogin.value;

    //SE DEBE LLENAR DESDE EL JSON
    // var usuario = JSON.parse(localStorage.getItem('usuario'));
    var usuario = JSON.parse(localStorage.getItem('usuario'));

    //TIENE QUE EJECUTARSE UN CICLO
    if(usuario.usuario == f.usuario && usuario.contrasena == f.contrasena){
      console.log('Ingresado');
      localStorage.setItem('ingresado','true');
      this.navCtrl.navigateRoot('inicio');
    }
    else{
      const alert = await this.alertController.create({
        header: 'Datos incorrectos',
        message: 'Los datos que ingresaste son incorrectos.',
        buttons: ['Aceptar']
    });
  
    await alert.present();
    }
  }

}
