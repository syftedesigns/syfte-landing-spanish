import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SliderService } from './slideshow/slider.service';
import { MenuService } from './menu/menu.service';
import { ContactService } from './contact/contact.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    SliderService,
    MenuService,
    ContactService
  ]
})
export class ServicesModule { }
