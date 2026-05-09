import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function Hero() {
  return (
    <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0">
        <Image 
          src="/images/Cinematic Amalfi Coast.png" 
          alt="Hero Background" 
          fill 
          priority
          className="object-cover" 
        />
        <div className="absolute inset-0 bg-black/30 z-10" />
      </div>

      <div className="container relative z-20 text-center text-white space-y-8">
        <h1 className="text-display-lg max-w-4xl mx-auto">
          Discover Your Next Adventure with AI
        </h1>
        
        <div className="max-w-2xl mx-auto flex items-center bg-white/95 backdrop-blur p-2 rounded-full shadow-2xl">
          <div className="flex-1 flex items-center px-6">
            <Search className="text-slate-400 mr-3 w-5 h-5" />
            <Input 
              className="border-none bg-transparent text-slate-900 focus-visible:ring-0 placeholder:text-slate-400" 
              placeholder="Where do you want to go?" 
            />
          </div>
          <Button className="rounded-full px-8 h-12 bg-primary hover:bg-primary/90 text-white font-semibold">
            Plan with AI
          </Button>
        </div>
      </div>
    </section>
  );
}
