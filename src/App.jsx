import { Route, Routes, useLocation } from "react-router-dom";
import Map from "./pages/Map";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import { ZoomControl } from "react-leaflet";

const App = () => {
  const { pathname } = useLocation();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const html= document.querySelector("#html");
    if(darkMode){
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    scrollTo(0,0);
  }, [pathname]);

  return (
    <Routes>
      <Route path={"/"} element={<Map darkMode={darkMode} setDarkMode={setDarkMode}/>} />
      <Route path={"/login"} element={<Login darkMode={darkMode}/>} />
    </Routes>
  );
}

export default App;
