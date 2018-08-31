/*
 * @Author: willhu
 * @Date: 2017-11-02 11:45:46
 * @Last Modified by: willhu
 * @Last Modified time: 2017-11-28 11:32:53
 */

import React, { Component } from 'react';
import 'normalize.css';
import './index.scss';
import Grid from './grid';
import Color from './color';
import Font from './font';
import Btn from './button';
import Ipt from './input';
import Radio from './radio';
import Checkbox from './checkbox';
import Select from './select';
import Switch from './switch';
import Icon from './icon';
// 组件
const components = {
  grid: {
    name: '栅格',
    com: Grid,
  },
  color: {
    name: '颜色',
    com: Color,
  },
  font: {
    name: '字体',
    com: Font,
  },
  btn: {
    name: '按钮',
    com: Btn,
  },
  input: {
    name: '输入框',
    com: Ipt,
  },
  radio: {
    name: '单选框',
    com: Radio,
  },
  checkbox: {
    name: '多选框',
    com: Checkbox,
  },
  switch: {
    name: '开关',
    com: Switch,
  },
  select: {
    name: '选择器',
    com: Select,
  },
  icon: {
    name: '图标',
    com: Icon,
  },
};

class App extends Component {
  // construct
  constructor(props) {
    super(props);
    this.state = {
      // type: 'grid',
      type: 'select',
    };
    // bind
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(key) {
    this.setState({ type: key });
  }

  render() {
    const type = this.state.type;
    const MyComponent = components[type].com;
    return (
      <div className="demo-wrapper">
        <h1>基础组件测试页面</h1>
        <div className="demo-content">
          <div className="content-col left-bar">
            <ul>
              {Object.keys(components).map((key, i) => {
                const name = `${components[key].name} ${key}`;
                return (
                  <li
                    key={i}
                    className={type === key ? 'active' : ''}
                  >
                    <span onClick={() => this.handleClick(key)}>{name}</span>
                  </li>);
              })}
            </ul>
          </div>
          <div className="content-col main-content">
            <MyComponent />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

