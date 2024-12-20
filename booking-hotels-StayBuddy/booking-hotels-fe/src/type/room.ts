import { User } from "@/interfaces";
import { TypeRoom } from "@/interfaces/typeRoom";

export interface Room {
  id: number;
  roomName: string;
  description: string;
  capacity: number;
  images: string[];
  options: OptionDto[];
  price: number;
  bookingDate: Date;
  typeRoomId: TypeRoom;
  partner: User;
}

interface OptionDto {
  feature: string;
  availability: boolean;
}

export interface RoomDto {
  id?: number;
  roomName: string;
  description: string;
  capacity: number;
  images: File[] | string[];
  options: OptionDto[];
  price: number;
  typeRoomId: string;
  oldImages?: string[]
}
