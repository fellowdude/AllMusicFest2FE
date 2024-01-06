import { TestBed } from '@angular/core/testing';

import { StadiumPopupService } from './stadium-popup.service';

describe('StadiumPopupService', () => {
  let service: StadiumPopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StadiumPopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
