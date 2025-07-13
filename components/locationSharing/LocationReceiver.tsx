"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, MapPin, User } from "lucide-react";

interface Location {
  userName: string;
  lat: number;
  lon: number;
}

interface LocationReceiverProps {
  receivedLocations: Location[];
}

export default function LocationReceiver({
  receivedLocations,
}: LocationReceiverProps) {
  return (
    <Card className="border-[#3f21b2]/20 shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-[#3f21b2]">
          <MapPin className="w-5 h-5" />
          Received Locations
        </CardTitle>
        <CardDescription>Live updates from other users</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 max-h-[320px] overflow-y-auto">
        {receivedLocations.length === 0 ? (
          <div className="text-center text-[#1A202C] py-8">
            <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No locations received yet</p>
            <p className="text-sm">Waiting for updates...</p>
          </div>
        ) : (
          receivedLocations.map((location, index) => (
            <div
              key={index}
              className="border border-[#1A202C]/20 rounded-lg px-4 py-3 bg-white shadow-sm"
            >
              <div className="flex items-center justify-between text-sm mb-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#3f21b2]" />
                  <span className="font-medium">{location.userName}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-[#1A202C]">
                  <Clock className="w-3 h-3" />
                  Just now
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm text-[#1A202C]">
                <div>
                  <span className="font-medium text-[#1A202C]/80">Lat:</span>{" "}
                  {location.lat.toFixed(6)}
                </div>
                <div>
                  <span className="font-medium text-[#1A202C]/80">Lon:</span>{" "}
                  {location.lon.toFixed(6)}
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
