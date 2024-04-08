import React, { useEffect } from "react";
import moment from "moment";
import { StyledAvatar, StyledMessageBubble, StyledMessageContainer, StyledSenderName, StyledTimestamp } from "./Styled";
import { ListSubheader, MenuItem, Select } from "@mui/material";
import { translateMessage } from "../../../service/translationService";
import { useAuth } from "../../../hooks/useAuth";

interface MessageProps {
    message: string;
    timestamp: string;
    isCurrentUser: boolean;
    senderName: string;
    senderAvatar: string;
    translationLanguages: any;
}

export const Message: React.FC<MessageProps> = (props) => {
    console.log(props.translationLanguages);
    const [selectedLanguage, setSelectedLanguage] = React.useState<string>("");
    const [displayMessage, setDisplayMessage] = React.useState<string>(props.message);
    const {getIdToken} = useAuth();
    useEffect(() => {
        const fn = async () => {
            if (selectedLanguage) {
                const token = await getIdToken();
                const translation = await translateMessage(token, props.message, selectedLanguage);
                console.log(translation);
                setDisplayMessage(translation.TranslatedText);
            }
        }
        fn();
    }, [selectedLanguage])
    return (
        <StyledMessageContainer isCurrentUser={props.isCurrentUser}>
            <StyledAvatar src={props.senderAvatar} alt={props.senderName}/>
            <StyledMessageBubble isCurrentUser={props.isCurrentUser}>
                {
                    props.isCurrentUser ? null : <StyledSenderName>{props.senderName}</StyledSenderName>
                }
                {displayMessage}
                {
                    props.timestamp ? <StyledTimestamp>{moment(props.timestamp, false).format("h:m a")}</StyledTimestamp> : null
                }
            </StyledMessageBubble>
            <div>
            <Select onChange={e => {
                setSelectedLanguage(e.target.value as string);
            }}>
                <ListSubheader>Translate this message to</ListSubheader>
                {props.translationLanguages?.Languages.map((language: any) => (
                    <MenuItem key={language.LanguageCode} value={language.LanguageCode}>{language.LanguageName}</MenuItem>
                ))}
            </Select>
            </div>
        </StyledMessageContainer>
    );
};