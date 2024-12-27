import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const Login = ({ setToken, onLoginSuccess }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    setMessage(''); // Reset message on new attempt

    try {
      const response = await axios.post('http://localhost:3100/api/users/login', formData);
      const token = response.data.token;

      localStorage.setItem('authToken', token);
      setToken(token); 
      setMessage('Sign In Successful!');
      
      if (onLoginSuccess) {
        onLoginSuccess(); 
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMessage('Invalid username or password.');
      } else {
        setMessage('An unexpected error occurred. Please try again later.',error);
      }
      console.error('Error during login:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white items-center justify-center px-6">
  <div className="w-full max-w-md">
    <div className="text-center">
      <h2 className="mt-6 text-2xl font-bold tracking-tight">
        Login to your account
      </h2>
    </div>
    <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-gray-800 p-6 rounded-lg shadow-lg">
      <div>
        <label htmlFor="username" className="block text-sm font-medium">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          required
          value={formData.username}
          onChange={handleChange}
          className="mt-2 w-full rounded-md bg-gray-700 px-3 py-2 text-sm text-gray-300 focus:outline-indigo-500"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          value={formData.password}
          onChange={handleChange}
          className="mt-2 w-full rounded-md bg-gray-700 px-3 py-2 text-sm text-gray-300 focus:outline-indigo-500"
        />
      </div>
      <button
        type="submit"
        className={`w-full rounded-md bg-indigo-600 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500 ${
          loading ? 'cursor-not-allowed bg-gray-500' : ''
        }`}
        disabled={loading}
      >
        {loading ? 'Signing In...' : 'Sign In'}
      </button>
    </form>
    {message && (
      <p className="mt-4 text-center text-sm text-red-500">{message}</p>
    )}
    <p className="mt-6 text-center text-sm">
      Not a member?{' '}
      <button
        onClick={() => onLoginSuccess && onLoginSuccess('register')}
        className="font-semibold text-indigo-400 hover:text-indigo-300"
      >
        Create an account
      </button>
    </p>
  </div>
</div>

  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
  onLoginSuccess: PropTypes.func, 
};

export default Login;
