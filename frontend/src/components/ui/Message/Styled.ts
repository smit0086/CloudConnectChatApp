import styled from "@emotion/styled";
import { Theme } from '@mui/material/styles';

interface StyledMessageContainerProps {
    isCurrentUser: boolean;
}
export const StyledMessageContainer = styled.div<StyledMessageContainerProps>`
    display: flex;
    flex-direction: ${props => props.isCurrentUser ? 'row-reverse' : 'row'};
`;

export const StyledAvatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 8px;
`;

interface StyledMessageBubbleProps {
    isCurrentUser: boolean;
    theme: Theme;
}
export const StyledMessageBubble = styled.div<StyledMessageBubbleProps>`
min-height: 25px;
    border-radius: 8px;
    padding: 8px;
    margin: 8px;
    margin-top: 0;
    background-color: ${props => props.isCurrentUser ? props.theme.palette.primary.main : props.theme.palette.primary.light};
    color: ${props => props.isCurrentUser ? 'white' : 'black'};
    max-width: 60%;
    word-wrap: break-word;
    position: relative;
`; 


interface StyledSenderNameProps {
    theme: Theme;
}
export const StyledSenderName = styled.div<StyledSenderNameProps>`
    font-size: 0.8em;
    margin-bottom: 4px;
    font-weight: bold;
    color: ${props => props.theme.palette.primary.main};
`

export const StyledTimestamp = styled.div`
    font-size: 0.8em;
    margin-top: 4px;
`;