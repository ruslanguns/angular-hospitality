import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hospital } from 'src/app/_models/hospital.model';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from 'src/app/_config/config';


import 'rxjs/add/operator/map';


@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  hospital: Hospital;
  token: string;
  totalHospitales: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) {

    // declaración del token
    this.token = this._usuarioService.token;
    // console.log(this.token);

  }

  cargarHospitales() {

    let url = URL_SERVICIOS + '/hospital/';
    return this.http.get( url )
        .map( (resp: any) => {
          this.totalHospitales = resp.total;
          return resp.hospitales;
        });
  }

  cargarHospitalesDesde(desde: number) {

    let url = URL_SERVICIOS + '/hospital';
    url += '?desde=' + desde;

    return this.http.get( url )
        .map( (resp: any) => {
          this.totalHospitales = resp.total;
          return resp;
        });
  }



  obtenerHospital( id: string ) {

    let url = URL_SERVICIOS + '/hospital/' + id;

    return this.http.get( url )
          .map( (resp: any ) => resp.hospital );
  }

  borrarHospital( id: string ) {

    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this.token;

    return this.http.delete( url )
                .map( (resp: any) => {

                  swal('Operación realizada', 'El hospital ha sido eliminado con éxito', );
                });
  }

  crearHospital( nombre: string ) {

    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this.token;

    return this.http.post( url, { nombre } )
              .map((resp: any) => {
                swal('Operación realizada', 'El hospital ha sido creado con éxito');

                return resp.hospital;

              });
  }

  actualizarHospital( hospital: Hospital ) {

    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this.token;

    return this.http.put( url, hospital )
          .map( (resp: any) => {

            swal( 'Operación exitosa', 'Hospital actualizado!', 'success');
            return resp.hospital;
          });
  }

  buscarHospital( termino: string ) {

    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;

    return this.http.get ( url )
        .map( ( resp: any ) => resp.hospitales);
  }

}
