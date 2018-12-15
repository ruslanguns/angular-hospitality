import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordService } from 'src/app/services/service.index';
import { ActivatedRoute } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['../login.component.css']
})

export class ResetComponent implements OnInit {

  forma: FormGroup;
  token: string;

  constructor(public passwordService: PasswordService,
              public activatedRoute: ActivatedRoute
              ) {

    this.forma = new FormGroup({
      'pin': new FormControl({value: '', disabled: true}, Validators.required),
      'password': new FormControl('', [Validators.required, Validators.minLength(5)]),
      'password2': new FormControl('', Validators.required),
    }, { validators: this.sonIguales( 'password', 'password2') });

   }

   sonIguales( campo1: string, campo2: string ) {

    return ( group: FormGroup ) => {

      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if ( pass1 === pass2 ) {
        return null;
      }
      return {
        sonIguales: true
      };
    };

  }

  ngOnInit() {
    init_plugins();
    this.activatedRoute.params.subscribe( token => {

      // console.log( token['token'] );
      this.token = token['token'];
    });
  }

  resetPassword() {
    let password = this.forma.value.password;
    let token = this.token;

    this.passwordService.reestablecerContraseña(password, token)
      .subscribe((resp: any ) => {
        return resp;
      });

  }


}
