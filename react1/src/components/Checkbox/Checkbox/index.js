/*
 * @Author: willhu
 * @Date: 2017-11-02 11:45:25
 * @Last Modified by: willhu
 * @Last Modified time: 2017-11-23 14:49:48
 */

import React, { PropTypes } from 'react';
import classnames from 'classnames';
import './index.scss';

const propTypes = {
  // 值
  value: PropTypes.string.isRequired || PropTypes.number.isRequired,
  // 追加的class
  className: PropTypes.string,
  // 是否选中
  checked: PropTypes.bool,
  // 初始是否选中
  defaultChecked: PropTypes.bool,
  // 切换后的回调
  onChange: PropTypes.func,
  // 选择后的回调
  onClick: PropTypes.func,
  // 半选中
  indeterminate: PropTypes.bool,
  // 禁用
  disabled: PropTypes.bool,
  // 块状布局
  block: PropTypes.bool,
  // 子元素
  children: PropTypes.any,
};

const Checkbox = (props) => {
  const { children, className, value, checked, defaultChecked, onChange, onClick, indeterminate, disabled, block, ...other } = props;
  const inputProps = { value, checked, defaultChecked, onChange, disabled };
  const classNames = classnames(
    'sp-checkbox',
    {
      'sp-checkbox_disabled': inputProps.disabled,
      'sp-checkbox_block': block,
      'sp-checkbox_indeterminate': indeterminate,
    },
    className
  );
  const Timestamp = new Date().getTime() + Math.round(Math.random() * 100);
  return (
    <label
      role="presentation"
      htmlFor={Timestamp}
      tabIndex={inputProps.disabled ? -1 : 0}
      className={classNames}
      onClick={
        (e) => {
          if (e.target.tagName === 'INPUT') {
            e.stopPropagation();
          } else if (onClick) onClick(e);
        }
      }
      {...other}
    >
      <input
        id={Timestamp}
        type="checkbox"
        className="sp-checkbox--input"
        {...inputProps}
      />
      <span className="sp-checkbox--status" />
      { children && <span className="sp-checkbox--text">{children}</span>}
    </label>
  );
};

Checkbox.propTypes = propTypes;
export default Checkbox;
