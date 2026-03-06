import { TestBed } from '@angular/core/testing';

import { LoginInterface } from './login-interface';

describe('LoginInterface', () => {
  let service: LoginInterface;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginInterface);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
