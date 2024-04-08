import { useQuery } from "@tanstack/react-query";
import { getTranslationLanguages } from "../service/translationService";
import { useAuth } from "./useAuth";

export const useTranslation = () => {
    const {getIdToken} = useAuth();
    const data = useQuery({
        queryKey: ["translationLanguages"],
        queryFn: async () => {
            const token = await getIdToken();
            return await getTranslationLanguages(token);
        }
    })
    return {
        translationLanguages: data.data,
        isTranslationLanguagesLoading: data.isLoading
    };
}