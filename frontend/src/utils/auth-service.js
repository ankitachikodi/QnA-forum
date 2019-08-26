import axios from 'axios';
import Constants from './constants';
import { decode } from 'jsonwebtoken';

const AuthService = () => {}

AuthService.login = (username, password, callback) => {
    const payload = JSON.stringify({username: username, password: password});
    axios.post(Constants.apiUrl + 'login', payload, {headers: {'Content-Type': 'application/json'}}).then(resp => {
        if(resp.data.token){
            localStorage.setItem(Constants.tokenName,resp.data.token);
            callback({login: true});
        } else if(resp.data.login === false) {
            callback({login: false});
        } else {
            callback({error: resp.data.error});
        }
    })
}

AuthService.SignUp = (data, callback) => {
    axios.post(Constants.apiUrl + 'signup', data, {headers: {'Content-Type': 'application/json'}}).then(resp => {
        if (resp.data.token) {
            localStorage.setItem(Constants.tokenName,resp.data.token);
            callback({login: true});
        }else {
            callback({error: resp.data.error});
        }
    })
}

AuthService.checkLogin = (callback) => {
    const token = localStorage.getItem(Constants.tokenName);
    if(token && decode(token).exp >= Math.floor(Date.now()/1000)){
        callback(true)
    } else{
        callback(false);
    }
}

AuthService.logout = () => {
    localStorage.removeItem(Constants.tokenName);
}

export default AuthService;