import { useEffect, useState, Button, Form } from "react";
import { useHistory } from "react-router-dom";
import { Row, Container, Col } from "react-bootstrap";

export default function Register({ facade, init }) {
  const [newUser, setNewUser] = useState(init);
  const [status, setStatus] = useState("");
  const [nickName, setNickName] = useState("Stranger");
  const [pass2, setPass2] = useState("");
  const history = useHistory();

  function onChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.id;

    setStatus("");

    setNewUser({
      ...newUser,
      [name]: value,
    });
  }
  function onChange1(e) {
    setPass2(e.target.value);
    setStatus("");
  }

  function onSubmit(e) {
    e.preventDefault();
    if (
      pass2.length <= 3 ||
      newUser.password.length <= 3 ||
      newUser.username.length <= 3
    ) {
      setStatus("nickname or password to short, try again");
    } else {
      pass2 === newUser.password
        ? facade
            .registerUser(newUser)
            .then((data) => {
              setStatus(data.msg);
              setNickName(data.username);
            })
            .catch((err) => {
              if (err.status) {
                err.fullError.then((e) => setStatus(e.message));
              } else {
                setStatus("Network error has occurred: could not log in");
                console.log("Network error! Could not log in");
              }
            })
        : setStatus("passwords did not match");
      history.push("/login");
    }
  }
  return (
    <Container fluid>
      <Row>
        <Col md={5}></Col>
        <Col>
          <h2>Create new profile </h2>
        </Col>
        <Col md={5}></Col>
      </Row>
      <Row style={{ height: 40 }}>{"  "}</Row>
      <Row>
        <Col md={4}></Col>
        <Col>
          <form onSubmit={onSubmit}>
            <div className="form-group row">
              <label style={{ width: 180 }}>
                Nick name:
                <input type="text" id="username" onChange={onChange} />
              </label>
            </div>
            <div className="form-group row">
              <label style={{ width: 180 }}>
                Password:
                <input type="password" id="password" onChange={onChange} />
              </label>
            </div>
            <div className="form-group row">
              <label style={{ width: 180 }}>
                Repeat password:
                <input type="password" id="password1" onChange={onChange1} />
              </label>
            </div>
            <div className="form-group row">
              <input type="submit" value="Submit" />
            </div>
          </form>
        </Col>
        <Col md={4}></Col>
      </Row>
    </Container>
  );
}
/*

        */
