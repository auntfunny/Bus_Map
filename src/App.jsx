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

function App() {
  const [current, setCurrent] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
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

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen w-full">
      {loading && !loadError ? (
        <div className="w-20 h-20 rounded-full border-6 border-gray-500 border-t-blue-600 animate-spin"></div>
      ) : (
        <MapContainer
          center={[current.latitude, current.longitude]}
          zoom={13}
          scrollWheelZoom={false}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
        </MapContainer>
      )}
    </div>
  );
}

export default App;
