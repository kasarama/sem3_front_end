import { Row, Container, Col } from "react-bootstrap";
export default function Offer() {
  return (
    <Container fluid>
      <Row>
        {" "}
        <Col xs={4} style={{ padding: "7%" }}>
          <h3 style={{ marginBottom: "5%" }}>Play on packages</h3>
          <p>You ar choosin a package that includes:</p>
          <ul>
            <li>Secret spell</li>
            <li>Vehicle for teleportation</li>
            <li>Mentor</li>
            <li>Portal of your Destiny</li>
            <li>
              And as <span style={{ color: "red" }}>bonus</span> you get a
              special healin spell!
            </li>
          </ul>
        </Col>
        <Col>
          {" "}
          <img height="auto" width="100%" src="../../vehicle1.png"></img>
        </Col>{" "}
      </Row>
    </Container>
  );
}
