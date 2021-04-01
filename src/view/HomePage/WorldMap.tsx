import { FC, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import MarkerIcon from "../../assets/icons/marker.svg";

const markerIcon = L.icon({ iconUrl: MarkerIcon, iconSize: [30, 30], iconAnchor: [15, 30] });

export const WorldMap: FC = () => {
  const [map, setMap] = useState<L.Map>();

  return (
    <>
      {false && (
        <MapContainer style={{ height: "100%" }} center={[20, 0]} zoom={2} whenCreated={setMap}>
          <TileLayer
            attribution='© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
            tileSize={512}
            zoomOffset={-1}
          />
          <Marker icon={markerIcon} position={[20, 0]}></Marker>
        </MapContainer>
      )}
    </>
  );
};
