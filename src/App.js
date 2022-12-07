import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import moment from "moment";
import Home from "./components/Home";
import Weather from "./components/Weather";
function App() {
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [error, setError] = useState(false);
  const [data, setData] = useState("");
  const [icon, setIcon] = useState("");
  const [dayornight, setDayorNight] = useState("");
  const [place, setPlace] = useState("");
  const [locationdata, setLocationData] = useState("");
  const [selectState, setSelectState] = useState(false);
  const [selectedState, setSelecetdState] = useState("");
  const API_KEY = "70953a72e646dd4ace686d03be7ed953";
  const weatherapiHandler = async () => {
    var CurrentDate = moment().unix();
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    await axios
      .get(url)
      .then((response) => {
        setData(response.data);
        setIcon(
          "http://openweathermap.org/img/w/" +
            response.data.weather[0].icon +
            ".png"
        );
        if (
          CurrentDate < response.data.sys.sunset &&
          CurrentDate > response.data.sys.sunrise
        ) {
          setDayorNight("day");
        } else {
          setDayorNight("night");
        }
      })
      .catch((err) => {
        // console.log("err", err.response);
        setError(true);
      });
  };
  useEffect(() => {
    if (latitude !== "" && longitude !== "") {
      weatherapiHandler();
    }
  }, [longitude, latitude]);

  const geocodingapiHandler = async () => {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${place}&limit=5&appid=${API_KEY}`;
    await axios
      .get(url)
      .then((response) => {
        setLocationData(response.data);
        if (response.data.length > 1) {
          setSelectState(true);
        } else {
          setLongitude(response.data[0].lon);
          setLatitude(response.data[0].lat);
        }
      })
      .catch((err) => {
        // console.log("err", err.response);
        setError(true);
      });
  };
  const clearData = () => {
    setData("");
    setSelectState(false);
    setSelecetdState("");
    setError(false);
  };
  const hadleSubmit = () => {
    if (selectState) {
      // console.log("fgh", selectedState);
      if (selectedState === "") {
        setError(true);
      } else {
        setLongitude(locationdata[selectedState].lon);
        setLatitude(locationdata[selectedState].lat);
      }
    } else {
      geocodingapiHandler();
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center  maincard ">
      {data === "" ? (
        <Home
          setPlace={setPlace}
          hadleSubmit={hadleSubmit}
          error={error}
          selectState={selectState}
          locationdata={locationdata}
          setSelecetdState={setSelecetdState}
          clearData={clearData}
        />
      ) : (
        <Weather
          data={data}
          icon={icon}
          dayornight={dayornight}
          clearData={clearData}
        />
      )}
    </div>
  );
}

export default App;
