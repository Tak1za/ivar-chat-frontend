import React from "react";
import { Switch, Route } from "react-router-dom";
import Signup from "./components/Signup/Signup";
import Home from "./components/Home/Home";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./components/Login/Login";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ChatRoom from "./components/ChatRoom/ChatRoom";
import AllChats from "./components/AllChats/AllChats";

function App() {
  return (
    <AuthProvider>
      <div className="d-flex justify-content-between">
        <AllChats />
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute path="/chatroom" component={ChatRoom} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
        </Switch>
      </div>
    </AuthProvider>
  );
}

export default App;
