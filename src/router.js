import React from 'react';
import { Router, Route, IndexRedirect} from 'dva/router';
import IndexPage from './routes/IndexPage';
import auth from './utils/auth';
import Home from './components/Home/Home';
import List from './components/List/List';
import Login from './components/Login/Login';
import Logup from './components/Login/Logup';
import Logfit from './components/Login/Logfit';
import Listitem from './components/List/Listitem';

import Manage from './components/Manage/Manage';
import Managelist from './components/Manage/Managelist';
import Manageitem from './components/Manage/Manageitem';
import Managedatum from './components/Manage/Managedatum';
import Managerevamp from './components/Manage/Managerevamp';
import Managepublish from './components/Manage/Managepublish';
import $ from './utils/ajax';

function requireAuth(nextState, replace) {
    if (!auth.checkLogin()) {
        replace({
            pathname: '/logup',
            state: {
                nextPathname: nextState.location.pathname
            }
        })
    }
}

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} >
      	<IndexRedirect to="index"/>
        <Route path="/login" component={Login} />
        <Route path="/logup" component={Logup} />
        <Route path="/logfit" component={Logfit} />
		<Route path="/index" component={Home} />
		<Route path="/list" component={List} />
		<Route path="/listitem" component={Listitem} />
		<Route path="/" onEnter={requireAuth}> 
            <Route path="/manage" component={Manage} />
    		<Route path="/managelist" component={Managelist} />
    		<Route path="/manageitem" component={Manageitem} />
    		<Route path="/managedatum" component={Managedatum} />
    		<Route path="/managerevamp" component={Managerevamp} />
    		<Route path="/managepublish" component={Managepublish} />
        </Route>
      </Route>
    </Router>
  );
}

export default RouterConfig;
