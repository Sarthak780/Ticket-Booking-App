import { Seat } from './app/app.component';

export const seatData: Seat[][] = Array.from({ length: 11 }, (_, rowIndex) => {
  const rowSize = rowIndex === 10 ? 3 : 7;
  return Array.from({ length: rowSize }, (_, seatIndex) => ({
    seatNumber: rowIndex * 7 + seatIndex + 1,
    isAvailable: Math.random() > 0.3, // (30% booked)
  }));
});
