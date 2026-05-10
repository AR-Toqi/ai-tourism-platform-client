"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

export function Navbar() {
  const { user, isLoading } = useAuth();

  const handleGetStarted = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      toast.error("Please login first to generate an itinerary");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="font-display text-2xl font-bold tracking-tighter">
            Wandr Travel
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/destinations" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">
              Destinations
            </Link>
            <Link href="/itineraries" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">
              Itineraries
            </Link>
            <Link href="/ai-chat" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">
              AI Assistant
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {!isLoading && (
            <>
              {user ? (
                <Link href="/profile">
                  <Avatar className="h-9 w-9 cursor-pointer border border-border hover:opacity-80 transition-opacity">
                    <AvatarImage src={user.profileImage || user.image} alt={user.name} />

                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                      {user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
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
    </header>
  );
}

