import { TestBed, inject } from '@angular/core/testing';

import { CurrencyrateService } from './currencyrate.service';

describe('CurrencyrateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrencyrateService]
    });
  });

  it('should be created', inject([CurrencyrateService], (service: CurrencyrateService) => {
    expect(service).toBeTruthy();
  }));
});
