"use client";

import { useCMDestinations } from "@/hooks/use-content-manager";
import { DestinationTable } from "@/components/content-manager/DestinationTable";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import Link from "next/link";

export default function ContentManagerDestinationsPage() {
  const { data: response, isLoading } = useCMDestinations();

  return (
    <div className="container py-10 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Manage Destinations</h1>
          <p className="text-muted-foreground">View and manage all platform destinations.</p>
        </div>
        <Button asChild>
          <Link href="/content-manager/destinations/create">
            <Plus className="mr-2 h-4 w-4" />
            Add Destination
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <DestinationTable destinations={response?.data || []} />
      )}
    </div>
  );
}
