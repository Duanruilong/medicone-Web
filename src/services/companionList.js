
// 合作伙伴
// 
 
import $ from '../utils/ajax';
async function companiongetList(params) {
   return $.post('/medicone/provider/getList',params);
}


export default { companiongetList}