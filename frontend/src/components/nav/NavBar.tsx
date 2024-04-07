import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Chat, Logout, Person, VerifiedUser } from "@mui/icons-material";
import {
    StyledButton,
    StyledLogoContainer,
    StyledNavList,
    StyledNavOutline,
} from "./Styled";
import { Button } from "@mui/material";

interface NavIconButtonProps {
    icon: React.ReactNode;
    text: string;
    onClick: () => void;
}

const NavIconButton: React.FC<NavIconButtonProps> = ({
    icon,
    text,
    onClick,
}) => {
    return (
        <StyledButton variant="text" onClick={onClick}>
            <div>{icon}</div>
            <div>{text}</div>
        </StyledButton>
    );
};

export default function NavBar() {
    const { logOut } = useAuth();

    async function handleLogOut() {
        await logOut();
    }

    return (
        <StyledNavOutline>
            <StyledLogoContainer>
                <img src="/logo.svg" alt="Logo" />
            </StyledLogoContainer>
            <StyledNavList>
                <li>
                    <Link to="/chat">
                        <NavIconButton
                            icon={<Chat />}
                            text="Chat"
                            onClick={() => {}}
                        />
                    </Link>
                </li>
                <li>
                    <Link to="/profile">
                        <NavIconButton
                            icon={<Person />}
                            text="Profile"
                            onClick={() => {}}
                        />
                    </Link>
                </li>
            </StyledNavList>

            <NavIconButton
                icon={<Logout />}
                text="Log out"
                onClick={handleLogOut}
            />
        </StyledNavOutline>
    );
}
