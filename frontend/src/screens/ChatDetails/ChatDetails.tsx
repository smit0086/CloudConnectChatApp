import { RouterProps, useParams } from "react-router-dom";
import { ChatHeader } from "../../components/ui/ChatHeader/ChatHeader";
import { Message } from "../../components/ui/Message/Message";
import { MessageInput } from "../../components/ui/MessageInput/MessageInput";
import { FriendResponse } from "../../service/friendsService";
import { StyledActiveChat, StyledMessagesContainer } from "../Chat/Styled";
import { useChats } from "../../hooks/useChats";
import { useAuth } from "../../hooks/useAuth";
import { useLayoutEffect, useRef, useState } from "react";
import { useProfile } from "../../hooks/useProfile";

interface ChatDetailsProps {
    friendsMap: FriendResponse | undefined;
    translationLanguages: any;
}
const ChatDetails: React.FC<ChatDetailsProps> = (props) => {
    const { chatId } = useParams<{
        chatId: string;
    }>();
    const friendDetails = props.friendsMap?.[chatId];
    const { chats, areChatsLoading, sendMessage } = useChats(chatId);
    const {user} = useAuth();
    const {userDetails, isUserDetailsLoading} = useProfile();
    const [message, setMessage] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chats]);
    return (
        <StyledActiveChat>
            <ChatHeader senderName={friendDetails?.attr.name || ""} />
            {areChatsLoading || isUserDetailsLoading? (
                <div>Loading...</div>
            ) : (
                <>
                    <StyledMessagesContainer>
                        {
                            chats?.map((chat) => (
                                <Message
                                    key={chat.id}
                                    message={chat.message}
                                    timestamp={chat.sentAt}
                                    isCurrentUser={chat.sender === user?.email}
                                    senderAvatar={chat.sender === user?.email ? userDetails?.avatarURL || "" : friendDetails?.avatarURL || ""}
                                    senderName={chat.sender === user?.email ? user?.name : friendDetails?.attr.name || ""}
                                    translationLanguages={props.translationLanguages}
                                />
                            ))
                        }
                        <div ref={scrollRef}></div>
                    </StyledMessagesContainer>
                    <MessageInput value={message} onChange={e => setMessage(e.target.value)} onSend={() => {
                        sendMessage(message);
                        setMessage("");
                    }} />
                </>
            )}
        </StyledActiveChat>
    );
};

export default ChatDetails;
