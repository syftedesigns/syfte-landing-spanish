import { Component, OnInit, Inject } from '@angular/core';
import { SliderService } from 'src/app/services/slideshow/slider.service';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-ux',
  templateUrl: './ux.component.html',
  styleUrls: ['./ux.component.css']
})
export class UxComponent implements OnInit {

  constructor(private _slidePage: SliderService, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    for (const app of this._slidePage._slideIems) {
      if (app.reference === 'ux' && app.Displayed) {
        this._slidePage.currentPosition = app.position;
        this.document.body.removeAttribute('class');
        this.document.body.classList.add('wow', 'bounceInDown', 'theme-ux');
      }
    }
  }

}
