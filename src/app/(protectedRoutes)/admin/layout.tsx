"use client";

import { useAuth } from "@/providers/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { UserRole } from "@/types";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== UserRole.ADMIN)) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading Admin...</div>;
  }

  if (!user || user.role !== UserRole.ADMIN) return null;

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-muted/30 p-6 hidden md:block">
        <h2 className="font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-2">
          <div className="text-sm font-medium p-2 hover:bg-accent rounded">Dashboard</div>
          <div className="text-sm font-medium p-2 hover:bg-accent rounded">Users</div>
          <div className="text-sm font-medium p-2 hover:bg-accent rounded">Itineraries</div>
        </nav>
      </aside>
      <div className="flex-1">
        <header className="h-16 border-b flex items-center px-6">
          <h1 className="font-semibold">Admin Dashboard</h1>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
