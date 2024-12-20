import { Ticket, TicketParam } from "@/interfaces/ticket";
import { callApi } from "./apiUtils";
import { Hotel, HotelDto } from "@/interfaces";
import {TypeRoomDto } from "@/interfaces/typeRoom";
import { Room, RoomDto } from "@/type/room";
import { ReviewDto } from "@/interfaces/review";
//Ticket
export const findTicketByPartnerId = async (): Promise<Ticket[]> => {
  const response = await callApi('GET', `/dashboard/tickets`);
  return response.data;
};

export const deleteBooking = async (bookingId: number) => {
  const response = await callApi('DELETE', `/dashboard/tickets/${bookingId}`, null, null);
  return response.data;
};

export const editBooking = async (bookingId: number, updatedData: Partial<TicketParam>) => {
  const response = await callApi('PUT', `/dashboard/tickets/${bookingId}`, null, updatedData);
  return response.data;
};
//type room
export const findTypeRoomByPartnerId = async () => {
  const response = await callApi('GET', `/dashboard/typeRooms`);
  return response.data;
};

export const createTypeRoomByPartnerId = async (typeRoomData: Partial<TypeRoomDto>)=> {
  const response = await callApi('POST', `/dashboard/typeRooms`, null, typeRoomData);
  return response.data;
};

export const updateTypeRoomByPartnerId = async (typeRoomId: number, typeRoomData: Partial<TypeRoomDto>)=> {
  const response = await callApi('PUT', `/dashboard/typeRooms/${typeRoomId}`, null, typeRoomData);
  return response.data;
};

export const deleteTypeRoomByPartnerId = async (typeRoomId: number)=> {
  const response = await callApi('DELETE', `/dashboard/typeRooms/${typeRoomId}`);
  return response.data;
};
//room
export const findRoomByPartnerId = async (): Promise<Room[]> => {
  const response = await callApi('GET', `/dashboard/rooms`);
  return response.data;
};

export const createRoom = async (roomData: Partial<RoomDto>) => {
  const { 
    description,
    images, 
    capacity,
    price,
    typeRoomId,
    options,
    roomName,
  } = roomData;

  const customHeaders = {
    'Content-Type': 'multipart/form-data',
  };

  const formData = new FormData();
  if (roomName) formData.append('roomName', roomName);
  if (capacity) formData.append('capacity', capacity.toString());
  if (price) formData.append('price', price.toString());
  if (typeRoomId) formData.append('typeRoomId', typeRoomId);
  if (description) formData.append('description', description);

  if (options) {
    formData.append('options', JSON.stringify(options));
  }

  if (images && images.length > 0) {
    images.forEach((image) => {
      formData.append('images', image);
    });
  }
  const response = await callApi('POST', `/dashboard/rooms`, null, formData, customHeaders);
  return response.data;
};

export const updateRoom = async (roomId: number, roomData: Partial<RoomDto>) => {
  const {
    roomName,
    description,
    images, 
    capacity,
    price,
    typeRoomId,
    options,
    oldImages
  } = roomData;

  const formData = new FormData();

  if (roomName) formData.append('roomName', roomName);
  if (description) formData.append('description', description);
  if (capacity !== undefined) formData.append('capacity', capacity.toString());
  if (price !== undefined) formData.append('price', price.toString());
  if (typeRoomId !== undefined) formData.append('typeRoomId', typeRoomId.toString());

  if (options && Array.isArray(options)) {
    formData.append('options', JSON.stringify(options));
  }

  if (images && images.length > 0) {
    images.forEach((image) => {
      formData.append('files', image);
    });
  }

  if (oldImages && oldImages.length > 0) {
    oldImages.forEach((imageUrl) => {
      formData.append('images', imageUrl);
    });
  }

  const customHeaders = {
    'Content-Type': 'multipart/form-data',
  };

  const response = await callApi('PUT', `/dashboard/rooms/${roomId}`, null, formData, customHeaders);

  return response.data;
};

export const deleteRoom = async (roomId: number) => {
  const response = await callApi('DELETE', `/dashboard/room/${roomId}`, null, null);
  return response.data;
};

//hotel
export const findHotelByPartnerId = async (): Promise<Hotel[]> => {
  const response = await callApi('GET', `/dashboard/hotels`);
  return response.data;
};

export const createHotel = async (hotelData: Partial<HotelDto>) => {
  const { 
    hotelName,
    address,
    contactPhone,
    description,
    images, 
  } = hotelData;

  const customHeaders = {
    'Content-Type': 'multipart/form-data',
  };

  const formData = new FormData();

  if (hotelName) formData.append('hotelName', hotelName);
  if (address) formData.append('address', address);
  if (contactPhone) formData.append('contactPhone', contactPhone);
  if (description) formData.append('description', description);

  if (images && images.length > 0) {
    images.forEach((image) => {
      formData.append(`files`, image); 
    });
  }

  const response = await callApi('POST', `/dashboard/hotels`, null, formData, customHeaders);
  return response.data;
};


export const updateHotel = async (hotelId: number, hotelData: Partial<HotelDto>) => {
  const { 
    hotelName,
    address,
    contactPhone,
    description,
    images, 
    oldImages
  } = hotelData;

  const customHeaders = {
    'Content-Type': 'multipart/form-data',
  };

  const formData = new FormData();

  if (hotelName) formData.append('hotelName', hotelName);
  if (address) formData.append('address', address);
  if (contactPhone) formData.append('contactPhone', contactPhone);
  if (description) formData.append('description', description);
  
  if (images && images.length > 0) {
    images.forEach((image) => {
      formData.append('files', image);
    });
  }
  if (oldImages && oldImages.length > 0) {
    oldImages.forEach((imageUrl) => {
      formData.append('images', imageUrl);
    });
  }

  const response = await callApi('PUT', `/dashboard/hotels/${hotelId}`, null, formData, customHeaders);
  return response.data;
};

export const deleteHotel = async (hotelId: number) => {
  const response = await callApi('DELETE', `/dashboard/hotels/${hotelId}`, null, null);
  return response.data;
};

//rating
export const getRatingByPartner = async () => {
  const response = await callApi('GET', `/dashboard/reviews`);
  return response.data;
};

export const createRatingByPartner = async (ratingData: Partial<ReviewDto>) => {
  const { 
    hotelId,
    comment,
    rating,
    images, 
    guest
  } = ratingData;

  const customHeaders = {
    'Content-Type': 'multipart/form-data',
  };

  const formData = new FormData();

  if (hotelId) formData.append('hotelId', hotelId.toString());
  if (comment) formData.append('comment', comment);
  if (rating) formData.append('rating', rating.toString());
  if (guest) formData.append('customerName', guest);


  if (images && images.length > 0) {
    images.forEach((image) => {
      formData.append(`files`, image); 
    });
  }

  const response = await callApi('POST', `dashboard/reviews`, null, formData, customHeaders);
  return response.data;
};

export const deleteRating = async (ratingId: number) => {
  const response = await callApi('DELETE', `/dashboard/reviews/${ratingId}`, null, null);
  return response.data;
};

//dashboard
export const getToatlBookings = async () => {
  const response = await callApi('GET', `/dashboard/total-bookings`);
  return response.data;
};

export const getToatlRevenue = async () => {
  const response = await callApi('GET', `/dashboard/total-revenue`);
  return response.data;
};

export const getMonthlyStats = async () => {
  const response = await callApi('GET', `/dashboard/monthly-stats`);
  return response.data;
};

export const getNewBooking = async () => {
  const response = await callApi('GET', `/dashboard/new-booking`);
  return response.data;
};
