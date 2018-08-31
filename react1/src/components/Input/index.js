/*
 * @Author: willhu
 * @Date: 2017-10-18 14:33:03
 * @Last Modified by: willhu
 * @Last Modified time: 2017-10-30 18:15:47
 */

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import './index.scss';

const propTypes = {
  // 追加的class
  className: PropTypes.string,
  // 大小 sm/lg/
  size: PropTypes.string,
  // value
  value: PropTypes.string || PropTypes.number,
  // 初始化输入的值
  defaultValue: PropTypes.string || PropTypes.number,
  // placeholder
  placeholder: PropTypes.string,
  // onChange
  onChange: PropTypes.func,
};


class Input extends Component {
  /**
   * @public
   * @name this.refs.input.focus
   * @description 同 HTMLInputElement.focus()
   */
  focus() {
    this.input.focus();
  }
  select() {
    this.input.select();
  }
  render() {
    const { className, size, ...other } = this.props;
    const classNames = classnames(
      'sp-input',
      {
        [`sp-input_${size}`]: size,
      },
      className
    );
    return (
      <input ref={ (c) => {this.input = c;} } className={ classNames } { ...other } />
    );
  }
}

Input.propTypes = propTypes;
export default Input;

