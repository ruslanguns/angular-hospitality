import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcumbs',
  templateUrl: './breadcumbs.component.html',
  styles: []
})
export class BreadcumbsComponent implements OnInit {

  titulo: string;

  constructor(  private router: Router,
                private title: Title, // se inyecta esta clase para gestionar el titulo del encabezado
                private meta: Meta ) {

    this.getDataRoute()
    .subscribe( data => {
      console.log(data);
      this.titulo = data.titulo; // de esta manera gestionamos el titulo de la página para el breadcumb
      this.title.setTitle( this.titulo ); // de esta manaera estamos gestionando el title del encabezado

    const metaTag: MetaDefinition = { // https://angular.io/api/platform-browser/MetaDefinition
      name: 'description',
      content: this.titulo
    };

    this.meta.updateTag( metaTag );
    });
  }


  ngOnInit() {
  }

  getDataRoute() {
    return this.router.events.pipe(

      filter( evento => evento instanceof ActivationEnd ),
      filter( ( evento: ActivationEnd ) => evento.snapshot.firstChild === null ),
      map( ( evento: ActivationEnd ) => evento.snapshot.data )
    );
  }

}
