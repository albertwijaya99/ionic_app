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
    this.products = this.productService.getAllProducts();
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
