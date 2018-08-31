import React from 'react';
import { Row, Col, Radio, RadioGroup } from '../components/';
// import { Radio, RadioGroup } from '../components/Radio';

function radios() {
  return (
    <div className="demo">
      <h2>单选</h2>
      <h3>单独</h3>
      <Row className="demo-row" gutter="8">
        {/* <Col span="md-2"><Radio value="a" htmlFor="test1" onClick={e => console.info(e.target.tagName)}>选项</Radio></Col> */}
        <Col span="md-2"><Radio value="a" htmlFor="test1" >选项</Radio></Col>
        <Col span="md-2"><Radio value="b" htmlFor="test2" defaultChecked>已选中</Radio></Col>
        <Col span="md-2"><Radio value="c" htmlFor="test3" disabled>不可选</Radio></Col>
        <Col span="md-2"><Radio value="d" htmlFor="test4" defaultChecked disabled>已选中不可选</Radio></Col>
      </Row>
      <h3>成组</h3>
      <Row className="demo-row" gutter="8">
        <Col span="md-10">
          {/* <RadioGroup defaultValue="apple" onChange={value => console.info(value)}> */}
          <RadioGroup defaultValue="apple">
            <Radio value="apple" htmlFor="test11">苹果</Radio>
            <Radio value="mi" htmlFor="test12">小米</Radio>
            <Radio value="san" htmlFor="test13">三星</Radio>
            <Radio value="oppo" htmlFor="test14">OPPO</Radio>
            <Radio value="vivo" htmlFor="test15">vivo</Radio>
            <Radio value="huawei" htmlFor="test16" disabled>华为</Radio>
          </RadioGroup>
        </Col>
      </Row>
    </div>
  );
}

export default radios;
