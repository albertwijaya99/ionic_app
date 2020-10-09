import { Injectable } from '@angular/core';
import { Cpu, Motherboard, Product, Ram} from './products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private cpus: Cpu[] = [{
      id: 'cpu1',
      model: 'AMD Ryzen 9 3950X',
      brand: 'AMD',
      imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/7122uH4-hfL._AC_SL1121_.jpg',
      type: 'cpu',
      price: 12299000,
      stock: 50,
      base_clock: 3.5,
      boost_clock: 4.7,
      core_count: 16,
      thread_count: 32
    }, {
      id: 'cpu2',
      model: 'Intel Core i9-10900K',
      brand: 'Intel',
      imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/61aMmen0cFL._AC_SL1099_.jpg',
      type: 'cpu',
      price: 9599000,
      stock: 50,
      base_clock: 3.7,
      boost_clock: 5.3,
      core_count: 10,
      thread_count: 20
    }];

  private rams: Ram[] = [{
      id: 'ram1',
      model: 'G.SKILL Trident Z Royal F4-4600C18D-16GTRG',
      brand: 'G.SKILL',
      imageUrl: 'https://www.gskill.com/_upload/images/1908130949151.png',
      type: 'ram',
      price: 1999000,
      stock: 50,
      speed: 4600,
      size: 16,
      pcs: '2x8'
    }, {
      id: 'ram2',
      model: 'Corsair Vengeance LPX',
      brand: 'Corsair',
      imageUrl: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2018/8/3/2678891/2678891_11ffe968-5a6c-4dd1-85bb-000d822e8117_900_900.jpg',
      type: 'ram',
      price: 2100000,
      stock: 50,
      speed: 2666,
      size: 32,
      pcs: '2x16'
    }];

  private motherboards: Motherboard[] = [{
      id: 'mb1',
      model: 'ASUS TUF GAMING X570-PLUS',
      brand: 'ASUS',
      imageUrl: 'https://www.asus.com/media/global/products/i8494vnng05ywle1/P_setting_000_1_90_end_500.png',
      type: 'motherboard',
      price: 4000000,
      stock: 50,
      chipset: 'AM4',
      for_cpu_brand: 'AMD'
    }, {
    id: 'mb2',
    model: 'Asus ROG Maximus XII Apex',
    brand: 'ASUS',
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/61597G3IXVL._AC_SL1000_.jpg',
    type: 'motherboard',
    price: 7000000,
    stock: 50,
    chipset: 'LGA1200',
    for_cpu_brand: 'Intel'
  }];

  private gpus: Product[] = [{
    id: 'gpu1',
    model: 'Asus TUF RTX 3090 24G GAMING',
    brand: 'ASUS',
    imageUrl: 'https://www.asus.com/media/global/products/xcauto1ez9mxpzuv/P_setting_000_1_90_end_500.png',
    type: 'gpu',
    price: 35000000,
    stock: 1,
  }, {
    id: 'gpu2',
    model: 'ZOTAC GAMING GeForce RTX 3090 Trinity',
    brand: 'ZOTAC',
    imageUrl: 'https://www.tweaktown.com/images/news/7/4/74814_302_say-hello-to-zotacs-new-geforce-rtx-3090-trinity-graphics-card_full.jpg',
    type: 'gpu',
    price: 29000000,
    stock: 50,
  }];

  private products = [
      this.cpus,
      this.rams,
      this.motherboards,
      this.gpus
  ];

  constructor() { }
  getAllProducts() {
      const temp = [];
      for (const products of this.products) {
          for (const product of products) {
              if (product.stock > 0) {
                  temp.push(product);
              }
          }
      }
      return temp;
  }
  getProduct(id: string){
    const products = this.products.find(product => {
        return product.find(prod => {
            return prod.id === id;
          });
      });
    if (products) {
    return products.find(prod => {
        return prod.id === id;
      });
    }
    return {};
  }
  deleteProduct(id: string) {
      this.cpus = this.cpus.filter(product => {
          return product.id !== id;
      });
      this.rams = this.rams.filter(product => {
          return product.id !== id;
      });
      this.motherboards = this.motherboards.filter(product => {
          return product.id !== id;
      });
      this.gpus = this.gpus.filter(product => {
          return product.id !== id;
      });
  }
  addCpu(
      id: string,
      model: string,
      brand: string,
      imageUrl: string,
      type: string,
      price: number,
      stock: number,
      baseClock: number,
      boostClock: number,
      coreCount: number,
      threadCount: number
  ) {
        this.cpus.push({
            id,
            model,
            brand,
            imageUrl,
            type,
            price,
            stock,
            base_clock: baseClock,
            boost_clock: boostClock,
            core_count: coreCount,
            thread_count: threadCount
        });
        this.refreshProduct();
    }
    addRam(
        id: string,
        model: string,
        brand: string,
        imageUrl: string,
        type: string,
        price: number,
        stock: number,
        speed: number,
        size: number,
        pcs: string
    ) {
        this.rams.push({
            id,
            model,
            brand,
            imageUrl,
            type,
            price,
            stock,
            speed,
            size,
            pcs
        });
        this.refreshProduct();
    }
    addMotherboard(
        id: string,
        model: string,
        brand: string,
        imageUrl: string,
        type: string,
        price: number,
        stock: number,
        chipset: string,
        forCpuBrand: string,
    ) {
        this.motherboards.push({
            id,
            model,
            brand,
            imageUrl,
            type,
            price,
            stock,
            chipset,
            for_cpu_brand: forCpuBrand
        });
        this.refreshProduct();
    }
    addGpu(
        id: string,
        model: string,
        brand: string,
        imageUrl: string,
        type: string,
        price: number,
        stock: number
    ) {
        this.gpus.push({
            id,
            model,
            brand,
            imageUrl,
            type,
            price,
            stock
        });
        this.refreshProduct();
    }
    refreshProduct(){
        this.products = [
            this.cpus,
            this.rams,
            this.motherboards,
            this.gpus
        ];
    }
}
