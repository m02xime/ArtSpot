import { TestBed } from '@angular/core/testing';

import { OeuvresService } from './oeuvres.service';

describe('OeuvresService', () => {
  let service: OeuvresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OeuvresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
