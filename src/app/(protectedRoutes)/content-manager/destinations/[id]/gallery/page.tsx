"use client";

import { useCMDestination, useUploadImages, useDeleteGalleryImage, useUpdateGalleryImage } from "@/hooks/use-content-manager";
import { GalleryManager } from "@/components/content-manager/GalleryManager";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2, FileEdit, ImageIcon, GalleryVertical } from "lucide-react";
import Link from "next/link";
import { use, useState } from "react";

export default function ContentManagerGalleryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: response, isLoading } = useCMDestination(id);
  const { mutate: uploadImages, isPending: isUploading } = useUploadImages();
  const { mutate: deleteImage, isPending: isDeletingInProgress } = useDeleteGalleryImage();
  const { mutate: updateImage, isPending: isUpdatingInProgress } = useUpdateGalleryImage();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleUpload = (data: FormData) => {
    uploadImages({ id, data });
  };

  const handleUpdate = (imageId: string, data: FormData) => {
    setUpdatingId(imageId);
    updateImage({ imageId, destinationId: id, data }, {
      onSettled: () => setUpdatingId(null)
    });
  };

  const handleDelete = (imageId: string) => {
    setDeletingId(imageId);
    deleteImage({ destinationId: id, imageId }, {
      onSettled: () => setDeletingId(null)
    });
  };

  if (isLoading) {
    return (
      <div className="container py-10 flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const destination = response?.data;

  if (!destination) {
    return (
      <div className="container py-10 text-center">
        <h2 className="text-2xl font-bold">Destination not found</h2>
        <Button asChild className="mt-4 cursor-pointer">
          <Link href="/content-manager/destinations">Back to list</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-10 space-y-8 max-w-4xl">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild className="cursor-pointer">
          <Link href="/content-manager/destinations">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Manage Gallery</h1>
          <p className="text-muted-foreground">Add or remove gallery images for {destination.name}.</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-3 border-b pb-4">
        <Button variant="outline" size="sm" asChild className="rounded-full cursor-pointer gap-2">
          <Link href={`/content-manager/destinations/${id}`}>
            <FileEdit className="h-4 w-4" />
            Edit Details
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild className="rounded-full cursor-pointer gap-2">
          <Link href={`/content-manager/destinations/${id}/cover`}>
            <ImageIcon className="h-4 w-4" />
            Cover Image
          </Link>
        </Button>
        <Button variant="default" size="sm" className="rounded-full cursor-pointer gap-2">
          <GalleryVertical className="h-4 w-4" />
          Gallery Images
        </Button>
      </div>

      <GalleryManager 
        images={destination.images || []} 
        onUpload={handleUpload} 
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        isUploading={isUploading}
        isUpdating={updatingId}
        isDeleting={deletingId}
      />
    </div>
  );
}
