"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import * as signalR from "@microsoft/signalr";

export interface LocationData {
  userName: string;
  lat: number;
  lon: number;
}

export interface UseSignalRReturn {
  isConnected: boolean;
  isConnecting: boolean;
  sendLocation: (lat: number, lon: number, userName: string) => Promise<void>;
  receivedLocations: LocationData[];
  connectionError: string | null;
}

export function useSignalR(hubUrl: string): UseSignalRReturn {
  const connectionRef = useRef<signalR.HubConnection | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [receivedLocations, setReceivedLocations] = useState<LocationData[]>(
    []
  );
  const [connectionError, setConnectionError] = useState<string | null>(null);

  const startConnection = useCallback(async () => {
    if (connectionRef.current?.state === signalR.HubConnectionState.Connected) {
      console.log("✅ Already connected to SignalR.");
      return;
    }

    console.log("🟡 Starting SignalR connection...");

    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    newConnection.on("ReceiveLatLon", (data: LocationData) => {
      console.log("📥 Received:", data);
      setReceivedLocations((prev) => [data, ...prev.slice(0, 49)]);
    });

    newConnection.onclose((error) => {
      console.error("❌ SignalR connection closed:", error);
      setIsConnected(false);
      setConnectionError("Disconnected from server.");
    });

    newConnection.onreconnecting((error) => {
      console.warn("🔁 Reconnecting...", error);
      setIsConnected(false);
      setConnectionError("Reconnecting...");
    });

    newConnection.onreconnected(() => {
      console.log("✅ Reconnected to SignalR.");
      setIsConnected(true);
      setConnectionError(null);
    });

    setIsConnecting(true);
    try {
      await newConnection.start();
      connectionRef.current = newConnection;
      setIsConnected(true);
      setConnectionError(null);
      console.log("✅ SignalR connected!");
    } catch (err) {
      console.error("❌ Connection failed:", err);
      setConnectionError("Failed to connect to SignalR.");
    } finally {
      setIsConnecting(false);
    }
  }, [hubUrl]);

  const sendLocation = useCallback(
    async (lat: number, lon: number, userName: string) => {
      const conn = connectionRef.current;
      if (!conn || conn.state !== signalR.HubConnectionState.Connected) {
        throw new Error("SignalR not connected");
      }

      await conn.invoke("SendLatLon", lat, lon, userName);
    },
    []
  );

  useEffect(() => {
    startConnection();

    return () => {
      connectionRef.current?.stop();
    };
  }, [startConnection]);

  return {
    isConnected,
    isConnecting,
    sendLocation,
    receivedLocations,
    connectionError,
  };
}
