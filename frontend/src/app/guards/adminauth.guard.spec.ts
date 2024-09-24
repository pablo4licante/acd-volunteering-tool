import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { AdminAuthGuard } from './adminauth.guard';

describe('AuthGuard', () => {
  let guard: AdminAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminAuthGuard]
    });
    guard = TestBed.inject(AdminAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
