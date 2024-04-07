import { Call, CallOutlined, VideoCall, VideoCallOutlined } from "@mui/icons-material";
import { StyledActionsContainer, StyledChatHeader, StyledChatHeaderTitle } from "./Styled";
import { IconButton } from "@mui/material";

interface ChatHeaderProps {
    senderName: string;
}

export const ChatHeader: React.FC<ChatHeaderProps> = (props) => {
    return (
        <StyledChatHeader>
            <StyledChatHeaderTitle>{props.senderName}</StyledChatHeaderTitle>
            <StyledActionsContainer>
                <IconButton>
                    <VideoCallOutlined />
                </IconButton>
            </StyledActionsContainer>
        </StyledChatHeader>
    );
}