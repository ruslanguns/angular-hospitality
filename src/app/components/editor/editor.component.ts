import { AfterViewInit, Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styles: []
})
  export class EditorComponent implements AfterViewInit {
    @ViewChild('tinymce') tinymce;
    title = 'Contenido inicial';

    constructor() {
    }


    ngAfterViewInit() {
      // console.log(this.tinymce);
    }

    log(w) {
      // console.log(w);
    }
  }
