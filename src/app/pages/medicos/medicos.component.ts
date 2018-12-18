import { Component, OnInit } from '@angular/core';
import { Medico } from '../../_models/medico.model';
import { MedicoService } from 'src/app/services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];

  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _medicoServices: MedicoService,
    public _modalUploadService: ModalUploadService
  ) {
  }

  ngOnInit() {
    this.cargarMedicos();

    this._modalUploadService.notificacion
      .subscribe(() => this.cargarMedicos());
  }

  mostrarModal(id: string) {

    this._modalUploadService.mostrarModal('medicos', id); // llamar al modal
  }

  cargarMedicos() {
    this.cargando = true;
    this._medicoServices.cargarMedicos( this.desde )
    .subscribe( (resp: any) => {  // console.log(medicos[0]);

      this.totalRegistros = resp.total;
      this.medicos = resp.medico;
      console.log(this.medicos);


      this.cargando = false;
    });
}

buscarMedico( termino: string ) {

  if ( termino.length <= 0 ) {
    this.cargarMedicos();
    return;
  }

  this._medicoServices.buscarMedicos( termino )
        .subscribe( medicos => this.medicos = medicos);
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
  this.cargarMedicos();
}

borrarMedico( medico: Medico ) {

  this._medicoServices.borrarMedicos( medico._id )
        .subscribe( () => this.cargarMedicos() );
}


}
