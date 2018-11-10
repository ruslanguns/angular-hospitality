import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    this.contarTres().then(
      // () => console.log('Termino!')
      mensaje => console.log('Termino', mensaje)
    )
    .catch( error => console.error('Error en la promesa', error));
    }

  ngOnInit() {
  }

  contarTres(): Promise<boolean> {
    return new Promise( (resolve, reject) => {

      // Esta es una funcion de js que ejecutará un ciclo de tiempo y que ejecutará esta funcion por el tiempo que se especifique
      let contador = 0;

      let intervalo = setInterval( () => {

          contador += 1;
          console.log( contador );

          if ( contador === 3 ) {
            // resolve();
            resolve();
            // reject('Un simple error'); // si no se coloca nada aparecera undefined
            clearInterval(intervalo); // Asi se detiene el intervalo...
          }
        }, 1000 );
    });

  }
}
