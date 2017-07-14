import {login,loginOut,userInsert,userUpdate,getTel} from '../services/login';
import { hashHistory } from 'dva/router';
import auth from '../utils/auth';
export default {
	namespace: 'login',
	state:{
		user:{},
		showMessage:false,
		updateStatus:false,
		editPasswprdShowAlert:0,
        insertUserShowAlert:0,
        loginTelCheck:true,
        logupTelCheck:true,
        userLocation:' ',   //定位
        Tellist:[]
	},
	effects:{
		* login({ payload }, { select, call, put }) {
            const data = yield call(login, {...payload });
            if (data) {
                if (data.errorCode == 1) {
                    auth.login();
                    auth.saveUser(data.data);
                    hashHistory.push({ pathname: '/' })
                } else {
                    yield put({
                        type: 'change',
                        payload:{
                             showMessage:true,
                             insertUserShowAlert:0
                        }
                       
                    });
                }
            }
        },
        * loginOut({ payload }, { select, call, put }) {
            const data = yield call(loginOut);
            if (data) {
                if (data.errorCode == 1) {
                    auth.logout();
                    hashHistory.push({ pathname: '/logup' })
                    yield put({   //去除样式
                        type: 'change',  
                        payload:{
                             showMessage:false
                        }
                    });
                }
            }
        },
        * userInsert({ payload }, { select, call, put }) {
            const data = yield call(userInsert,{...payload});
            if (data) {
                if (data.errorCode == 1) {
                    hashHistory.push({ pathname: '/logup' })
                }else{
                    yield put({
                        type: 'editInsertUserShowAlert',
                        payload:{
                            key:2
                        }
                    });
                }
            }
        },
        * userUpdate({ payload }, { select, call, put }) {
            const data = yield call(userUpdate,{...payload.user});
            if(data&&data.errorCode==1){
            	let user=auth.getUser();
				const updateData = yield call(login, {username:user.username,password:user.password });
	            auth.saveUser(updateData.data);
            }
        },
        * getLocation({ payload }, { select, call, put }) {  //定位
            let userLocation=auth.getUserLocation();
             yield put({
                type: 'change',
                payload:{
                    userLocation:userLocation
                }
            });
        },
        * getTellist({payload},{call,put}){   //电话
            const data = yield call (getTel,{id:1});
              if (data&&data.errorCode == 1) {
                yield put({
                    type:'change',
                    payload:{
                        Tellist:data.data
                    }
                })
            }
        }
	},
	reducers:{	
		showMessage(state,action){
			return {...state, showMessage:true };
		},
		userChange(state,action){  //登录验证
			let user = state.user;
            let key = action.payload.key;
            user[key] = action.payload.value;
            return {...state, user: user };
		},
		change(state,action){
            return {...state, ...action.payload };
		},
		changeUpdateStatus(state,action){
			return {...state, updateStatus: !state.updateStatus };
		},
		editPasswprdShowAlert(state,action){
			return {...state, editPasswprdShowAlert: action.payload.key };
		},
        editInsertUserShowAlert(state,action){
            return {...state, insertUserShowAlert: action.payload.key };
        }
	},
}
