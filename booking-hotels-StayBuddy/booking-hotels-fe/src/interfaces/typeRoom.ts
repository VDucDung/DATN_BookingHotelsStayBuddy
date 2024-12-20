import { Room } from "@/type/room";
import { Hotel } from "./hotel";

export interface TypeRoom {
  id: number;
  name: string;
  description: string;
  rooms: Room[];
  hotel: Hotel;
  hotelId?: number;
}

export interface TypeRoomDto {
  id?: number;
  name: string;
  description: string;
  hotelId?: number;
}

export interface GettypeRoomsResponse{
  statusCode: number;
  message: string;
  data: TypeRoom[];
}

export interface GettypeRoomResponse{
  statusCode: number;
  message: string;
  data: TypeRoom[];
}
export interface TypeRoomState {
  typeRooms: TypeRoom[] | [];
  typeRoom: TypeRoom | null;
  loading: boolean;
  statusCode: number | null;
  error: string | null;
  message: string;
}

export interface TypeRoom {
  id: number;
  name: string;
  description: string;
  createdAt: string;
}

export interface HotelData {
  hotelName: string;
  typeRooms: TypeRoom[];
}

export interface GroupedRoomTypes {
  hotelName: string;
  roomTypes: TypeRoom[];
}
export interface RoomTypesData {
  [hotelId: string]: {
    hotelName: string;
    typeRooms: TypeRoom[];
  };
}
