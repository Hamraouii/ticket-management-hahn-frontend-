export enum Status {
    Open = 'Open',
    Closed = 'Closed'
  }
  
  export interface Ticket {
    id: number;
    description: string;
    status: Status;
    date: string;
  }
  
  export interface CreateTicketDto {
    description: string;
    status: Status;
  }
  
  export interface UpdateTicketDto {
    id:number;
    description?: string;
    status?: Status;
  }