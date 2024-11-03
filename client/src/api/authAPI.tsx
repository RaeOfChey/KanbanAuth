import { UserLogin } from "../interfaces/UserLogin";
import Auth from "../utils/auth";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try {
    const response = await fetch('/api/auth/login', {
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
