import { useEffect } from "react";
import { Row, Container, Col } from "react-bootstrap";
import facade from "../apiFacade";

export default function Home() {
  return (
    <Container fluid>
      <Row>
        {" "}
        <Col>
         
        </Col>
        <Col>
          {" "}
          <img height="auto" width="100%" src="../../vehicle1.png"></img>
        </Col>{" "}
      </Row>
      <Row>
        {" "}
        <Col><h1>Let's begin Game of Threads!</h1></Col>
        <Col>
          {" "}
          <img height="auto" width="100%" src="../../vehicle1.png"></img>
        </Col>{" "}
      </Row>
    </Container>
  );
}
