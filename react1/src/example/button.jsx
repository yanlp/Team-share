import React from 'react';
import { Row, Col, Button } from '../components/';


function btn() {
  return (
    <div className="demo">
      <h2>按钮</h2>
      <p>&nbsp;</p>
      <h3>基本按钮</h3>
      <Row className="demo-row" gutter="8" type="fluid">
        <Col>
          <Button size="sm">默认小按钮</Button>
        </Col>
        <Col>
          <Button>默认按钮</Button>
        </Col>
        <Col>
          <Button size="lg">默认大按钮</Button>
        </Col>
        <Col>
          <Button size="lg" disabled>禁用按钮</Button>
        </Col>
      </Row>
      <h3>多种按钮</h3>
      <Row className="demo-row" gutter="8" type="fluid">
        <Col>
          <Button type="primary">主色按钮</Button>
        </Col>
        <Col>
          <Button type="ghost">幽灵按钮</Button>
        </Col>
        <Col>
          <Button type="transparent">透明按钮</Button>
        </Col>
      </Row>
      <p>&nbsp;</p>
      <h3>图标按钮</h3>
      <Row className="demo-row" gutter="8" type="fluid">
        <Col>
          <Button icon="save">带图标小按钮</Button>
        </Col>
        <Col>
          <Button type="primary" icon="success">带图标按钮</Button>
        </Col>
        <Col>
          <Button size="lg" icon="success">带图标大按钮</Button>
        </Col>
        <Col>
          <Button size="lg" icon="success" disabled>禁用图标按钮</Button>
        </Col>
      </Row>
    </div>
  );
}

export default btn;
