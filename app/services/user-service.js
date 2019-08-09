import request from '@/services/request'
import store from '@/store'
const UserService = {
    login: async function (userObj) {
        const response = await request({
            url: 'login',
            method: 'post',
            data: userObj
        });
        return response;
    },
    socialLogin: async function (userObj) {
        const response = await request({
            url: 'login/social',
            method: 'post',
            data: userObj
        });
        return response;
    },
    logout: async function () {
        return new Promise(function (resolve, reject) {
            resolve(store.dispatch('clearAll'));
        });
    },
    forgotPass: async function (email) {
        const response = await request({
            url: 'password/email',
            method: 'post',
            data: {
                email: email
            }
        });
        return response;
    },
    resetPassword: async function (userObj) {
        const response = await request({
            url: 'password/reset',
            method: 'post',
            data: userObj
        });
        return response;
    },
};

export default UserService

export {
    UserService
}