import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {

    this.subscription = this.regresaObservable()
    .subscribe(
      numero => console.log( 'Subs', numero),
      error => console.log('Error en el obs', error),
      () => console.log('El observador termino!')
    );

   }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('La página se va a cerrar');
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any> { // de esta manera se fuerza que el tipo de datos que maneja el observable es de tipo número..
    return new Observable( (observer: Subscriber<any>) => {

      let contador = 0;

      let intervalo = setInterval( () => {

        contador ++;

        const salida = {
          valor: contador
        };

        observer.next( salida );

        // if ( contador === 7 ) {
        //   clearInterval( intervalo );
        //   observer.complete();
        // }

        // if ( contador === 2 ) {
          // clearInterval( intervalo );
          // observer.error('Auxilio');
        // }

      }, 1000 );
    }).pipe (
      map( resp => resp.valor),
      filter( ( valor, index ) => { // si esta () return true; deja pasar todo sin filtro
        // console.log('Filter', valor, index);

        if ( ( valor % 2) === 1 ) { // en este filtro se quitan los múltiplos a 2 
          // impar
          return true;
        } else {
          // par
          return false;
        }
      })
      // , filter( x => x > 3)

      );

    // return obs;

  }

}
