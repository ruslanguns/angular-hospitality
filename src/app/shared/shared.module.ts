import { NgModule } from '@angular/core';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcumbsComponent } from './breadcumbs/breadcumbs.component';


@NgModule({
    declarations: [
        NopagefoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcumbsComponent
    ],
    imports: [],
    exports: [
        NopagefoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcumbsComponent
    ],
    providers: [],
})
export class SharedModule { }
