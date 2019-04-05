import { Component, OnInit, Inject } from '@angular/core';
import { SliderService } from 'src/app/services/slideshow/slider.service';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-visual',
  templateUrl: './visual.component.html',
  styleUrls: ['./visual.component.css']
})
export class VisualComponent implements OnInit {

  constructor(private _slidePage: SliderService, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    for (const app of this._slidePage._slideIems) {
      if (app.reference === 'visual' && app.Displayed) {
        this.document.body.removeAttribute('class');
        this.document.body.classList.add('theme-visual-design');
      }
    }
  }

}
