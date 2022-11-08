import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //contiene las acciones de promesas

// GET - POST- PUT - DELETE 
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  urlBase = "assets/files/usuario.json";
  // urlBase = "https://mocki.io/v1/12b907e5-c9cb-4377-82e8-821e1f2a861e";

  constructor(private httpClient: HttpClient) { }

  //GET
  obtenerListadoUsuarios(): Promise <any> {
    return new Promise ((resolve, reject) => {
        this.httpClient.get(this.urlBase)
        .subscribe(res => {
            resolve(res);
        }, (err) => {
            reject(err);
        });
    }); 
  };

  //POST
  crearUsuario(usuario:any): Promise <any> {
    // cracion en localStorage
    let usuarios = JSON.parse(localStorage.getItem("usuarios"));
    if (!usuarios) usuarios = [];
    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    return Promise.resolve(usuario);

    // return new Promise ((resolve, reject) => {
    //     this.httpClient.post(this.urlBase, usuario)
    //     .subscribe(res => {
    //         resolve(res)
    //     }, 
    //     (err) => {
    //       reject(err);
    //     });
    // }); 
  };

  //UPDATE-PUT
  // actualizarUsuario(idUsuario:number, usuario:any): Promise <any> {
  //   return new Promise ((resolve, reject) => {
  //       this.httpClient.put(this.urlBase + idUsuario, usuario) //o post
  //       .subscribe(res => {
  //           resolve(res);
  //       }, (err) => {
  //           reject(err);
  //       });
  //   }); 
  // };
  //DELETE
  // eliminarUsuario(idUsuario:number): Promise <any> {
  //   return new Promise ((resolve, reject) => {
  //       this.httpClient.delete(this.urlBase + idUsuario) //o post
  //       .subscribe(res => {
  //           resolve(res);
  //       }, (err) => {
  //           reject(err);
  //       });
  //   }); 
  // };




}
