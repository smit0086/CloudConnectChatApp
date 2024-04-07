import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import AuthenticatedRoute from "./components/authn/AuthenticatedRoute";
import UnauthenticatedOnlyRoute from "./components/authn/UnauthenticatedOnlyRoute";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/layout/Layout";
import ChatScreen from "./screens/Chat/ChatScreen";
import { useChatSockets } from "./hooks/useChatSockets";
import Profile from "./screens/Profile/Profile";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Switch>
                    <UnauthenticatedOnlyRoute path="/login">
                        <LoginPage />
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
        </AuthProvider>
    );
}

export default App;
