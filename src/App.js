import { useState } from "react";
import Searchbar from "./Components/Searchbar";
import Weather from "./Components/Weather";


function App() {
  const [data, setData] = useState();

  const weatherData = (e)=>{
    setData(e);
  }
  
  return (
    <div className="bg-white/80 backdrop-blur-lg relative min-h-screen">
      <div className="absolute top-0 left-0 right-0 z-10">
        <Searchbar weatherData={weatherData}></Searchbar>
      </div>
      <Weather data={data}></Weather>
    </div>
  );
}

export default App;
