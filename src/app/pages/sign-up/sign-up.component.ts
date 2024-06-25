import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { SingUpService } from '../../services/singup/singup.service';
import { Router } from '@angular/router';
import { project } from '../../types/project-info';
import { TermsServiceService } from '../../services/terms/terms-service.service';



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

  constructor(private singUpService: SingUpService, private router: Router, private termsServiceService: TermsServiceService) {

  }


  async onSubmit(userSignUpData: NgForm) {
    console.log('userSignUpData.value = ', userSignUpData.value);
    if (userSignUpData.value.password === userSignUpData.value.password2) {
      console.log('Faz request...');
      this.singUpService.createUser(userSignUpData.value.email, userSignUpData.value.password)
        .subscribe((response: any) => {
          if (response.email === userSignUpData.value.email) {
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
  downloadFile(arg0: string) {
    this.termsServiceService.generatePrivacyPolicy(project.name, project.email).subscribe(
      response => {
        const pdfBlob = new Blob([response], {
          type: "application/pdf",
        });
        const temporaryUrl = window.URL.createObjectURL(pdfBlob);

        const temporaryAnchor = document.createElement("a");
        temporaryAnchor.href = temporaryUrl;


        temporaryAnchor.download = `termos-de-uso.pdf`;


        document.body.appendChild(temporaryAnchor);
        temporaryAnchor.click();
        temporaryAnchor.remove();
      },
      
    );
  }

}
