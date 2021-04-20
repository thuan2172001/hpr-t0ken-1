import axios from 'axios';
import { api } from './config';
const token = localStorage.getItem('token');

const myaxios = axios.create({
    baseURL: api,
    headers: {
        'Authorization': token ? `Bearer ${token}` : ''
    }
})

export default myaxios;
