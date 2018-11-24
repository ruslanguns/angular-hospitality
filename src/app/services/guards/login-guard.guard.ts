import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor( public _usuarioServicce: UsuarioService,
               public router: Router ) {}

  canActivate() {
    // console.log('Paso por el login guard');

    if ( this._usuarioServicce.estaLogeado() ) {
        console.log('Esta logeado');
        return true;
    } else {
      console.log('Bloqueado por el Guard');
      this.router.navigate(['/login']);
      return false;
    }


    return true;
  }
}
