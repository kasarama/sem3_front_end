import { useEffect } from "react";
import { Row, Container, Col } from "react-bootstrap";
import facade from "../apiFacade";

export default function Home() {
  
  return (
    <div>
      <div>
        <h2>Welcome home</h2>
      </div>

      <Container
        fluid
        style={{ border: "2px solid black", height: 400, width: 600 }}
      >
        <Row style={{ border: "2px solid black", height: "40%" }}>
          <Col
            style={{ border: "2px solid blue", height: "100%", width: "50%" }}
          >
            bkjn
          </Col>
          <Col
            style={{ border: "2px solid red", height: "100%", width: "25%" }}
          >
            bkjn
          </Col>
          <Col
            style={{ border: "2px solid green", height: "100%", width: "25%" }}
          >
            njknk
          </Col>
        </Row>
        <Row style={{ border: "2px solid black", height: "60%" }}>nlknk</Row>
      </Container>
    </div>
  );
}
