/*
 * @Author: willhu
 * @Date: 2017-09-26 16:11:56
 * @Last Modified by: willhu
 * @Last Modified time: 2017-10-18 14:06:06
 */

import React, { PropTypes, Children, cloneElement } from 'react';
import classnames from 'classnames';
import './index.scss';

const propTypes = {
  // 间隔
  gutter: PropTypes.string,
  // 布局类型 'fluid'
  type: PropTypes.string,
  // 追加的className
  className: PropTypes.string,
  // 子内容
  children: PropTypes.node,
  // 追加的样式
  style: PropTypes.string,
};

const Row = (props) => {
  const { children, className, gutter, type, style, ...others } = props;
  const classNames = classnames(
    'sp-row',
    {
      [`sp-row_${type}`]: type,
    },
    className,
  );
  const rowStyles = gutter > 0 ? {
    marginLeft: gutter / -2,
    marginRight: gutter / -2,
    ...style,
  } : style;

  const cols = Children.map(children, (col) => {
    if (!col) {
      return null;
    }
    if (col.props && gutter > 0) {
      return (
        cloneElement(col, {
          style: {
            paddingLeft: gutter / 2,
            paddingRight: gutter / 2,
            ...col.props.style,
          },
        })
      );
    }
    return col;
  });
  return (
    <div className={ classNames } { ...others } style={ rowStyles }>
      { cols }
    </div>
  );
};

Row.propTypes = propTypes;
export default Row;
