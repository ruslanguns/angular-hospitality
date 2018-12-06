import { Component, OnInit, Inject } from '@angular/core';
// import { DOCUMENT } from '@angular/common';
import { SettingsService } from '../../services/settings/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor( public _ajustes: SettingsService
  ) { }

  ngOnInit() {

    this.apiCargarSettings();
    this.colocarCheck();
  }

  cambiarColor( tema: string, link: any ) {
    // console.log( link );

    this.aplicarCheck( link );
    this._ajustes.aplicarTema( tema );

  }

  aplicarCheck( link: any ) {

    // console.log('Aplicando check');

    const SELECTORES: any = document.getElementsByClassName('selector'); // con esto se obtienen todos los elementos con la clase 'selector'

    for ( const ref of SELECTORES ) {
      ref.classList.remove('working');
    }

    link.classList.add('working');

  }

  colocarCheck() {

    // console.log('Colocando check');

    const SELECTORES: any = document.getElementsByClassName('selector');
    const TEMA = this._ajustes.ajustes.tema;

    for ( const ref of SELECTORES ) {
      if ( ref.getAttribute('data-theme') === TEMA ) {
        ref.classList.add('working');
        break; // condicion adicional, para optimizarlo cortamos el ciclo for.
      }
    }

  }

  apiCargarSettings() {

    this._ajustes.apiCargarSettings()
      .subscribe( resp => {
        console.log(resp);

      });
  }
}

