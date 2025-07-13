"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Building, GraduationCap, Mail, Phone } from "lucide-react";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string;
  university: string;
  company: {
    title: string;
  };
}

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  const fullName = `${user.firstName} ${user.lastName}`;
  const initials = `${user.firstName[0]}${user.lastName[0]}`;

  return (
    <Card className="h-full rounded-xl border-[#3f21b2]/20 shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <Avatar className="w-14 h-14 shadow-md ring-2 ring-[#3f21b2]/40">
            <AvatarImage
              src={user.image || "/placeholder.svg"}
              alt={fullName}
              className="object-cover"
            />
            <AvatarFallback className="bg-[#3f21b2] text-white font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-[#1A202C] text-base truncate">
                {fullName}
              </h3>
              <Badge className="bg-[#1A202C]/20 text-[#1A202C] text-xs">
                ID: {user.id}
              </Badge>
            </div>

            <div className="space-y-1 text-sm text-[#1A202C]/80">
              <div className="flex items-center gap-2 truncate">
                <Mail className="w-4 h-4 text-[#3f21b2]" />
                <span title={user.email}>{user.email}</span>
              </div>
              <div className="flex items-center gap-2 truncate">
                <Phone className="w-4 h-4 text-[#3f21b2]" />
                <span>{user.phone}</span>
              </div>
            </div>

            <div className="space-y-1 text-sm text-[#1A202C]/80">
              <div className="flex items-center gap-2 truncate">
                <Building className="w-4 h-4 text-[#3f21b2]" />
                <span title={user.company.title}>{user.company.title}</span>
              </div>
              <div className="flex items-center gap-2 truncate">
                <GraduationCap className="w-4 h-4 text-[#3f21b2]" />
                <span title={user.university}>{user.university}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
