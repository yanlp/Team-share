import React from 'react'; 
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './index.css';
import '../iconfont/base/style.css';

const propTypes = {
		type: PropTypes.string.isRequired,
		style: PropTypes.object,
		color: PropTypes.string
}
const Icon = (props) => {
	 const {type, style, color, ...other} = props;
	 const classNames = classnames({
	 	'lp-icon': true,
	 	[`icon-${type}`]: type
	 });

	 return (
	 	<i className={classNames} {...other}></i>
	 	)
};

Icon.propTypes = propTypes;

export default Icon;