import { UserLogin } from "../interfaces/UserLogin";
import Auth from "../utils/auth";

// Define the base URL based on environment variables or default to localhost for development
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    // Store token if login is successful
    if (data.token) {
      Auth.login(data.token);
    }

    return data;
  } catch (err) {
    console.error('Error during login:', err);
    return Promise.reject('Login failed');
  }
};

export { login };
