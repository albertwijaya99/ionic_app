import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../products/products.service';
import {AlertController, IonItemSliding, LoadingController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  products = [];
  constructor(
      private productService: ProductsService,
      private router: Router,
      private alertCtrl: AlertController,
      private toastCtrl: ToastController,
      private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    const temp = [];
    for (const products of this.productService.getAllProducts()) {
      for (const product of products) {
        if (product.stock > 0) {
          temp.push(product);
        }
      }
    }
    this.products = temp;
  }
  deleteProduct(productId: string){
    this.presentLoading().then(() => {
      this.productService.deleteProduct(productId);
      this.ionViewWillEnter();
      this.presentToast();
    });
  }
  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Product deleted.',
      duration: 2000,
      color: 'danger'
    });
    await toast.present();
  }
  async presentDeleteAlert(productId: string) {
    const alert = await this.alertCtrl.create({
      header: 'Delete this product?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'OK',
          handler: () => this.deleteProduct(productId)
        }
      ]
    });
    await alert.present();
  }
  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Deleting product...',
      duration: 500
    });
    await loading.present();
    const {role, data} = await loading.onDidDismiss();
    console.log('Loading dismissed');
  }
}
