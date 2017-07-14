import dva from 'dva';
import './index.html';
import './index.css';

// 1. Initialize
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
