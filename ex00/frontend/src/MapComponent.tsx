import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = defaultIcon;

const MapComponent = ({ places }: { places: any[] }) => {
  
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current)
      return;
    if (!places || places.length === 0)
      return;

    // la libreia añade _leaflet_id` al div q contine el mapa
    if ((mapRef.current as any)._leaflet_id) {
      (mapRef.current as any)._leaflet_id = null;
    }

    const map = L.map(mapRef.current);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    const bounds = L.latLngBounds([]);
    places.forEach((p) => {
      if (!p.location)
        return;
      const location = L.latLng(p.location.lat, p.location.lng);
      L.marker(location).addTo(map).bindPopup(p.description);
      bounds.extend(location);
    });

    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [30, 30] });
    } else {
      map.setView([20, 0], 2);
    }
    map.fitBounds(bounds, { padding: [30, 30] });
    return () => {
      map.remove();
    };
  }, [places]);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "300px",
        borderRadius: "12px",
        marginTop: "10px"
      }}
    />
  );
};


export default MapComponent;
