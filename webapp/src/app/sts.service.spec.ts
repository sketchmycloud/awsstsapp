import { TestBed } from '@angular/core/testing';

import { StsService } from './sts.service';

describe('StsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StsService = TestBed.get(StsService);
    expect(service).toBeTruthy();
  });
});
