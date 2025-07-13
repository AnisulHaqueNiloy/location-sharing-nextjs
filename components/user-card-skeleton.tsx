import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function UserCardSkeleton() {
  return (
    <Card className="h-full rounded-xl shadow-md border-[#3f21b2]/10">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <Skeleton className="w-14 h-14 rounded-full flex-shrink-0 bg-[#3f21b2]/10" />

          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-32 bg-[#3f21b2]/10" />
              <Skeleton className="h-4 w-16 rounded-full bg-[#1A202C]/20" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-full bg-[#1A202C]/10" />
              <Skeleton className="h-4 w-24 bg-[#1A202C]/10" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-28 bg-[#1A202C]/10" />
              <Skeleton className="h-4 w-36 bg-[#1A202C]/10" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
