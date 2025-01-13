import React, { useEffect, useState } from 'react';
import imgURL from "../Assets/Image.json";

function Weather({ data }) {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [image, setImage] = useState(imgURL["Other"]);

  useEffect(() => {
    if (!data) return;
    try {  
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const { dt, timezone, name, sys, weather, main } = data;
      const currentTime = new Date(dt * 1000 + timezone * 1000);
      const formattedDate = {
        day: days[currentTime.getDay()],
        date: currentTime.getDate(),
        month: months[currentTime.getMonth()],
        year: currentTime.getFullYear(),
      };
      setWeatherInfo({
        name,
        country: sys.country,
        temp: main.temp,
        weather: weather[0].main,
        formattedDate,
      });
      const sky = weather[0].main;
      setImage(imgURL[sky] || "Other");
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }, [data]);

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-black/50 "></div>
      {weatherInfo ? (
        <div className="relative z-10 bg-white/90 p-8 rounded-3xl shadow-2xl max-w-lg text-center text-gray-800">
          <h1 className="text-4xl font-bold mb-3 text-indigo-600">
            {weatherInfo.name}, {weatherInfo.country}
          </h1>
          <h2 className="text-xl mb-4 text-gray-600">
            {`${weatherInfo.formattedDate.day}, ${weatherInfo.formattedDate.date} ${weatherInfo.formattedDate.month} ${weatherInfo.formattedDate.year}`}
          </h2>
          <h3 className="text-3xl font-semibold mb-2 text-gray-800">
            {weatherInfo.temp} &deg;C
          </h3>
          <h4 className="text-2xl italic text-indigo-500">
            {weatherInfo.weather}
          </h4>
        </div>
      ) : (
        <div className="text-white text-xl font-semibold">Loading...</div>
      )}
    </div>
  );
}

export default Weather;
