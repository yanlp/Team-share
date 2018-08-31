/*
 * @Author: weilihua
 * @Date: 2017-11-28 16:15:10
 * @Last Modified by:   weilihua
 * @Last Modified time: 2017-11-28 16:15:10
 */

import React, { Component, PropTypes } from 'react';
// import classnames from 'classnames';
import './index.scss';

const propTypes = {
  // htmlFor: PropTypes.string,
  // 追加的className
  // className: PropTypes.string,
  // 是否打开
  on: PropTypes.bool,
};

class SelectOption extends Component {
  constructor(props) {
    super();
    this.state = {
      on: props.on || false,
    };
    // bind
    // this.handleChange = this.handleChange.bind(this);
  }

  render() {
    /* const { htmlFor, className, on, ...other } = this.props;
    const classNames = classnames(
      'sp-select', {
         [ `sp-switch_${size}`]: size,
        'sp-switch_disabled': disabled,
        'sp-switch_colorful': type === 'colorful',
      },
      className
    );*/

    return (
      <div>3333</div>
    );
  }
}

SelectOption.propTypes = propTypes;
// Select.defaultProps = defaultProps;
export default SelectOption;
