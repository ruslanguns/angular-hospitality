import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../_models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  desde: number = 0; // paginacion del mongo

  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public _usuarioService: UsuarioService) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.cargando = true;

    this._usuarioService.cargarUsuarios(this.desde).subscribe((resp: any) => {
      // console.log(resp);
      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios;
      this.cargando = false;
    });
  }

  cambiarDesde(valor: number) {
    let desde = this.desde + valor;
    console.log(desde);

    if (desde >= this.totalRegistros) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario(termino: string) {
    // haciendo uso del loading
    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }
    /**
     * Con esta funcion estamos gestionando servicio a la API
     * de moongose creada en el backend.
     * Algo peculiar es que estamos basandonos en que el resultado,
     * estamos pidiendo que nos devuelva un arreglo de Usuario.
     */
    console.log(termino);
    this._usuarioService
      .buscarUsuarios(termino)
      .subscribe((usuarios: Usuario[]) => {
        // console.log(usuarios);

        this.usuarios = usuarios;
        this.cargando = false; // gestionando el loading
      });
  }

  borrarUsuario( usuario: Usuario ) {

    console.log('Borrar usuario');
    if ( usuario._id === this._usuarioService.usuario._id) {
      swal('Error al borrar usuario', 'No puede borrarse a si mismo', 'error' );
      return;
    }

    swal({
      title: '¿Esta seguro?',
      text: 'Que desea borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
    .then( borrar => {
      console.log( borrar );

      if ( borrar ) {

        this._usuarioService.borrarUsuario( usuario._id )
            .subscribe( borrado => {
                console.log( borrado );

                this.cambiarDesde(0);

            });

      }

    });

  }
}
