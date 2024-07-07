import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralInformationComponent } from './general-information.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GeneralInformationComponent', () => {
  let component: GeneralInformationComponent;
  let fixture: ComponentFixture<GeneralInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [GeneralInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneralInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
