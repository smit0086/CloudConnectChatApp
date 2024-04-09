import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { Credentials, useAuth } from "../hooks/useAuth";
import { StyledLoginForm, StyledLoginSurface } from "./StyledLogin";
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
import { StyledCard } from "../components/ui/Card/Card";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useCustomSnackbar } from "../components/ui/CustomSnackbarProvider/CustomSnackbarProvider";
import { Link, useHistory } from "react-router-dom";

type CredentialsKeys = keyof Credentials;

/**
 * Login page.
 */
export default function SignupPage() {
    const [credentials, setCredentials] = useState<Credentials>({
        email: "",
        password: "",
    });
    const userIdRef = useRef<string>("");
    const [name, setName] = useState<string>("");
    const [code, setCode] = useState<string>("");
    const { signUp, signupUserStatus, confirmCode } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const { show } = useCustomSnackbar();
    const history = useHistory();
    useEffect(() => {
        if (signupUserStatus === "confirmed") {
            show("Signup confirmed! Please login.", "success");
            history.push("/login");
        } else if (signupUserStatus === "unconfirmed") {
            show("Please confirm your email address.", "info");
        }
    }, [signupUserStatus]);
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        userIdRef.current = credentials.email;
        await signUp({
            ...credentials,
            name,
        });
    }

    async function handleConfirmCode(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        await confirmCode(code, userIdRef.current);
        userIdRef.current = "";
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.name === "name") {
            setName(event.target.value);
            return;
        } else if (event.target.name === "code") {
            setCode(event.target.value);
            return;
        }
        const { name, value } = event.target;

        const key = name as CredentialsKeys;
        setCredentials({
            ...credentials,
            [key]: value,
        });
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    if (signupUserStatus === "confirmed") {
        return <p>Signup confirmed</p>;
    }
    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

   
    return (
        <StyledLoginSurface>
            {signupUserStatus === "unconfirmed" ? (
                <>
                    <StyledLoginForm onSubmit={handleConfirmCode}>
                        <StyledCard>
                            <Typography variant="h3">Signup</Typography>
                            <TextField
                                style={{
                                    marginTop: "16px",
                                    marginBottom: "16px",
                                }}
                                name="code"
                                id="standard-name"
                                label="Code"
                                variant="outlined"
                                fullWidth
                                value={code}
                                onChange={handleInputChange}
                            />
                            <Button variant="contained" type="submit">
                                Verify
                            </Button>
                        </StyledCard>
                    </StyledLoginForm>
                </>
            ) : (
                <>
                    {signupUserStatus === "confirmed" ? (
                        <p>Signup confirmed</p>
                    ) : (
                        <>
                            <StyledLoginForm onSubmit={handleSubmit}>
                                <StyledCard>
                                    <Typography variant="h3">Signup</Typography>
                                    <TextField
                                        style={{
                                            marginTop: "16px",
                                            marginBottom: "16px",
                                        }}
                                        name="name"
                                        id="standard-name"
                                        label="Name"
                                        variant="outlined"
                                        fullWidth
                                        value={name}
                                        onChange={handleInputChange}
                                    />
                                    <TextField
                                        style={{
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
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={
                                                            handleClickShowPassword
                                                        }
                                                        onMouseDown={
                                                            handleMouseDownPassword
                                                        }
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
                                        Signup
                                    </Button>
                                    <div>
                    <Link to="/login"><Button type="button" variant="text">Login instead</Button></Link>
                    </div>
                                </StyledCard>
                            </StyledLoginForm>
                        </>
                    )}
                </>
            )}
        </StyledLoginSurface>
    );
}
