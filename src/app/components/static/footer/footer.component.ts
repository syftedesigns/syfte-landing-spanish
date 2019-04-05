import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact/contact.service';
import { NgForm } from '@angular/forms';
import { PartialObserver } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private _contact: ContactService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }
  RegisterNewsletter(newsletter: NgForm): void {
    if (newsletter.invalid) {
      throw new Error('Form invalid');
    }
    this._contact.Newsletter(newsletter.value.email).subscribe(
      (observer: PartialObserver<any> | any): void => {
        if (observer.status) {
          this.snackBar.open('Thank you for register on our newsletter', null, {
            duration: 5000,
            panelClass: ['success-snackbar']
          });
          newsletter.reset();
        } else {
          this.snackBar.open('Sorry, this email has been previously affiliated', null, {
            duration: 5000,
            panelClass: ['red-snackbar']
          });
          newsletter.reset();
        }
      }
    );
  }
}
