import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu/menu.service';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
import { ContactService } from '../services/contact/contact.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {
  tags = {
    title: ''
  };
  constructor(public _menu: MenuService, private route: Router,
    private title: Title, private meta: Meta, public _contact: ContactService) {
      this.getEvents();
    }

  ngOnInit() {
  }
  getEvents() {
    /*this.route.events.subscribe (
      (response: any) => console.log(response));*/
      this.route.events.pipe(
        filter(  target => target instanceof ActivationEnd ),
        filter(  (target: ActivationEnd) => target.snapshot.firstChild === null),
        map( (target: ActivationEnd) => {
          return target.snapshot.data;
        })
      ).subscribe(
        (resp: any) => {
          this.tags = resp;
          this.title.setTitle('Syfte | ' + resp.Title);
        }
      );
  }
}
