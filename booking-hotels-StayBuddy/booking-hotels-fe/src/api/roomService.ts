import { callApi } from "./apiUtils";

export const getRoom = async (roomId : string) => {
    const response = await callApi('GET', `/rooms/${roomId}`);
    return response.data;
}
