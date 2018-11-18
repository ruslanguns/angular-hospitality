import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../_models/usuario.model';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;

  constructor(  public router: Router,
                public _usuarioServices: UsuarioService
              ) { }

  ngOnInit() {
    init_plugins();

    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 1 ) {
        this.recuerdame = true;

    }
  }

  ingresar( forma: NgForm) {
    // console.log('ingresando');
    // this.router.navigate(['/dashboard']);
    // console.log( forma.valid);
    if ( forma.invalid ) {
      return;
    }

    let usuario = new Usuario (null, forma.value.email, forma.value.password );

    this._usuarioServices.login( usuario, forma.value.recuerdame )
              .subscribe( correcto => this.router.navigate(['/dashboard']));
    // console.log( forma.value);


  }

}
