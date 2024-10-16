import { Component, OnInit } from '@angular/core';
import { TicketService } from '../services/ticket.service';
import { Ticket, Status, UpdateTicketDto } from '../models/Ticket.model';
import { MatDialog } from '@angular/material/dialog';
import { TicketDialogComponent } from '../ticket-dialog/ticket-dialog.component';
import { tick } from '@angular/core/testing';


@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [];
  statusOptions: Status[] = [];
  editingTicket: UpdateTicketDto | null = null;
  currentPage: number = 1;
  itemsPerPage: number = 4; 
  totalPages: number = 0;
  

  constructor(private ticketService: TicketService, public dialog: MatDialog) { }

  openAddTicketDialog(): void {
    const dialogRef = this.dialog.open(TicketDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tickets.push(result);
      }
    });
  }

  next(){
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadTickets();
    }
  }
  previous(){
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadTickets();
    }
  }

  ngOnInit(): void {
    this.loadTickets();
    this.statusOptions = this.ticketService.getStatusOptions();
  }

  loadTickets(): void {
    this.ticketService.getTickets(this.currentPage, this.itemsPerPage).subscribe(
      (data: any) => {
        console.log(data.items)
        this.tickets = data.items.map((ticket:any)=>({...ticket,status:ticket.status==1?"Closed":"Open"}));
        this.totalPages = Math.ceil(data.totalCount / this.itemsPerPage);
        
      },
      error => {
        console.error('Error fetching tickets', error);
      }
    );
  }


  private mapStatus(status: number): Status {
    return status === 0 ? Status.Open : Status.Closed;
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