import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  // user: null = logged out, object = logged in, undefined = loading
  const [user, setUser] = useState(undefined);

  // Simulate loading user from storage (auto-login for now)
  const hydrate = async () => {
    setTimeout(() => {
      // 👇 Auto-login mock user (goes straight to HomeScreen)
      setUser({
        id: 'u1',
        name: 'Demo User',
        email: 'demo@example.com',
      });
    }, 300);
  };

  const login = async (email, password) => {
    // mock login success
    setUser({ id: 'u1', name: 'Demo User', email });
  };

  const signup = async (name, email, password) => {
    // mock signup success
    setUser({ id: 'u1', name, email });
  };

  const logout = async () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, hydrate }}>
      {children}
    </AuthContext.Provider>
  );
}
