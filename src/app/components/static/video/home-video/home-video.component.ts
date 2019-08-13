import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-home-video',
  templateUrl: './home-video.component.html',
  styleUrls: ['./home-video.component.css']
})
export class HomeVideoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // Para los navegadores que no soportan el autoplay
    $(document).ready(() => {
      $('#video-bg')[0].autoplay = true;
    });
  }

}
