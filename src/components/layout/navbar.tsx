"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { NavbarSearch } from "./navbar-search";
import { Menu, X, Home, Map, Calendar, Sparkles, Heart, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { user, isLoading } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleGetStarted = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      toast.error("Please login first to generate an itinerary");
    }
  };

  const navLinks = [
    { href: "/destinations", label: "Destinations", icon: Map },
    { href: "/itineraries", label: "Itineraries", icon: Calendar },
    { href: "/ai-chat", label: "AI Assistant", icon: Sparkles },
    ...(user ? [{ href: "/saved", label: "Saved", icon: Heart }] : []),
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 md:h-20 items-center justify-between gap-4">
        <div className="flex items-center gap-4 md:gap-8 flex-1">
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="bg-gray-100 relative w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-full p-1 border border-slate-200">
              <Image
                src="/images/bot-1.png"
                alt="Wandr Travels"
                width={40}
                height={40}
                style={{ width: "auto", height: "auto" }}
                className="object-contain transition-transform group-hover:scale-110"
              />
            </div>
            <span className="font-display text-lg md:text-2xl font-bold tracking-tighter text-slate-900">
              Wandr Travels
            </span>
          </Link>

          <div className="hidden md:block flex-1 max-w-sm">
            <NavbarSearch />
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          <nav className="flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 border-l pl-6 border-slate-200">
            {!isLoading && (
              <>
                {user ? (
                  <Link href="/profile">
                    <Avatar className="h-9 w-9 cursor-pointer border border-border hover:opacity-80 transition-opacity">
                      <AvatarImage src={user.profileImage || user.image} alt={user.name} />
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        {user.name?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                ) : (
                  <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors pr-2">
                    Login
                  </Link>
                )}
                <Link
                  href={user ? "/itineraries/create" : "#"}
                  onClick={handleGetStarted}
                >
                  <Button className="rounded-full px-6 font-semibold shadow-sm">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-3 lg:hidden">
           {!isLoading && user && (
             <Link href="/profile">
               <Avatar className="h-8 w-8 cursor-pointer">
                 <AvatarImage src={user.profileImage || user.image} alt={user.name} />
                 <AvatarFallback className="text-xs">{user.name?.[0]}</AvatarFallback>
               </Avatar>
             </Link>
           )}
           <button 
             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
             className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
           >
             {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
           </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={cn(
        "fixed inset-0 top-[64px] bg-white z-[60] lg:hidden transition-all duration-300 ease-in-out",
        isMobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
      )}>
        <div className="container py-8 space-y-8">
          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-4">Search</p>
            <div className="px-2">
              <NavbarSearch />
            </div>
          </div>

          <div className="space-y-4">
             <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-4">Menu</p>
             <nav className="grid gap-2">
               {navLinks.map((link) => (
                 <Link
                   key={link.href}
                   href={link.href}
                   onClick={() => setIsMobileMenuOpen(false)}
                   className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-all text-slate-700 font-semibold"
                 >
                   <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                     <link.icon className="w-5 h-5" />
                   </div>
                   {link.label}
                 </Link>
               ))}
               {!user && (
                 <Link
                   href="/login"
                   onClick={() => setIsMobileMenuOpen(false)}
                   className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-all text-slate-700 font-semibold"
                 >
                   <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                     <User className="w-5 h-5" />
                   </div>
                   Login / Register
                 </Link>
               )}
             </nav>
          </div>

          <div className="pt-8 border-t border-slate-100 px-4">
             <Link
                href={user ? "/itineraries/create" : "/login"}
                onClick={(e) => {
                  handleGetStarted(e);
                  setIsMobileMenuOpen(false);
                }}
              >
                <Button className="w-full h-14 rounded-2xl font-bold text-lg shadow-xl">
                  Get Started Now
                </Button>
              </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
