import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalSectionComponent } from './legal-section.component';

describe('LegalSectionComponent', () => {
  let component: LegalSectionComponent;
  let fixture: ComponentFixture<LegalSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LegalSectionComponent]
    });
    fixture = TestBed.createComponent(LegalSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
