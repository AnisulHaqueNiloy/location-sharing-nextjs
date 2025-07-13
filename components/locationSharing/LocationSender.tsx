"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navigation, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// interface LocationSenderProps {
//   isConnected: boolean;
//   sendLocation: (lat: number, lon: number, userName: string) => Promise<void>;
// }
export interface LocationSenderProps {
  isConnected: boolean;
  sendLocation: (lat: number, lon: number, userName: string) => Promise<void>;
  getCurrentLocation: () => void;
  isGettingLocation: boolean;
  currentLat: string;
  currentLon: string;
  setCurrentLat: React.Dispatch<React.SetStateAction<string>>;
  setCurrentLon: React.Dispatch<React.SetStateAction<string>>;
  locationError: string | null;
}

export default function LocationSender({
  isConnected,
  sendLocation,
}: LocationSenderProps) {
  const [userName, setUserName] = useState("");
  const [currentLat, setCurrentLat] = useState("");
  const [currentLon, setCurrentLon] = useState("");
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [latManuallyChanged, setLatManuallyChanged] = useState(false);
  const [lonManuallyChanged, setLonManuallyChanged] = useState(false);

  // Determine if Send Now should be enabled
  const isSendEnabled =
    !!userName.trim() &&
    !!currentLat &&
    !!currentLon &&
    !latManuallyChanged &&
    !lonManuallyChanged;

  const fetchCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      return;
    }

    setIsGettingLocation(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatManuallyChanged(false);
        setLonManuallyChanged(false);

        setCurrentLat(position.coords.latitude.toString());
        setCurrentLon(position.coords.longitude.toString());
        setIsGettingLocation(false);
      },
      (error) => {
        let msg = "Failed to get location";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            msg = "Location permission denied";
            break;
          case error.POSITION_UNAVAILABLE:
            msg = "Position unavailable";
            break;
          case error.TIMEOUT:
            msg = "Location request timed out";
            break;
        }
        setLocationError(msg);
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  };

  useEffect(() => {
    setCurrentLat("");
    setCurrentLon("");
  }, []);

  const handleSendLocation = async () => {
    if (!userName.trim()) {
      toast.error("Username or Email is required");
      return;
    }
    if (!currentLat || !currentLon) {
      toast.error("Please provide both latitude and longitude");
      return;
    }

    const lat = Number.parseFloat(currentLat);
    const lon = Number.parseFloat(currentLon);

    if (isNaN(lat) || isNaN(lon)) {
      toast.error("Invalid latitude or longitude");
      return;
    }

    setIsSending(true);
    try {
      await sendLocation(lat, lon, userName.trim());
      toast.success("Location sent successfully!");
    } catch (error) {
      console.error("Send location error:", error);
      toast.warning("Failed to send location. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Card className="border-[#3f21b2]/20 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-[#3f21b2]">
          <Send className="w-5 h-5" />
          Share Your Location
        </CardTitle>
        <CardDescription>Input your details</CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="userName"> Email</Label>
          <Input
            id="userName"
            type="text"
            placeholder="john.doe@example.com"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="latitude">Latitude</Label>
            <Input
              id="latitude"
              type="number"
              step="any"
              placeholder="23.8103"
              value={currentLat}
              onChange={(e) => {
                setLatManuallyChanged(true);
                setCurrentLat(e.target.value);
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="longitude">Longitude</Label>
            <Input
              id="longitude"
              type="number"
              step="any"
              placeholder="90.4125"
              value={currentLon}
              onChange={(e) => {
                setLonManuallyChanged(true);
                setCurrentLon(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            onClick={fetchCurrentLocation}
            disabled={isGettingLocation}
            className="flex items-center gap-2 border-[#3f21b2]/30"
          >
            <Navigation className="w-4 h-4 text-[#3f21b2]" />
            {isGettingLocation ? "Getting..." : "Use My Location"}
          </Button>

          <Button
            onClick={handleSendLocation}
            // disabled={!isSendEnabled || isSending || !isConnected}
            className="flex items-center gap-2 bg-[#3f21b2] hover:bg-[#4d39a7] text-white shadow-md transition"
          >
            <Send className="w-4 h-4" />
            {isSending ? "Sending..." : "Send Now"}
          </Button>
        </div>

        {locationError && (
          <Alert>
            <AlertDescription>{locationError}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
