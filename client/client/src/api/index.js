import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const signIn = (formData) => API.post('/user/SignIn', formData);
export const signUp = (formData) => API.post('/user/SignUp', formData);
export const updateUser = (id, updatedUser) => API.patch(`/user/${id}`, updatedUser);
export const fetchUsers = () => API.get('/user/users');
export const fetchUser = (id) => API.get(`/user/${id}`);
export const deleteUser = (id) => API.delete(`/user/delete/${id}`);