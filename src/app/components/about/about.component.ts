import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {
  public DisplaySliderArrow: boolean = false;
  constructor(@Inject(DOCUMENT) private _document: Document) { }

  ngOnInit() {
    this._document.body.classList.add('theme-about');
  }
  ngOnDestroy() {
    this._document.body.removeAttribute('class');
  }

}
