import { useState, useEffect, createContext, useContext } from "react";
import logo from "./logo.svg";
import { Form, FloatingLabel, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import {
  AmplifySignIn,
  AmplifySignOut,
  AmplifyAuthenticator,
} from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";

import Editor from "./components/Editor";
import Preview from "./components/Preview";

export const SkuContext = createContext();

function App() {
  const [authState, setAuthState] = useState();
  const [user, setUser] = useState();

  const [sku, setSku] = useState("000000000-000");
  const value = {
    sku,
    setSku,
  };

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  return authState === AuthState.SignedIn && user ? (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <AmplifySignOut className="btn" />
      </header>
      <main>
        <SkuContext.Provider value={value}>
          <Editor />
        </SkuContext.Provider>
        <Preview sku={sku} />
      </main>
    </div>
  ) : (
    <AmplifyAuthenticator>
      <AmplifySignIn slot="sign-in" hideSignUp={true} />
    </AmplifyAuthenticator>
  );
}

export default App;
