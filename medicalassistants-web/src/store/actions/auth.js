import { saveUserInfo, clearUserInfo } from './user';
import { loginUser, registerUser } from '@/utils/api';
import user from '../reducers/user';

export const login = (username, password) => (dispatch) => {
    return new Promise((resolve, reject) => {
        loginUser({ username: username.trim(), password: password })
        .then(res => {
            //console.log('登录===', res)
            if (res.success) {
                dispatch(saveUserInfo(res.data));
                resolve(res);
            } else {
                reject(res.msg);
            }
        })
    })
}
//添加userType字段
export const register = (sysUser) => (dispatch) => {
    return new Promise((resolve, reject) => {
        registerUser(sysUser)
        .then(res => {
            console.log('注册===', res)
            if (res.success) {
                dispatch(saveUserInfo(res.data));
                resolve(res);
            } else {
                reject(res.msg);
            }
        })
    })
}

export const logout = () => (dispatch) => {
    console.log('logout')
    dispatch(clearUserInfo());
    setTimeout(()=>{
        window.location.href = '/login';
    }, 500)

}
