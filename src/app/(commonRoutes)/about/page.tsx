import { MapPin, Users, Target, Award, Globe, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full animate-in fade-in duration-1000">
      {/* Hero Section */}
      <section className="relative py-24 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/20 to-transparent" />
        <div className="container relative z-10">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-display-lg font-black text-white leading-tight">
              Redefining the <span className="text-primary">Future of Travel</span> with Intelligence.
            </h1>
            <p className="text-xl text-slate-300 font-medium leading-relaxed">
              Wandr Travels is the world's first AI-native luxury travel platform, dedicated to crafting deeply personalized journeys that resonate with your soul.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-gap bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-headline-lg font-black text-slate-900">Our Mission</h2>
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                  To democratize luxury travel by leveraging advanced artificial intelligence, ensuring every traveler experiences the world through a lens of total personalization and effortless elegance.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-slate-50 rounded-[2rem] space-y-3">
                  <div className="p-3 bg-primary/10 rounded-xl w-fit text-primary">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-800">Precision</h3>
                  <p className="text-sm text-slate-500">AI-driven accuracy in every itinerary.</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-[2rem] space-y-3">
                  <div className="p-3 bg-emerald-50 rounded-xl w-fit text-emerald-500">
                    <Heart className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-800">Passion</h3>
                  <p className="text-sm text-slate-500">Curated by experts who love the journey.</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1935&auto=format&fit=crop" 
                  alt="Travel Planning" 
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[2rem] shadow-xl space-y-2 hidden md:block">
                <p className="text-3xl font-black text-primary">500k+</p>
                <p className="font-bold text-slate-500 uppercase tracking-widest text-xs">Journeys Planned</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-gap bg-slate-50">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-headline-lg font-black text-slate-900">Why Wandr Travels?</h2>
            <p className="text-slate-500 font-medium">The intersection of cutting-edge technology and human intuition.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "Global Expertise",
                desc: "Destinations in 150+ countries, deeply researched and continuously updated.",
                color: "text-blue-500",
                bg: "bg-blue-50"
              },
              {
                icon: Award,
                title: "Premium Quality",
                desc: "We only partner with top-tier vendors to ensure your comfort and safety.",
                color: "text-amber-500",
                bg: "bg-amber-50"
              },
              {
                icon: Users,
                title: "Community Driven",
                desc: "Thousands of traveler reviews and photos to help you decide.",
                color: "text-emerald-500",
                bg: "bg-emerald-50"
              }
            ].map((item, i) => (
              <Card key={i} className="border-none bg-white rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl transition-all group">
                <CardContent className="p-0 space-y-6">
                  <div className={`p-4 ${item.bg} rounded-2xl w-fit ${item.color} group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-8 h-8" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                    <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section Placeholder */}
      <section className="section-gap bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
             <div className="order-2 md:order-1">
               <div className="grid grid-cols-2 gap-4">
                 <div className="aspect-square rounded-3xl bg-slate-100 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" alt="Team member" className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-500" />
                 </div>
                 <div className="aspect-square rounded-3xl bg-slate-100 mt-8 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop" alt="Team member" className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-500" />
                 </div>
               </div>
             </div>
             <div className="space-y-6 order-1 md:order-2">
               <h2 className="text-headline-lg font-black text-slate-900">Driven by a Visionary Team</h2>
               <p className="text-lg text-slate-600 leading-relaxed font-medium">
                 Founded by a diverse group of tech innovators and seasoned travelers, our team is unified by a single goal: to help you find your next great adventure.
               </p>
               <div className="flex items-center gap-4 text-primary font-bold">
                 <MapPin className="w-5 h-5" />
                 <span>Headquartered in Dhaka, Bangladesh</span>
               </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
