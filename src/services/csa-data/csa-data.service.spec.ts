import { TestBed } from '@angular/core/testing';

import { CsaDataService } from './csa-data.service';

describe('CsaDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CsaDataService = TestBed.get(CsaDataService);
    expect(service).toBeTruthy();
  });
});
