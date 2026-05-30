import axios from 'axios';

// Cria uma instância do Axios configurada para o nosso backend local
const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;