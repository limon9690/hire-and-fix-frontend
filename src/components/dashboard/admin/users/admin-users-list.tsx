import type { AdminUserListItem } from "@/lib/dashboard/admin/users/admin-users";
import { AdminUserCard } from "./admin-user-card";

type AdminUsersListProps = {
  users: AdminUserListItem[];
};

export function AdminUsersList({ users }: AdminUsersListProps) {
  if (users.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-muted/30 p-8 text-center">
        <h3 className="text-lg font-semibold tracking-tight">No users found</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          User accounts will appear here once available.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5 rounded-xl bg-muted/20 p-2">
      {users.map((user) => (
        <AdminUserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
