/*
 * @Author: willhu
 * @Date: 2017-11-03 10:45:51
 * @Last Modified by: willhu
 * @Last Modified time: 2017-11-23 17:21:49
 */

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import Checkbox from '../Checkbox';
import './index.scss';

const defaultProps = {
  allSelectText: '全选',
};
const propTypes = {
  // 选中的值
  selects: PropTypes.array,
  // 初始选中的值
  defaultSelects: PropTypes.array,
  // 追加的class
  className: PropTypes.string,
  // 选择后的回调
  onChange: PropTypes.func,
  // // 针对 value 和 label 相同时快速创建复选框组，无需再调用 Checkbox
  values: PropTypes.array,
  // 垂直排列
  block: PropTypes.bool,
  // 全选功能
  allSelect: PropTypes.bool,
  // 全选的文字
  allSelectText: PropTypes.string,
  // 子元素
  children: PropTypes.any,
};

class CheckboxGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selects: props.selects || props.defaultSelects || [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.addSelect = this.addSelect.bind(this);
    this.removeSelect = this.removeSelect.bind(this);
    this.selectAll = this.selectAll.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if ('selects' in nextProps) this.setState({ selects: nextProps.selects });
  }
  // 更改回调
  handleChange(value) {
    const isChecked = this.state.selects.indexOf(value) >= 0;
    if (!isChecked) {
      this.addSelect(value);
    } else {
      this.removeSelect(value);
    }
  }
  // 添加
  addSelect(value) {
    const newSelect = this.state.selects;
    newSelect.push(value);
    this.setState({
      selects: newSelect,
    });
  }
  // 删除
  removeSelect(value) {
    const newSelect = this.state.selects;
    newSelect.splice(this.state.selects.indexOf(value), 1);
    this.setState({
      selects: newSelect,
    });
  }
  // 全选
  selectAll(e) {
    const newSelect = this.state.selects.concat(this.unSelects);
    if (e.target.checked) {
      this.setState({
        selects: newSelect,
      });
    } else {
      this.setState({
        selects: [],
      });
    }
  }
  render() {
    const { children, className, defaultSelects, onChange, values, block, allSelect, allSelectText, ...other } = this.props;
    const { selects } = this.state;
    const unSelects = [];
    const classNames = classnames(
      'sp-checkbox-group',
      className
    );
    let checkboxWithProps;
    /* values 用于快速创建checkbox
     * 传入values则会快速生成一组checkbox组件
     * 否则就需要写出每个checkbox组件
     */
    if (values) {
      checkboxWithProps = values.map((value, i) => {
        const checked = selects.indexOf(value) !== -1;
        if (!checked) {
          unSelects.push(value);
        }
        return (
          <Checkbox
            key={i}
            value={value}
            checked={checked}
            onChange={() => this.handleChange(value)}
            block={block}
          >
            {value}
          </Checkbox>
        );
      });
    } else {
      checkboxWithProps = React.Children.map(children, (checkbox, i) => {
        if (!checkbox) return;
        const props = checkbox.props;
        const value = checkbox.props.value;
        const checked = selects.indexOf(value) !== -1;
        if (!checked && !props.disabled) unSelects.push(value);
        return (
          React.cloneElement(checkbox, {
            key: i,
            checked,
            block: props.block || block,
            onChange: () => this.handleChange(value),
          })
        );
      });
    }
    this.unSelects = unSelects;
    return (
      <div className={classNames} {...other}>
        { allSelect && checkboxWithProps && checkboxWithProps.length > 1 && (
          <Checkbox
            block={block}
            value="all"
            checked={unSelects.length === 0}
            indeterminate={unSelects.length > 0 && unSelects.length < checkboxWithProps.length}
            onChange={this.selectAll}
          >
            {allSelectText}
          </Checkbox>
        )}
        {checkboxWithProps}
      </div>
    );
  }
}
CheckboxGroup.defaultProps = defaultProps;
CheckboxGroup.propTypes = propTypes;
export default CheckboxGroup;
