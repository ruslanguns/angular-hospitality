import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../_models/usuario.model';

declare function init_plugins();
declare const gapi: any; // necesario para google login

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;
  ruta: string;

  auth2: any;

  constructor(  public router: Router,
                public _usuarioServices: UsuarioService
              ) {}

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    if ( this.email.length > 1 ) {
        this.recuerdame = true;

    }
  }

  googleInit() {

    gapi.load('auth2', () => {

      this.auth2 = gapi.auth2.init({
        client_id: '906401042227-9nuk8m0olvrtmhvq00c2d39igkepmjpq.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById ('google_login_button'));

    });
  }

  attachSignin( element ) {

    this.auth2.attachClickHandler( element, {}, (googleUser) => {

      // let profile = googleUser.getBasicProfile();

      let token = googleUser.getAuthResponse().id_token;

      this._usuarioServices.loginGoogle( token )
      // .subscribe( () => this.router.navigate(['/dashboard']));
      // .subscribe( () => window.location.href = '#/dashboard');
      .subscribe( correcto => {

        const rutaADondeVoy = `#${ localStorage.getItem('ruta') }`;

        if (rutaADondeVoy !== undefined) { // console.log('Ruta dirigida');

            localStorage.removeItem('ruta');
            window.location.href = rutaADondeVoy;

        } else { // console.log('Ruta por defecto');
          window.location.href = '#/dashboard';

        }
      });

    });
  }

  ingresar( forma: NgForm ) {
    // console.log('ingresando');
    // console.log( forma.valid);
    // console.log( forma.value);
    if ( forma.invalid ) {
      return;
    }

    let usuario = new Usuario (null, forma.value.email, forma.value.password );

    this._usuarioServices.login( usuario, forma.value.recuerdame )
              // .subscribe( correcto => this.router.navigate(['/dashboard']));
              .subscribe( correcto => {

                const rutaADondeVoy = localStorage.getItem('ruta');

                if (rutaADondeVoy !== undefined) { // console.log('Ruta dirigida');

                    localStorage.removeItem('ruta');
                    this.router.navigate([rutaADondeVoy]);

                } else { // console.log('Ruta por defecto');
                  this.router.navigate(['/dashboard']);

                }
              });
  }
}
