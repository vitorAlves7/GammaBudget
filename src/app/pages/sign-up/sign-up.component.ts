import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FormsModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  onSubmit(userSignUpData: NgForm){
    // const auth = new AuthService();
    // const response = this.authService.auth(userLoginData.value)
    console.log('userSignUpData.value = ', userSignUpData.value);
    if(userSignUpData.value.password === userSignUpData.value.password2) {
      console.log('Faz request...');
    } else {
      console.log('Não faz request..');
    }
  }

}
