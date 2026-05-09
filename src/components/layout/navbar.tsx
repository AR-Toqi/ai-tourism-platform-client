import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/" className="font-display text-2xl font-bold tracking-tighter">
            Lumina Travel
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
          <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors pr-2">
            Login
          </Link>
          <Link href="/register">
            <Button className="rounded-full px-6 font-semibold shadow-sm">Get Started</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
