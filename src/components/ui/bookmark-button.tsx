"use client";

import { useState } from "react";
import { Bookmark, Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import { useAuth } from "@/providers/auth-provider";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface BookmarkButtonProps {
  itemId: string;
  type: "destination" | "itinerary";
  initialSaved?: boolean;
  variant?: "icon" | "full";
  className?: string;
}

export function BookmarkButton({
  itemId,
  type,
  initialSaved = false,
  variant = "icon",
  className,
}: BookmarkButtonProps) {
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(initialSaved);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation when inside a card
    e.stopPropagation();

    if (!user) {
      toast.error("Please log in to save items");
      return;
    }

    try {
      setIsLoading(true);
      const endpoint =
        type === "destination" ? "/saved/destination" : "/saved/itinerary";
      const body =
        type === "destination"
          ? { destinationId: itemId }
          : { itineraryId: itemId };

      const res = await api.post<{ data: { saved: boolean } }>(endpoint, body);
      setIsSaved(res.data.saved);
      toast.success(
        res.data.saved
          ? `${type === "destination" ? "Destination" : "Itinerary"} saved!`
          : `${type === "destination" ? "Destination" : "Itinerary"} removed from bookmarks`
      );
    } catch (error: any) {
      toast.error(error?.message || "Failed to update bookmark");
    } finally {
      setIsLoading(false);
    }
  };

  if (variant === "full") {
    return (
      <button
        onClick={handleToggle}
        disabled={isLoading}
        className={cn(
          "flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all",
          isSaved
            ? "bg-primary text-white shadow-md"
            : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm",
          isLoading && "opacity-60 cursor-not-allowed",
          className
        )}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Bookmark
            className={cn("w-4 h-4", isSaved && "fill-current")}
          />
        )}
        {isSaved ? "Saved" : "Save"}
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center transition-all",
        isSaved
          ? "bg-primary text-white shadow-lg"
          : "bg-white/90 backdrop-blur-md text-slate-700 hover:bg-white shadow-md",
        isLoading && "opacity-60 cursor-not-allowed",
        className
      )}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Bookmark
          className={cn("w-4 h-4", isSaved && "fill-current")}
        />
      )}
    </button>
  );
}
