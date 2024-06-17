import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseLimitBarComponent } from './expense-limit-bar.component';

describe('ExpenseLimitBarComponent', () => {
  let component: ExpenseLimitBarComponent;
  let fixture: ComponentFixture<ExpenseLimitBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseLimitBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpenseLimitBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
