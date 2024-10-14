import { Component, OnInit } from '@angular/core';
import { TicketService } from '../services/ticket.service';
import { Ticket, Status, CreateTicketDto, UpdateTicketDto } from '../models/Ticket.model';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [];
  statusOptions: Status[] = [];
  newTicket: CreateTicketDto = { description: '', status: Status.Open };
  editingTicket: UpdateTicketDto | null = null;

  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {
    this.loadTickets();
    this.statusOptions = this.ticketService.getStatusOptions();
  }

  loadTickets(): void {
    this.ticketService.getTickets().subscribe(
      (data: Ticket[]) => {
        this.tickets = data;
      },
      error => {
        console.error('Error fetching tickets', error);
      }
    );
  }

  createTicket(): void {
    this.ticketService.createTicket(this.newTicket).subscribe(
      (createdTicket: Ticket) => {
        this.tickets.push(createdTicket);
        this.newTicket = { description: '', status: Status.Open };
      },
      error => {
        console.error('Error creating ticket', error);
      }
    );
  }

  startEdit(ticket: Ticket): void {
    this.editingTicket = { ...ticket };
  }

  cancelEdit(): void {
    this.editingTicket = null;
  }

  updateTicket(): void {
    if (this.editingTicket && this.editingTicket.id) {
      this.ticketService.updateTicket(this.editingTicket.id, this.editingTicket).subscribe(
        (updatedTicket: Ticket) => {
          const index = this.tickets.findIndex(t => t.id === updatedTicket.id);
          if (index !== -1) {
            this.tickets[index] = updatedTicket;
          }
          this.editingTicket = null;
        },
        error => {
          console.error('Error updating ticket', error);
        }
      );
    }
  }

  deleteTicket(id: number): void {
    this.ticketService.deleteTicket(id).subscribe(
      () => {
        this.tickets = this.tickets.filter(t => t.id !== id);
      },
      error => {
        console.error('Error deleting ticket', error);
      }
    );
  }

  getStatusColor(status: Status): string {
    return status === Status.Open ? 'green' : 'red';
  }
}