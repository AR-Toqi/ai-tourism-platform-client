"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const REVIEWS = [
  {
    name: "Eleanor Vance",
    date: "August 2024",
    avatar: "/avatars/irene-strong-TMt3JGoVlng-unsplash.jpg",
    text: "The AI-generated itinerary was flawless. It found hidden beach clubs I would have never discovered on my own. Lumina is a game changer.",
  },
  {
    name: "Marcus Thorne",
    date: "June 2024",
    avatar: "/avatars/joseph-gonzalez-iFgRcqHznqg-unsplash.jpg",
    text: "Exceptional service. The details on the history and culture provided by the platform added so much depth to our trip. A truly premium experience.",
  },
  {
    name: "Sienna Blake",
    date: "September 2024",
    avatar: "/avatars/vicky-hladynets-C8Ta0gwPbQg-unsplash.jpg",
    text: "The most beautiful places I've ever visited. The AI concierge recommended a morning walk that was the highlight of our stay.",
  },
  {
    name: "Julian Ross",
    date: "July 2024",
    avatar: "/avatars/luis-villasmil-6qf1uljGpU4-unsplash.jpg",
    text: "Booking through this platform felt like having a personal luxury travel agent available 24/7. The integration of AI is subtle yet powerful.",
  },
  {
    name: "Elena Rodriguez",
    date: "October 2024",
    avatar: "/avatars/nartan-buyukyildiz-hr_feH2URs0-unsplash.jpg",
    text: "I've never seen anything like this. The recommendations were perfectly tailored to my style. The aesthetic of the platform is just the beginning.",
  },
  {
    name: "David Chen",
    date: "November 2024",
    avatar: "/avatars/diego-hernandez-MSepzbKFz10-unsplash.jpg",
    text: "From start to finish, the experience was seamless. The attention to detail in the curated destinations is exactly what modern explorers need.",
  },
];

export function GuestExperiences() {
  // Double the reviews for a seamless marquee effect
  const marqueeReviews = [...REVIEWS, ...REVIEWS];

  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="container mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-[#0f172a] mb-6">
          Guest Experiences
        </h2>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Hear from our community of discerning travelers who have explored the world through our AI-powered luxury ecosystem.
        </p>
      </div>

      <div className="relative flex overflow-hidden py-10">
        <motion.div
          className="flex gap-8 px-4"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
        >
          {marqueeReviews.map((review, i) => (
            <Card
              key={i}
              className="flex-shrink-0 w-[400px] bg-white border border-slate-100 shadow-sm p-8 space-y-6 rounded-3xl hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden ring-2 ring-slate-50">
                  <Image
                    src={review.avatar}
                    alt={review.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold text-[#0f172a] text-lg">{review.name}</div>
                  <div className="text-sm text-slate-500">{review.date}</div>
                </div>
              </div>
              <p className="text-slate-600 italic leading-relaxed text-lg">
                "{review.text}"
              </p>
              <div className="flex text-amber-400 gap-1 pt-2 border-t border-slate-50">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
