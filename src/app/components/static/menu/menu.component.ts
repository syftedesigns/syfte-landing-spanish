import { Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener,
  OnDestroy } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/services/menu/menu.service';
import { SliderService } from 'src/app/services/slideshow/slider.service';
@Component({
 selector: 'app-menu',
 templateUrl: './menu.component.html',
 styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy, AfterViewInit {
 public sticky: boolean = false;
 MenuPosition: number;
 // Para saber la posición del menu
 @ViewChild('stickyMenu') stickyMenu: ElementRef;
 // Verificamos cuando el DOM hace scrolling
 @HostListener('window:scroll', ['$event']) scrolling() {
   const windowScroll = window.pageYOffset;
   if (windowScroll > this.MenuPosition) {
     this.sticky = true;
   } else {
     this.sticky = false;
   }
 }
 constructor(private _navigate: Router, public _menu: MenuService,
   private _slide: SliderService) { }

 ngOnInit() {
 }
 ngOnDestroy() {
 }
 ngAfterViewInit() {
   this.MenuPosition = this.stickyMenu.nativeElement.offsetTop;
 }
 ToggleOverlayMenu(event: any): void {
   $(document).ready((): void => {
     event.preventDefault();
     $('.menu-digital').hide();
     $('.menu-overlay').toggleClass('open');
     $('.menu').toggleClass('open');
     this._menu.OnPopup = true;
     this._slide.ChangingPosition = true;
   });
 }
 CloseOverlayMenu(event: any): void  {
   $(document).ready((): void => {
     event.preventDefault();
     $('.menu-digital').show();
     $('.menu-overlay').removeClass('open');
     $('.menu').removeClass('open');
     this._menu.OnPopup = false;
   });
 }
 ToRouting(sendToUrl: string): void {
   $(document).ready((): void => {
     $('.menu-digital').show();
     $('.menu-overlay').removeClass('open');
     $('.menu').removeClass('open');
     $('html, body').animate({ scrollTop: 0 }, 300);
   });
   this._navigate.navigate([`/${sendToUrl}`]);
   this.sticky = false;
   this._menu.OnPopup = false;
 }
}
