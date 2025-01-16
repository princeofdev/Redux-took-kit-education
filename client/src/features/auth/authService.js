import axios from 'axios';

const authService = {
  login: async (credentials) => {
    const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
  }
};

export default authService;