import { TestBed } from '@angular/core/testing';

import { MediaModalService } from './media-modal.service';

describe('MediaModalService', () => {
  let service: MediaModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediaModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
