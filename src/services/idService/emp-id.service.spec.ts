import { TestBed } from '@angular/core/testing';

import { EmpIdService } from './emp-id.service';

describe('EmpIdService', () => {
  let service: EmpIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
