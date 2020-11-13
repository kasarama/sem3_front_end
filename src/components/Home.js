import { useEffect } from "react";
import { Row, Container, Col } from "react-bootstrap";
import facade from "../apiFacade";

export default function Home() {
  return (
    <Container fluid>
      <Row>
        <Col>
          {" "}
          <img height="auto" width="70%" src="../../vehicle1.png"></img>
        </Col>
      </Row>
    </Container>
  );
}
