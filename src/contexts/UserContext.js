import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <UserContext.Provider
      value={{
        username: [username, setUsername],
        password: [password, setPassword],
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
