import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TopExpensesComponent } from './top-expenses.component';

describe('TopExpensesComponent', () => {
  let component: TopExpensesComponent;
  let fixture: ComponentFixture<TopExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TopExpensesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
