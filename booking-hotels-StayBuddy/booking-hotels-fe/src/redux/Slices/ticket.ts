/* eslint-disable @typescript-eslint/no-explicit-any */
import { getTickets } from '@/api/getTicketService';
import { Ticket, TicketState } from '@/interfaces/ticket';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: TicketState = {
  tickets: [],
  loading: false,
  error: null,
  statusCode: null,
};

const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    clearTickets: (state) => {
      state.tickets = [];
    },
    setLoadingTicket: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    updateTicket: (state, action: PayloadAction<Ticket>) => {
      const index = state.tickets.findIndex(ticket => ticket.id === action.payload.id);
      if (index !== -1) {
        state.tickets[index] = action.payload;
      }
    },
    addTicket: (state, action: PayloadAction<Ticket>) => {
      state.tickets.push(action.payload);
    },
    removeTicket: (state, action: PayloadAction<string | number>) => {
      state.tickets = state.tickets.filter(ticket => ticket.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTickets.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.tickets = action.payload.data;
        state.statusCode = action.payload.statusCode;
        state.error = null;
      })
      .addCase(getTickets.rejected, (state: any, action: any) => {
        state.loading = false;
        state.statusCode = action.payload.statusCode;
        state.error = action.payload || { message: 'An unknown error occurred', status: 500 };
        state.tickets = [];
      });
  },
});

export const { clearTickets, setLoadingTicket, updateTicket, addTicket, removeTicket } = ticketSlice.actions;
export default ticketSlice.reducer;
