import { Row, Container, Col } from "react-bootstrap";
import { useEffect, useState, Button, Form } from "react";
import { useHistory } from "react-router-dom";
import url from "../settings";
import facade from "../apiFacade";

export default function NewPack() {
  const initOption = (
    <option disabled={true} value={"random"}>
      {"initial"}
    </option>
  );
  const hiistory = useHistory();
  const [categories, setCat] = useState(["ab", "cd"]);
  const [cars, setCars] = useState(initOption);
  const [destiny, setDestiny] = useState(initOption);
  const [mentor, setMentor] = useState(initOption);
  const [loadingNorris, setNorrisLoading] = useState(true);
  const [loadingCar, setCarLoading] = useState(true);
  const [loadingMentor, setMen] = useState(true);
  const [loadingTarget, setTar] = useState(true);
  const [errorMsg, setErrMsg] = useState("Start selecting");
  const [luckyTarget, setLucky] = useState("");
  useEffect(() => {
    let mounted = true;
    // fetch Chucks:
    facade
      .fetchAnyGET(url.categories)
      .then((data) => {
        setCat(
          data.map((cat) => (
            <option key={cat} value={"?category=" + cat}>
              {cat}
            </option>
          ))
        );
      })
      .then(() => {
        if (mounted) {
          setNorrisLoading(false);
        }
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => console.log(e.message));
        } else {
          setErrMsg("Network error has occurred: Could not load categories");
        }
      });

    fetchCars(mounted);
    fetchMentors(mounted);
    return function cleanup() {
      mounted = false;
    };
  }, []);
  function fetchCars(mounted) {
    mounted = true;
    facade
      .fetchAnyGET(url.cars)
      .then((cars) => {
        setCars(
          cars.data.map((car) => (
            <option
              key={car.id}
              style={{ background: car.color }}
              value={car.id}
            >
              {car.name +
                ",   year:  " +
                car.year +
                ",   code: " +
                car.pantone_value}
            </option>
          ))
        );
      })
      .then(() => {
        if (mounted) {
          setCarLoading(false);
        }
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => console.log(e.message));
        } else {
          setErrMsg("Network error has occurred: Could not load cars");
        }
      });
  }

  function fetchMentors(mounted) {
    mounted = true;
    facade
      .fetchNoOptions(url.mentors)
      .then((mentors) => {
        setMentor(
          mentors.data.map((men) => (
            <option key={men.id} value={men.id}>
              {men.employee_name +
                " tlf: " +
                men.employee_salary +
                ", age: " +
                men.employee_age}
            </option>
          ))
        );
      })
      .then(() => {
        if (mounted) {
          setMen(false);
        }
      })
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => console.log(e.message));
        } else {
          setErrMsg("Network error has occurred: Could not load cars");
        }
      });
  }

  function spinTarget(e) {
    e.preventDefault();
    setLucky(Math.floor(Math.random() * 500) + 1);
    console.log(luckyTarget);
    facade.fetchAnyGET(url.target + luckyTarget).then((target) => setDestiny());
  }

  return (
    <div>
      <Container fluid>
        <Row>
          {" "}
          <Col xs={1}> </Col>
          <Col
            xs={5}
            style={{
              margin: "3%",
              padding: "2%",
              border: "2px solid black",
              width: "60%",
            }}
          >
            {" "}
            <div className="form-row align-items-center">
              <h2>Select options:</h2>
            </div>
            {loadingNorris && loadingCar && loadingMentor ? (
              <p>Loading categories...</p>
            ) : (
              <form>
                <div className="form-row align-items-center">
                  <div style={{ margin: "2%" }}>
                    <span>Your weapon: secret spell - choose category</span>
                    <select className="custom-select mr-sm-2" id="chuck">
                      <option value={"random"}>{"random"}</option> {categories}
                    </select>
                  </div>{" "}
                  <div style={{ margin: "2%" }}>
                    <span>Choose the Teleportator</span>
                    <select className="custom-select mr-sm-2" id="target">
                      {cars}
                    </select>
                  </div>{" "}
                  <div style={{ margin: "2%" }}>
                    <span>The most worthy Mentor</span>
                    <select className="custom-select mr-sm-2" id="mentor">
                      {mentor}
                    </select>
                    <div style={{ margin: "2%" }}>
                      <p1>Draw your Portal of Destiny</p1>
                      <br />
                      <button onClick={spinTarget}>Spin!</button>
                    </div>{" "}
                  </div>
                </div>
              </form>
            )}
          </Col>
          <Col> </Col>
        </Row>
        <Row>
          {" "}
          <Col xs={1}> </Col>
          <Col
            xs={5}
            style={{
              marginLeft: "3%",
              marginRight: "3%",
              padding: "1%",
              border: "2px solid black",
              width: "60%",
            }}
          >
            {" "}
            <div className="form-row align-items-center">
              <h3>{errorMsg}</h3>
            </div>
          </Col>
          <Col> </Col>
        </Row>
      </Container>
    </div>
  );
}
