"use client";
import LocationMap from "@/components/location-map";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Location {
  lat: number;
  lon: number;
  userName: string;
}

interface LocationMapSectionProps {
  receivedLocations: Location[];
  currentLat: string;
  currentLon: string;
}

export default function LocationMapSection({
  receivedLocations,
  currentLat,
  currentLon,
}: LocationMapSectionProps) {
  return (
    <Card className="border-[#3f21b2]/20 shadow-md">
      <CardHeader>
        <CardTitle className="text-[#3f21b2]"> Live Location Map</CardTitle>
        <CardDescription className="text-[#1A202C]">
          View all shared locations in real-time
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <LocationMap
          locations={receivedLocations}
          currentLocation={
            currentLat && currentLon
              ? {
                  lat: Number.parseFloat(currentLat),
                  lon: Number.parseFloat(currentLon),
                }
              : null
          }
        />
      </CardContent>
    </Card>
  );
}
