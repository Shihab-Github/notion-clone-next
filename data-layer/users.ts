import axios from 'axios'
import { CREATE_USER_API, GET_USER_DETAILS, LOGIN_USER_API } from './API';

interface CreateUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

interface LoginUser {
    email: string;
    password: string;
}

export function register(data: CreateUser) {
    return axios.post(CREATE_USER_API, data);
}

export function login(data: LoginUser) {
    return axios.post(LOGIN_USER_API, data);
}

export function getUserDetails() {
    const config = {
        headers: { 
            Authorization: `Bearer ${localStorage.getItem('access_token')}` 
        }
    };
    return axios.get(GET_USER_DETAILS, config)
}