import React, { useEffect, useMemo, useState } from "react";
import Map, { Marker, Popup, NavigationControl, FullscreenControl, ScaleControl, GeolocateControl, ViewState } from "react-map-gl";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "mapbox-gl/dist/mapbox-gl.css"; // Example import for a specific component

const MAPBOX_TOKEN = "pk.eyJ1IjoiYXJiYXRhbSIsImEiOiJjbHBiZWdra24wZnZuMmpxbzQzNXBwajF2In0.ebOoMEM2aeEP7k0acFbXNA";
const center = {
  lat: 0, // Placeholder value, it will be updated with the user's current location
  lng: 0, // Placeholder value, it will be updated with the user's current location
};
const MapComponent: React.FC = () => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState<any>(null);
  const [response, setResponse] = useState("");
  const handleGetClinics = async () => {
    console.error("Getting Clinics...");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
      try {
        const res = await fetch("/api/clinicMapBox");
        if (res.ok) {
          const { data } = await res.json();
          setPlaces(data?.features);
          console.log("Message Recieved parced, ", data?.features);
        } else {
          console.log("Reply Error:", res.statusText);
          // Handle errors here
        }
        // const res = await fetch("/api/clinicMapBox", {
        //   method: "GET",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // });
        // console.log("Message Recieved, ", res);

        // if (res.ok) {
        //   const data = await res.json();
        //   console.log("Message Recieved parced, ", data);
        //   setResponse(data.data); // Set the response data in state or handle it accordingly

        //   console.log("Reply Parced:", data.data);
        // } else {
        //   console.log("Error Recieved parced, ", res);
        //   // Handle errors here
        // }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.error("Geolocation is not supported");
    }
  };
  useEffect(() => {
    handleGetClinics();
  }, []);
  return (
    <div style={{ height: "1200px", width: "100%" }}>
      <Map
        initialViewState={{
          latitude: 14.589834045544592,
          longitude: 120.98099329101666,
          zoom: 12,
          bearing: 0,
          pitch: 0,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <div style={{ position: "absolute", right: 10, top: 10 }}>
          <NavigationControl />
        </div>
        <ScaleControl />
        {places.map((place: any) => (
          <Marker key={place.id} latitude={place.center[1]} longitude={place.center[0]}>
            <button
              className="marker-btn"
              onClick={(e) => {
                e.preventDefault();
                console.log("Selected a place", place);
                setSelectedPlace(place);
              }}
            >
              <div>
                {/* Use the default Mapbox marker icon */}
                <img src="https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png" alt="Marker" style={{ width: "24px", height: "24px" }} />
              </div>
              {/* Add your marker icon/image here */}
              {/* Example: <img src="marker.png" alt="Restaurant Marker" /> */}
            </button>
          </Marker>
        ))}

        {selectedPlace && (
          <Popup latitude={selectedPlace.center[1]} longitude={selectedPlace.center[0]} onClose={() => setSelectedPlace(null)}>
            <div>
              <h3>{selectedPlace.text}</h3>
              <p>Address: {selectedPlace.place_name}</p>
              {/* Add other restaurant information here */}
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};
export default MapComponent;
