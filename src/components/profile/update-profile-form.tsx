"use client";

import { useAuth } from "@/providers/auth-provider";
import { api } from "@/lib/api";
import { useState, useRef } from "react";
import { User, Mail, Camera, Save, ArrowLeft, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UpdateProfileForm() {
  const { user, refreshUser } = useAuth();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [name, setName] = useState(user?.name || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(user?.profileImage || user?.image || null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }

    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append("name", name);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      await api.patch("/users/me", formData);
      await refreshUser();
      toast.success("Profile updated successfully!");
      router.push("/profile");
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4">
        <Link href="/profile">
          <Button variant="ghost" size="icon" className="rounded-full h-12 w-12 hover:bg-slate-100">
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Edit Profile</h1>
          <p className="text-slate-500 font-medium">Update your personal information and photo</p>
        </div>
      </div>

      <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-[2.5rem] overflow-hidden">
        <CardContent className="p-10">
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Avatar Upload */}
            <div className="flex flex-col items-center gap-6">
              <div className="relative group">
                <Avatar className="w-32 h-32 border-[4px] border-white shadow-xl rounded-[1.8rem]">
                  <AvatarImage src={imagePreview || ""} className="object-cover" />
                  <AvatarFallback className="bg-primary text-white text-4xl font-bold rounded-[1.8rem]">
                    {name.charAt(0) || user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-[1.8rem] text-white"
                >
                  <Camera className="w-8 h-8" />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Click to change photo</p>
            </div>

            <div className="grid gap-8">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-sm font-bold text-slate-700 ml-1">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="h-14 pl-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all text-lg font-medium"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-bold text-slate-700 ml-1 opacity-50">Email Address (Cannot be changed)</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    value={user.email}
                    disabled
                    className="h-14 pl-12 rounded-2xl border-slate-100 bg-slate-100/50 text-slate-500 font-medium cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full h-14 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    Save Profile
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
