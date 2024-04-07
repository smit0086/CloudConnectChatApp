import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { ChatCard } from "../../components/ui/ChatCard/ChatCard";
import { ChatHeader } from "../../components/ui/ChatHeader/ChatHeader";
import { Message } from "../../components/ui/Message/Message";
import { MessageInput } from "../../components/ui/MessageInput/MessageInput";
import { SearchInput } from "../../components/ui/SearchInput/SearchInput";
import { useAuth } from "../../hooks/useAuth";
import { useFriends } from "../../hooks/useFriends";
import {
    StyledActiveChat,
    StyledActiveChatContainer,
    StyledChatContainer,
    StyledChatList,
    StyledChatListContainer,
    StyledMessagesContainer,
} from "./Styled";
import ChatDetails from "../ChatDetails/ChatDetails";
import { Button, ButtonBase } from "@mui/material";
import { useChatSockets } from "../../hooks/useChatSockets";

const ChatScreen = () => {
    const { friends, areFriendsLoading,friendsMap } = useFriends();
    const {user} = useAuth();
    useChatSockets();

    console.log(friends);
    return (
        <StyledChatContainer>
            <StyledChatListContainer>
                {areFriendsLoading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        <SearchInput />
                        <StyledChatList>
                            {friends.map((friend) => (
                                <Link to={`/chat/${friend.email}`}>
                                    <ButtonBase>
                                    <ChatCard
                                        key={friend.email}
                                        senderName={friend.name}
                                        senderAvatar={friend.avatarURL}
                                        lastMessage={friend.lastMessageDetails?.message || ""}
                                        lastMessageSentByCurrentUser={friend.lastMessageDetails?.sender === user?.email}
                                        lastMessageTimestamp={friend.lastMessageDetails?.sentAt || new Date().toDateString()}
                                        selected={true}
                                    />
                                    </ButtonBase>
                                </Link>
                            ))}
                        </StyledChatList>
                    </>
                )}
            </StyledChatListContainer>
            <StyledActiveChatContainer>
                <Switch>
                    <Route exact path="/chat" >
                         
                    </Route>
                    <Route path="/chat/:chatId" >
                       <ChatDetails friendsMap={friendsMap}/>
                    </Route>
                </Switch>
            </StyledActiveChatContainer>
        </StyledChatContainer>
    );
};

export default ChatScreen;
