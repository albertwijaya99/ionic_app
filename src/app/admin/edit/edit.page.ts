import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsService} from '../../products/products.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoadingController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  id: string;
  loadedProduct: any;
  form: FormGroup;
  constructor(
      private activatedRoute: ActivatedRoute,
      private productService: ProductsService,
      private loadingCtrl: LoadingController,
      private toastCtrl: ToastController,
      private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('id')) { return; }
      this.id = paramMap.get('id');
      this.loadedProduct = this.productService.getProduct(this.id);
    });
    this.form = new FormGroup({
      imageUrl: new FormControl(this.loadedProduct.imageUrl, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      brand: new FormControl(this.loadedProduct.brand, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      model: new FormControl(this.loadedProduct.model, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      price: new FormControl(this.loadedProduct.price, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      stock: new FormControl(this.loadedProduct.stock, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      base_clock: new FormControl(this.loadedProduct.base_clock, {
        updateOn: 'blur',
      }),
      boost_clock: new FormControl(this.loadedProduct.boost_clock, {
        updateOn: 'blur',
      }),
      core_count: new FormControl(this.loadedProduct.core_count, {
        updateOn: 'blur',
      }),
      thread_count: new FormControl(this.loadedProduct.thread_count, {
        updateOn: 'blur',
      }),
      speed: new FormControl(this.loadedProduct.speed, {
        updateOn: 'blur',
      }),
      size: new FormControl(this.loadedProduct.size, {
        updateOn: 'blur',
      }),
      pcs: new FormControl(this.loadedProduct.pcs, {
        updateOn: 'blur',
      }),
      chipset: new FormControl(this.loadedProduct.chipset, {
        updateOn: 'blur',
      }),
      for_cpu_brand: new FormControl(this.loadedProduct.for_cpu_brand, {
        updateOn: 'blur',
      }),
    });
    if (this.loadedProduct.type === 'cpu') {
      this.form.get('base_clock').setValidators([Validators.required]);
      this.form.get('boost_clock').setValidators([Validators.required]);
      this.form.get('core_count').setValidators([Validators.required]);
      this.form.get('thread_count').setValidators([Validators.required]);
    } else if (this.loadedProduct.type === 'ram') {
      this.form.get('speed').setValidators([Validators.required]);
      this.form.get('size').setValidators([Validators.required]);
      this.form.get('pcs').setValidators([Validators.required]);
    } else if (this.loadedProduct.type === 'motherboard') {
      this.form.get('chipset').setValidators([Validators.required]);
      this.form.get('for_cpu_brand').setValidators([Validators.required]);
    }
  }
  onSave(){
    this.presentLoading().then(() => {
      this.productService.deleteProduct(this.loadedProduct.id);
      if (this.loadedProduct.type === 'cpu') {
        this.productService.addCpu(
            this.loadedProduct.id,
            this.form.value.model,
            this.form.value.brand,
            this.form.value.imageUrl,
            this.loadedProduct.type,
            this.form.value.price,
            this.form.value.stock,
            this.form.value.base_clock,
            this.form.value.boost_clock,
            this.form.value.core_count,
            this.form.value.thread_count,
        );
      }
      else if (this.loadedProduct.type === 'ram') {
        this.productService.addRam(
            this.loadedProduct.id,
            this.form.value.model,
            this.form.value.brand,
            this.form.value.imageUrl,
            this.loadedProduct.type,
            this.form.value.price,
            this.form.value.stock,
            this.form.value.speed,
            this.form.value.size,
            this.form.value.pcs
        );
      }
      else if (this.loadedProduct.type === 'motherboard') {
        this.productService.addMotherboard(
            this.loadedProduct.id,
            this.form.value.model,
            this.form.value.brand,
            this.form.value.imageUrl,
            this.loadedProduct.type,
            this.form.value.price,
            this.form.value.stock,
            this.form.value.chipset,
            this.form.value.for_cpu_brand
        );
      }
      else if (this.loadedProduct.type === 'gpu') {
        this.productService.addGpu(
            this.loadedProduct.id,
            this.form.value.model,
            this.form.value.brand,
            this.loadedProduct.type,
            this.form.value.type,
            this.form.value.price,
            this.form.value.stock,
        );
      }
      this.router.navigate(['/admin']);
      this.presentToast();
    });
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Saving Product...',
      duration: 500
    });
    await loading.present();
    const {role, data} = await loading.onDidDismiss();
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Product Saved',
      duration: 2000,
      color: 'primary'
    });
    await toast.present();
  }
}
