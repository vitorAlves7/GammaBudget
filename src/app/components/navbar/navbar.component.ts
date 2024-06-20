import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  currentRoute!: string;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  redirectTo(route: string): void {
    if(route === '/login'){
      localStorage.clear();
      this.navigateTo(route)
    } else {
      this.navigateTo(route)
    }
  }

}
