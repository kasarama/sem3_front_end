import { Row, Container, Col } from "react-bootstrap";
import { useEffect, useState, Button, Form } from "react";
import { useHistory } from "react-router-dom";
import url from "../settings";
import facade from "../apiFacade";

export default function NewPack() {
  const initOption = (
    <option disabled={true} value={"random"}>
      {"loading..."}
    </option>
  );
  const hiistory = useHistory();
  const [categories, setCat] = useState(["ab", "cd"]);
  const [cars, setCars] = useState(initOption);
  const [destiny, setDestiny] = useState({ name: "", body: "", email: "" });
  const [mentor, setMentor] = useState(initOption);
  const [loadingNorris, setNorrisLoading] = useState(true);
  const [loadingCar, setCarLoading] = useState(true);
  const [loadingMentor, setMen] = useState(true);
  const [loadingTarget, setTar] = useState(true);
  const [errorMsg, setErrMsg] = useState("Start selecting");
  const [luckyTarget, setLucky] = useState("500");
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
                " level: " +
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
    facade.fetchAnyGET(url.target + luckyTarget).then((target) => {
      console.log(target);
      setDestiny({
        name: target.name,
        email: target.email,
        body: target.body,
      });
    });
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
              <p>Loading ...</p>
            ) : (
              <form>
                <div className="form-row align-items-center">
                  <div style={{ margin: "2%" }}>
                    <span>Secret spell - choose category</span>
                    <select
                      className="custom-select mr-sm-2"
                      id="chuck"
                      defaultValue={"default"}
                    >
                      <option disabled={true} value={"default"}>
                        {"They're all very powerfull :"}
                      </option>
                      <option value={"random"}>{"random"}</option> {categories}
                    </select>
                  </div>{" "}
                  <div style={{ margin: "2%" }}>
                    <span>Choose the Teleportator</span>
                    <select
                      className="custom-select mr-sm-2"
                      id="target"
                      defaultValue={"default"}
                    >
                      <option disabled={true} value={"default"}>
                        {"Shown colors ar colors of the specific vehicle:"}
                      </option>
                      {cars}
                    </select>
                  </div>{" "}
                  <div style={{ margin: "2%" }}>
                    <span>The most worthy Mentor</span>
                    <select
                      className="custom-select mr-sm-2"
                      id="mentor"
                      defaultValue={"default"}
                    >
                      <option disabled={true} value={"default"}>
                        {"They all have secret powers:"}
                      </option>
                      {mentor}
                    </select>
                    <div style={{ margin: "2%" }}>
                      <p>Draw your Portal of Destiny</p>

                      <button onClick={spinTarget}>Spin!</button>
                      <p>{destiny.name}</p>
                      <p>{destiny.email}</p>
                      <p>{destiny.body}</p>
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
