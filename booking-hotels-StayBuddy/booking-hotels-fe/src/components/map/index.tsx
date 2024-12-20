import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

interface MapProps {
  latitude: number;
  longitude: number;
}

const Map: React.FC<MapProps> = ({ latitude, longitude }) => {
  const position: [number, number] = [latitude, longitude];

  const customIcon = L.icon({
    iconUrl: '/images/Location.svg', 
    iconSize: [25, 41], 
    iconAnchor: [12, 41], 
    popupAnchor: [1, -34], 
  });

  return (
    <MapContainer center={position} zoom={15} style={{ height: '400px', width: '100%', zIndex: 0 }} scrollWheelZoom={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position} icon={customIcon}>
        <Popup>
          You are here!
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
