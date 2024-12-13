import { Component } from '@angular/core';
import { seatData } from '../test-data';

export interface Seat {
  seatNumber: number;
  isAvailable: boolean;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  numSeats : number;
  seats: Seat[][] = [];
  bookedSeats: number[] = [];
  totalAvailableSeats: number = 0;

  ngOnInit() {
    // seatData in production will be fetched from DB in array of Seat[] format
    // and ith index of array represents i+1nth row
    this.seats = seatData;
    // Will be fetched from BE
    this.totalAvailableSeats = this.calculateTotalAvailableSeats();
  }

  calculateTotalAvailableSeats(): number {
    return this.seats.reduce(
      (total, row) => total + row.filter((seat) => seat.isAvailable).length,
      0
    );
  }

  bookSeats(numSeats: number) {
    if (numSeats <= 0) {
      alert('Please select at least one seat to book.');
      return;
    }
    if (numSeats > 7) {
      alert("More than 7 seats can't be booked at once.");
      return;
    }
    if (numSeats > this.totalAvailableSeats) {
      alert('Insufficient seats available.');
      return;
    }

    const bookedSeats: number[] = [];
    let availableSeats: Seat[] = [];

    // Book seats in a single row if possible
    for (const row of this.seats) {
      const rowAvailableSeats = row.filter((seat) => seat.isAvailable);

      // Store all available seats
      availableSeats.push(...rowAvailableSeats);

      if (rowAvailableSeats.length >= numSeats) {
        for (let i = 0; i < numSeats; i++) {
          rowAvailableSeats[i].isAvailable = false;
          bookedSeats.push(rowAvailableSeats[i].seatNumber);
        }
        // Updating total seats
        this.totalAvailableSeats -= numSeats;

        this.bookedSeats = bookedSeats;
        return;
      }
    }

    // Book seats across rows if not available in a single row
    for (let i = 0; i < numSeats; i++) {
      if (availableSeats[i]) {
        availableSeats[i].isAvailable = false;
        bookedSeats.push(availableSeats[i].seatNumber);
      }
    }

    // Update total available seats
    this.totalAvailableSeats -= bookedSeats.length;

    this.bookedSeats = bookedSeats;
  }
}
