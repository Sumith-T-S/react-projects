import { useState } from "react";
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

  const hadleSubmit = async () => {
    // console.log("submit", longitude, latitude);
    var CurrentDate = moment().unix();
    console.log(CurrentDate);
    const API_KEY = "70953a72e646dd4ace686d03be7ed953";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    await axios
      .get(url)
      .then((response) => {
        console.log(response.data);
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

  return (
    <div className="d-flex align-items-center justify-content-center  maincard ">
      {data === "" ? (
        <Home
          setLatitude={setLatitude}
          setLongitude={setLongitude}
          hadleSubmit={hadleSubmit}
          error={error}
        />
      ) : (
        <Weather
          data={data}
          icon={icon}
          dayornight={dayornight}
          setData={setData}
        />
      )}
    </div>
  );
}

export default App;
