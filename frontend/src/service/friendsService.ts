import { getMethod, postMethod } from "../utils/utilts";
import { defaultAvatarURL } from "./profileService";

export interface FriendResponse {
    [key: string]: {
        avatarURL: string;
        attr: {
            name: string;
            email: string;
            sub: string;
        };
        last_message_details: {
            id: string;
            message: string;
            sentAt: string;
            sender: string;
        };
    };
}
export const getFriends = async (token: string) => {
    const response: FriendResponse = await getMethod(
        `${import.meta.env.VITE__SERVER_ADDRESS}/friends`,
        true,
        token
    );
    for(const key in response) {
        if(!response[key].avatarURL){
            response[key].avatarURL = defaultAvatarURL;
        }
    }
    return response;
};


export const addFriend = async (email: string, token: string) => {
    const body = {
        email: email,
    }
    await postMethod(
        `${import.meta.env.VITE__SERVER_ADDRESS}/friends/add`,
        body,
        true,
        token
    );
    return true;
}