import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import AuthenticatedRoute from "./components/authn/AuthenticatedRoute";
import UnauthenticatedOnlyRoute from "./components/authn/UnauthenticatedOnlyRoute";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/layout/Layout";
import ChatScreen from "./screens/Chat/ChatScreen";
import Profile from "./screens/Profile/Profile";
import SignupPage from "./pages/SignupPage";
import CustomSnackbarProvider from "./components/ui/CustomSnackbarProvider/CustomSnackbarProvider";

function App() {
    return (
        <AuthProvider>
                <BrowserRouter>
                    <Switch>
                        <UnauthenticatedOnlyRoute path="/login">
                            <LoginPage />
                        </UnauthenticatedOnlyRoute>
                        <UnauthenticatedOnlyRoute path="/signup">
                            <SignupPage />
                        </UnauthenticatedOnlyRoute>
                        <Layout>
            <CustomSnackbarProvider>

                            <AuthenticatedRoute path="/" exact={true}>
                                <Redirect to={"/chat"} />
                            </AuthenticatedRoute>
                            <AuthenticatedRoute path="/chat" exact={false}>
                                <ChatScreen />
                            </AuthenticatedRoute>
                            <AuthenticatedRoute path="/profile">
                                <Profile />
                            </AuthenticatedRoute>
            </CustomSnackbarProvider>
                        </Layout>
                    </Switch>
                </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
