"use client";

import type { LocationData } from "@/hooks/use-signalr";
import { useEffect, useRef } from "react";

interface LocationMapProps {
  locations: LocationData[];
  currentLocation?: { lat: number; lon: number } | null;
}

export default function LocationMap({ locations, currentLocation }: LocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    const initMap = async () => {
      if (typeof window === "undefined") return;

      const L = (await import("leaflet")).default;


      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      });

      if (!mapInstanceRef.current && mapRef.current) {
        mapInstanceRef.current = L.map(mapRef.current).setView([23.8103, 90.4125], 10);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
        }).addTo(mapInstanceRef.current);
      }
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const updateMarkers = async () => {
      const L = (await import("leaflet")).default;

      markersRef.current.forEach((marker) => {
        mapInstanceRef.current.removeLayer(marker);
      });
      markersRef.current = [];


      if (currentLocation) {
        const currentMarker = L.marker([currentLocation.lat, currentLocation.lon], {
          icon: L.icon({
            iconUrl:
              "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
            shadowUrl:
              "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
          }),
        })
          .addTo(mapInstanceRef.current)
          .bindPopup(
            `<b>Your Location</b><br>Lat: ${currentLocation.lat.toFixed(
              6
            )}<br>Lon: ${currentLocation.lon.toFixed(6)}`
          );

        markersRef.current.push(currentMarker);
      }

      locations.forEach((location) => {
        const marker = L.marker([location.lat, location.lon], {
          icon: L.icon({
            iconUrl:
              "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png",
            shadowUrl:
              "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
          }),
        })
          .addTo(mapInstanceRef.current)
          .bindPopup(
            `<b>${location.userName}</b><br>Lat: ${location.lat.toFixed(
              6
            )}<br>Lon: ${location.lon.toFixed(6)}`
          );

        markersRef.current.push(marker);
      });

      if (markersRef.current.length > 0) {
        const group = L.featureGroup(markersRef.current);
        mapInstanceRef.current.fitBounds(group.getBounds().pad(0.2));
      }
    };

    updateMarkers();
  }, [locations, currentLocation]);

  return (
    <div className="relative rounded-xl border-2 border-[#319795] overflow-hidden shadow-md">
      <div
        ref={mapRef}
        className="w-full h-[350px] bg-[#f0f0f5]"
      />

      {locations.length === 0 && !currentLocation && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm">
          <div className="text-center text-[#9b59b6]">
            <div className="text-4xl mb-2 animate-bounce">📍</div>
            <p className="text-lg font-semibold">No location data yet</p>
            <p className="text-sm text-[#4a4a6a]">
              Once a user shares a location, it will appear here.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
