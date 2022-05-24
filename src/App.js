import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { ReactComponent as WeatherLogo } from "./icons/perfect-day.svg";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./App.css";

function App() {
  const apiKey = "f56f24967aaf51182d1d4df628297c6d";
  const [inputCity, setInputCity] = useState("");
  const [data, setData] = useState({});

  const getWetherDetails = (cityName) => {
    if (!cityName) return;
    const apiURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=" +
      apiKey;
    axios
      .get(apiURL)
      .then((res) => {
        console.log("response", res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleChangeInput = (e) => {
    console.log("value", e.target.value);
    setInputCity(e.target.value);
  };

  const handleSearch = () => {
    getWetherDetails(inputCity);
  };

  return (
    <div className=" App">
      <Container className="App">
        <Row>
          <Col>
            <div className=" weatherBg">
              <h1 className="heading">Weather App</h1>
              <WeatherLogo className="WeatherLogo" />
              <h3 className="CityLabel"> Find Weather of your City</h3>
              <div className="SearchBox">
                <input
                  type="text"
                  placeholder="Enter City Name"
                  className="form-control"
                  value={inputCity}
                  onChange={handleChangeInput}
                />
                <Button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </div>
            </div>
          </Col>
          <Col>
            {Object.keys(data).length > 0 && (
              <div className="">
                <div className="weatherResultBox">
                  <Button className="Close">X</Button>
                  <img
                    className="weatherIcon"
                    src="https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png"
                  />

                  <h5 className="weatherCity">{data?.name}</h5>
                  <span className="weatherTemp">
                    {(data?.main?.temp - 273.15).toFixed(2)} °C
                  </span>
                  {/* {`  |  ${data?.data[0].description}`} */}
                </div>
                <br />
                <br />
                <br />
                <div className="FooterInfo">
                  Developed by{" "}
                  <a
                    target="_blank"
                    href="https://github.com/lanchenbawahengbam"
                  >
                    Lanchenba Wahengbam
                  </a>{" "}
                </div>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
