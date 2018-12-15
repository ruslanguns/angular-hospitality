import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// routing
import { LOGIN_ROUTING } from './login.routes';


import { ResetComponent } from './reset/reset.component';
import { ForgetComponent } from './forget/forget.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    ResetComponent,
    ForgetComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    LOGIN_ROUTING,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ResetComponent,
    ForgetComponent,
    RegisterComponent,
    LoginComponent
  ]
})
export class LoginModule { }
