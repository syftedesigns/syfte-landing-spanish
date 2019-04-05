import { Component, OnInit, OnDestroy, Inject} from '@angular/core';
import { MenuService } from 'src/app/services/menu/menu.service';
import { DOCUMENT } from '@angular/platform-browser';
import { ContactService } from 'src/app/services/contact/contact.service';
import { NgForm } from '@angular/forms';
import * as $ from 'jquery';
import { MatSnackBar } from '@angular/material';
import { ProposalData } from 'src/app/classes/proposal.class';
import { PartialObserver } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, OnDestroy {

  public FileName: string;
  public Attachment: File;
  public attached: boolean = false;
  public loading: boolean = false;
  constructor(private _menu: MenuService, @Inject(DOCUMENT) private document: Document,
  private _contact: ContactService, private snackBar: MatSnackBar, private _router: Router) {
    this._menu.DarkMenu = true;
  }

  ngOnInit() {
    this.document.body.removeAttribute('class');
    this.document.body.classList.add('theme-contact');
  }
  ngOnDestroy() {
    this.document.body.removeAttribute('class');
    this._menu.DarkMenu = false;
    this.attached = false;
    this.FileName = null;
    this.Attachment = null;
  }
  ProposalData(formProposal: NgForm): void {
    if (formProposal.invalid) {
      throw new Error('Form invalid');
    }
    // Significa que tiene un file
    let Proposal: ProposalData;
    this.loading = true;
    if (this.attached) {
        Proposal = new ProposalData(formProposal.value.name, formProposal.value.email,
        formProposal.value.phone, this.ServiceType(formProposal.value.service), formProposal.value.country,
        this.Attachment);
    } else {
      Proposal = new ProposalData(formProposal.value.name, formProposal.value.email,
        formProposal.value.phone, this.ServiceType(formProposal.value.service), formProposal.value.country);
    }
    this._contact.author = formProposal.value.name;
    this._contact.ProposalSyfte(Proposal, 'attachment', this.attached).subscribe(
      (observer: PartialObserver<any> | any): void => {
        if (observer.status) {
          this.loading = false;
          this.snackBar.open('Operation Successfully!', null, {
            duration: 5000,
            panelClass: ['success-snackbar']
          });
          this._router.navigate(['/thank']);
        } else {
          this.snackBar.open('Ops! We have problems to process your data. Please try again', null, {
            duration: 5000,
            panelClass: ['red-snackbar']
          });
          throw new Error(observer);
        }
      }
    );
  }
  // Validator attachment
  FileAttachment(FileAttach: File): void {
    if (FileAttach.type === 'image/jpeg' || FileAttach.type === 'image/png'
    || FileAttach.type === 'image/jpg' || FileAttach.type === 'image/gif'
    || FileAttach.type === 'application/pdf' || FileAttach.type === 'text/plain') {
      this.FileName = FileAttach.name;
      this.Attachment = FileAttach;
      this.attached = true;
    } else {
      this.FileName = null;
      this.Attachment = null;
      this.attached = false;
      this.snackBar.open('The file must be pdf, txt, pdf, jpg, png, jpeg, gif', null, {
        duration: 5000,
        panelClass: ['red-snackbar']
      });
    }
  }
  TriggerFile(reference: string): void {
    $(`#${reference}`).trigger('click');
  }
  ServiceType(serviceNumber: string): string {
    switch (serviceNumber) {
      case '1':
        return 'App Development';
      case '2':
        return 'Marketing';
      case '3':
        return 'Branding';
      case '4':
        return 'Web Development';
      case '5':
        return 'Web Design';
      case '6':
        return 'UX/UI Design';
      case '7':
        return 'SEO & SEMM';
      default:
        return 'All';
    }
  }
}
