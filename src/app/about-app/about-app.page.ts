import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-app',
  templateUrl: './about-app.page.html',
  styleUrls: ['./about-app.page.scss'],
})
export class AboutAppPage implements OnInit {
  url = 'https://i.kym-cdn.com/photos/images/original/001/673/605/8bc.jpg';
  constructor() { }

  ngOnInit() {
  }

}
