import { useState } from 'react';
import Register from "./components/Register";
import Login from "./components/Login";
import GPS from './components/GPS';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [token, setToken] = useState(null); // Authentication token
  const [isAdmin, setIsAdmin] = useState(false); // Admin role
  const [showLogin, setShowLogin] = useState(false); // Toggle between Login and Register

  // Handle successful login
  const handleLoginSuccess = (receivedToken) => {
    try {
      const decodedToken = JSON.parse(atob(receivedToken.split('.')[1]));
      setToken(receivedToken);
      setIsAdmin(decodedToken.isAdmin);
    } catch (err) {
      console.error("Invalid token:", err);
    }
  };

  return (
    <div>
      {!token ? (
        showLogin ? (
          <>
            <Login
              setToken={handleLoginSuccess}
              onLoginSuccess={() => setShowLogin(false)}
            />
            <p>
              Dont have an account?{" "}
              <button onClick={() => setShowLogin(false)}>Register</button>
            </p>
          </>
        ) : (
          <>
            <Register onRegisterSuccess={() => setShowLogin(true)} />
            <p>
              Already have an account?{" "}
              <button onClick={() => setShowLogin(true)}>Login</button>
            </p>
          </>
        )
      ) : isAdmin ? (
        <AdminDashboard />
      ) : (
        <GPS token={token} />
      )}
    </div>
  );
}
