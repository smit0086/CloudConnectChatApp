import moment from "moment";
import {
    StyledAvatar,
    StyledChatCard,
    StyledChatCardHeader,
    StyledChatDetails,
    StyledChatMetadata,
    StyledLastMessage,
    StyledLastSenderName,
    StyledSenderName,
    StyledTimestamp,
} from "./Styled";

interface ChatCardProps {
    senderName: string;
    senderAvatar: string;
    lastMessage: string;
    lastMessageTimestamp: string;
    lastMessageSentByCurrentUser: boolean;
    selected: boolean;
}

export const ChatCard: React.FC<ChatCardProps> = (props) => {
    return (
        <StyledChatCard selected={props.selected}>
            <StyledAvatar src={props.senderAvatar} alt={props.senderName} />
            <StyledChatDetails>
                <StyledSenderName>{props.senderName}</StyledSenderName>
                <StyledLastMessage selected={props.selected}>{props.lastMessageSentByCurrentUser && (<StyledLastSenderName>You: </StyledLastSenderName>)}{props.lastMessage}</StyledLastMessage>
            </StyledChatDetails>
            <StyledChatMetadata>
                <StyledTimestamp>
                    {moment(props.lastMessageTimestamp).fromNow()}
                </StyledTimestamp>
            </StyledChatMetadata>
        </StyledChatCard>
    );
};
