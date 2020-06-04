import React from "react";
import LoginPage from "./components/LoginPage";
import "antd/dist/antd.css";
import TokenContextProvider from "./contexts/TokenContext";
import HomePage from "./components/HomePage";
import RegistrationPage from "./components/RegistrationPage";

const App = () => {
  return (
    <div className="App">
      <TokenContextProvider>
        <HomePage />
      </TokenContextProvider>
    </div>
  );
};

export default App;
