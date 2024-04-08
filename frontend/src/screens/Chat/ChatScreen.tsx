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
import { Button, ButtonBase, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField } from "@mui/material";
import { useChatSockets } from "../../hooks/useChatSockets";
import { Add } from "@mui/icons-material";
import { useState } from "react";

const ChatScreen = () => {
    const { friends, areFriendsLoading, friendsMap, addFriend, isFriendAdding } = useFriends();
    const { user } = useAuth();

    const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    useChatSockets();

    console.log(friends);
    return (
        <StyledChatContainer>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: "form",
                    onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const email = (event.target as any).email.value;
                        await addFriend(email);
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Add friend</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter email and hit add to add a friend
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">{isFriendAdding ? "Adding...": "Add"}</Button>
                </DialogActions>
            </Dialog>
            <StyledChatListContainer>
                {areFriendsLoading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        <SearchInput />
                        <Button
                            style={{ marginTop: "8px" }}
                            variant="contained"
                            color="primary"
                            startIcon={<Add />}
                            fullWidth
                            onClick={handleClickOpen}
                        >
                            Add Friends
                        </Button>
                        <StyledChatList>
                            {friends.map((friend) => (
                                <Link to={`/chat/${friend.email}`}>
                                    <ButtonBase>
                                        <ChatCard
                                            key={friend.email}
                                            senderName={friend.name}
                                            senderAvatar={friend.avatarURL}
                                            lastMessage={
                                                friend.lastMessageDetails
                                                    ?.message || ""
                                            }
                                            lastMessageSentByCurrentUser={
                                                friend.lastMessageDetails
                                                    ?.sender === user?.email
                                            }
                                            lastMessageTimestamp={
                                                friend.lastMessageDetails
                                                    ?.sentAt ||
                                                new Date().toDateString()
                                            }
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
                    <Route exact path="/chat"></Route>
                    <Route path="/chat/:chatId">
                        <ChatDetails friendsMap={friendsMap} />
                    </Route>
                </Switch>
            </StyledActiveChatContainer>
        </StyledChatContainer>
    );
};

export default ChatScreen;
