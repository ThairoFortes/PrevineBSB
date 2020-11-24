import { Component, OnInit } from '@angular/core';
import { Cadpaciente } from '../shared/cadpaciente.interface';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CadpacienteService } from 'src/app/services/cadpaciente.service';

@Component({
  selector: 'app-cadastro-paciente',
  templateUrl: './cadastro-paciente.page.html',
  styleUrls: ['./cadastro-paciente.page.scss'],
})
export class CadastroPacientePage implements OnInit {
  private cadpaciente: Cadpaciente = {};
  private loading: any;
  private cadpacienteId: string = null;
  private cadpacienteSubscription: Subscription;

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private activeRoute: ActivatedRoute,
    private cadpacienteService: CadpacienteService,
    private NavCtrl: NavController
  ) {
    this.cadpacienteId = this.activeRoute.snapshot.params.id;
    if (this.cadpacienteId) { this.loadCadpaciente(); }
  }

  ngOnInit() {
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy() {
    if (this.cadpacienteSubscription) { this.cadpacienteSubscription.unsubscribe(); }
  }

  loadCadpaciente() {
    this.cadpacienteSubscription = this.cadpacienteService.getCadpaciente(this.cadpacienteId).subscribe(data => {
      this.cadpaciente = data;
    });
  }

  async saveCadpaciente() {
    await this.presentLoading();

    this.cadpaciente.userId = this.authService.getAuth().currentUser.uid;

    if (this.cadpacienteId) {

      try {
        await this.cadpacienteService.updateCadpaciente(this.cadpacienteId, this.cadpaciente);
        await this.loading.dismiss();

        this.NavCtrl.navigateBack('/home');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar.');
        this.loading.dismiss();
        console.error(error);
      }

    } else {
      this.cadpaciente.createdAt = new Date().getTime();

      try {
        await this.cadpacienteService.addCadpaciente(this.cadpaciente);
        await this.loading.dismiss();

        this.NavCtrl.navigateBack('/home');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar.');
        this.loading.dismiss();
      }
    }

  }

  async deleteCadpaciente(id: string) {
    try {
      await this.cadpacienteService.deleteCadpaciente(id);

      this.NavCtrl.navigateBack('/home');
    } catch (error) {
      this.presentToast('Erro ao tentar finalizar.');
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

  /*
  takeSelfie() {
    try{
    this.camera.getPicture({
      quality : 100,
      destinationType : this.cameraPlugin.DestinationType.DATA_URL,
      sourceType : this.cameraPlugin.PictureSourceType.CAMERA,
      allowEdit : true,
      encodingType: this.cameraPlugin.EncodingType.PNG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: true
    }).then(profilePicture => {
      // Send the picture to Firebase Storage
      const selfieRef = firebase.storage().ref('foto.png');
      selfieRef
        .putString(profilePicture, 'base64', {contentType: 'image/png'})
        .then(savedProfilePicture => {
          firebase
            .database()
            .ref(`users/user1/profilePicture`)
            .set(savedProfilePicture.downloadURL);
        });
    });
  } catch (error){
    console.error(error);
  }

}
*/
}
