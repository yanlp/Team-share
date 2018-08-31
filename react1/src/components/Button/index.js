/*
 * @Author: willhu
 * @Date: 2017-09-28 16:04:05
 * @Last Modified by: willhu
 * @Last Modified time: 2017-11-28 10:31:55
 */

import React, { PropTypes } from 'react';
import classnames from 'classnames';

import Icon from '../Icon';
import './index.scss';

const propTypes = {
  // 追加的className
  className: PropTypes.string,
  // 按钮类型 primary/ghost
  type: PropTypes.string,
  // 大小 sm/lg
  size: PropTypes.string,
  // 长短 true/fasle
  long: PropTypes.bool,
  // 图标
  icon: PropTypes.string,
  // 禁用
  disalbed: PropTypes.bool,
  // 子内容
  children: PropTypes.any,
};

const Button = (props) => {
  const { children, className, type, size, long, icon, disalbed, ...other } = props;
  const classNames = classnames(
    'sp-btn', {
      [`sp-btn_${type}`]: type,
      [`sp-btn_${size}`]: size,
      'sp-btn_long': long,
      'sp-btn_disabled': disalbed,
    },
    className
  );

  return (
    <div className={ classNames } { ...other }>
      {icon && <Icon type={icon} /> }
      { children }
    </div>
  );
};

Button.propTypes = propTypes;
export default Button;
