import {  OutlinedInputProps } from "@mui/material";
import {  StyledSearchAdornment, StyledSearchInput } from "./Styled";
import { Search } from "@mui/icons-material";

interface SearchInputProps extends OutlinedInputProps {
}

export const SearchInput: React.FC<SearchInputProps> = (props) => {
    return (
        <StyledSearchInput 
        {...props}
        fullWidth
        size="small"
        placeholder="Search"
            startAdornment={
                <StyledSearchAdornment>
                    <Search />
                </StyledSearchAdornment>
            }
        />
    );
}