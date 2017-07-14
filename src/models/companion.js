// 合作伙伴数据
import { companiongetList } from '../services/companionList';
import { hashHistory } from 'dva/router';

export default {
	namespace:'companion',
	state:{
		companionList:[],
	},
	effects:{
		* querycomList({payload},{put,call}){
			const data = yield call (companiongetList,{isShow:1});  
			if (data && data.errorCode == 1) {  //判断是否显示
				yield put({
					type:'querylistSuccess',
					payload:{
						companionList:data.data.list,
					}
				})
			}
		},
	},
	reducers:{
		querylistSuccess(state,action){
			return{...state,...action.payload};
		}
	}
}