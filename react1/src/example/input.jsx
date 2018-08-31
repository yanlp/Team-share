import React from 'react';
import { Row, Col, Input } from '../components/';

function input() {
  return (
    <div className="demo">
      <h2>输入框</h2>
      <h3>尺寸</h3>
      <Row className="demo-row" gutter="8">
        <Col span="md-4"><Input size="sm" placeholder="小尺寸" /></Col>
        <Col span="md-4"><Input placeholder="正常" /></Col>
        <Col span="md-4"><Input size="lg" placeholder="大尺寸" /></Col>
        <Col span="md-4"><Input size="lg" placeholder="大尺寸" value="禁用" disabled /></Col>
      </Row>
    </div>
  );
}

export default input;
