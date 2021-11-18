import { TestBed } from '@angular/core/testing';

import { EvenBetterLoggerService } from './even-better-logger.service';

describe('EvenBetterLoggerService', () => {
  let service: EvenBetterLoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvenBetterLoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
