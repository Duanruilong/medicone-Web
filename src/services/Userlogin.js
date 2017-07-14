
// 用户登录
// 
import $ from '../utils/ajax';
//登录
async function Userlogin(params) {
    return $.post('/medicone/user/login',params);	
}
// 注册
async function Userinsert(params) {
    return $.post('/medicone/user/insert',params);	
}
//登出
async function UserloginOut(params) {
    return $.post('/medicone/user/loginOut',params);	
}
//修改用户信息
async function Userupdate(params) {
    return $.post('/medicone/user/update',params);	
}

export default { Userlogin,Userinsert,UserloginOut,Userupdate}
