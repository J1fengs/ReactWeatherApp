import { useState } from "react";
import React from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [data, setData] = useState({});
  const [city, setCity] = useState({});
  const [location, setLocation] = useState("");
  const url = `https://api.weatherapi.com/v1/current.json?key=0916f601261e48d5a10121307231501&q=${location}&aqi=no`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data.current);
        setCity(response.data.location);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{city.name}</p>
          </div>
          <div className="temp">
            {data.temp_c ? <h1>{data.temp_c}°C</h1> : null}
          </div>
          <div className="description">
            {data.condition ? <p>{data.condition.text}</p> : null}
          </div>
        </div>

        {data.condition != undefined && (
          <div className="bottom">
            <div className="feels">
              {data.feelslike_c ? (
                <p className="bold">{data.feelslike_c}°C</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {/* {data.humidity ? <p className="bold">{data.humidity} %</p> : null} */}
              <p>{data.humidity} %</p>
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind_mph ? (
                <p className="bold">{data.wind_mph} MPH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
