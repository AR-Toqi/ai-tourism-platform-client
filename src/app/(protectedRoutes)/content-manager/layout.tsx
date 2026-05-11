"use client";

import { useAuth } from "@/providers/auth-provider";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { UserRole } from "@/types";
import Link from "next/link";
import { 
  LayoutDashboard, 
  MapPin, 
  Plus,
  LogOut, 
  Settings, 
  Menu,
  ChevronRight
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { href: "/content-manager", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/content-manager/destinations", icon: MapPin, label: "All Destinations" },
  { href: "/content-manager/destinations/create", icon: Plus, label: "Add Destination" },
  { href: "/content-manager/settings", icon: Settings, label: "Settings", disabled: true },
];

export default function ContentManagerLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && (!user || (user.role !== UserRole.CONTENT_MANAGER && user.role !== UserRole.ADMIN))) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm font-medium animate-pulse">Initializing Dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user || (user.role !== UserRole.CONTENT_MANAGER && user.role !== UserRole.ADMIN)) return null;

  return (
    <div className="flex min-h-screen bg-slate-50/50 dark:bg-slate-950">
      {/* Sidebar */}
      <aside className="w-72 border-r bg-white dark:bg-slate-900 hidden lg:flex flex-col sticky top-0 h-screen transition-all shadow-sm">
        <div className="p-8 pb-4">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">
              W
            </div>
            <span className="font-display text-xl font-bold tracking-tight">Wandr CM</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          <p className="px-4 text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Main Menu</p>
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href || (
              link.href !== "/content-manager" && 
              pathname?.startsWith(link.href) && 
              !sidebarLinks.some(l => l.href.length > link.href.length && pathname?.startsWith(l.href))
            );
            return (
              <Link
                key={link.href}
                href={link.disabled ? "#" : link.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group relative",
                  isActive 
                    ? "bg-primary/5 text-primary" 
                    : "text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-foreground",
                  link.disabled && "opacity-50 cursor-not-allowed"
                )}
              >
                <link.icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                {link.label}
                {isActive && (
                  <div className="absolute left-0 w-1 h-6 bg-primary rounded-r-full" />
                )}
                {isActive && (
                  <ChevronRight className="ml-auto h-4 w-4" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User profile section in sidebar */}
        <div className="p-4 mt-auto border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
            <Avatar className="h-10 w-10 ring-2 ring-background">
              <AvatarImage src={user.profileImage || user.image} />
              <AvatarFallback className="bg-primary/10 text-primary font-bold">
                {user.name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">{user.name}</p>
              <p className="text-[10px] font-medium text-muted-foreground truncate uppercase">Manager</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => logout()}
              className="text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-colors rounded-xl"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b flex items-center justify-between px-6 lg:px-10 sticky top-0 z-10">
          <div className="flex items-center gap-4 lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
            <span className="font-bold text-lg">Wandr CM</span>
          </div>
          
          <div className="hidden lg:block">
            <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">
              {sidebarLinks.find(l => pathname?.startsWith(l.href))?.label || "Dashboard"}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="rounded-full gap-2 hidden sm:flex">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Support
            </Button>
            <div className="h-10 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2 hidden sm:block" />
            <Link href="/" className="text-xs font-bold text-primary hover:underline">View Site</Link>
          </div>
        </header>
        
        <main className="p-6 lg:p-10 flex-1">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
