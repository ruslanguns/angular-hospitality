import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// pipes module
import { PipesModule } from '../pipes/pipes.module';

// ng2-charts
import { ChartsModule } from 'ng2-charts';

// componentes
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { TinymceModule } from 'angular2-tinymce';
import { EditorComponent } from '../components/editor/editor.component';


// routing
import { PAGES_ROUTING } from './pages.routes';

// temporales
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficaDonaComponent } from '../components/grafica-dona/grafica-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { MedicoComponent } from './medicos/medico.component';
import { MedicosComponent } from './medicos/medicos.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { EditorPagesComponent } from './editor/editor.component';
import { OpenweatherComponent } from './librerias/openweather/openweather.component';


@NgModule({
  declarations: [
    // PagesComponent,  // no debe cargarse aqui porque se usa lazyload
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    IncrementadorComponent,
    GraficaDonaComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    ProfileComponent,
    UsuariosComponent,
    MedicoComponent,
    MedicosComponent,
    HospitalesComponent,
    // ModalUploadCo
    BusquedaComponent,
    EditorPagesComponent,
    EditorComponent,
    OpenweatherComponent
  ],
  imports: [
    CommonModule,
    PAGES_ROUTING,
    SharedModule,
    FormsModule,
    ChartsModule,
    PipesModule,
    TinymceModule.withConfig({})
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    // PagesComponent
  ]
})
export class PagesModule {}
