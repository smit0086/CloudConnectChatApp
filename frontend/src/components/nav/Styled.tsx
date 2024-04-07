import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const StyledNavOutline = styled.nav`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    height: 100vh;
    position: fixed;
    width: 100px;
    padding: 16px;
`

export const StyledLogoContainer = styled.div`
    width: 100%;
    padding: 16px;
    & > img {
        width: 100%;
    }
`

export const StyledButton = styled(Button)`
    flex-direction: column;
    text-transform: none;
    color: #f9fafc;
`

export const StyledNavList = styled.ul`
    margin-top: 72px;
    flex-grow: 1;
    list-style-type: none;
`