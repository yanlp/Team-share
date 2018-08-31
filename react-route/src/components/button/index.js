import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../Icon/';

import './index.css';
console.log(PropTypes, '---', React)
// type
const propTypes = {
	className: PropTypes.string,
	type: PropTypes.string,// 大小 sm/lg
  size: PropTypes.string,
  // 长短 true/fasle
  long: PropTypes.bool,
  // 图标
  icon: PropTypes.string,
  // 禁用
  disalbed: PropTypes.bool,
  // 子内容
  children: PropTypes.any,
}

// class Button extends Components {

// }

const Button = (props) => {
	const {children, className, type, size, long,icon, disabled, ...other} = props;
	const classNames = classnames('lp-btn', {
		[`lp-btn-${type}`]: type,
		[`lp-btn-${size}`]: size,
		'lp-btn-long': long,
		'sp-btn-disabled': disabled,
	}, 
	className
	);
	return (
		<div className={classNames} {...other}>
			{type && <Icon type={type}></Icon>}
			{children}
		</div>
		)
};
Button.propTypes = propTypes; 
export default Button;
