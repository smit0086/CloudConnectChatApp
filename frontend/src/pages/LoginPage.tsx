import { ChangeEvent, FormEvent, useState } from "react";
import { Credentials, useAuth } from "../hooks/useAuth";
import { StyledLoginForm, StyledLoginSurface } from "./StyledLogin";
import { StyledCard } from "../components/ui/Card/Card";
import {
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";

type CredentialsKeys = keyof Credentials;

/**
 * Login page.
 */
export default function LoginPage() {
    const [credentials, setCredentials] = useState<Credentials>({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const auth = useAuth();

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        await auth.logIn(credentials);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        console.log(name, value);
        const key = name as CredentialsKeys;
        setCredentials({
            ...credentials,
            [key]: value,
        });
    }

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };
    return (
        <StyledLoginSurface>
            <StyledLoginForm onSubmit={handleSubmit}>
                <StyledCard>
                    <Typography variant="h3">Log in</Typography>
                    <TextField
                        style={{
                            marginTop: "16px",
                            marginBottom: "16px",
                        }}
                        name="email"
                        id="standard-email"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        value={credentials.email}
                        onChange={handleInputChange}
                    />
                    <FormControl
                        style={{
                            marginBottom: "16px",
                        }}
                        fullWidth
                        variant="outlined"
                    >
                        <InputLabel htmlFor="outlined-adornment-password">
                            Password
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? "text" : "password"}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                            name="password"
                            value={credentials.password}
                            onChange={handleInputChange}
                            fullWidth
                        />
                    </FormControl>
                    <Button variant="contained" type="submit">
                        Log in
                    </Button>
                    <div>
                    <Link to="/signup"><Button type="button" variant="text">Sign up</Button></Link>
                    </div>
                </StyledCard>
            </StyledLoginForm>
        </StyledLoginSurface>
    );
}
