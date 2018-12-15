import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/service.index';
import { Hospital } from '../../_models/hospital.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';


declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {
    this.cargarHospital();

    this._modalUploadService.notificacion
      .subscribe(() => this.cargarHospital());
  }

  mostrarModal(id: string) {

    this._modalUploadService.mostrarModal('hospitales', id); // llamar al modal
  }

  cargarHospital() {
    this.cargando = true;

    this._hospitalService
      .cargarHospitalesDesde(this.desde)
      .subscribe((resp: any) => {

        console.log(resp);

        this.totalRegistros = resp.total;
        this.hospitales = resp.hospitales;

        this.cargando = false;
      });
  }

  cambiarDesde(valor: number) {
    let desde = this.desde + valor;

    if (desde >= this.totalRegistros) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarHospital();
  }

  buscarHospital(termino: string) {
    if (termino.length <= 0) {
      this.cargarHospital();
      return;
    }

    this._hospitalService
      .buscarHospital(termino)
      .subscribe((hospitales: any ) => {
        this.hospitales = hospitales;
        this.cargando = false;
      });
  }

  borrarHospital( hospital: Hospital ) {
    console.log('Borrar hospital');

    swal({
      title: '¿Esta seguro?',
      text: 'Que desea borrar al hospital ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then( borrar => {
      // console.log( borrar );
      if ( borrar ) {
        this._hospitalService.borrarHospital(hospital._id).subscribe( borrado => {
          // console.log( borrado );
          this.cambiarDesde(0);
        });
      }
    });
  }

  guardarHospital(hospital: Hospital) {
    this._hospitalService.actualizarHospital( hospital )
            .subscribe();
  }

  crearHospital() {
    // swal('Write something here:', {
    //   content: 'input',
    // })
    //   .then(( hospital: any ) => {
    //     swal( this._hospitalService.crearHospital( hospital) );
    //   });

    swal({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then( ( valor: string ) => {

      if (!valor || valor.length === 0 ) {
      return;
    }
    this._hospitalService.crearHospital( valor )
            .subscribe( () => this.cargarHospital());
  });

}
}
