import Vue from 'nativescript-vue'
import axios from 'axios'
import config from '@/config'
import store from '@/services/store'
import UserService from '@/services/user-service'
import Login from "@/components/Login/Login";
import {
    SnackBar
} from "nativescript-snackbar";
// create an axios instance
const service = axios.create({
    baseURL: config.BASEURL + "api/",
    timeout: 10000
})
// request interceptor
service.interceptors.request.use(config => {
    config.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    config.headers.common['Authorization'] = 'Bearer ' + store.getters.getConfig('token');
    return config
}, error => {
    console.log(error) // for debug
    Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        let displaySnackbar = true;
        if (error.response.config.url.indexOf('api/password/email') !== -1)
            displaySnackbar = false;
        if (error.response.config.url.indexOf('api/password/reset') !== -1)
            displaySnackbar = false;
        if (error.response.status === 401 && displaySnackbar) {
            UserService
                .logout()
                .then((response) => {
                    Vue.prototype.$navigateTo(Login);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        if (displaySnackbar) {
            let snackbar = new SnackBar();
            snackbar.simple(error.response.data.message, '#ffffff', '#00042F', 3, false);
        }
        console.log(error.response.data)
        return Promise.reject(error)
    })
export default service