import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public tipo: string;
  public id: string;

  public oculto: string = 'oculto'; // el modal debe estar oculto por defecto

  public notificacion = new EventEmitter<any>(); // emite un valor any, aunque tambien puede ser booleanlo.

  constructor() {
    // console.log('Funciona el servicio de modal');

   }

   ocultarModal() {
    this.oculto = 'oculto';

    // limpiar el modal al momento de cerrar
    this.tipo = null;
    this.id = null;
   }

   mostrarModal( tipo: string, id: string ) {
    this.oculto = '';
    this.tipo = tipo;
    this.id = id;
   }
}
