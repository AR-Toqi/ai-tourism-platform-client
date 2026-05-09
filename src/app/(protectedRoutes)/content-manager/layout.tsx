"use client";

import { useAuth } from "@/providers/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { UserRole } from "@/types";

export default function ContentManagerLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || (user.role !== UserRole.CONTENT_MANAGER && user.role !== UserRole.ADMIN))) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  if (!user || (user.role !== UserRole.CONTENT_MANAGER && user.role !== UserRole.ADMIN)) return null;

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-muted/30 p-6 hidden md:block">
        <h2 className="font-bold mb-6">Content Manager</h2>
        <nav className="space-y-2">
          <div className="text-sm font-medium p-2 hover:bg-accent rounded">Overview</div>
          <div className="text-sm font-medium p-2 hover:bg-accent rounded">Destinations</div>
        </nav>
      </aside>
      <div className="flex-1">
        <header className="h-16 border-b flex items-center px-6">
          <h1 className="font-semibold">Manager Dashboard</h1>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
