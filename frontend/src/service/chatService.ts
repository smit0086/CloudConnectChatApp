import { getMethod, postMethod } from "../utils/utilts";

export interface Chat {
    id: string;
    message: string;
    sentAt: string;
    sender: string;
}

export const getChatMessages = async (token: string, email: string) => {
    const response: Chat[] = await getMethod(
        `${import.meta.env.VITE__SERVER_ADDRESS}/chat?email=${encodeURIComponent(email)}`,
        true,
        token
    );
    return response;
}

export const sendMessage = async (token: string, email: string, message: string) => {
    const body = {
        to: email,
        message
    }
    const response: {
        message: string;
    } = await postMethod(`${import.meta.env.VITE__SERVER_ADDRESS}/chat`, body, true, token);
    return response;
}