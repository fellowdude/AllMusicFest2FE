import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaffleModalComponent } from './raffle-modal.component';

describe('RaffleModalComponent', () => {
  let component: RaffleModalComponent;
  let fixture: ComponentFixture<RaffleModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RaffleModalComponent]
    });
    fixture = TestBed.createComponent(RaffleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
