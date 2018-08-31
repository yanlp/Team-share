/*
 * @Author: willhu
 * @Date: 2017-11-27 15:55:04
 * @Last Modified by: willhu
 * @Last Modified time: 2017-11-28 10:21:57
 */

import React, { PropTypes } from 'react';
import classnames from 'classnames';
import './index.scss';
import '../iconfont/base/style.css';

const propTypes = {
  // 图标类型
  type: PropTypes.string.isRequired,
  // 图标大小
  size: PropTypes.number,
  // 图标颜色
  color: PropTypes.string,
};

const Icon = (props) => {
  const { type, size, color } = props;
  const classNames = classnames(
    'sp-icon',
    `icon-${type}`,
  );
  const fontSize = `${size}px`;
  return (
    <i className={classNames} style={{ fontSize, color }} />
  );
};

Icon.propTypes = propTypes;
export default Icon;
