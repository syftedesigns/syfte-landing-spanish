import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { SliderService } from 'src/app/services/slideshow/slider.service';
import { SlideComponent } from 'src/app/classes/slide.class';
import { DOCUMENT } from '@angular/platform-browser';
import * as $ from 'jquery';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  public SlidePages: SlideComponent[] = [];
  public currentPage: number = 0;
  public interval: any;
  constructor(public _slide: SliderService, @Inject(DOCUMENT) private _document: Document) {
    setTimeout((): void => {
      if (!this._slide.Destroyed) {
        this._slide.ChangingManualSlider.emit(false);
      } else {
       this._slide.ChangingManualSlider.emit(true);
       this._slide.Destroyed = false;
      }
    }, 500);
  }

  async ngOnInit() {
    this._slide.ChangingManualSlider.subscribe({
      next: async (BooleanValue: boolean) => {
        if (BooleanValue) {
          // Significa que le dio a alguna flecha
          // Y si le da alguna flecha destruimos todo y reiniciamos el slider en la ultima posición
          console.log(this._slide.currentPosition);
          this.currentPage = this._slide.currentPosition  + 1;
          console.log(this.currentPage);
          this._slide.currentPosition = 0;
          this._slide.LastPosition = 0;
          this.currentPage = 0;
          this._slide._slideIems = [];
          this.SlidePages = [];
          const page = await this.CreateSlideItems();
          if (page) {
            this.SlidePages = this._slide._slideIems;
            setTimeout((): void => {
              this.changeSliderPageAuto();
            }, 5000);
          }
        } else {
          const PagesSliding = await this.CreateSlideItems();
          if (PagesSliding) {
                  this.SlidePages = this._slide._slideIems;
                  this._slide.currentPosition = 0;
                  this._slide.LastPosition = 0;
                  this.currentPage = 0;
                  this.changeSliderPageAuto();
                  this._slide.interval.emit(5000);
          }
          return;
        }
      }
    });
  }
  ngOnDestroy() {
    // Destruimos todo
    this._document.body.removeAttribute('class');
    this._slide._slideIems = [];
    this.SlidePages = [];
    this._slide.currentPosition = 0;
    this._slide.LastPosition = 0;
    this.currentPage = 0;
    this._slide.interval.unsubscribe();
    this._slide.Destroyed = true;
    this._slide.ChangingManualSlider.emit(false);
  }
  CreateSlideItems(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      // SliderPages
      const WebDesignComponent = new SlideComponent('web_design', true, 0);
      const VisualComponent = new SlideComponent('visual', false, 1);
      const BackendComponent = new SlideComponent('backend', false, 2);
      const AppComponent = new SlideComponent('app', false, 3);
      const UxComponent = new SlideComponent('ux', false, 4);
      const BrandingComponent = new SlideComponent('branding', false, 5);
      const MarketingComponent = new SlideComponent('marketing', false, 6);
      // const AdwordComponent = new SlideComponent('adword', false, 7);
      this._slide._slideIems.push(WebDesignComponent);
      this._slide._slideIems.push(VisualComponent);
      this._slide._slideIems.push(BackendComponent);
      this._slide._slideIems.push(AppComponent);
      // this._slide._slideIems.push(AdwordComponent);
      this._slide._slideIems.push(UxComponent);
      this._slide._slideIems.push(BrandingComponent);
      this._slide._slideIems.push(MarketingComponent);
      if (this._slide._slideIems.length >= 6 && this._slide._slideIems !== undefined) {
        resolve(true);
      }
    });
  }
  // Cambiar slider dinamicamente
  changeSliderPageAuto(interval?: number): void {
    this._slide.interval.subscribe({
      next: (event: number): void => {
      // Si no hay cambio manual, se mueve automaticamente
        this.interval = setInterval((): void => {
          if (!this._slide.ChangingPosition) {
            // console.log('current ' + this.currentPage);
            console.log('service ' + this._slide.currentPosition);
            if (this.currentPage === this._slide.currentPosition) {
              for (const page of this._slide._slideIems) {
                if (page.position === this._slide.currentPosition) {
                  page.Displayed = false;
                }
              }
            } else {
              return;
            }
            this._slide.currentPosition = (this._slide.currentPosition + 1);
            if (this._slide.currentPosition >= 6) {
              this._slide.currentPosition = 0;
            }
            for (const page of this._slide._slideIems) {
              if (page.position === this._slide.currentPosition) {
                page.Displayed = true;
              }
            }
              this.currentPage = this._slide.currentPosition;
          } else {
            return;
          }
        }, event);
        $('html, body').animate({ scrollTop: 0 }, 300);
      }
    }
  );
  }
}
