import { TestBed } from '@angular/core/testing';

import { RaffleModalService } from './raffle-modal.service';

describe('RaffleModalService', () => {
  let service: RaffleModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RaffleModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
