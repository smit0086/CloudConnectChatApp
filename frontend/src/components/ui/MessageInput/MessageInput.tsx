import { IconButton, OutlinedInputProps } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { StyledOutlinedInput } from "./Styled";

interface MessageInputProps extends OutlinedInputProps {
    onSend: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const MessageInput: React.FC<MessageInputProps> = (props) => {
    return (
        <StyledOutlinedInput
            {...props}
            fullWidth
            placeholder="Your message"
            endAdornment={
                <IconButton onClick={props.onSend}>
                    <SendIcon />
                </IconButton>
            }
        />
    );
};
