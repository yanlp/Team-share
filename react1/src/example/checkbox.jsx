/*
 * @Author: willhu
 * @Date: 2017-11-02 11:45:37
 * @Last Modified by: weilihua
 * @Last Modified time: 2017-11-28 16:04:19
 */

import React from 'react';
import { Row, Col, Checkbox, CheckboxGroup } from '../components/';

function checkbox() {
  return (
    <div className="demo">
      <h2>复选</h2>
      <h3>单独</h3>
      <Row className="demo-row" gutter="8">
        <Col span="md-2"><Checkbox value="A">选项A</Checkbox></Col>
        <Col span="md-2"><Checkbox defaultChecked value="B">选项B</Checkbox></Col>
        <Col span="md-2"><Checkbox indeterminate value="HALF">半选中</Checkbox></Col>
        <Col span="md-2"><Checkbox disabled value="C">选项C</Checkbox></Col>
        <Col span="md-2"><Checkbox defaultChecked disabled value="D">选项D</Checkbox></Col>
      </Row>
      <h3>成组</h3>
      <CheckboxGroup allSelect defaultSelects={[]}>
        <Checkbox value="apple">苹果</Checkbox>
        <Checkbox value="mi">小米</Checkbox>
        <Checkbox value="san">三星</Checkbox>
        <Checkbox value="oppo">OPPO</Checkbox>
        <Checkbox value="vivo">vivo</Checkbox>
        <Checkbox value="huawei">华为</Checkbox>
      </CheckboxGroup>
      {/* <h3>快速生成</h3>
      <CheckboxGroup defaultSelects={[]} values={['apple', 'mi', 'sansung']} /> */}
      <h3>快速生成带全选</h3>
      <CheckboxGroup allSelect defaultSelects={[]} values={['apple', 'mi', 'sansung']} />
    </div>
  );
}

export default checkbox;
