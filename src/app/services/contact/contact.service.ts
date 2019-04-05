import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientContact } from 'src/app/classes/client.class';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { ProposalData } from 'src/app/classes/proposal.class';
import { LOCAL_ENVIROMENT } from 'src/app/classes/enviroment';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  public FormSent: boolean = false;
  public author: string = 'root';
  constructor(private _http: HttpClient, private snackBar: MatSnackBar) { }

  // Contact Form
  ContactSyfte(ticket: ClientContact, urlToSend?: string) {
    const url = `./sendgrid/${urlToSend}.php`;
    const form = new FormData();
    form.append('name', ticket.name);
    form.append('phone', ticket.phone);
    form.append('email', ticket.email);
    form.append('message', ticket.message);
    return this._http.post(url, form).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError( (err: any)  => {
        console.error(err);
        this.snackBar.open('Ops! We have problems to process your data. Please try again', null, {
          duration: 5000,
          panelClass: ['red-snackbar']
        });
        return new Observable<string | boolean>();
      })
    );
  }
  ProposalSyfte(DataProposal: ProposalData, urlToSend: string, withAttach: boolean) {
    const url = `./sendgrid/${urlToSend}.php`;
    const form = new FormData();
    form.append('name', DataProposal.name);
    form.append('phone', DataProposal.phone);
    form.append('email', DataProposal.email);
    form.append('country', DataProposal.country);
    form.append('service', DataProposal.service);
    if (withAttach) {
        form.append('attachment',
        DataProposal.attachment,
        DataProposal.attachment.name);
    }
    return this._http.post(url, form).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError( (err: any)  => {
        console.error(err);
        this.snackBar.open('Ops! We have problems to process your data. Please try again', null, {
          duration: 5000,
          panelClass: ['red-snackbar']
        });
        return new Observable<string | boolean>();
      })
    );
  }
  Newsletter(email: string) {
    const url = `${LOCAL_ENVIROMENT}/newsletter.php?operationType=newsletter`;
    const form = new FormData();
    form.append('email', email);
    return this._http.post(url, form).pipe(
      map((resp: any) => {
        return resp;
      }),
      catchError( (err: any)  => {
        console.error(err);
        this.snackBar.open('Ops! We have problems to process your data. Please try again', null, {
          duration: 5000,
          panelClass: ['red-snackbar']
        });
        return new Observable<string | boolean>();
      })
    );
  }
}
