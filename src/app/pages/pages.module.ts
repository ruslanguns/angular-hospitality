import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { PAGES_ROUTING } from './pages.routes';


@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    PagesComponent
  ],
  imports: [
    PAGES_ROUTING,
    SharedModule
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    PagesComponent
  ]
})
export class PagesModule { }
