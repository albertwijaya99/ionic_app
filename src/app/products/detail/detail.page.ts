import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../products.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  id: string;
  loadedProduct: any;
  constructor(
      private activatedRoute: ActivatedRoute,
      private productService: ProductsService
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('id')) { return; }
      this.id = paramMap.get('id');
      console.log(this.id);
      this.loadedProduct = this.productService.getProduct(this.id);
      console.log(this.loadedProduct);
    });
  }
}
