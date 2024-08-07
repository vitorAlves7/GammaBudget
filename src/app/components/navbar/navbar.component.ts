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
  isDropdownOpen = false;

  currentRoute!: string;
  dropdownMenu: boolean  = false;
  user_email: any;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;

      this.user_email = JSON.parse(localStorage.getItem('user') as string);

    });
  }

  openMenu(){
    console.log(this.dropdownMenu)
    this.dropdownMenu = !this.dropdownMenu;
    console.log(this.dropdownMenu)

  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  redirectTo(route: string): void {
    if(route === '/login'){
      localStorage.clear();
      sessionStorage.clear();
      this.navigateTo(route)
    } else {
      this.navigateTo(route)
    }
  }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }


}
