import React from 'react';
import {Router,Switch, Route, NavLink} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import Shop from './shop/shop'
import Home from './home/home';
const history = new createBrowserHistory()
const Index = () =>
    <div>
      <Router history={history}>
          <div>
              <div className="nav">
                  <NavLink to="/Home"  exact>首页</NavLink>&nbsp;
                  <NavLink to="/Shop" activeClassName="selected" exact>商城</NavLink>&nbsp;
                  <a href="http://mcbeta.jd.com/dist/pages/" target="_self">提报</a>&nbsp;
              </div>
              {this.props.children}
          </div>
      </Router>
    </div>

export default Index;