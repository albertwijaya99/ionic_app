import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {ProductsService} from '../../products/products.service';
import {LoadingController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  type: string;
  constructor(
      private productService: ProductsService,
      private loadingCtrl: LoadingController,
      private toastCtrl: ToastController,
      private router: Router
  ) { }

  ngOnInit() {
    console.log('cpu'.concat(String(++this.productService.getAllProducts().length)));
  }
  onChange($event){
    this.type = $event.target.value;
  }
  onSubmit(form: NgForm) {
    this.presentLoading().then(() => {
      if (form.value.type === 'cpu') {
        this.productService.addCpu(
            'cpu'.concat(String(++this.productService.getAllProducts().length)),
            form.value.model,
            form.value.brand,
            form.value.imageUrl,
            form.value.type,
            form.value.price,
            form.value.stock,
            form.value.base_clock,
            form.value.boost_clock,
            form.value.core_count,
            form.value.thread_count,
        );
      }
      else if (form.value.type === 'ram') {
        this.productService.addRam(
            'ram'.concat(String(++this.productService.getAllProducts().length)),
            form.value.model,
            form.value.brand,
            form.value.imageUrl,
            form.value.type,
            form.value.price,
            form.value.stock,
            form.value.speed,
            form.value.size,
            form.value.pcs
        );
      }
      else if (form.value.type === 'motherboard') {
        this.productService.addMotherboard(
            'mb'.concat(String(++this.productService.getAllProducts().length)),
            form.value.model,
            form.value.brand,
            form.value.imageUrl,
            form.value.type,
            form.value.price,
            form.value.stock,
            form.value.chipset,
            form.value.for_cpu_brand
        );
      }
      else if (form.value.type === 'gpu') {
        this.productService.addGpu(
            'gpu'.concat(String(++this.productService.getAllProducts().length)),
            form.value.model,
            form.value.brand,
            form.value.imageUrl,
            form.value.type,
            form.value.price,
            form.value.stock,
        );
      }
      this.router.navigate(['/admin']);
      this.presentToast();
    });
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Adding Product...',
      duration: 500
    });
    await loading.present();
    const {role, data} = await loading.onDidDismiss();
  }
  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Product Added',
      duration: 2000,
      color: 'primary'
    });
    await toast.present();
  }
}
