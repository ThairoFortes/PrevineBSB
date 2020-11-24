import { Component, OnInit } from '@angular/core';
import { Cadpaciente } from '../shared/cadpaciente.interface';
import { Subscription } from 'rxjs';
import { CadpacienteService } from 'src/app/services/cadpaciente.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, ToastController, NavController} from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private cadpacientes = new Array<Cadpaciente>();
  private cadpacienteSubscription: Subscription;
  private loading: any;


  constructor(private cadpacienteService: CadpacienteService,
              private authService: AuthService,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private router: Router,
  ) {
    this.cadpacienteSubscription = this.cadpacienteService.getCadpacientes().subscribe(data => {
      this.cadpacientes = data;
    });
  }

  ngOnInit() {
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy() {
    this.cadpacienteSubscription.unsubscribe();
  }

  async logout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error(error);
    }

  }

  async deleteCadpaciente(id: string) {
    try {
      await this.cadpacienteService.deleteCadpaciente(id);
    } catch (error) {
      this.presentToast('Erro ao tentar salvar.');
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

}