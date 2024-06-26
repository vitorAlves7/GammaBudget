import { LoginComponent } from './pages/login/login.component';
import { Routes } from '@angular/router';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LaunchesComponent } from './pages/launches/launches.component';
import { HomeComponent } from './pages/home/home.component';
import { ReportsComponent } from './pages/reports/reports.component'

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
        path: "reports",
        component: ReportsComponent
    },
    {
        path: "",
        component: LoginComponent
    }
];
