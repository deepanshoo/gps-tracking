import { useState } from 'react';
import axios from 'axios';


const Register = ({ onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    isAdmin: false,
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'radio') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value === 'true',
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3100/api/users/register', formData);
      setMessage(response.data.message || 'Sign Up Successful!');
      onRegisterSuccess();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Sign Up Failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Register to create your account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form onSubmit={handleSubmit} className="space-y-6">

        <label
              htmlFor="username"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Username
        </label>
        <div className="mt-2">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
        </div>
        <label
            htmlFor="password"
            className="block text-sm/6 font-medium text-gray-900"
        >
            Password
        </label>
        <div className="mt-2">
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="isAdmin"
              value="true"
              checked={formData.isAdmin === true}
              onChange={handleChange}
            />
            Admin
          </label>
          <label>
            <input
              type="radio"
              name="isAdmin"
              value="false"
              checked={formData.isAdmin === false}
              onChange={handleChange}
            />
            User
          </label>
        </div>
        <button type="submit" disabled={loading} className="w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
      </div>
      <p>{message}</p>
    </div>
  );
};

export default Register;
