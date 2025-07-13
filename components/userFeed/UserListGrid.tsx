import UserCard from "@/components/user-card";
import UserCardSkeleton from "@/components/user-card-skeleton";

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

interface UserListGridProps {
  users: User[];
  lastElementRef: (node: HTMLDivElement | null) => void;
  isLoading: boolean;
  isFetchingNextPage: boolean;
}

export default function UserListGrid({
  users,
  lastElementRef,
  isLoading,
  isFetchingNextPage,
}: UserListGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map((user, index) => (
        <div
          key={`${user.id}-${index}`}
          ref={index === users.length - 1 ? lastElementRef : null}
        >
          <UserCard user={user} />
        </div>
      ))}
      {(isLoading || isFetchingNextPage) &&
        Array.from({ length: isLoading ? 9 : 3 }).map((_, index) => (
          <UserCardSkeleton key={`skeleton-${index}`} />
        ))}
    </div>
  );
}
