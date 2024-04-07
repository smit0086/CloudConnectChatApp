import { useEffect, useRef } from "react";
import { useAuth } from "./useAuth";
import { Chat } from "../service/chatService";
import { useQueryClient } from "@tanstack/react-query";

export const useChatSockets = () => {
    const socketRef = useRef<WebSocket>()
    const {getIdToken, user} = useAuth();
    const queryClient = useQueryClient();
    useEffect(() => {
        socketRef.current = new WebSocket(import.meta.env.VITE__SOCKET_ADDRESS as string);
        socketRef.current.onopen = () => {
            const registerToken = async () => {
                const token = await getIdToken();
                socketRef.current?.send(JSON.stringify({action: "registerToken", message: token}))
            }
            registerToken();
        }
        socketRef.current.onmessage = (e) => {
            console.log("data", e.data)
            const parseMessage: Chat = JSON.parse(e.data);
            const sender = parseMessage.sender;
            if(sender !== user?.email) {
                queryClient.setQueryData(["chats", sender], (oldData: Chat[] | undefined) => {
                    console.log(oldData, parseMessage)
                    return oldData ? [...oldData, parseMessage] : [parseMessage]
                })
            }
        }
        return () => {
            socketRef.current?.close()
        }
    }, []);
};