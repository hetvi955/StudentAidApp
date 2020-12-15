import client from './client';

const login = (Email, Password) => client.post("/auth/login", { Email, Password });

const register = (userInfo) => client.post("/auth/register", userInfo);

export default {
  login,
  register,
};