import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { nombreDelGuardGuard } from './nombre-del-guard-guard';

describe('nombreDelGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => nombreDelGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
