import { TestBed } from '@angular/core/testing';

import { CadpacienteService } from './cadpaciente.service';

describe('CadpacienteService', () => {
  let service: CadpacienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadpacienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
