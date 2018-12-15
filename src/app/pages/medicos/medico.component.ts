import { Component, OnInit } from '@angular/core';
import { MedicoService, HospitalService } from 'src/app/services/service.index';
import { Medico } from '../../_models/medico.model';
import { Hospital } from '../../_models/hospital.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', ''); // si lo enviamos vacio iniciará vacío el campo del modelo en el form.
  hospital: Hospital = new Hospital('');

  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {

    activatedRoute.params.subscribe( params => {

      let id = params['id'];

      if ( id !== 'nuevo' ) {
        this.cargarMedico( id );
      }
    })
   }

  ngOnInit() {

    this._hospitalService.cargarHospitales()
          .subscribe( hospitales => this.hospitales = hospitales );

    this._modalUploadService.notificacion
          .subscribe( resp => {
            // console.log(resp);
            this.medico.img = resp.medico.img;

          });
  }

  guardarMedico( f: NgForm ) {
    console.log(f.valid );
    console.log(f.value );

    if ( f.invalid ) {
      return;
    }

    this._medicoService.guardarMedico( this.medico )
          .subscribe( medico  => {

            console.log( medico );

          });

  }
  cambioHospital( id: string  ) {

    if ( !id ){
      return this.hospital = new Hospital('');
    }

    // console.log( id ); // ver qué tipo de eventos obtenemos
    this._hospitalService.obtenerHospital( id )
          .subscribe( (hospital: any) => {
            this.hospital = hospital;
          });
  }

  cargarMedico( id: string ) {

    this._medicoService.cargarMedico( id )
          .subscribe( (medico: any) => {

            this.medico = medico;
            this.medico.hospital = medico.hospital._id;
            this.cambioHospital( this.medico.hospital );
          });
  }

  cambiarFoto() {

    this._modalUploadService.mostrarModal( 'medicos', this.medico._id );
  }

}
