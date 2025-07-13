"use client"

// import LoadMoreStatus from "@/components/LoadMoreStatus"
// import UserFeedError from "@/components/UserFeedError"
// import UserListGrid from "@/components/UserListGrid"
// import UserStatsBar from "@/components/UserStatsBar"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useCallback, useEffect, useRef, useState } from "react"
import LoadMoreStatus from "./LoadMoreStatus"
import UserFeedError from "./UserFeedError"
import UserListGrid from "./UserListGrid"
import UserStatsBar from "./UserStatsBar"

const API_ENDPOINT = "https://tech-test.raintor.com/api/users/GetUsersList"

async function fetchUsers({ pageParam = 0 }) {
    const response = await fetch(`${API_ENDPOINT}?take=10&skip=${pageParam}`)
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return await response.json()
}

export default function UserFeed() {
    const [hasScrolled, setHasScrolled] = useState(false)
    const loadMoreRef = useRef<HTMLDivElement>(null)
    const observerRef = useRef<IntersectionObserver>()

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
        refetch,
    } = useInfiniteQuery({
        queryKey: ["users"],
        queryFn: fetchUsers,
        getNextPageParam: (lastPage, allPages) => {
            const totalFetched = allPages.reduce((sum, page) => sum + page.users.length, 0)
            return totalFetched < lastPage.total ? totalFetched : undefined
        },
        initialPageParam: 0,
    })

    const lastElementRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (isLoading) return
            if (observerRef.current) observerRef.current.disconnect()
            observerRef.current = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                        setHasScrolled(true)
                        fetchNextPage()
                    }
                },
                { threshold: 0.1, rootMargin: "100px" }
            )
            if (node) observerRef.current.observe(node)
        },
        [isLoading, hasNextPage, isFetchingNextPage, fetchNextPage]
    )

    useEffect(() => {
        return () => observerRef.current?.disconnect()
    }, [])

    const allUsers = data?.pages.flatMap((page) => page.users) ?? []
    const totalUsers = data?.pages[0]?.total ?? 0

    if (isError) return <UserFeedError error={error} refetch={refetch} />

    return (
        <div className="space-y-4">
            <UserStatsBar currentCount={allUsers.length} totalCount={totalUsers} hasScrolled={hasScrolled} />
            <UserListGrid
                users={allUsers}
                lastElementRef={lastElementRef}
                isLoading={isLoading}
                isFetchingNextPage={isFetchingNextPage}
            />
            <LoadMoreStatus
                isFetchingNextPage={isFetchingNextPage}
                hasNextPage={!!hasNextPage}
                totalUsers={totalUsers}
                allUsersCount={allUsers.length}
            />
        </div>
    )
}
