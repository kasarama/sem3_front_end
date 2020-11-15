import { useEffect } from "react";
import { Row, Container, Col } from "react-bootstrap";
import facade from "../apiFacade";

export default function Home() {
  return (
    <Container fluid>
      <Row>
        {" "}
        <Col xs={5} style={{ padding: "7%" }}>
          <Row style={{ padding: "5%" }}>
            <h2 style={{ marginBottom: "5%" }}>Let us begin</h2>
            <h1> The Game of Threads</h1>
          </Row>
          <Row style={{ paddingTop: "15%" }}>
            <Col>
              <h6>Personal reflections... </h6>
              <p>
                As I was one man - group I had this comfort to just continuously
                develop the code based on the temple codes we received
              </p>
            </Col>
          </Row>
        </Col>
        <Col>
          {" "}
          <img height="auto" width="100%" src="../../vehicle1.png"></img>
        </Col>{" "}
      </Row>
    </Container>
  );
}
