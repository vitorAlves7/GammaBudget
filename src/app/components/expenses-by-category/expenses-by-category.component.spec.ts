import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesByCategoryComponent } from './expenses-by-category.component';
import { HttpClientModule } from '@angular/common/http';

describe('ExpensesByCategoryComponent', () => {
  let component: ExpensesByCategoryComponent;
  let fixture: ComponentFixture<ExpensesByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpensesByCategoryComponent, HttpClientModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpensesByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
