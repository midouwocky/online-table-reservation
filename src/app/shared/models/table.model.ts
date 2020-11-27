export class Table {
    id: number;
    location: string;
    sits: number;
    reservations: Reservation[];
}

export class Reservation {
    start: number;
    end: number;
}

export interface TableFilter {
    range?: { start: number, end: number };
    sits?: number;
}
