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

// const MapComponent = ({ places }: { places: any[] }) => {
//   useEffect(() => {
//     if (!places || places.length === 0) return;

//     // Eliminar mapa anterior si existe
//     const old = document.getElementById("leaflet-map");
//     if (old) old.remove();

//     // Crear contenedor
//     const mapDiv = document.createElement("div");
//     mapDiv.id = "leaflet-map";
//     mapDiv.style.width = "100%";
//     mapDiv.style.height = "300px";
//     mapDiv.style.borderRadius = "12px";
//     mapDiv.style.marginTop = "10px";

//     const container = document.getElementById("map-container");
//     container?.appendChild(mapDiv);

//     // Inicializar mapa
//     const map = L.map("leaflet-map").setView(
//       [places[0].location.lat, places[0].location.lng],
//       6
//     );

//     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//       maxZoom: 19,
//     }).addTo(map);

//     // Añadir marcadores
//     places.forEach((p) => {
//       if (!p.location)
// 		return;

//       L.marker([p.location.lat, p.location.lng]).addTo(map).bindPopup(p.name);
//     });

//   }, [places]);

//   return <div id="map-container"></div>;
// };
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

    const map = L.map(mapRef.current).setView(
      [places[0].location.lat, places[0].location.lng],
      6
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(map);

    places.forEach((p) => {
      if (!p.location) return;
      L.marker([p.location.lat, p.location.lng]).addTo(map).bindPopup(p.description);
    });

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
