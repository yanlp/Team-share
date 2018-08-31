/*
 * @Author: willhu
 * @Date: 2017-10-31 10:44:30
 * @Last Modified by: willhu
 * @Last Modified time: 2017-11-01 20:10:22
 */

import React, { PropTypes } from 'react';
import classnames from 'classnames';
import './index.scss';

const propTypes = {
  htmlFor: PropTypes.string,
  // 值
  value: PropTypes.string || PropTypes.number,
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
  // 禁用
  disabled: PropTypes.bool,
  // 子元素
  children: PropTypes.any,
};

const Radio = (props) => {
  const { children, className, htmlFor, value, checked, defaultChecked, onClick, onChange, disabled, ...other } = props;
  const inputProps = { value, checked, defaultChecked, onChange, disabled };

  const classNames = classnames(
    'sp-radio',
    {
      'sp-radio_disabled': inputProps.disabled,
    },
    className,
  );
  return (
    <label
      role="presentation"
      htmlFor={props.htmlFor}
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
      <input type="radio" id={props.htmlFor} {...inputProps} />
      <span className="sp-radio--status" />
      {children && <span className="sp-radio--text">{children}</span>}
    </label>
  );
};

Radio.propTypes = propTypes;
export default Radio;
