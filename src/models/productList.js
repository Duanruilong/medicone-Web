import { ProductListitem, ProductByIditem, ClassHotList, CategoryList, intCollectlist, deleteCollectlist, getCollectProductList } from '../services/ProductList';
import auth from '../utils/auth';

export default {
	namespace: 'product',
	state: {
		facilitylist: [],  //首页7个大分类
		mainsList: [],   //首页产品列表
		classListitem: [],   //获取类目
		CategoryListitem: [],  //获取分类
		listitemlist: [],  //产品列表
		collectList: [],    //收藏列表
		clikItem: {}, //当前操作对象
		searchStr: '',   //搜索返回 
		total: '',
		collectTotal: '',
		current: 1,
		collectCurrent: 1,
		categoryTwoName: '',  //二级名称
		categoryThreeName: '',  //三级名称
		brandName: '',  //品牌
		showNomore: false,
		weixinBtn: true,
		indexBtn: true
	},
	effects: {
		* queryFaclist({ payload }, { put, call }) {  //首页7个大分类   类目
			const data = yield call(ClassHotList, { id: 1 });
			if (data && data.errorCode == 1) {
				yield put({
					type: 'querySuccess',
					payload: {
						facilitylist: data.data,
					}
				})
			}
		},
		* queryProductById({ payload }, { put, call }) {  //ID获取
			const data = yield call(ProductByIditem, { id: payload.key, userId: payload.key });
			if (data && data.errorCode == 1) {
				yield put({
					type: 'querySuccess',
					payload: {
						clikItem: data.data
					}
				})
			}
		},
		* queryMainList({ payload }, { put, call }) {   //首页产品列表
			const data = yield call(ProductListitem, { type: 2 });    //传后台 {category:key}   
			if (data && data.errorCode == 1) {
				yield put({
					type: 'querySuccess',
					payload: {
						mainsList: data.data.list,
					}
				})
			}
		},
		* queryclassListitem({ payload }, { put, call }) {   //获取分类
			const data = yield call(CategoryList);
			if (data && data.errorCode == 1) {
				yield put({
					type: 'querySuccess',
					payload: {
						classListitem: data.data,
					}
				})
			}
		},
		* listitemQuery({ payload }, { put, call }) {   //产品列表
			let user = auth.getUser();
			let userId = null;
			if (user) {
				userId = user.id;
			}
			let name = null;
			if (payload && payload.searchStr) {
				name = payload.searchStr;
			}
			let categoryTwoName = null;  //三级选择
			if (payload && payload.categoryTwoName) {
				categoryTwoName = payload.categoryTwoName;
				yield put({ type: 'changeName', payload: { categoryTwoName: payload.categoryTwoName } });
			}
			let categoryThreeName = null;
			if (payload && payload.categoryThreeName) {
				categoryThreeName = payload.categoryThreeName;
				yield put({ type: 'changeName', payload: { categoryThreeName: payload.categoryThreeName } });
			}
			let brandName = null;
			if (payload && payload.brandName) {
				brandName = payload.brandName;
				yield put({ type: 'changeName', payload: { brandName: payload.brandName } });
			}
			const data = yield call(ProductListitem, { categoryTwoName: categoryTwoName, categoryThreeName: categoryThreeName, brandName: brandName, userId: userId, type: 2, name: name, pageNum: payload.pageNum, pageSize: 20 });  //分页
			if (data && data.errorCode == 1) {
				yield put({
					type: 'querySuccess',
					payload: {
						listitemlist: data.data.list,
						total: data.data.total,
						current: data.data.pageNum,
						showNomore: false
					}
				});
			} else {
				yield put({  //警告框
					type: 'changeName',
					payload: {
						showNomore: true
					}
				});
			}
		},
		* getCollectProductList({ payload }, { put, call }) {   //分页功能 
			let user = auth.getUser();
			let userId = null;
			if (user) {
				userId = user.id;
			}
			const data = yield call(getCollectProductList, { userId: userId, pageNum: payload.pageNum, pageSize: 10 });
			if (data && data.errorCode == 1) {
				yield put({
					type: 'querySuccess',
					payload: { //分页
						collectList: data.data.list,
						collectTotal: data.data.total,
						collectCurrent: data.data.pageNum
					}
				});
			}
			yield put({
				type: 'changeCurrent',
				payload: {
					collectCurrent: payload.pageNum
				}
			});
		},
		* intCollectlist({ payload }, { put, call }) {
			let user = auth.getUser();
			const data = yield call(intCollectlist, { userId: user.id, productId: payload.id });
			if (data && data.errorCode == 1) {
				yield put({
					type: 'collectSuccess',
					payload: {
						id: payload.id,
						collect: 1
					}
				});
			}
		},
		* deleteCollectlist({ payload }, { put, call }) {
			let user = auth.getUser();
			const data = yield call(deleteCollectlist, { userId: user.id, productId: payload.id });
			if (data && data.errorCode == 1) {
				yield put({
					type: 'collectSuccess',
					payload: {
						id: payload.id,
						collect: 2
					}
				});
			}
		},
	},
	reducers: {
		querySuccess(state, action) {
			return { ...state, ...action.payload };
		},
		collectSuccess(state, action) {
			// 当前操作对象
			let clikItem = state.clikItem;
			clikItem.isCollect = action.payload.collect;

			let listitemlist = state.listitemlist;
			listitemlist.map((item) => {
				if (item.id == action.payload.id) {
					item.isCollect = action.payload.collect;
				}
			})

			let collectList = state.collectList;
			collectList.map((item, i) => {
				if (item.id == action.payload.id) {
					collectList.splice(i, 1);
				}
			})
			return { ...state, clikItem: clikItem, collectList: collectList };
		},

		selectItem(state, action) {  //选择当前id
			let key = action.payload.key;
			let new_clikItem = {};
			state.listitemlist.map((item) => {
				if (item.id == key) {
					new_clikItem = item;
				}
			})
			// console.log(new_clikItem)
			return { ...state, clikItem: new_clikItem };
		},
		changeSearchStr(state, action) {
			return { ...state, ...action.payload };
		},
		changeCurrent(state, action) {
			return { ...state, ...action.payload };
		},
		changeName(state, action) {  //分类筛选
			return { ...state, ...action.payload };
		}

	}
}