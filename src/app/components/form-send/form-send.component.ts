import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { ContactService } from 'src/app/services/contact/contact.service';
import { DOCUMENT } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-send',
  templateUrl: './form-send.component.html',
  styleUrls: ['./form-send.component.css']
})
export class FormSendComponent implements OnInit, OnDestroy {
  public author: string;
  constructor(public _contact: ContactService, @Inject(DOCUMENT) private document: Document,
  public _router: Router) {
    this._contact.FormSent = true;
  }

  ngOnInit() {
    this.document.body.removeAttribute('class');
    this.document.body.classList.add('theme-thank');
    if (this._contact.author !== 'root') {
      this.author = this._contact.author;
    } else {
      this._router.navigate(['/']);
    }
  }
  ngOnDestroy() {
    this._contact.FormSent = false;
    this.document.body.removeAttribute('class');
    this._contact.author = 'root';
    this.author = '';
  }

}
