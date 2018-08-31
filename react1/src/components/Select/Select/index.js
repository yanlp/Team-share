/*
 * @Author: weilihua
 * @Date: 2017-11-27 17:14:57
 * @Last Modified by: weilihua
 * @Last Modified time: 2017-11-29 17:52:26
 */

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import ClickOutside from 'react-click-outside';
import Popper from 'popper.js';
import Icon from '../../Icon';
import './index.scss';

const propTypes = {
  // 追加的className
  className: PropTypes.string,
  // 禁用
  disabled: PropTypes.bool,
  // 选择框默认文字
  placeholder: PropTypes.string,
};
const defaultProps = {
  placeholder: '请选择',
};

class Select extends Component {
  constructor(/* props */) {
    super();
    this.state = {
      visible: false,
    };
    // bind
    this.handleClidk = this.handleClick.bind(this);
  }
  //
  componentDidMount() {

  }
  // handle
  handleClickOutside() {
    if (this.state.visible) {
      this.setState({ visible: false });
    }
  }
  handleClick() {
    this.setState({ visible: !this.state.visible }, () => {
      if (this.state.visible && !this.popper) {
        this.popper = new Popper(
          this.reference,
          this.dropdown
        );
      }
    });
  }

  render() {
    const { className, disabled, placeholder, ...other } = this.props;
    const state = this.state;
    const classNames = classnames(
      'sp-select', {
        'sp-select_visible': state.visible,
        'sp-select_disabled': disabled,
      },
      className
    );
    const selectStyle = {
      minWidth: '200px',
    };
    return (
      <div
        className={ classNames }
        { ...other }
        style={selectStyle}
      >
        <div
          className="sp-select-selection"
          onClick={this.handleClidk}
          ref={reference => (this.reference = reference)}
        >
          <Icon type="triangle-down" />
          <input
            type="text"
            placeholder={this.props.placeholder}
            readOnly
          />
        </div>
        <div
          className="sp-select-dropdown"
          ref={dropdown => (this.dropdown = dropdown)}
          style={selectStyle}
        >
          <ul className="sp-select-dropdown-list">
            <li>sds</li>
            <li>sds</li>
            <li>sds</li>
            <li>sds</li>
          </ul>
        </div>
      </div>
    );
  }
}

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;
export default ClickOutside(Select);
