import React, { useEffect, useMemo, useState } from "react";
import { GoogleMap, InfoWindow, Marker, MarkerF, useLoadScript } from "@react-google-maps/api";
import axios from "axios";
import { API } from "@libs/api";
interface Clinic {
  name: string;
  address: string;
  lat: number;
  lng: number;
}
const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

type Coordinates = {
  lat: number;
  lng: number;
};

type MapProps = {
  googleMapsApiKey: string;
};

const center = {
  lat: 0, // Placeholder value, it will be updated with the user's current location
  lng: 0, // Placeholder value, it will be updated with the user's current location
};
const apiKey = "AIzaSyAaF8jZ3QgSvdItou0dLzVq3pof_L_oYvs";
const GoogleMapComponent: React.FC = () => {
  // infers type from default value
  const [selectedMarker, setSelectedMarker] = useState<Coordinates | null>(center);
  const libraries = ["places"];
  const [clinics, setClinics] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
  });
  useEffect(() => {
    // Fetch clinics based on user's location
    console.log("getting nearby clinics");

    try {
      console.log("getting current position");
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          // Update map center
          center.lat = latitude;
          center.lng = longitude;
          try {
            // Make API request to fetch nearest clinics
            // .get(`https://edia-be.azurewebsites.net/api/api/gmaps`, {
            const response = API.post(`/api/api/gmaps`, {
              location: `${latitude},${longitude}`,
              radius: 1000,
              input: "psychotherapist",
              type: "doctor",
              key: apiKey,
            })
              .then((response) => {
                console.log("CLINICS: ", response.data.results);
                setClinics(response.data.results);
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          } catch (error) {
            console.error("Error fetching clinics:", error);
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.error("Error getting current location:", error);
          setLoading(false);
        },
        { timeout: 5000, maximumAge: 60000, enableHighAccuracy: true }
      );
    } catch (error) {
      console.log("Error fetching", error);
    }
  }, []);

  if (loadError) {
    return <div>Error loading Map</div>;
  }

  if (!isLoaded) {
    return <div>Loading Map...</div>;
  }

  return (
    <div style={{ height: "1200px", width: "100%" }}>
      {
        <GoogleMap mapContainerStyle={{ height: "100%", width: "100%" }} zoom={15} center={center}>
          {clinics.map((clinic: any) => (
            <MarkerF
              position={clinic.geometry.location}
              onClick={() => {
                setSelectedMarker(clinic.geometry.location);
              }}
              key={clinic.place_id}
            >
              {selectedMarker && (
                <InfoWindow
                  onCloseClick={() => {
                    setSelectedMarker(null);
                  }}
                  key={clinic.place_id}
                  position={clinic.geometry.location}
                >
                  <a aria-label="open link to directions" key={clinic.place_id} className="underline hover:text-blue-750">
                    {clinic.name}
                  </a>
                </InfoWindow>
              )}
            </MarkerF>
          ))}
        </GoogleMap>
      }
    </div>
  );
};
export default GoogleMapComponent;
