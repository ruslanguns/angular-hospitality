import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/_config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from '../../_models/medico.model';
import { tokenKey } from '@angular/core/src/view';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarMedicos( desde: number ) {
    let url = URL_SERVICIOS + '/medico';
    url += '?desde=' + desde;

    return this.http.get( url )
        .map( (resp: any) => {

          return resp;
        });
  }

  cargarMedico( id: string ) {

    let url = URL_SERVICIOS + '/medico/' + id;

    return this.http.get(url)
      .map( (resp: any) => resp.medico);
  }

  buscarMedicos ( termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;

    return this.http.get ( url )
        .map( (resp: any) => resp.medicos );
  }

  borrarMedicos ( id: string ) {

    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
          .map( resp => {
            swal('Medico borrado', 'El médico ha sido borrado correctamente', 'success');
            return resp;
          });
  }

  guardarMedico( medico: Medico ) {

    let url = URL_SERVICIOS + '/medico';

    if ( medico._id ) {
      // actualizando
      url += '/' + medico._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put( url, medico )
          .map( (resp: any) => {
            swal('Medico actualizado', medico.nombre, 'success');
            // console.log(resp);
            return resp.medico;
          });
    } else {
      // creando
      url += '?token=' + this._usuarioService.token;

      return this.http.post( url, medico )
        .map( (resp: any) => {

          swal('Medico creado', medico.nombre, 'success');
          // console.log(resp);
          return resp.medico;
        });
    }

  }

}
