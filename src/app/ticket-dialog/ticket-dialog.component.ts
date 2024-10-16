import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { TicketService } from '../services/ticket.service';  // Adjust the path as needed
import { CreateTicketDto, Status } from '../models/Ticket.model';  // Adjust the path as needed

@Component({
  selector: 'app-ticket-dialog',
  templateUrl: './ticket-dialog.component.html',
  styleUrls: ['./ticket-dialog.component.scss'],
})
export class TicketDialogComponent {
  newTicket: CreateTicketDto = {
    description: '',
    status: 0,  
    date: this.formatDate(new Date()),  // Default to today's date
  };

  statusOptions: string[] = ['Open', 'Closed'];
  errorMessage: string | null = null;

  constructor(
    private ticketService: TicketService,
    public dialogRef: MatDialogRef<TicketDialogComponent>
  ) {}

  // Helper function to format date to 'YYYY-MM-DD'
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Ensure 2 digits
    const day = String(date.getDate()).padStart(2, '0');          // Ensure 2 digits
    return `${year}-${month}-${day}`;
  }

  createTicket(form: NgForm): void {
    if (form.valid) {

      this.newTicket.status = form.controls['status'].value === 'Closed' ? 1: 0;

      const ticketToSend = { ...this.newTicket, date: this.newTicket.date };

      this.ticketService.createTicket(ticketToSend).subscribe({
        next: (ticket) => this.dialogRef.close(ticket),
        error: (err) => {
          this.errorMessage = 'Failed to create the ticket. Please try again.';
        },
      });
    }
  }
}
