import { Router } from '@angular/router';
import { UserAuth } from './userAuth';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class AuthService {

  private usuarioAutenticado: boolean = false;

  mostrarMenuEmitter = new EventEmitter<boolean>();
  
  constructor(private router: Router) { }

  isUsuarioAutenticado(){
    return this.usuarioAutenticado;
  }

  logof(){
    this.usuarioAutenticado = false;
    this.mostrarMenuEmitter.emit(this.usuarioAutenticado);
    this.router.navigate(['/login']);
  }

  fazerLogin(userAuth: UserAuth){
    this.usuarioAutenticado = false;

    if(userAuth.email === 'afirmanet@gmail.com' &&
       userAuth.senha === '123456'){
         this.usuarioAutenticado = true;
       }

       this.mostrarMenuEmitter.emit(this.usuarioAutenticado);
       if(this.usuarioAutenticado){
        this.router.navigate(['/home']);
       }

  }
}
