import React from 'react';
import { Row, Col } from '../components/';


function Base() {
  return (
    <div className="demo">
      <h2>颜色</h2>
      <h3>主色</h3>
      <Row className="demo-row" gutter="8">
        <Col span="md-3">
          <div className="demo-color demo-primary">
            <p>主色\正常\链接</p>
            <p>#209CFF</p>
          </div>
        </Col>
        <Col span="md-3">
          <div className="demo-color demo-primary_hover">
            <p>主色\hover</p>
            <p>#5BB5FC</p>
          </div>
        </Col>
        <Col span="md-3">
          <div className="demo-color demo-primary_click">
            <p>主色\click\active</p>
            <p>#DE84E1</p>
          </div>
        </Col>
        <Col span="md-3">
          <div className="demo-color demo-primary_disabled">
            <p>主色\disabled</p>
            <p>#7AC5FF</p>
          </div>
        </Col>
      </Row>
      <h3>中性色</h3>
      <Row className="demo-row" gutter="8">
        <Col span="md-3">
          <div className="demo-color demo-title-color">
            <p>重要\标题</p>
            <p>#252525</p>
          </div>
        </Col>
        <Col span="md-3">
          <div className="demo-color demo-text-color">
            <p>一般\正文</p>
            <p>#666666</p>
          </div>
        </Col>
        <Col span="md-3">
          <div className="demo-color demo-text-color_tip">
            <p>弱\提示文字</p>
            <p>#999999</p>
          </div>
        </Col>
        <Col span="md-3">
          <div className="demo-color demo-text-color_disabled">
            <p>失效</p>
            <p>#CCCCCC</p>
          </div>
        </Col>
        <Col span="md-3">
          <div className="demo-color demo-border-color">
            <p>边框</p>
            <p>#D9D9D9</p>
          </div>
        </Col>
      </Row>
      <p>&nbsp;</p>
      <Row className="demo-row" gutter="8">
        <Col span="md-3">
          <div className="demo-color demo-split-color">
            <p>分割线</p>
            <p>#EDEDED</p>
          </div>
        </Col>
        <Col span="md-3">
          <div className="demo-color demo-background-color">
            <p>失效-button背景</p>
            <p>#F7F7F7</p>
          </div>
        </Col>
        <Col span="md-3">
          <div className="demo-color demo-background-color_light">
            <p>背景\底色\块分割</p>
            <p>#F8F8F9</p>
          </div>
        </Col>
        <Col span="md-3">
          <div className="demo-color demo-white">
            <p>白色</p>
            <p>#FFFFFF</p>
          </div>
        </Col>
      </Row>
      <h3>释义颜色</h3>
      <Row className="demo-row" gutter="8">
        <Col span="md-3">
          <div className="demo-color demo-color_notice">
            <p>提示</p>
            <p>#20A0FF</p>
          </div>
        </Col>
        <Col span="md-3">
          <div className="demo-color demo-color_success">
            <p>成功</p>
            <p>#13CE66</p>
          </div>
        </Col>
        <Col span="md-3">
          <div className="demo-color demo-color_warning">
            <p>注意</p>
            <p>#F7BA2A</p>
          </div>
        </Col>
        <Col span="md-3">
          <div className="demo-color demo-color_error">
            <p>失败</p>
            <p>#FF4949</p>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Base;
