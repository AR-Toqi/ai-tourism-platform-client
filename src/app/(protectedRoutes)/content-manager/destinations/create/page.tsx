"use client";

import { useCreateDestination } from "@/hooks/use-content-manager";
import { DestinationForm } from "@/components/content-manager/DestinationForm";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Info } from "lucide-react";
import Link from "next/link";

export default function CreateDestinationPage() {
  const router = useRouter();
  const { mutate: createDestination, isPending } = useCreateDestination();

  const handleSubmit = (data: any) => {
    createDestination(data, {
      onSuccess: (response: any) => {
        const newId = response?.data?.id;
        if (newId) {
          router.push(`/content-manager/destinations/${newId}/cover`);
        } else {
          router.push("/content-manager/destinations");
        }
      },
    });
  };

  return (
    <div className="container py-10 space-y-8 max-w-4xl">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild className="cursor-pointer">
          <Link href="/content-manager/destinations">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Add New Destination</h1>
          <p className="text-muted-foreground">Fill in the basic details to create a destination.</p>
        </div>
      </div>

      {/* Workflow tip */}
      <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 rounded-2xl">
        <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-blue-900 dark:text-blue-200">Workflow Tip</p>
          <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
            After creating the destination, you&apos;ll be redirected to upload a cover image. You can also add gallery images from there.
          </p>
        </div>
      </div>

      <div className="bg-card p-6 rounded-lg border shadow-sm">
        <DestinationForm onSubmit={handleSubmit} isLoading={isPending} />
      </div>
    </div>
  );
}
