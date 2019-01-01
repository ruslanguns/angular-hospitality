import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) {}

  canActivate(): Promise<boolean> | boolean {

    // console.log('Verifica Token Guard');

    let token = this._usuarioService.token;
    let payload = JSON.parse( atob( token.split('.')[1] ));

    let expirado = this.expirado( payload.exp ); // consultamos el estado del token

    if ( expirado ) {
      this.router.navigate(['/login']);
      return false;
    }

    // console.log(payload);
    return this.verificaRenueva( payload.exp );

  }

  verificaRenueva( fechaExp: number ): Promise<boolean> {

    return new Promise( (resolve, reject ) => {

        let tokenExp = new Date( fechaExp * 1000);
        let ahora = new Date();

        ahora.setTime( ahora.getTime() + ( 4 * 60 * 60 * 1000 )); // Aumentamos el token con 4 horas adicionales

        if ( tokenExp.getTime() > ahora.getTime() ) {
          resolve( true );
        } else {
          // significa que el token esta proximo a vencer y hay que renovarlo
          this._usuarioService.renuevaToken()
                  .subscribe( () => {
                    resolve( true );
                  }, () => {
                    this.router.navigate(['/login']);
                    reject(false); // el reject impedira que el usuario entre
                  });
        }

        resolve( true );
    });
  }

  expirado( fechaExp: number ) {
    // creamos una instancia de la hora del sistema
    let ahora = new Date().getTime() / 1000;

    if ( fechaExp < ahora ) {
      // si es true es expirado
      return true;
    } else {
      // no ha expirado
      return false;
    }
  }
}
