import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  ruta: string;

  constructor(  public _usuarioServicce: UsuarioService,
                public router: Router ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // console.log('Paso por el login guard');

    // console.log('Ruta', state.url);
    localStorage.setItem('ruta', state.url);

    if ( this._usuarioServicce.estaLogeado() ) {
        // console.log('Esta logeado');
        return true;
    } else {
      // console.log('Bloqueado por el Guard');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
