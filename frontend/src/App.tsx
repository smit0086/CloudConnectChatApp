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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
const queryClient = new QueryClient()
return (
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
            <CustomSnackbarProvider>
                <BrowserRouter>
                    <Switch>
                        <UnauthenticatedOnlyRoute path="/login">
                            <LoginPage />
                        </UnauthenticatedOnlyRoute>
                        <UnauthenticatedOnlyRoute path="/signup">
                            <SignupPage />
                        </UnauthenticatedOnlyRoute>
                        <Layout>

                            <AuthenticatedRoute path="/" exact={true}>
                                <Redirect to={"/chat"} />
                            </AuthenticatedRoute>
                            <AuthenticatedRoute path="/chat" exact={false}>
                                <ChatScreen />
                            </AuthenticatedRoute>
                            <AuthenticatedRoute path="/profile">
                                <Profile />
                            </AuthenticatedRoute>
                        </Layout>
                    </Switch>
                </BrowserRouter>
            </CustomSnackbarProvider>
        </AuthProvider>
        </QueryClientProvider>
    );
}

export default App;
