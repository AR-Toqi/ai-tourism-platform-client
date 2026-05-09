import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          AI Tourism
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/destinations" className="text-sm font-medium hover:underline">
            Destinations
          </Link>
          <Link href="/login">
            <Button variant="ghost" size="sm">Login</Button>
          </Link>
          <Link href="/register">
            <Button size="sm">Get Started</Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
