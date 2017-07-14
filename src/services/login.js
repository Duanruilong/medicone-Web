import $ from '../utils/ajax';

async function login(params) {
    return $.post('/medicone/user/login', params);
}
async function loginOut(params) {
    return $.post('/medicone/user/loginOut', params);
}
async function userInsert(params) {
    return $.post('/medicone/user/insert', params);
}
async function userUpdate(params) {
    return $.post('/medicone/user/update', params);
}
// 电话
 async function getTel(params) {
    return $.post('/medicone/admin/sys/get', params);
}


export default { login, loginOut,userInsert,userUpdate,getTel}
