"use client";

import { useAuth } from "@/providers/auth-provider";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { UserRole } from "@/types";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Users, 
  Map, 
  Settings, 
  ShieldCheck, 
  ChevronRight,
  LogOut,
  UserCircle,
  FileText,
  MessageSquare,
  Globe
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Destinations",
    href: "/admin/destinations",
    icon: Map,
  },
  {
    title: "Itineraries",
    href: "/admin/itineraries",
    icon: FileText,
  },
  {
    title: "Reviews",
    href: "/admin/reviews",
    icon: MessageSquare,
  },
  {
    title: "My Profile",
    href: "/admin/profile",
    icon: UserCircle,
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    if (!isLoading && (!user || user.role !== UserRole.ADMIN)) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-slate-500 font-bold animate-pulse">Initializing Admin Panel...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== UserRole.ADMIN) return null;

  return (
    <div className="flex min-h-screen bg-slate-50/50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-screen w-72 flex-col border-r bg-white shadow-xl shadow-slate-200/50 md:flex z-50">
        <div className="p-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <span className="font-display text-2xl font-black tracking-tight text-slate-900 group-hover:text-primary transition-colors">
              Admin Hub
            </span>
          </Link>
        </div>

        <nav className="flex-1 space-y-1.5 px-6 pt-4">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group flex items-center justify-between rounded-2xl px-5 py-3.5 text-sm font-bold transition-all duration-300",
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                <div className="flex items-center gap-3.5">
                  <link.icon className={cn("h-5 w-5", isActive ? "text-white" : "text-slate-400 group-hover:text-slate-900")} />
                  {link.title}
                </div>
                {isActive && <ChevronRight className="h-4 w-4 text-white/70" />}
              </Link>
            );
          })}
        </nav>

        <div className="border-t p-6">
          <div className="flex items-center gap-4 rounded-3xl bg-slate-50 p-4 border border-slate-100">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-bold text-slate-900">{user.name}</p>
              <p className="truncate text-xs font-medium text-slate-500 uppercase tracking-widest">{user.role}</p>
            </div>
          </div>
          <Link 
            href="/"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          >
            <Globe className="h-3.5 w-3.5" />
            Back to Platform
          </Link>
          <button 
            onClick={handleLogout}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 transition-colors border border-transparent hover:border-red-100"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 md:pl-72">
        <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b bg-white/80 px-8 backdrop-blur-xl">
          <h2 className="text-xl font-black text-slate-900">
            {sidebarLinks.find(l => l.href === pathname)?.title || "Overview"}
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 border border-amber-100">
              <span className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />
              <span className="text-xs font-black text-amber-700 uppercase tracking-widest">Live Status</span>
            </div>
          </div>
        </header>

        <main className="p-8 pb-16">
          <div className="mx-auto max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
