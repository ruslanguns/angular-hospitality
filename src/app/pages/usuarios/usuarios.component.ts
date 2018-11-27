import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../_models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0; // paginacion del mongo

  totalRegistros: number = 0;

  constructor( public _usuarioService: UsuarioService) { }

  ngOnInit() {

    this.cargarUsuarios();
  }

  cargarUsuarios() {

      this._usuarioService.cargarUsuarios( this.desde )
      .subscribe( ( resp: any ) => {  // console.log(resp);
          this.totalRegistros = resp.total;
          this.usuarios = resp.usuarios;
      });
  }

  cambiarDesde( valor: number ) {

    let desde = this.desde + valor;
    console.log( desde );

    if ( desde >= this.totalRegistros ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();

  }
}
