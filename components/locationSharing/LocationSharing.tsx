"use client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { useSignalR } from "@/hooks/use-signalr";
import { useCallback, useEffect, useState } from "react";
import ConnectionStatus from "./ConnectionStatus";
import LocationMapSection from "./LocationMapSection";
import LocationReceiver from "./LocationReceiver";
import LocationSender from "./LocationSender";

const SIGNALR_HUB_URL = "https://tech-test.raintor.com/Hub";

export default function LocationSharing() {
  const [currentLat, setCurrentLat] = useState("");
  const [currentLon, setCurrentLon] = useState("");
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const {
    isConnected,
    sendLocation,
    receivedLocations,
    connectionError,
    isConnecting,
  } = useSignalR(SIGNALR_HUB_URL);

  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser");
      return;
    }

    setIsGettingLocation(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLat(position.coords.latitude.toString());
        setCurrentLon(position.coords.longitude.toString());
        setIsGettingLocation(false);
      },
      (error) => {
        let errorMessage = "Failed to get location";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied by user";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out";
            break;
        }
        setLocationError(errorMessage);
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  }, []);

  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  return (
    <div className="space-y-10">
      <ConnectionStatus
        isConnected={isConnected}
        isConnecting={isConnecting}
        receivedCount={receivedLocations.length}
      />

      {connectionError && (
        <Alert>
          <AlertDescription>{connectionError}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LocationSender
          isConnected={isConnected}
          sendLocation={sendLocation}
          getCurrentLocation={getCurrentLocation}
          isGettingLocation={isGettingLocation}
          currentLat={currentLat}
          currentLon={currentLon}
          setCurrentLat={setCurrentLat}
          setCurrentLon={setCurrentLon}
          locationError={locationError}
        />
        <LocationReceiver receivedLocations={receivedLocations} />
      </div>

      <Separator />

      <LocationMapSection
        receivedLocations={receivedLocations}
        currentLat={currentLat}
        currentLon={currentLon}
      />
    </div>
  );
}
