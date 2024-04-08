import { getMethod, postMethod } from "../utils/utilts"

export const getTranslationLanguages = async (token: string) => {
    return await getMethod(
        `${import.meta.env.VITE__SERVER_ADDRESS}/translation/languages`,
        true,
        token
    )
}

export const translateMessage = async (token: string, message: string, targetLanguage: string) => {
    const body = {
        text: message,
        lang: targetLanguage
    }
    return await postMethod(
        `${import.meta.env.VITE__SERVER_ADDRESS}/translation/translate`,
        body,
        true,
        token
    )
}