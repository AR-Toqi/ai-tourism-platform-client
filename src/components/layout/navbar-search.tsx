"use client";

import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, MapPin, Loader2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
import { IDestination } from "@/types/destination";
import { useDebounce } from "@/hooks/use-debounce";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function NavbarSearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 400);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: results, isLoading } = useQuery({
    queryKey: ["destinations-search", debouncedQuery],
    queryFn: async () => {
      if (debouncedQuery.length < 2) return [];
      const res = await api.get<{ data: IDestination[] }>(`/destinations?searchTerm=${debouncedQuery}`);
      return res.data;
    },
    enabled: debouncedQuery.length >= 2,
  });

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-[220px] lg:max-w-[320px]">
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
        <Input
          type="text"
          placeholder="Search destinations..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="pl-10 pr-10 h-10 w-full bg-slate-50 border-slate-200 rounded-full focus:bg-white transition-all shadow-sm"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-all"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && (query.length >= 2) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="p-4 max-h-[400px] overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-10 text-slate-500">
                <Loader2 className="w-6 h-6 animate-spin mr-2" />
                <span className="font-medium">Searching destinations...</span>
              </div>
            ) : results && results.length > 0 ? (
              <div className="space-y-2">
                <p className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Matching Destinations
                </p>
                {results.map((dest) => (
                  <Link
                    key={dest.id}
                    href={`/destinations/${dest.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-2xl transition-all group"
                  >
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 shadow-sm">
                      <Image
                        src={dest.coverImage || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop"}
                        alt={dest.name}
                        fill
                        sizes="56px"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-800 truncate group-hover:text-primary transition-colors">
                        {dest.name}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-primary/60" />
                        {dest.location}, {dest.country}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="py-10 text-center space-y-3">
                <div className="bg-slate-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto">
                  <Search className="w-5 h-5 text-slate-300" />
                </div>
                <p className="text-slate-500 font-medium">No destinations found for "{query}"</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
