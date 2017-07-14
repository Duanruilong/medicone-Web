// banner数据

import {queryBanner,BrandList} from '../services/BannerList';
import { hashHistory } from 'dva/router';

export default {
	namespace:'banner',
	state:{
		bannerList:[],   //banner
		brandList:[]     //品牌
	},
	effects:{
		* querybannerList({payload},{put,call}){   //banner
			const data = yield call (queryBanner);
			if(data && data.errorCode == 1){
				yield put({
					type:'querySuccess',
					payload:{
						bannerList:data.data.list,
					}
				})
			
			}
		},
		* queryBrandList({payload},{put,call}){   //品牌
			const data = yield call (BrandList,{type:2});
			if(data && data.errorCode == 1){
				yield put({
					type:'querySuccess',
					payload:{
						brandList:data.data,
					}
				})
			
			}
		},
	},
	reducers:{
		querySuccess(state,action){
			return{...state,...action.payload};
		}
	}
}