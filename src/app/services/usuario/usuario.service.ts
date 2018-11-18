import { Injectable } from '@angular/core';
import { Usuario } from './../../_models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../_config/config';

import { map } from 'rxjs/operators';


@Injectable()
export class UsuarioService {

  constructor(
    public http: HttpClient
  ) {

    console.log('Servicio de usuario listo');

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
