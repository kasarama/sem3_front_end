import { Row, Container, Col, Spinner } from "react-bootstrap";
import { useEffect, useState, Button, Form } from "react";
import { useHistory } from "react-router-dom";
import url from "../settings";
import facade from "../apiFacade";
import PackView from "./PackView";

export default function NewPack({ activeUser }) {
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
  const [loadingPackage, setLoadingPackage] = useState(true);

  const [errorMsg, setErrMsg] = useState("Start selecting");
  const [luckyTarget, setLucky] = useState(Math.floor(Math.random() * 500) + 1);
  const [resultPack, setResPack] = useState({
    year: 1,
    plates: "75-415",
    color: "#98B2D1",
    carName: "audi",
    chuckJoke: "hahaho",
    dadJoke: "hihihhe",
    MentorName: "Magda",
    phone: 789987789,
    age: 32,
    title: "Boxing",
    email: "mail@mail.uk",
    details: "cdd vmasp nkl cdmsjsp",
  });
  const [newPack, setNewPack] = useState({
    category: "",
    car: "",
    mentor: "",
    target: luckyTarget.toString(10),
    username: activeUser,
  });

  const [renderResultPack, setRenederRP] = useState("false");
  const notLoggedInMenu = (
    <div>
      <h4>You need to log in or register to continue</h4>
      <button>Log in</button>
      <button>Create account</button>
      <button>Cancle</button>
    </div>
  );
  const readyToAddPack = (
    <div className="spinner-border" role="status">
      <span className="sr-only">Loading Package...</span>
    </div>
  );

  useEffect(() => {
    let mounted = true;
    // fetch Chucks:
    facade
      .fetchAnyGET(url.categories)
      .then((data) => {
        setCat(
          data.map((cat) => (
            <option key={cat} value={"random?category=" + cat}>
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
    facade.fetchAnyGET(url.target + luckyTarget).then((target) => {
      setDestiny({
        name: "Your portal is:",
        email: target.email,
      });
      setNewPack({ ...newPack, target: luckyTarget.toString(10) });
    });
    setResPack(resultPack);
  }

  function submit(e) {
    setNewPack({ ...newPack, username: activeUser });

    e.preventDefault();
    if (
      newPack.category === "" ||
      newPack.car === "" ||
      newPack.mentor === "" ||
      newPack.category === "default" ||
      newPack.car === "default" ||
      newPack.mentor === "default"
    ) {
      setErrMsg("Some of Components has not been chosen");
    } else if (facade.loggedIn) {
      console.log("facade.loggedIn????");
      console.log(facade.loggedIn());
      setErrMsg(
        <div>
          <h4>You need to log in or register to continue</h4>
          <button>Log in</button>
          <button>Create account</button>
          <button
            onClick={(e) => {
              e.preventDefault();
              hiistory.push("/");
            }}
          >
            Cancle
          </button>
        </div>
      );
    } else {
      console.log("ommitet esif");
      setErrMsg(readyToAddPack);
      setRenederRP(true);
    }
  }

  useEffect(() => {
    console.log(newPack);
    if (renderResultPack === true) {
      let mounted = true;
      facade
        .newPackage(url.newPack, newPack)
        .then((data) => {
          setResPack(data);
        })
        .then(() => {
          if (mounted) {
            setLoadingPackage(false);
          }
        })
        .catch((err) => {
          if (err.status) {
            err.fullError.then((e) => console.log(e.message));
          } else {
            setErrMsg("Network error has occurred: Could not load cars");
          }
        });
      return function cleanup() {
        mounted = false;
      };
    }
    //setRenederRP(false);
  }, [renderResultPack]);

  return (
    <Container fluid>
      <Row>
        <Col
          lg={5}
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
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <form>
              <div className="form-row align-items-center">
                <div style={{ margin: "2%" }}>
                  <span>Secret spell - choose category</span>
                  <select
                    className="custom-select mr-sm-2"
                    id="chuck"
                    defaultValue={"default"}
                    onClick={(e) => {
                      e.preventDefault();
                      if (e.target.value === "default") {
                      } else
                        setNewPack({ ...newPack, category: e.target.value });
                    }}
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
                    id="car"
                    defaultValue={"default"}
                    onClick={(e) => {
                      e.preventDefault();
                      if (e.target.value === "default") {
                      } else setNewPack({ ...newPack, car: e.target.value });
                    }}
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
                    onClick={(e) => {
                      e.preventDefault();
                      if (e.target.value === "default") {
                      } else setNewPack({ ...newPack, mentor: e.target.value });
                    }}
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

                    <button onClick={submit}>
                      Submit and unlock the BONUS healing spell
                    </button>
                  </div>{" "}
                </div>
              </div>
            </form>
          )}
        </Col>
        <Col
          lg={5}
          style={{
            margin: "3%",
            padding: "2%",
            border: "2px solid black",
            width: "60%",
          }}
        >
          {loadingPackage ? (
            <div>{errorMsg}</div>
          ) : (
            <PackView resultPack={resultPack} />
          )}
        </Col>
      </Row>
    </Container>
  );
}
