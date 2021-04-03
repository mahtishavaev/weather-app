import { FC, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import { useDispatch, useSelector } from "react-redux";
import "leaflet/dist/leaflet.css";
import MarkerIcon from "../../assets/icons/marker.svg";
import { getCurrentLocation, getLocations, setCurrentLocation } from "../../redux/locationsSlice";

const markerIcon = L.icon({ iconUrl: MarkerIcon, iconSize: [30, 30], iconAnchor: [15, 30] });

export const WorldMap: FC = () => {
  const [map, setMap] = useState<L.Map>();
  const locations = useSelector(getLocations);
  const location = useSelector(getCurrentLocation);
  const dispatch = useDispatch();

  useEffect(() => {
    location
      ? map?.flyTo([location.latitude, location.longitude], 10, {
          animate: true,
          duration: 2,
        })
      : map?.flyTo([20, 0], 2, {
          animate: true,
          duration: 2,
        });
  }, [location, map]);

  return (
    <MapContainer
      style={{ height: "100%", minHeight: 400 }}
      center={[20, 0]}
      zoom={2}
      whenCreated={setMap}
    >
      <TileLayer
        // attribution='© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        // url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        // tileSize={512}
        // zoomOffset={-1}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((el) => (
        <Marker
          key={el.geoname_id}
          icon={markerIcon}
          position={[el.latitude, el.longitude]}
          eventHandlers={{
            click() {
              dispatch(setCurrentLocation(el));
            },
          }}
        ></Marker>
      ))}
    </MapContainer>
  );
};
