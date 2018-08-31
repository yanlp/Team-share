/*
 * @Author: weilihua
 * @Date: 2017-11-22 15:53:32
 * @Last Modified by: weilihua
 * @Last Modified time: 2017-11-28 16:18:46
 */
import React from 'react';
import { Row, Col, Switch } from '../components/';


function switchFun() {
  return (
    <div className="demo">
      <h2>开关</h2>
      <Row className="demo-row" gutter="20" type="fluid">
        <Col>
          <Switch labelOn="开" labelOff="关" />
        </Col>
        <Col>
          <Switch type="colorful" labelOn="开" labelOff="关" on />
        </Col>
        <Col>
          <Switch disabled />
        </Col>
        <Col>
          <Switch size="sm" labelOn="开" labelOff="关" />
        </Col>
        <Col>
          <Switch type="colorful" size="sm" />
        </Col>
        <Col>
          <Switch size="sm" disabled />
        </Col>
      </Row>
    </div>
  );
}

export default switchFun;
