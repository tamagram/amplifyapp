import { Form, Col, Row } from "react-bootstrap";

const Preview = ({ sku }) => {
  return (
    <div className="App-preview">
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          SKU
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text" readOnly value={sku} />
        </Col>
      </Form.Group>
    </div>
  );
};

export default Preview;
