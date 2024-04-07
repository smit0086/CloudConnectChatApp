import React from "react";
import moment from "moment";
import { StyledAvatar, StyledMessageBubble, StyledMessageContainer, StyledSenderName, StyledTimestamp } from "./Styled";

interface MessageProps {
    message: string;
    timestamp: string;
    isCurrentUser: boolean;
    senderName: string;
    senderAvatar: string;
}

export const Message: React.FC<MessageProps> = (props) => {
    return (
        <StyledMessageContainer isCurrentUser={props.isCurrentUser}>
            <StyledAvatar src={props.senderAvatar} alt={props.senderName}/>
            <StyledMessageBubble isCurrentUser={props.isCurrentUser}>
                {
                    props.isCurrentUser ? null : <StyledSenderName>{props.senderName}</StyledSenderName>
                }
                {props.message}
                {
                    props.timestamp ? <StyledTimestamp>{moment(props.timestamp, false).format("h:m a")}</StyledTimestamp> : null
                }
            </StyledMessageBubble>
        </StyledMessageContainer>
    );
};