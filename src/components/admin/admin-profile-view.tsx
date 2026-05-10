"use client";

import { useAuth } from "@/providers/auth-provider";
import { useState, useRef } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";
import {
    User,
    Mail,
    Shield,
    Clock,
    Key,
    Camera,
    CheckCircle2,
    AlertCircle,
    Loader2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function AdminProfileView() {
    const { user, refreshUser } = useAuth();
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    if (!user) return null;

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setIsUploading(true);
            const formData = new FormData();
            formData.append("image", file);

            await api.patch("/users/me", formData);
            await refreshUser();
            toast.success("Profile image updated successfully!");
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to upload image");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="space-y-10 max-w-5xl">
            {/* Header Section */}
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-black tracking-tight text-slate-900">My Profile</h1>
                <p className="text-lg text-slate-500 font-medium">Manage your administrative identity and security settings.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Avatar & Basic Info */}
                <Card className="border-none shadow-xl shadow-slate-200/50 rounded-[3rem] p-8 text-center">
                    <div className="relative inline-block mx-auto mb-6">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            className="hidden"
                            accept="image/*"
                        />
                        <div className="h-32 w-32 rounded-[2.5rem] bg-primary/10 flex items-center justify-center text-5xl font-black text-primary border-4 border-white shadow-xl overflow-hidden">
                            {isUploading ? (
                                <Loader2 className="h-8 w-8 animate-spin" />
                            ) : user.image ? (
                                <img src={user.image} alt={user.name} className="h-full w-full object-cover" />
                            ) : (
                                user.name.charAt(0).toUpperCase()
                            )}
                        </div>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading}
                            className="absolute -bottom-2 -right-2 h-10 w-10 rounded-2xl bg-white shadow-lg flex items-center justify-center text-slate-400 hover:text-primary transition-colors border border-slate-100 disabled:opacity-50 cursor-pointer"
                        >
                            <Camera className="h-5 w-5" />
                        </button>
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 mb-1">{user.name}</h2>
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <Badge className="bg-primary/10 text-primary border-none rounded-full px-4 py-1 font-bold">
                            {user.role}
                        </Badge>
                        <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 rounded-full px-4 py-1 font-bold">
                            ACTIVE
                        </Badge>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-slate-50">
                        <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
                            <Mail className="h-4 w-4 text-slate-400" />
                            {user.email}
                        </div>
                        <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
                            <Shield className="h-4 w-4 text-slate-400" />
                            Permissions Verified
                        </div>
                        <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
                            <Clock className="h-4 w-4 text-slate-400" />
                            Last Login: {new Date().toLocaleDateString()}
                        </div>
                    </div>
                </Card>

                {/* Right Column: Details & Security */}
                <div className="lg:col-span-2 space-y-8">
                    <Card className="border-none shadow-xl shadow-slate-200/50 rounded-[3rem] overflow-hidden">
                        <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-8 py-6">
                            <CardTitle className="text-lg font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                <User className="h-5 w-5 text-primary" />
                                Account Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-1">
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Full Name</p>
                                    <p className="text-base font-bold text-slate-900">{user.name}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Email Address</p>
                                    <p className="text-base font-bold text-slate-900">{user.email}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Administrative Role</p>
                                    <p className="text-base font-bold text-slate-900 uppercase">{user.role}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Email Verification</p>
                                    <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
                                        <CheckCircle2 className="h-4 w-4" />
                                        Verified
                                    </div>
                                </div>
                            </div>
                            <Button className="rounded-2xl h-12 px-8 font-bold border-none shadow-lg shadow-primary/20">
                                Update Information
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-xl shadow-slate-200/50 rounded-[3rem] overflow-hidden border-l-4 border-l-amber-400">
                        <CardHeader className="bg-amber-50/30 border-b border-amber-50 px-8 py-6">
                            <CardTitle className="text-lg font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                <Key className="h-5 w-5 text-amber-500" />
                                Security Settings
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6">
                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-amber-50 border border-amber-100">
                                <AlertCircle className="h-6 w-6 text-amber-600 mt-1" />
                                <div>
                                    <p className="font-bold text-amber-900">Security Recommendation</p>
                                    <p className="text-sm text-amber-700 leading-relaxed">Ensure you use a strong, unique password for your administrative account. We recommend changing it every 90 days.</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between py-4">
                                <div className="space-y-1">
                                    <p className="font-bold text-slate-900">Account Password</p>
                                    <p className="text-sm text-slate-500">Change your login credentials to secure your account.</p>
                                </div>
                                <Button variant="outline" className="rounded-2xl h-12 px-6 font-bold border-slate-200 text-slate-600 hover:bg-slate-50">
                                    Change Password
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
