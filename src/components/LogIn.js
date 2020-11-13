import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Row, Container, Col } from "react-bootstrap";

export default function LogIn({ login, init, errorMsg }) {
  const [loginCredentials, setLoginCredentials] = useState(init);

  const history = useHistory();

  const performLogin = (evt) => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password, () => {
      loginCredentials.username !== "admin"
        ? history.push("/account")
        : history.push("/statistics");
    });
  };
  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <Container fluid>
      <Row>
        <Col md={5}></Col>
        <Col>
          <h2>Log in page</h2>
        </Col>
        <Col md={5}></Col>
      </Row>
      <Row style={{ height: 40 }}>{"  "}</Row>
      <Row>
        <Col md={4}>
          <div className="form-group row">
            <h5>{errorMsg}</h5>
          </div>
        </Col>
        <Col>
          <form onChange={onChange}>
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
              <button onClick={performLogin}>Login</button>
            </div>
          </form>
        </Col>
        <Col md={4}></Col>
      </Row>
    </Container>
  );
}
