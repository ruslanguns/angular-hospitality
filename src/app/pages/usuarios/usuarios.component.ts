import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../_models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

// Recuerden importar de rxjs al inicio del archivo
import { fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';

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

  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {
    this.cargarUsuarios();

    this._modalUploadService.notificacion
          .subscribe( resp => this.cargarUsuarios());

              // Seleccionamos el input en el documento
    const input = document.getElementById('buscaUsuario');

    // En el evento indicado para el elemento seleccionado ejecutamos los pipes y luego el subscribe
    fromEvent(input, 'input')
      .pipe(
        // Tomamos las letras ingresadas en el input
        map((k: KeyboardEvent) => {
            this.cargando = true;
            return k.target['value'];
        }),
        // Seleccionamos un tiempo en milisegundos antes de
        // continuar la ejecución luego de que se presionó la
        // última letra, si hay cambios en el input vuelve a empezar a contar
        debounceTime(400),
        // Ahora si ejecutamos la busqueda del usuario con el total de letras en el input
        // luego de que se dejara de escribir por 1,5 segundos
      ).subscribe(val => {
        if (val !== '') {
          this._usuarioService.buscarUsuarios(val)
            .subscribe( (usuarios: Usuario[]) => {
              this.usuarios = usuarios;
              this.cargando = false;
            });
        } else {
          this.cargarUsuarios();
          return;
        }
      });
  }

  mostrarModal( id: string ) {

    this._modalUploadService.mostrarModal( 'usuarios', id ); // llamar al modal
  }

  cargarUsuarios() {
    this.cargando = true;

    this._usuarioService.cargarUsuarios(this.desde)
      .subscribe((resp: any) => {
      // console.log(resp);
      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios;
      this.cargando = false;
    });
  }

  cambiarDesde(valor: number) {
    let desde = this.desde + valor;
    // console.log(desde);

    if (desde >= this.totalRegistros) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }

  // buscarUsuario(termino: string) {
  //   // haciendo uso del loading
  //   if (termino.length <= 0) {
  //     this.cargarUsuarios();
  //     return;
  //   }
    /**
     * Con esta funcion estamos gestionando servicio a la API
     * de moongose creada en el backend.
     * Algo peculiar es que estamos basandonos en que el resultado,
     * estamos pidiendo que nos devuelva un arreglo de Usuario.
     */
  //   console.log(termino);
  //   this._usuarioService
  //     .buscarUsuarios(termino)
  //     .subscribe((usuarios: Usuario[]) => {
  //       // console.log(usuarios);

  //       this.usuarios = usuarios;
  //       this.cargando = false; // gestionando el loading
  //     });
  // }

  borrarUsuario(usuario: Usuario) {
    console.log('Borrar usuario');
    if (usuario._id === this._usuarioService.usuario._id) {
      swal('Error al borrar usuario', 'No puede borrarse a si mismo', 'error');
      return;
    }

    swal({
      title: '¿Esta seguro?',
      text: 'Que desea borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(borrar => {
      // console.log( borrar );
      if (borrar) {
        this._usuarioService.borrarUsuario(usuario._id).subscribe(borrado => {
          // console.log( borrado );
          this.cambiarDesde(0);
        });
      }
    });
  }

  guardarUsuario(usuario: Usuario) {
    this._usuarioService.actualizarUsuario(usuario).subscribe();
  }
}
