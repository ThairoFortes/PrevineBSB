import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CadastroPacientePageRoutingModule } from './cadastro-paciente-routing.module';
import { CadastroPacientePage } from './cadastro-paciente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastroPacientePageRoutingModule
  ],
  declarations: [CadastroPacientePage]
})
export class CadastroPacientePageModule {}
