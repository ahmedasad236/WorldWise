import { createContext, useContext, useReducer } from 'react';

const initialState = {
  user: null,
  isAuth: false
};

function reducer(state, action) {
  switch (action.type) {
    case 'auth/login':
      return { ...state, user: action.payload, isAuth: true };
    case 'auth/logout':
      return { ...state, user: null, isAuth: false };
    case 'failed':
      return;
    default:
      throw new Error('Unknown action type');
  }
}

const AuthContext = createContext();
function AuthProvider({ children }) {
  const [{ user, isAuth }, dispatch] = useReducer(reducer, initialState);
  function login(email, password) {}

  function logout() {
    dispatch({ type: 'logout' });
  }

  return (
    <AuthContext.Provider value={{ user, isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error('AuthContext was used outside of AuthProvider');
  return context;
}

export { AuthProvider, useAuth };
