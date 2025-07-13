"use client";

import LocationSharing from "@/components/locationSharing/LocationSharing";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserFeed from "@/components/userFeed/UserFeed";
import { MapPin, Users, Wifi } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-teal-50 to-violate-50 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#1A202C]">
            <span className="text-[#3f21b2]">Share</span>{" "}
            <span className="text-[#1A202C]">Your Location</span>
          </h1>
          <p className="mt-2 text-lg text-slate-600">
            Real-time <span className="text-[#3f21b2]">Location</span> Sharing &{" "}
            <span className="text-[#3f21b2]">Infinite</span> Scroll User Feed
          </p>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="location" className="w-full">
          <TabsList className="grid grid-cols-2 gap-2 rounded-xl bg-white/30 shadow-md p-1 mb-10 max-w-2xl mx-auto">
            <TabsTrigger
              value="location"
              className="flex items-center justify-center gap-2 px-4 py-2 font-medium text-sm data-[state=active]:bg-[#3f21b2]/10 data-[state=active]:text-[#3f21b2] rounded-lg transition-colors"
            >
              <MapPin className="w-4 h-4" />
              Real-Time Location
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="flex items-center justify-center gap-2 px-4 py-2 font-medium text-sm data-[state=active]:bg-[#3f21b2]/10 data-[state=active]:text-[#3f21b2] rounded-lg transition-colors"
            >
              <Users className="w-4 h-4" />
              User Feed
            </TabsTrigger>
          </TabsList>

          {/* Location Sharing Tab */}
          <TabsContent value="location">
            <Card className="rounded-2xl shadow-lg border border-[#1A202C]/20">
              <CardHeader className="bg-[#3f21b2]/10 rounded-t-2xl p-6">
                <CardTitle className="flex items-center gap-3 text-[#3f21b2]">
                  <Wifi className="w-6 h-6 text-[#1A202C]" />
                  Live Location Sharing
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Real-time GPS coordinate sharing using Socket
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 bg-white">
                <LocationSharing />
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Feed Tab */}
          <TabsContent value="users">
            <Card className="rounded-2xl shadow-lg border border-[#1A202C]/20">
              <CardHeader className="bg-[#3f21b2]/10 rounded-t-2xl p-6">
                <CardTitle className="flex items-center gap-3 text-[#3f21b2]">
                  <Users className="w-6 h-6 text-[#3f21b2]" />
                  Infinite Scroll User Feed
                </CardTitle>
                <CardDescription className="text-slate-600">
                  Paginated user list with infinite scrolling and virtualization
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 bg-white">
                <UserFeed />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
