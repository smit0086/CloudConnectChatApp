import styled from "@emotion/styled";
import { OutlinedInput, OutlinedInputProps } from "@mui/material";
import { Theme } from '@mui/material/styles';


interface StyledOutlinedInputProps extends OutlinedInputProps {
    theme: Theme
}
export const StyledOutlinedInput = styled(OutlinedInput)<StyledOutlinedInputProps>`
    background-color: ${props => props.theme.palette.primary.light};
`