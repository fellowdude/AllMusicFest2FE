import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractiveStadiumComponent } from './interactive-stadium.component';

describe('InteractiveStadiumComponent', () => {
  let component: InteractiveStadiumComponent;
  let fixture: ComponentFixture<InteractiveStadiumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InteractiveStadiumComponent]
    });
    fixture = TestBed.createComponent(InteractiveStadiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
