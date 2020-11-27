import { TestBed } from '@angular/core/testing';

import { DomainHelperService } from './domain-helper.service';

describe('DomainHelperService', () => {
  let service: DomainHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DomainHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
