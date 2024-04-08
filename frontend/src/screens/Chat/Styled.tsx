import styled from "@emotion/styled";

export const StyledChatContainer = styled.div`
    display: flex;
    height: 100%;
`

export const StyledChatListContainer = styled.div`
    width: 300px;

`
export const StyledChatList = styled.div`
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    & button {
        width: 100%;
        margin: 0;
        display: block; 
        text-align: left;
        text-decoration: none;
    }
    & a {
        text-decoration: none;
        &:active {
            color: inherit;
        }
    }
`
export const StyledActiveChatContainer = styled.div`
    flex-grow: 1;
    margin-left: 40px;
`

export const StyledActiveChat = styled.div`
    transform: translateY(-12px);
    display: flex;
    flex-direction: column;
    height: 100%;
`

export const StyledMessagesContainer = styled.div`
    flex-grow: 1;
    overflow-y: auto;
    max-height: calc(100vh - 180px);
    padding: 16px;
`