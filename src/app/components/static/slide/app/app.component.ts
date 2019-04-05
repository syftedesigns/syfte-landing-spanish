import { Component, OnInit, Inject } from '@angular/core';
import { SliderService } from 'src/app/services/slideshow/slider.service';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private _slidePage: SliderService, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    for (const app of this._slidePage._slideIems) {
      if (app.reference === 'app' && app.Displayed) {
        this.document.body.removeAttribute('class');
        this.document.body.classList.add('theme-app2');
      }
    }
  }

}
