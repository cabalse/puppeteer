import React, { useState, createContext, ReactNode } from "react";

type props = {
  children?: ReactNode;
};

type AuthContextType = {
  user: any;
  signin: (user: string, pwd: string, callback: VoidFunction) => string;
  signout: (callback: VoidFunction) => void;
};

let AuthContext = createContext<AuthContextType>(null!);

const AuthProvider = ({ children }: props) => {
  let [user, setUser] = useState<any>(null);

  let signin = (user: string, pwd: string, callback?: VoidFunction): string => {
    if (user === "jobe" && pwd === "pwd") {
      setUser(user);
      if (callback) callback();
      return "";
    } else {
      return "Invalid username or password";
    }
  };
  let signout = (callback: VoidFunction) => {
    setUser(null);
    if (callback) callback();
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
