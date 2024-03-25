import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FunctionComponent,
} from "react";

// Define the shape of the context's value
interface AuthContextType {
  isGuest: boolean;
  isLoggedIn: boolean;
  handleLogin: () => void;
  handleLogout: () => void;
  handleGuestUser: () => void;
}

// Create the context with a default undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the props for the provider component
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component that will wrap your app or part of it
export const AuthProvider: FunctionComponent<AuthProviderProps> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isGuest, setIsGuest] = useState<boolean>(false);

  const handleLogin = () => {
    if (isGuest) {
      setIsGuest(false);
    }
    setIsLoggedIn(true);
  };
  const handleLogout = () => setIsLoggedIn(false);
  const handleGuestUser = () => setIsGuest(true);

  return (
    <AuthContext.Provider
      value={{
        isGuest,
        isLoggedIn,
        handleLogin,
        handleLogout,
        handleGuestUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
