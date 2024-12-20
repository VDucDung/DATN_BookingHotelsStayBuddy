import { Room } from "@/type/room";

export interface GetRoomResponse{
  statusCode: number;
  message: string;
  data: Room;
}
