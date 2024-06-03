import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { SingUpService } from '../../services/singup/singup.service';
import { Router } from '@angular/router';



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
  constructor( private singUpService: SingUpService, private router: Router) {

  }

  
  async onSubmit (userSignUpData: NgForm){
    console.log('userSignUpData.value = ', userSignUpData.value);
    if(userSignUpData.value.password === userSignUpData.value.password2) {
      console.log('Faz request...');
      this.singUpService.createUser(userSignUpData.value.email ,userSignUpData.value.password)
      .subscribe( (response: any) => {
              if(response.email === userSignUpData.value.email){
                this.redirectLogin()
              }
            }, 

      );
     
    } else {
      console.log('Não faz request..');
    }
  }

  redirectLogin() {
    this.router.navigate(['/login']);
}

}
