import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor( private authService: AuthService) {

  }

  onSubmit(userLoginData: NgForm){
    // const auth = new AuthService();
    const response = this.authService.auth(userLoginData.value)
    console.log(response);
    console.log('user = ', localStorage.getItem('user'))
    console.log('token = ', localStorage.getItem('token'))
  }

}
