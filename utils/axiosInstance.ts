import axios from 'axios';

export const baseURL = 'https://ltu-i0015n-2024-web.azurewebsites.net';
const apiKey = 'super-secret-api-key-abc123';

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    'X-Api-Key': apiKey,
    'Content-Type': 'application/json'
  }
});
