import { TestBed } from '@angular/core/testing';

import { DatabaseserviceService } from './databaseservice.service';

describe('DatabaseserviceService', () => {
  let service: DatabaseserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabaseserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
