import { useEffect, useState } from "react";
import { Row, Container, Col } from "react-bootstrap";
import facade from "../apiFacade";
import PackView from "./PackView";

export default function Package() {
  const initpack = {
    year: 1,
    plates: "75-415",
    color: "#98B2D1",
    carName: "audi",
    chuckjoke: "hahaho",
    dadJoke: "hihihhe",
    MentorNme: "Magda",
    phone: 789987789,
    age: 32,
    title: "Boxing",
    email: "mail@mail.uk",
    details: "cdd vmasp nkl cdmsjsp",
  };
  const [packBox, setPackBox] = useState(initpack);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    let mounted = true;
    facade
      .getDemoPack()
      .then((pack) => {
        setPackBox({ ...pack });
      })

      .then(() => {
        if (mounted) {
          setloading(false);
        }
      });

    return function cleanup() {
      mounted = false;
    };
  }, []);
  //<div style={{ width: 500, height: 500 }}>
  return <PackView resultPack={packBox} />;
}

/*

   <Container
      style={{
        backgroundColor: packBox.color,
        bordercolor: "black",
      }}
    >

*/
/*
  <div>
      {" "}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div class="container-fluid">
          <div class="row">
            <div class="col">
              <div class="row">
                <div>
                  <h2>Package type</h2>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <p> </p>
                </div>
                <div class="col">
                  <h3>{packBox.chuckJoke}</h3>
                </div>
                <div class="col"> </div>
              </div>
            </div>
            <div class="col">
              <div styleName="background-color: coral;">
                <h2>Vehicle</h2>
                <p>car: {packBox.carName}</p>
                <p>year: {packBox.year}</p>
                <p>plates: {packBox.plates}</p>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <h2>Mentor</h2>
              <p>{packBox.MentorName}</p>
              <p>{packBox.phone}</p>
              <p>{packBox.age}</p>
            </div>
            <div class="col"> </div>
            <div class="col">
              <div class="row">
                <h2>Target</h2>
                <p>{packBox.title}</p>
                <p>{packBox.email}</p>
                <p>{packBox.details}</p>
              </div>
              <div class="row">
                <div class="col"> </div>
                <div class="col">
                  <h3>Dad Joke</h3>
                  <p>{packBox.dadJoke}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    */
