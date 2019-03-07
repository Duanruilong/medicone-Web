import dva from 'dva';
import './index.html';
import './index.css';

// 1. Initialize  //全局错误处理,dva 里，effects 和 subscriptions 的抛错全部会走 onError hook，所以可以在 onError 里统一处理错误。
const app = dva({
	onError(e) {
	    console.log(e.message);
	},
});



// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/needList'));   //文件名
app.model(require('./models/companion'));
app.model(require('./models/banner'));
app.model(require('./models/productList'));
app.model(require('./models/login'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
