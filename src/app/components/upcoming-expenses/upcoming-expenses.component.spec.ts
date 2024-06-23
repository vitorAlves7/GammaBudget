import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingExpensesComponent } from './upcoming-expenses.component';
import { HttpClientModule } from '@angular/common/http';

describe('UpcomingExpensesComponent', () => {
  let component: UpcomingExpensesComponent;
  let fixture: ComponentFixture<UpcomingExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpcomingExpensesComponent, HttpClientModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpcomingExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
