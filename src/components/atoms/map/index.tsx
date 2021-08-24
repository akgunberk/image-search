import { Link } from "react-router-dom";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import locationMarker from "assets/icons/location-marker.svg";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import styles from "./styles.module.scss";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

interface ILocation {
  title?: string;
  position?: {
    latitude?: number;
    longitude?: number;
  };
}

const zoom = 12;

export const Map: React.FC<ILocation> = ({ position, title }) => {
  if (position?.latitude === null || position?.latitude === null) return null;

  return (
    <Link
      to={{
        pathname: `https://www.google.com/maps/search/?api=1&query=${position?.latitude},${position?.longitude}`,
      }}
      target="_blank"
    >
      <MapContainer
        className={styles.map}
        style={{ height: "300px" }}
        center={[position!.latitude!, position!.longitude!]}
        zoom={zoom}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[position!.latitude!, position!.longitude!]} />
      </MapContainer>
      <div className={styles.title}>
        <img
          className={styles.marker}
          src={locationMarker}
          width="14"
          height="14"
          alt="location-marker"
        />
        {title}
      </div>
    </Link>
  );
};
