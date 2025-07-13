import { RefreshCw } from "lucide-react"

interface LoadMoreStatusProps {
    isFetchingNextPage: boolean
    hasNextPage: boolean
    totalUsers: number
    allUsersCount: number
}

export default function LoadMoreStatus({ isFetchingNextPage, hasNextPage, totalUsers, allUsersCount }: LoadMoreStatusProps) {
    return (
        <div className="flex justify-center py-4 text-[#1A202C]/70">
            {isFetchingNextPage && (
                <div className="flex items-center gap-2 text-[#319795]">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Loading more users...
                </div>
            )}

            {!hasNextPage && allUsersCount > 0 && (
                <div className="text-center text-[#1A202C]/70">
                    <p>🎉 You've reached the end!</p>
                    <p className="text-sm">
                        All <span className="font-semibold text-[#319795]">{totalUsers}</span> users loaded
                    </p>
                </div>
            )}
        </div>
    )
}
