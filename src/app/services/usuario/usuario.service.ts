import { Injectable } from '@angular/core';
import { Usuario } from './../../_models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../_config/config';

import { map } from 'rxjs/operators';


@Injectable()
export class UsuarioService {

  constructor(
    public http: HttpClient
  ) {}

    login( usuario: Usuario, recordar: boolean = false ) {

      if ( recordar ) {
        localStorage.setItem('email', usuario.email );
      } else {
        localStorage.removeItem('email');
      }

      let url = URL_SERVICIOS + '/login';
      return this.http.post( url, usuario )
          .pipe( map( (resp: any) => {

            localStorage.setItem( 'id', resp.id );
            localStorage.setItem( 'token', resp.token );
            localStorage.setItem( 'usuario', JSON.stringify( resp.usuario ));

            swal('Usuario ha iniciado secion correctamente', usuario.email, 'success');
          })
            );
    }

    crearUsuario( usuario: Usuario ) {

      let url = URL_SERVICIOS + '/usuario';

      // Se realiza el return porque es muy probable que necesitemos suscribirnos
      return this.http.post( url, usuario )
          .pipe( map( (resp: any ) => {

            swal('Usuario creado', usuario.email, 'success');
            return resp.usuario;
          })
          );
    }
}
