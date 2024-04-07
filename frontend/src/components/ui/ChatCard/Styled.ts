import styled from "@emotion/styled";
import { Theme } from "@mui/material";

interface StyledChatCardProps {
    theme: Theme;
    selected: boolean;
}
export const StyledChatCard = styled.div<StyledChatCardProps>`
    display: flex;
    border-radius: 8px;
    padding: 16px;
    background-color: ${props => props.selected ? props.theme.palette.primary.light : '#f9fafc'};
`;

export const StyledAvatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 8px;
`;

export const StyledChatDetails = styled.div`
    flex-grow: 1;
    margin-left: 16px;
`;

export const StyledChatCardHeader = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const StyledSenderName = styled.div`
    font-weight: bold;
    font-size: 1.2em;
`;

interface StyledLastMessageProps {
    theme: Theme;
    selected: boolean;
}
export const StyledLastMessage = styled.div<StyledLastMessageProps>`
    color: ${props => props.selected ? props.theme.palette.primary.main : 'black'};
    font-size: 1em;
    margin-top: 4px;
    margin-bottom: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

interface StyledLastSenderNameProps {
    theme: Theme;
}
export const StyledLastSenderName = styled.span<StyledLastSenderNameProps>`
    color: ${props => props.theme.palette.primary.main};
`;

export const StyledChatMetadata = styled.div``;

export const StyledTimestamp = styled.div`
    font-size: 0.8em;
    color: #8c8c8c;
`;