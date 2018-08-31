/*
 * @Author: weilihua
 * @Date: 2017-11-22 16:00:24
 * @Last Modified by: weilihua
 * @Last Modified time: 2017-11-23 16:50:25
 */
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import './index.scss';

const propTypes = {
  htmlFor: PropTypes.string,
  // 追加的className
  className: PropTypes.string,
  // 是否打开
  on: PropTypes.bool,
  // 大小 sm/lg
  size: PropTypes.string,
  // 类型 normal/colorful
  type: PropTypes.string,
  // 禁用
  disabled: PropTypes.bool,
  // 打开状态下显示的内容
  labelOn: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  // 关闭状态下显示的内容
  labelOff: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  // 切换后的回调
  onChange: PropTypes.func,
};
const defaultProps = {
  on: false,
  size: 'lg',
  type: 'normal',
};

class Switch extends Component {
  constructor(props) {
    super();
    this.state = {
      on: props.on || false,
    };
    // bind
    this.handleChange = this.handleChange.bind(this);
  }


  handleChange(e) {
    e.stopPropagation();
    this.setState({ on: e.target.checked });
    if (this.props.onChange) {
      this.props.onChange(e.target.checked);
    }
  }

  render() {
    const { htmlFor, className, on, size, type, disabled, labelOn, labelOff, onChange, ...other } = this.props;
    const inputProps = { disabled, onChange };
    const onState = this.state.on;
    const classNames = classnames(
      'sp-switch', {
        [`sp-switch_${size}`]: size,
        'sp-switch_disabled': disabled,
        'sp-switch_colorful': type === 'colorful',
      },
      className
    );

    return (
      <label
        className={ classNames }
        htmlFor={this.props.htmlFor}
        { ...other }
      >
        <input
          type="checkbox"
          id={this.props.htmlFor}
          checked={onState}
          {...inputProps}
          onChange={this.handleChange}
        />
        {size === 'sm' ?
          <span className="sp-switch--text" />
          :
          <span className="sp-switch--text">{onState ? labelOn : labelOff}</span>
        }
      </label>
    );
  }
}


Switch.propTypes = propTypes;
Switch.defaultProps = defaultProps;
export default Switch;
