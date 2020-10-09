import { Component, OnInit } from '@angular/core';
import {ProductsService} from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  products;
  constructor(
      private productService: ProductsService
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
  changeToGrid() {
    document.getElementById('btnGrid').style.display = 'none';
    document.getElementById('btnList').style.display = 'initial';
    document.getElementById('contentGrid').style.display = 'initial';
    document.getElementById('contentList').style.display = 'none';
  }
  changeToList(){
    document.getElementById('btnGrid').style.display = 'initial';
    document.getElementById('btnList').style.display = 'none';
    document.getElementById('contentGrid').style.display = 'none';
    document.getElementById('contentList').style.display = 'initial';
  }
}
