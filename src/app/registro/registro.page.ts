import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioRegistro: FormGroup;
  
  constructor(
    private usuarioService: UsuarioService, 
    public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController) {
      this.formularioRegistro = this.fb.group({
        'nombre': new FormControl("", Validators.required),
        'usuario': new FormControl("", Validators.required),
        'correo': new FormControl("", Validators.required),
        'contrasena': new FormControl("", Validators.required),
        'confirmacionContrasena': new FormControl("", Validators.required)
      });
    }
  
  ngOnInit() {
  }

  async agregarUsuario(){

    //SE GUARDAN LOS DATOS DEL FORMULARIO EN UNA VARIABLE
    var f = this.formularioRegistro.value;

    //VALIDACION DE FORMULARIO (CAMPOS COMPLETOS)
    if(this.formularioRegistro.invalid){
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Tienes que llenar todos los datos',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }

    //VALIDACIÓN DE CONTRASEÑA
    else if(f.contrasena != f.confirmacionContrasena){
      const alert = await this.alertController.create({
        header: 'Error en contraseña',
        message: 'Las contraseñas no coinciden',
        buttons: ['Aceptar']
      })
      await alert.present();
      return;
    }

    //VALICACION CORRECTA DE DATOS
    else{

      //ASIGNACION DE CAMPOS A ARRAY 
      var usuario = {
        nombre: f.nombre,
        user: f.usuario,
        correo: f.correo,
        contrasena: f.contrasena
      }

      //CHEQUEO EN CONSOLA
      console.log("hola")
      console.log(usuario.nombre, " ", usuario.user, " ", usuario.correo, " ", usuario.contrasena)

      //LLAMADO A POST EN USUARIO.SERVICE.TS
      this.usuarioService.crearUsuario(usuario)
        .then(respuesta => {
          console.log(respuesta);
            alert(`Se creó correctamente el usuario ${respuesta.user}`);
        },
        (error) => {
          console.error(error);
        }
        );

      //REGRESO A PAGINA DE LOGIN
      this.navCtrl.navigateRoot('login');

    }
  }
}
