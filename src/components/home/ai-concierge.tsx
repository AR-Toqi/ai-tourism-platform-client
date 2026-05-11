import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

export function AiConcierge() {
  return (
    <section className="py-12 md:py-24 bg-surface px-4 md:px-0">
      <div className="container">
        <div className="bg-[#131b2e] rounded-[2rem] overflow-hidden p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12 shadow-2xl">
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <div className="flex justify-center lg:justify-start">
              <Badge className="bg-secondary/20 text-secondary-container border border-secondary/30 rounded-full py-1.5 px-4 font-semibold">
                ✨ AI Tourism Concierge
              </Badge>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl text-white leading-tight font-bold">
              Elite Travel Planning, Personalized For You.
            </h2>
            <p className="text-slate-400 text-base md:text-lg max-w-md mx-auto lg:mx-0 leading-relaxed">
              Stop spending hours on forums. Our neural network understands context, mood, and luxury better than any guidebook.
            </p>
            <Link href="/ai-chat">
              <Button className="w-full sm:w-auto rounded-full bg-secondary-container hover:bg-secondary-container/90 text-on-secondary h-14 px-10 font-bold text-lg shadow-xl cursor-pointer">
                Start Your Concierge Session
              </Button>
            </Link>
          </div>

          <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 space-y-6 shadow-2xl">
            <div className="flex items-center gap-2">
              <div className="w-20 h-20 shrink-0 flex items-center justify-center">
                <Image src="/images/bot-1.png" alt="Wandr AI" width={60} height={60} style={{ width: "auto", height: "auto" }} className="w-full h-auto object-contain drop-shadow-2xl" />
              </div>
              <div className="space-y-1">
                <div className="font-bold text-white text-2xl tracking-tight">Wandr.ai</div>
                <div className="text-emerald-400 text-sm flex items-center gap-2 font-medium">
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
