// src/features/todos/todoService.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const todoService = {
  // For useQuery
  getTodos: async () => {
    const { data } = await api.get('/todos');
    return data;
  },

  // For useMutation
  addTodo: async (text) => {
    const { data } = await api.post('/todos', { text });
    return data;
  },

  toggleTodo: async (id) => {
    const { data } = await api.patch(`/todos/${id}`);
    return data;
  },

  deleteTodo: async (id) => {
    const { data } = await api.delete(`/todos/${id}`);
    return data;
  }
};

export default todoService;