import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetComponent } from './reset/reset.component';
import { ForgetComponent } from './forget/forget.component';

const LOGIN_ROUTES: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'forget', component: ForgetComponent },
    { path: 'reset/:token', component: ResetComponent },
    { path: 'reset', redirectTo: '/login', pathMatch: 'full' }
];

export const LOGIN_ROUTING = RouterModule.forChild(LOGIN_ROUTES);
