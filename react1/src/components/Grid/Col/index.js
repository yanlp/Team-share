/*
 * @Author: willhu
 * @Date: 2017-09-26 17:19:09
 * @Last Modified by: willhu
 * @Last Modified time: 2017-10-18 14:08:25
 */

import React, { PropTypes } from 'react';
import classnames from 'classnames';
import './index.scss';

const propTypes = {
  // 规则
  span: PropTypes.string,
  // 偏移
  offset: PropTypes.string,
  // 右浮动
  right: PropTypes.bool,
  // 追加的className
  className: PropTypes.string,
  // 子内容
  children: PropTypes.any,
};

const Col = (props) => {
  const { children, className, span, offset, right, ...other } = props;
  const classNames = classnames(
    'sp-col',
    span && span.split(' ').map(v => `sp-col_${v}`),
    {
      'sp-col_right': right,
    },
    offset && `sp-col_offset-${offset}`,

    className
  );
  return (
    <div className={ classNames } { ...other }>
      { children }
    </div>
  );
};

Col.propTypes = propTypes;
export default Col;
