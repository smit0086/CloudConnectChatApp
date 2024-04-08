import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Credentials, useAuth } from "../hooks/useAuth";

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

    if(signupUserStatus === "confirmed") {
        return <p>Signup confirmed</p>
    }

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

    return (
        <>
            <h1>Signup</h1>
            {signupUserStatus === "unconfirmed" ? (
                <>
                    <form onSubmit={handleConfirmCode}>
                        <label>
                            Code:
                            <input
                                name="code"
                                value={code}
                                onChange={handleInputChange}
                                required
                            />
                        </label>
                        <button type="submit">Submit</button>
                    </form>
                </>
            ) : (
                <>
                    {signupUserStatus === "confirmed" ? (
                        <p>Signup confirmed</p>
                    ) : (
                        <>
                            <form onSubmit={handleSubmit}>
                                <label>
                                    Email:
                                    <input
                                        name="email"
                                        value={credentials.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </label>
                                <label>
                                    Password:
                                    <input
                                        name="password"
                                        type="password"
                                        value={credentials.password}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </label>
                                <label>
                                    Name:
                                    <input
                                        name="name"
                                        value={name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </label>
                                <button type="submit">Submit</button>
                            </form>
                        </>
                    )}
                </>
            )}
        </>
    );
}
