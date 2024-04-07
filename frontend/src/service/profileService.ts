import { getMethod, postMethod, postMultiPartMethod } from "../utils/utilts"
export const defaultAvatarURL = "https://sp-ao.shortpixel.ai/client/q_lossless,ret_img,w_250/https://miamistonesource.com/wp-content/uploads/2018/05/no-avatar-25359d55aa3c93ab3466622fd2ce712d1.jpg";

export interface UserDetails {
    avatarURL: string;
    attr: {
        name: string;
        email: string;
        sub: string;
    };
}
export const getUserDetails = async (token: string) => {
    const response: UserDetails = await getMethod(
        `${import.meta.env.VITE__SERVER_ADDRESS}/profile`,
        true,
        token
    )
    if(!response.avatarURL){
        response.avatarURL = defaultAvatarURL
    }
    return response
}

export const updateProfile = async (token: string, body: any) => {
    return await postMultiPartMethod(
        `${import.meta.env.VITE__SERVER_ADDRESS}/profile/picture`,
        body,
        true,
        token
    )
}