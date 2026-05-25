import {
  CircleMarker,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { Link } from "react-router-dom";

function Map({ darkMode, setDarkMode }) {
  const [current, setCurrent] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [buses, setBuses] = useState([]);
  const [menu, setMenu] = useState(false);
  const options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    function success(pos) {
      const crd = pos.coords;
      setCurrent(crd);
      console.log("change");
      setLoading(false);
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
      setLoadError(err.message);
    }

    navigator.geolocation.watchPosition(success, error, options);
  }, []);

  useEffect(() => {
    const getBuses = async () => {
      try {
        const { data: coords, error } = await supabase
          .from("coords")
          .select("*")
          .eq("active", true);

        if (error) {
          throw error;
        }

        setBuses(coords);
      } catch (err) {
        setLoadError(err.message);
        console.error(err);
      }
    };

    getBuses();
  }, []);

  return (
    <div className="relative flex items-center justify-center h-screen w-full">
      {menu && (
        <div
          onClick={() => setMenu(false)}
          className="fixed inset-0 z-9999 flex items-center justify-center bg-black/40 backdrop-blur-md transition-opacity"
        >
          <div className="w-72 overflow-hidden rounded-2xl bg-white shadow-xl border border-stone-100">
            <div className="bg-accgreen p-4 text-center">
              <h3 className="text-sm font-semibold tracking-wider text-white uppercase">
                Menu
              </h3>
            </div>

            <ul className="p-3 space-y-1">
              <li>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  type="button"
                  className="w-full text-left px-4 py-3 rounded-xl text-stone-700 font-medium hover:bg-accblue1-500/10 hover:text-blue2 transition-colors flex items-center gap-3 cursor-pointer"
                >
                  Dark Mode
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="w-full text-left px-4 py-3 rounded-xl text-stone-700 font-medium hover:bg-accblue1-500/10 hover:text-blue2 transition-colors flex items-center gap-3 cursor-pointer"
                >
                  To Puerto
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="w-full text-left px-4 py-3 rounded-xl text-stone-700 font-medium hover:bg-accblue1-500/10 hover:text-blue2 transition-colors flex items-center gap-3 cursor-pointer"
                >
                  To La Arena
                </button>
              </li>

              <hr className="my-2 border-stone-100" />

              <li>
                <Link
                  to="/login"
                  className="block text-center mx-1 px-4 py-2.5 rounded-xl bg-accsage text-white font-semibold hover:bg-accgreen transition-colors cursor-pointer shadow-sm"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}

      <button
        onClick={() => setMenu(true)}
        type="button"
        className="group absolute top-5 right-5 z-500 p-2 rounded-lg border border-gray-400 bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6 md:size-8 lg:size-10 group-hover:rotate-360 transition-transform duration-200 ease-in-out"
        >
          <path
            fillRule="evenodd"
            d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {loading && !loadError ? (
        <div className="w-20 h-20 rounded-full border-6 border-gray-500 border-t-blue-600 animate-spin"></div>
      ) : !loadError ? (
        <MapContainer
          center={[current.latitude, current.longitude]}
          zoom={13}
          scrollWheelZoom={false}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url={
              darkMode
                ? "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            }
          />
          <CircleMarker
            center={[current.latitude, current.longitude]}
            radius={8}
            pathOptions={{
              color: "#ffffff",
              fillColor: "#3b82f6",
              fillOpacity: 1,
              weight: 2,
            }}
          ></CircleMarker>
          <CircleMarker
            center={[-41.523993, -72.761088]}
            radius={10}
            pathOptions={{
              color: "#ffffff",
              fillColor: "#fb2c36",
              fillOpacity: 1,
              weight: 2,
            }}
          ></CircleMarker>
          {buses.length > 0 &&
            buses.map((bus) => (
              <CircleMarker
                key={bus.name}
                center={[bus.latitude, bus.longitude]}
                radius={10}
                pathOptions={{
                  color: "#ffffff",
                  fillColor: "#fb2c36",
                  fillOpacity: 1,
                  weight: 2,
                }}
              ></CircleMarker>
            ))}
        </MapContainer>
      ) : (
        <p>{loadError}</p>
      )}
    </div>
  );
}

export default Map;
