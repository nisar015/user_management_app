import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com/users';

export const getUsers = () => axios.get(BASE_URL);

export const getUser = (id) => axios.get(`${BASE_URL}/${id}`);

export const createUser = (userData) => axios.post(BASE_URL, userData);

export const updateUser = (id, userData) => axios.put(`${BASE_URL}/${id}`, userData);

export const deleteUser = (id) => axios.delete(`${BASE_URL}/${id}`);
