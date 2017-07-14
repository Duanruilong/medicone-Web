module.exports = {
    saveUser(user){
        var userStr=JSON.stringify(user);
        localStorage.muser = userStr;
    },
    getUserLocation(){
        let userLocation=localStorage.userLocation;
        let city=userLocation.split('省')[1];
        return city;
    },
    getUser(){
        let userStr=localStorage.muser;
        let user;
        if(userStr!=null){
            user=JSON.parse(userStr);
        }
        return user;
    },
    login() {
        localStorage.token = 1;
        if (localStorage.token == 1) {
            return true;
        } else {
            return false;
        }
    },
    logout() {
        delete localStorage.token
        delete localStorage.muser
    },
    checkLogin() {
        return !!localStorage.token
    },
}
