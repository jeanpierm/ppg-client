import { TestBed } from '@angular/core/testing';

import { RequireAuthGuard } from './require-auth.guard';

describe('AuthGuard', () => {
  let guard: RequireAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RequireAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
