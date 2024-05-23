import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-general-information',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './general-information.component.html',
  styleUrl: './general-information.component.scss'
})
export class GeneralInformationComponent {

  
  dayPeriod: string | undefined;


  ngOnInit(): void {
    this.dayPeriod = this.verifyDayPeriod();
  }

  verifyDayPeriod(): string {
    
    let hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      return "Bom dia";
    } else if (hour >= 12 && hour < 18) {
      return "Boa Tarde";
    } else {
      return "Boa noite";
    }
  }

}
