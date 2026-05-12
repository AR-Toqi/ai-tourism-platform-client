import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-24 px-4">
      <div className="container">
        <div className="relative overflow-hidden rounded-[3rem] bg-[#0f172a] p-8 md:p-20 text-center shadow-2xl">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-1/2 -left-1/4 w-1/2 h-full bg-primary/20 blur-[120px] rounded-full" />
            <div className="absolute -bottom-1/2 -right-1/4 w-1/2 h-full bg-secondary/10 blur-[120px] rounded-full" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm font-medium backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Join the future of travel</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight leading-[1.1]">
              Ready to see the world through <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">AI Precision?</span>
            </h2>

            <p className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
              Join over 50,000 discerning travelers using our AI-native ecosystem to redefine their exploration.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
              <Link href="/itineraries/create" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto h-16 px-10 rounded-2xl bg-secondary-container hover:bg-secondary-container/90 text-black font-bold text-lg shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95 cursor-pointer">
                  Get Started Free
                </Button>
              </Link>
              <Link href="/login" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full sm:w-auto h-16 px-10 rounded-2xl border-white/10 bg-white/5 text-white font-bold text-lg hover:bg-white/10 hover:text-white backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer">
                  Join the Collective
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
