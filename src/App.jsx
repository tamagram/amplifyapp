import { useState, useEffect, createContext } from "react";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import { I18n } from "aws-amplify";
import {
  AmplifySignIn,
  AmplifySignOut,
  AmplifyAuthenticator,
} from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";

import Editor from "./components/Editor";
import Preview from "./components/Preview";

const dict = {
  ja: {
    "Forgot your password?": "パスワードを忘れた場合",
    "Reset password": "パスワードをリセット",
    "No account?": "アカウントを持っていない場合",
    "Create account": "サインアップ",
    "Sign Out": "サインアウト",
  },
};

I18n.putVocabularies(dict);
I18n.setLanguage("ja");

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
      <AmplifySignIn
        slot="sign-in"
        hideSignUp={true}
        headerText="アカウントにサインインする"
        submitButtonText="サインイン"
        formFields={[
          {
            type: "username",
            label: "ユーザー名",
            placeholder: "ユーザー名を入力してください",
          },
          {
            type: "password",
            label: "パスワード",
            placeholder: "パスワードを入力してください",
          },
        ]}
      />
    </AmplifyAuthenticator>
  );
}

export default App;
