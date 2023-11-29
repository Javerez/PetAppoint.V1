import { TestBed } from '@angular/core/testing';

import { DialogConfirmacionService } from './dialog-confirmacion.service';

describe('DialogConfirmacionService', () => {
  let service: DialogConfirmacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogConfirmacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
