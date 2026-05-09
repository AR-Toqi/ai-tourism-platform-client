import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white py-20 border-t border-white/10">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <h3 className="font-display text-2xl font-bold">Lumina Travel</h3>
            <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
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
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                <span className="text-xs">IG</span>
              </div>
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                <span className="text-xs">TW</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-20 pt-8 border-t border-white/10 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Lumina AI Tourism. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
