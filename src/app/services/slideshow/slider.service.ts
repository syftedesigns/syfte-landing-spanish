import { Injectable, Output, EventEmitter } from '@angular/core';
import { SlideComponent } from 'src/app/classes/slide.class';

@Injectable({
  providedIn: 'root'
})
export class SliderService {
  public _slideIems: SlideComponent[] = [];
  public currentPosition: number = 0;
  public LastPosition: number = 0;
  public duration: number = 4500;
  public ChangingPosition: boolean = false;
  @Output() interval: EventEmitter<number> = new EventEmitter<number>();
  @Output() ChangingManualSlider: EventEmitter<boolean> = new EventEmitter<boolean>();
  public Destroyed: boolean = false;
  public toLeft: boolean = false;
  public toRight: boolean = false;
  constructor() {
  }
}
