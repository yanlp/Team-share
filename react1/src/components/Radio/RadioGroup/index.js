/*
 * @Author: willhu
 * @Date: 2017-11-01 12:07:26
 * @Last Modified by: willhu
 * @Last Modified time: 2017-11-07 16:55:26
 */

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import './index.scss';

const propTypes = {
  // 值
  value: PropTypes.string || PropTypes.number,
  // 追加的class
  className: PropTypes.string,
  // 初始默认值
  defaultValue: PropTypes.string || PropTypes.number,
  // onchange回调
  onChange: PropTypes.func,
  // 子元素
  children: PropTypes.any,
};

class RadioGroup extends Component {
  constructor(props) {
    super();
    this.state = {
      value: props.value || props.defaultValue,
    };
  }
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) this.setState({ value: nextProps.value });
  }
  handelChange(value) {
    this.setState({ value });
    if (this.props.onChange) this.props.onChange(value);
  }
  render() {
    const { children, className, defaultValue, onChange, ...other } = this.props;
    const { value } = this.state;
    const classNames = classnames(
      'sp-radio-group',
      className
    );

    const radiosWithProps = React.Children.map(children, (Radio, i) => {
      if (!Radio) return;
      const $value = Radio.props.value;
      return React.cloneElement(Radio, {
        key: i,
        checked: value === $value,
        onChange: (e) => {
          e.stopPropagation();
          this.handelChange($value);
        },
      });
    });

    return (
      <div className={classNames} {...other}>
        {radiosWithProps}
      </div>
    );
  }
}

RadioGroup.propTypes = propTypes;
export default RadioGroup;
