"use client";

import { useRef, useState } from "react";
import { IDestinationImage } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Plus, Trash2, Upload, Image as ImageIcon, CloudUpload, X, Images } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";

interface GalleryManagerProps {
  images: IDestinationImage[];
  onUpload: (data: FormData) => void;
  onUpdate: (imageId: string, data: FormData) => void;
  onDelete: (imageId: string) => void;
  isUploading?: boolean;
  isUpdating?: string | null;
  isDeleting?: string | null;
}

export function GalleryManager({
  images,
  onUpload,
  onUpdate,
  onDelete,
  isUploading,
  isUpdating,
  isDeleting,
}: GalleryManagerProps) {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles(e.target.files);
    }
  };

  const handleUpload = () => {
    if (!selectedFiles) return;
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("images", selectedFiles[i]);
    }
    onUpload(formData);
    setSelectedFiles(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const clearSelection = () => {
    setSelectedFiles(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleIndividualUpdate = (imageId: string, file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    onUpdate(imageId, formData);
  };

  return (
    <div className="space-y-8">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {!selectedFiles ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all group"
        >
          <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <CloudUpload className="h-7 w-7 text-primary" />
          </div>
          <div className="text-center">
            <p className="text-sm font-bold">Click to choose gallery images</p>
            <p className="text-xs text-muted-foreground mt-1">Select multiple images at once • PNG, JPG, or WebP</p>
          </div>
        </div>
      ) : (
        <div className="border rounded-2xl p-4 space-y-3 bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Images className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold">{selectedFiles.length} image{selectedFiles.length > 1 ? "s" : ""} selected</p>
                <p className="text-xs text-muted-foreground">
                  {Array.from(selectedFiles).map(f => f.name).slice(0, 3).join(", ")}
                  {selectedFiles.length > 3 && ` +${selectedFiles.length - 3} more`}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={clearSelection} className="cursor-pointer shrink-0 text-muted-foreground hover:text-red-500">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Button
            onClick={handleUpload}
            disabled={isUploading}
            className="w-full cursor-pointer rounded-xl h-11"
          >
            {isUploading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Upload className="mr-2 h-4 w-4" />
            )}
            Upload {selectedFiles.length} Image{selectedFiles.length > 1 ? "s" : ""}
          </Button>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <Card key={image.id} className="overflow-hidden group relative">
            <CardContent className="p-0 aspect-square relative">
              <Image
                src={image.url}
                alt="Gallery image"
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <div className="relative">
                  <Input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleIndividualUpdate(image.id, file);
                    }}
                    disabled={isUpdating === image.id}
                  />
                  <Button
                    variant="secondary"
                    size="icon"
                    className="cursor-pointer"
                    disabled={isUpdating === image.id}
                  >
                    {isUpdating === image.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Upload className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  className="cursor-pointer"
                  onClick={() => onDelete(image.id)}
                  disabled={isDeleting === image.id}
                >
                  {isDeleting === image.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {images.length === 0 && !isUploading && (
          <div className="col-span-full py-12 flex flex-col items-center justify-center border-2 border-dashed rounded-lg text-muted-foreground">
            <ImageIcon className="h-12 w-12 mb-4 opacity-20" />
            <p>No images in gallery yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
