import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';

interface Ticket {
  description: string;
  status: string;
  date: Date;
}

@Component({
  selector: 'app-ticket-dialog',
  templateUrl: './ticket-dialog.component.html',
  styleUrls: ['./ticket-dialog.component.scss']
})
export class TicketDialogComponent {
  newTicket: Ticket = {
    description: '',
    status: '',
    date: new Date()
  };
  statusOptions: string[] = ['Open', 'Closed'];

  constructor(public dialogRef: MatDialogRef<TicketDialogComponent>) {}

  createTicket(form: NgForm): void {
    if (form.valid) {
      this.dialogRef.close(this.newTicket);
    }
  }
}