import axios from 'axios';
const {REACT_APP_API_HOST} = process.env; 
const token = localStorage.getItem('token');

const myaxios = axios.create({
    baseURL: REACT_APP_API_HOST,
    headers: {
        'Authorization': token ? `Bearer ${token}` : ''
    },
    timeout: 60000
})

export default myaxios;
