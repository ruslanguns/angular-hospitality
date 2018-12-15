import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import { SanitizerPipe } from './sanitizer.pipe';

@NgModule({
  imports: [
  ],
  declarations: [
  ImagenPipe,
  SanitizerPipe
  ],
  exports: [
    ImagenPipe,
    SanitizerPipe
  ]
})
export class PipesModule { }
