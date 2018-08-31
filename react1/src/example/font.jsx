import React from 'react';
import { Row, Col } from '../components/';


function Base() {
  return (
    <div className="demo">
      <h2>字体</h2>
      <p>&nbsp;</p>
      <h3>中文字体</h3>
      <Row className="demo-row" gutter="8">
        <Col span="md-6">
          <div style={{ fontFamily: 'PingFang SC', fontSize: '18px', padding: '10px', textAlign: 'center' }}>
            <p>字体规范</p>
            <p>PingFang SC</p>
          </div>
        </Col>
        <Col span="md-6">
          <div style={{ fontFamily: 'Hiragino Sans GB', fontSize: '18px', padding: '10px', textAlign: 'center' }}>
            <p>字体规范</p>
            <p>Hiragino Sans GB</p>
          </div>
        </Col>
        <Col span="md-6">
          <div style={{ fontFamily: 'Microsoft YaHei', fontSize: '18px', padding: '10px', textAlign: 'center' }}>
            <p>字体规范</p>
            <p>Microsoft YaHei</p>
          </div>
        </Col>
      </Row>
      <h3>英文字体</h3>
      <Row className="demo-row" gutter="8">
        <Col span="md-6">
          <div style={{ fontFamily: 'PingFang SC', fontSize: '18px', padding: '10px', textAlign: 'center' }}>
            <p>Typefaces</p>
            <p>Helvetica Neue</p>
          </div>
        </Col>
        <Col span="md-6">
          <div style={{ fontFamily: 'Hiragino Sans GB', fontSize: '18px', padding: '10px', textAlign: 'center' }}>
            <p>Typefaces</p>
            <p>Helvetica</p>
          </div>
        </Col>
        <Col span="md-6">
          <div style={{ fontFamily: 'Microsoft YaHei', fontSize: '18px', padding: '10px', textAlign: 'center' }}>
            <p>Typefaces</p>
            <p>Arial</p>
          </div>
        </Col>
      </Row>
      <h3>字体使用规范</h3>
      <Row>
        <Col span="md-24">
          <table className="demo-table">
            <tbody>
              <tr>
                <th>中/英文字体</th>
                <th>示例</th>
                <th>粗细</th>
                <th>颜色</th>
                <th>字号</th>
              </tr>
              <tr>
                <td>主标题</td>
                <td><span style={{ fontSize: '20px', fontWeight: 'blod', color: '#252525' }}>主要标题/This is an example</span></td>
                <td>加粗</td>
                <td>#252525</td>
                <td>20px</td>
              </tr>
              <tr>
                <td>标题</td>
                <td><span style={{ fontSize: '18px', fontWeight: 'blod', color: '#252525' }}>一般标题/This is an example</span></td>
                <td>加粗</td>
                <td>#252525</td>
                <td>18px</td>
              </tr>
              <tr>
                <td>小标题</td>
                <td><span style={{ fontSize: '16px', fontWeight: 'blod', color: '#252525' }}>一般小标题/This is an example</span></td>
                <td>加粗</td>
                <td>#252525</td>
                <td>16px</td>
              </tr>
              <tr>
                <td>正文</td>
                <td><span style={{ fontSize: '14px', color: '#666666' }}>主要正文/This is an example</span></td>
                <td>默认</td>
                <td>#666666</td>
                <td>14px</td>
              </tr>
              <tr>
                <td>正文(小)</td>
                <td><span style={{ fontSize: '13px', color: '#666666' }}>常规正文/This is an example(小)</span></td>
                <td>默认</td>
                <td>#666666</td>
                <td>13px</td>
              </tr>
              <tr>
                <td>辅助文字</td>
                <td><span style={{ fontSize: '12px', color: '#999999' }}>辅助文字/This is an example</span></td>
                <td>默认</td>
                <td>#999999</td>
                <td>12px</td>
              </tr>
            </tbody>
          </table>
        </Col>
      </Row>
    </div>
  );
}

export default Base;
