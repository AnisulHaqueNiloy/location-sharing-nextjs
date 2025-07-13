interface UserStatsBarProps {
    currentCount: number
    totalCount: number
    hasScrolled: boolean
}

export default function UserStatsBar({ currentCount, totalCount, hasScrolled }: UserStatsBarProps) {
    return (
        <div className="flex items-center justify-between text-sm text-[#1A202C]/80">
            <span>
                Showing <span className="font-semibold text-[#319795]">{currentCount}</span> of{" "}
                <span className="font-semibold text-[#319795]">{totalCount}</span> users
            </span>
            <span className="text-[#319795]/80">{hasScrolled && "Scroll to load more"}</span>
        </div>
    )
}
