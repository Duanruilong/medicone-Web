import { needListquery,insertList,CollectList,deleteCollectlist,updateNeed} from '../services/needList';
import { hashHistory } from 'dva/router';
import auth from '../utils/auth';
export default {
	namespace:'need',
	state:{ //定义数据字段
		recordList: [],  //需求列表
    selfRecordList:[],
    clickneedItem:[],  //当前操作对象
    total:'',//总数
    selfTotal:'',
    current:1,//当前页数
    selfCurrent:1,
    insertNeedBudGetCheck:true,
    insertNeedTelCheck:true
	},
	effects:{
		 * queryNeed({payload},{put,call}){   //全部需求
        const data = yield call (needListquery,{status:1});
          if (data&&data.errorCode == 1) {
            let recordList=[];
            data.data.list.map((item)=>{
              if(item.status!=-1){
                recordList.push(item);
              }
            })
            yield put({
              type:'querySuccess',
                payload:{
                  recordList:recordList,
                  total:recordList.length,
                  current: data.data.pageNum
                }
            });
        }
		 },
     * querySelfNeed({payload},{put,call}){   //用户需求
        let user=auth.getUser();
        const data = yield call (needListquery,{userId:user.id});
          if (data&&data.errorCode == 1) {
            let recordList=[];
            data.data.list.map((item)=>{
              if(item.status!=-1){
                recordList.push(item);
              }
            })
            yield put({
              type:'querySuccess',
                payload:{
                  selfRecordList:recordList,
                  selfTotal:recordList.length,
                  selfCurrent: data.data.pageNum
                }
            });
        }
     },
     * inserNeed({payload},{put,call}){
      let user=auth.getUser();
        const data = yield call (insertList,{...payload.needItem,userId:user.id,username:user.username});
          if (data&&data.errorCode == 1) {
            hashHistory.push({pathname:'/managelist'})
        }
     },
     * updateNeed({payload},{put,call}){
        const data = yield call (updateNeed,{...payload});
          if (data&&data.errorCode == 1) {
            yield put({type:'querySelfNeed'})
        }
     },
	},
	reducers:{
		querySuccess(state,action){
 			return {...state,...action.payload};
		},
    selectneedItem(state,action){
      let key = action.payload.key;
      let new_clikItemneed = {};
      state.selfRecordList.map((item)=>{
        if (item.id == key) {
          new_clikItemneed = item;
        }
      })
      return {...state,clickneedItem:new_clikItemneed};
    },
    needItemChange(state,action){
        let clickneedItem = state.clickneedItem;
        let key = action.payload.key;
        clickneedItem[key] = action.payload.value;
        return {...state, clickneedItem: clickneedItem };
    },
    changeCurrent(state,action){   //分页
        return {...state, current: action.payload.current };
    },
    changeSelfCurrent(state,action){   //分页
        return {...state, selfCurrent: action.payload.current };
    }
	}
}