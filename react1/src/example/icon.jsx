/*
 * @Author: willhu
 * @Date: 2017-11-27 15:10:18
 * @Last Modified by: weilihua
 * @Last Modified time: 2017-11-28 16:08:14
 */


import React from 'react';
import { Row, Col, Icon } from '../components/';

const iconList = [
  'save',
  'edit',
  'menu',
  'zoom-in',
  'share',
  'more',
  'success',
  'error',
  'check',
  'wrong',
  'plus',
  'minus',
  'surprise',
  'cry',
  'smile',
  'calendar',
  'trashcan',
  'upload',
  'upload2',
  'settings',
  'clock',
  'search',
  'info-darken',
  'warning-darken',
  'info-lighten',
  'warning-lighten',
  'picture',
  'file',
  'star-darken',
  'star-lighten',
  'news',
  'question',
  'arrow-up',
  'arrow-right',
  'arrow-left',
  'arrow-down',
  'arrow-right-double',
  'arrow-left-double',
  'triangle-up',
  'triangle-down',
  'triangle-left',
  'triangle-right',
  'check-large',
  'sort',
];

function icon() {
  return (
    <div className="demo">
      <h2>图标们</h2>
      <h3>基础类</h3>
      <Row className="demo-row" gutter="8">
        {iconList.map((value, i) => {
          const type = value;
          return (
            <Col key={i} span="md-6" style={{ marginBottom: '10px' }}>
              <Icon type={type} />&nbsp;{type}
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default icon;
