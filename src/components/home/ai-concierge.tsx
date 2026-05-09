import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function AiConcierge() {
  return (
    <section className="section-gap bg-surface">
      <div className="container">
        <div className="bg-[#131b2e] rounded-[2rem] overflow-hidden p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 shadow-2xl">
          <div className="flex-1 space-y-8">
            <Badge className="bg-secondary/20 text-secondary-container border border-secondary/30 rounded-full py-1.5 px-4 font-semibold">
              ✨ AI Tourism Concierge
            </Badge>
            <h2 className="text-display-lg text-white leading-tight">
              Elite Travel Planning, Personalized For You.
            </h2>
            <p className="text-slate-400 text-body-lg max-w-md leading-relaxed">
              Stop spending hours on forums. Our neural network understands context, mood, and luxury better than any guidebook.
            </p>
            <Button className="rounded-full bg-secondary-container hover:bg-secondary-container/90 text-on-secondary h-14 px-10 font-bold text-lg shadow-xl cursor-pointer">
              Start Your Concierge Session
            </Button>
          </div>

          <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 space-y-6 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center font-bold text-on-secondary">L</div>
              <div>
                <div className="font-semibold text-white text-sm">Lumina AI</div>
                <div className="text-emerald-400 text-xs flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Always Online
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white/10 rounded-2xl p-4 text-sm text-slate-200 ml-auto max-w-[85%] leading-relaxed border border-white/5">
                "I've found three private villas in Tuscany with wine cellars that match your 2018 vintage preference. Should I check availability?"
              </div>
              <div className="bg-secondary-container rounded-2xl p-4 text-sm text-on-secondary-container mr-auto max-w-[85%] leading-relaxed shadow-lg">
                "Yes, please. And find a local chef specializing in truffles."
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
