import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white py-20 border-t border-white/10">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-center md:text-left">
          <div className="space-y-6 flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 overflow-hidden bg-white/10 rounded-xl p-1">
                <Image
                  src="/images/bot-1.png"
                  alt="Wandr Travels"
                  width={40}
                  height={40}
                  style={{ width: "auto", height: "auto" }}
                  className="object-contain"
                />
              </div>
              <h3 className="font-display text-2xl font-bold">Wandr Travels</h3>
            </div>
            <p className="text-sm text-slate-400 max-w-xs leading-relaxed mx-auto md:mx-0">
              The world's first AI-native luxury travel ecosystem. Designed for the discerning explorer.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Platform</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link href="/destinations" className="hover:text-white transition-colors">Destinations</Link></li>
              <li><Link href="/itineraries" className="hover:text-white transition-colors">Itineraries</Link></li>
              <li><Link href="/ai-chat" className="hover:text-white transition-colors">AI Assistant</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6">Connect</h4>
            <div className="flex gap-4 justify-center md:justify-start">
              <Link
                href="https://www.linkedin.com/in/abdullah-ragib-toqi/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </Link>
              <Link
                href="https://x.com/ar_toqi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/10 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Wandr Travels. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
