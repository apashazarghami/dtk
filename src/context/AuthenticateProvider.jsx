import { createContext, useContext, useReducer } from "react";

const INITIAL_STATE = {
  isAuthenticated: false,
};

const authenticateReducer = (state, { type, payload }) => {
  switch (type) {
    case "AUTHENTICATE":
      return (state = {
        isAuthenticated: payload,
      });
    default:
      return state;
  }
};

const AuthenticateContext = createContext();

const AuthenticateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authenticateReducer, INITIAL_STATE);
  return (
    <AuthenticateContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthenticateContext.Provider>
  );
};

export default AuthenticateProvider;

export const useAuthenticate = () => useContext(AuthenticateContext);
