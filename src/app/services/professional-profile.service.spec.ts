import { TestBed } from '@angular/core/testing';

import { ProfessionalProfileService } from './professional-profile.service';

describe('ProfessionalProfileService', () => {
  let service: ProfessionalProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfessionalProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
