import { LoginComponent } from './pages/login/login.component';
import { Routes } from '@angular/router';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LaunchesComponent } from './pages/launches/launches.component';
import { HomeComponent } from './pages/home/home.component';
import { LimitComponent } from './pages/limit/limit.component';

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "sign-up",
        component: SignUpComponent
    },
    {
        path: "launches",
        component: LaunchesComponent
    },
    {
        path: "home",
        component: HomeComponent
    },
    {
        path: "",
        component: LoginComponent
    },
    {
        path: "limits",
        component: LimitComponent
    }
];
