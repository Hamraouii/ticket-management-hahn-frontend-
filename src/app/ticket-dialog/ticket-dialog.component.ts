import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ticket-dialog',
  templateUrl: './ticket-dialog.component.html'
})
export class TicketDialogComponent {
  newTicket = { description: '', status: '' };
  statusOptions = ['Open', 'In Progress', 'Closed'];

  constructor(public dialogRef: MatDialogRef<TicketDialogComponent>) {}

  createTicket() {
    this.dialogRef.close(this.newTicket);
  }
}
