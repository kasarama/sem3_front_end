import { Row, Container, Col } from "react-bootstrap";

export default function PackView({ resultPack }) {
  console.log("resultPack in packView");
  console.log(resultPack);
  return (
    <Container fluid>
      <Row style={{ borderStyle: "inset" }}>
        <Col md={7} style={{ borderStyle: "inset" }}>
          <Row style={{ borderStyle: "inset" }}>
            <Col
              md={7}
              style={{ background: resultPack.color, margin: "2%", padding: 0 }}
            >
              <img height="100%" width="100%" src="../../vehicle1.png"></img>
            </Col>
            <Col md={4}>
              <Row>
                <h4>Vehicle:</h4>
              </Row>
              <Row>
                <h6>{resultPack.carName}</h6>
              </Row>
              <Row> year: {resultPack.year}</Row>
              <Row>code: {resultPack.plates}</Row>
            </Col>
          </Row>
          <Row style={{ borderStyle: "inset" }}>
            <Col>
              <Row style={{ borderStyle: "inset" }}>
                <Col>
                  <Row>
                    <h4>Your Mentor</h4>
                  </Row>
                  <Row>
                    <h6>{resultPack.MentorName}</h6>
                  </Row>
                  <Row>
                    <h6>level : {resultPack.phone}</h6>
                  </Row>
                  <Row>age: {resultPack.age}</Row>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row style={{ borderStyle: "inset" }}>
            <Col>
              <Row>
                <h6 style={{ color: "coral" }}>Your BONUS Healing spell</h6>
              </Row>
              <Row> {resultPack.dadJoke}</Row>
            </Col>{" "}
          </Row>
        </Col>
        <Col md={5} style={{ borderStyle: "inset" }}>
          <Col>
            <Row></Row>{" "}
            <Row>
              <h4>Secret spell</h4>
            </Row>
            <Row>
              <p>{resultPack.chuckJoke}</p>
            </Row>
            <Row style={{ borderStyle: "inset" }}>
              <Col>
                <Row>
                  <h5>{resultPack.title}</h5>
                </Row>
                <Row>
                  <h6>{resultPack.email}</h6>
                </Row>
                <Row>{resultPack.details}</Row>
              </Col>{" "}
            </Row>
          </Col>
        </Col>
      </Row>
    </Container>
  );
}
