"use client";
import { Badge } from "@/components/ui/badge";
import { Wifi, WifiOff } from "lucide-react";

interface ConnectionStatusProps {
  isConnected: boolean;
  isConnecting: boolean;
  receivedCount: number;
}

export default function ConnectionStatus({
  isConnected,
  isConnecting,
  receivedCount,
}: ConnectionStatusProps) {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center gap-2 text-sm">
        {isConnected ? (
          <>
            <Wifi className="w-4 h-4 text-[#3f21b2]" />
            <Badge
              variant="outline"
              className="text-[#3f21b2] border-[#3f21b2]/30"
            >
              Connected
            </Badge>
          </>
        ) : (
          <>
            <WifiOff className="w-4 h-4 text-red-500" />
            <Badge variant="outline" className="text-red-600 border-red-200">
              {isConnecting ? "Connecting..." : "Disconnected"}
            </Badge>
          </>
        )}
      </div>
      <div className="text-sm text-[#1A202C]">
        {receivedCount} location{receivedCount !== 1 ? "s" : ""} received
      </div>
    </div>
  );
}
