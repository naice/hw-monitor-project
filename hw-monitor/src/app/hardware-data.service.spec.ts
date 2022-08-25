import { TestBed } from '@angular/core/testing';

import { HardwareDataService } from './hardware-data.service';

describe('HardwareDataService', () => {
  let service: HardwareDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HardwareDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
