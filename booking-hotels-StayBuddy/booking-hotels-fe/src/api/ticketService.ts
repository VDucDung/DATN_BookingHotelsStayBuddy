/* eslint-disable @typescript-eslint/no-explicit-any */
import { callApi } from "./apiUtils";
import { Ticket, TicketData } from "@/interfaces/ticket";

export const createTicket = async (ticketData: TicketData): Promise<Ticket> => {
  const response = await callApi('POST', `/tickets`, null, ticketData);
  return response.data;
};

export const getTicket = async (ticketId: string): Promise<Ticket> => {
  const response = await callApi('GET', `/tickets/${ticketId}`);
  return response.data;
};
