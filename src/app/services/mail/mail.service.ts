import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/_config/config';

import { UsuarioService } from '../usuario/usuario.service';
import { Usuario } from '../../_models/usuario.model';

import { map } from 'rxjs/operators';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  // mail: Mail;
  usuario: Usuario[] = [];
  existe: boolean;

  constructor(public http: HttpClient,
              public _usuarioService: UsuarioService
    ) { }

  check_if_email_exist(to: string) {
    let termino = to;
    return this._usuarioService
      .buscarUsuarios(termino)
      .subscribe((usuarios: Usuario[]) => {
        this.usuario = usuarios;

        if ( this.usuario.length >= 1 ) {
            return this.existe = true;
          }
          if ( this.usuario.length === 0 ) {
            return this.existe = false;
      }

  });

}


sendMailForgetPassword( to: string ) {

  let url = URL_SERVICIOS + '/mail/cambiarPassword';

  return this.http.post(url, { to })
    .pipe(
      map(
        (resp: any) => {
          swal('Correo Enviado', 'Por favor revise su correo', 'success');
          // console.log(resp);
          return resp;
        // }, error => {
        //   console.log('HAY UN ERROR Y GRANDE');

        //   swal(`Error: ${error.status}`, error.message, 'warning');;
        }
      ));

}
}
