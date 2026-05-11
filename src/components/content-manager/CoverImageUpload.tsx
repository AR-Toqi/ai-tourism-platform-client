"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Upload, Image as ImageIcon, CloudUpload, X } from "lucide-react";
import Image from "next/image";

interface CoverImageUploadProps {
  currentImage?: string;
  onUpload: (data: FormData) => void;
  isUploading?: boolean;
}

export function CoverImageUpload({
  currentImage,
  onUpload,
  isUploading,
}: CoverImageUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("coverImage", selectedFile);
    onUpload(formData);
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <Card className="max-w-2xl mx-auto border-none shadow-sm">
      <CardContent className="pt-6 space-y-6">
        {/* Current image preview */}
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border bg-muted flex items-center justify-center">
          {preview || currentImage ? (
            <Image
              src={preview || currentImage!}
              alt="Cover preview"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 672px"
            />
          ) : (
            <div className="flex flex-col items-center text-muted-foreground">
              <ImageIcon className="h-12 w-12 mb-2 opacity-20" />
              <p>No cover image set</p>
            </div>
          )}
        </div>

        {/* Upload zone */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        {!selectedFile ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all group"
          >
            <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <CloudUpload className="h-7 w-7 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-sm font-bold">Click to choose a new cover image</p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG, or WebP up to 5MB</p>
            </div>
          </div>
        ) : (
          <div className="border rounded-2xl p-4 flex items-center justify-between bg-muted/30">
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <ImageIcon className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold truncate">{selectedFile.name}</p>
                <p className="text-xs text-muted-foreground">{(selectedFile.size / 1024).toFixed(1)} KB</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={clearSelection} className="cursor-pointer shrink-0 text-muted-foreground hover:text-red-500">
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        <Button
          onClick={handleUpload}
          disabled={!selectedFile || isUploading}
          className="w-full cursor-pointer rounded-xl h-12"
        >
          {isUploading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Upload className="mr-2 h-4 w-4" />
          )}
          {currentImage ? "Update Cover Image" : "Upload Cover Image"}
        </Button>
      </CardContent>
    </Card>
  );
}
