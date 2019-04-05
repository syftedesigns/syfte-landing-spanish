import { Component, OnInit } from '@angular/core';
import { SliderService } from 'src/app/services/slideshow/slider.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-button-slider',
  templateUrl: './button-slider.component.html',
  styleUrls: ['./button-slider.component.css']
})
export class ButtonSliderComponent implements OnInit {
  public currentPage: number = 0;
  public duration: number = 4500;
  constructor(public _paginator: SliderService) { }

  ngOnInit() {
    setTimeout((): void => {
      this.currentPage = this._paginator.currentPosition;
    }, 300);
  }
  /*
  Slider arrows
  */
  ChangePositionToLeft(currentPosition: number): void {
    // Si la posición es 0, esta en la primera pagina y pasamos a la ultima
    if (currentPosition === 0) {
      this._paginator.currentPosition = (currentPosition + 6);
      // Habilitamos la posición para que pueda cambiar de pagina
      for (const page of this._paginator._slideIems) {
        if (page.position === this._paginator.currentPosition) {
          page.Displayed = true;
        }
        if (page.position === currentPosition) {
          page.Displayed = false;
        }
      }
    }
    // Significa que no esta en la pagina 1
    if (currentPosition !== 0) {
      this._paginator.currentPosition = (currentPosition - 1);
      for (const page of this._paginator._slideIems) {
        if (page.position === this._paginator.currentPosition) {
          page.Displayed = true;
        }
        if (page.position === currentPosition) {
          page.Displayed = false;
        }
      }
    }
    this._paginator.LastPosition = currentPosition;
    $('html, body').animate({ scrollTop: 0 }, 300);
  }
  changePositionToRight(currentPosition: number): void {
    if (this._paginator.currentPosition >= 6) {
      this._paginator.currentPosition = 0;
      for (const page of this._paginator._slideIems) {
        if (page.position === this._paginator.currentPosition) {
          page.Displayed = true;
        }
        if (page.position === currentPosition) {
          page.Displayed = false;
        }
      }
    } else {
      this._paginator.currentPosition = (currentPosition + 1);
      for (const page of this._paginator._slideIems) {
        if (page.position === this._paginator.currentPosition) {
          page.Displayed = true;
        }
        if (page.position === currentPosition) {
          page.Displayed = false;
        }
      }
    }
    // this._paginator.LastPosition = currentPosition;
    // this._paginator.ChangingPosition = true;
    this._paginator.ChangingManualSlider.emit(true);
    $('html, body').animate({ scrollTop: 0 }, 300);
  }
  /* End slider arrows */
  /* Slider points */
  changeToPageWithPoint(pagePosition: number): void {
    if (pagePosition === this.currentPage) {
      return;
    }
    // Cambiar de posición de pagina
    for (const page of this._paginator._slideIems) {
      if (page.position === pagePosition) {
        page.Displayed = true;
      }
      if (this.currentPage === page.position) {
        page.Displayed = false;
      }
    }
    this._paginator.currentPosition = pagePosition;
    this.currentPage = pagePosition;
  }
  /* End Slider Points */
}
