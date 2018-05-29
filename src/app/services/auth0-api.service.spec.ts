import { TestBed, inject } from '@angular/core/testing';

import { Auth0ApiService } from './auth0-api.service';

describe('Auth0ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Auth0ApiService]
    });
  });

  it('should be created', inject([Auth0ApiService], (service: Auth0ApiService) => {
    expect(service).toBeTruthy();
  }));
});
