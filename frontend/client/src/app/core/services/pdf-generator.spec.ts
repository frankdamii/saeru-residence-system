import { TestBed } from '@angular/core/testing';

import { PdfGenerator } from './pdf-generator';

describe('PdfGenerator', () => {
  let service: PdfGenerator;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdfGenerator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
