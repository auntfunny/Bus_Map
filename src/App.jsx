import { Route, Routes } from "react-router-dom";
import Map from "./pages/Map";
import Login from "./pages/Login";
import { useState } from "react";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <Routes>
      <Route path={"/"} element={<Map darkMode={darkMode} setDarkMode={setDarkMode}/>} />
      <Route path={"/login"} element={<Login darkMode={darkMode}/>} />
    </Routes>
  );
}

export default App;
