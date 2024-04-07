import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth"
import { getChatMessages, sendMessage } from "../service/chatService";

export const useChats = (chatId: string) => {
    const {getIdToken} = useAuth();
    const data = useQuery({
        queryKey: ['chats', chatId],
        queryFn: async () => {
            const token = await getIdToken();
            return await getChatMessages(token, chatId);
        },
        enabled: !!chatId
    })
    const {mutate} = useMutation({
        mutationFn: async (message: string) => {
            const token = await getIdToken();
            return await sendMessage(token, chatId, message);
        },
        onSettled: () => {
            data.refetch();
        }
    })
    return {
        chats: data.data,
        areChatsLoading: data.isLoading,
        sendMessage: mutate
    }
}