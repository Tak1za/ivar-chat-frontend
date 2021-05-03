import React from "react";
import { Switch, Route } from "react-router-dom";
import Signup from "./components/Signup/Signup";
import Home from "./components/Home/Home";
import { useAuth } from "./contexts/AuthContext";
import Login from "./components/Login/Login";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ChatRoom from "./components/ChatRoom/ChatRoom";
import AllChats from "./components/AllChats/AllChats";
import { Container } from "react-bootstrap";
import Auth from "./components/Logout/Logout";

function App() {
  const { currentUser } = useAuth();
  return (
    <Container className="d-flex justify-content-between">
      {currentUser ? <AllChats /> : null}
      <Container className="d-flex flex-column">
        {currentUser ? <Auth /> : null}
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute path="/chatroom" component={ChatRoom} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
        </Switch>
      </Container>
    </Container>
  );
}

export default App;
