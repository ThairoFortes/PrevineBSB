import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CadastroPacientePage } from './cadastro-paciente.page';

describe('CadastroPacientePage', () => {
  let component: CadastroPacientePage;
  let fixture: ComponentFixture<CadastroPacientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroPacientePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroPacientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
