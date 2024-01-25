"use client";

import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();

  function refreshLoginState(data) {
    setUser(data);
  }

  return (
    <AuthContext.Provider value={{ user, refreshLoginState }}>
      {children}
    </AuthContext.Provider>
  );
}
