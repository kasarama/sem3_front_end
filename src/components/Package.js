export default function Package({ demoPack }) {
  /*
  
    //car:
    private int year;
    private String plates;
    private String color;
    private String carName;

    private String chuckJoke;
    private String dadJoke;
    //mentor:
    private String MentorName;
    private int phone;
    private int age;

    //target
    private String title;
    private String email;
    private String details;
  */
  function drawPack(pack) {}

  demoPack().then((pack) => {
    drawPack(pack);
  });
  return (
    <Container fluid>
      <Row>
        <Col>1 of 1</Col>
      </Row>
    </Container>
  );
}
