"use client";

import { useAuth } from "@/providers/auth-provider";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Calendar,
  MapPin,
  LogOut,
  Edit,
  Settings,
  Shield,
  Plane,
  Heart,
  ChevronRight,
  Sparkles,
  Camera,
  DollarSign
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface IUserStats {
  itinerariesCount: number;
  savedDestinationsCount: number;
  reviewsCount: number;
}

export default function ProfileView() {
  const { user, refreshUser, logout } = useAuth();
  const [stats, setStats] = useState<IUserStats | null>(null);
  const [itineraries, setItineraries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) return;
      try {
        const [statsRes, itinerariesRes] = await Promise.all([
          api.get<{ data: IUserStats }>("/users/stats"),
          api.get<{ data: any[] }>("/itineraries/my-itineraries")
        ]);

        setStats(statsRes.data);
        setItineraries(itinerariesRes.data);
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [user]);

  const handleLogout = async () => {
    try {
      console.log("Attempting logout...");
      logout(); // Clear local state immediately
      await api.post("/auth/logout", {});
      toast.success("Logged out successfully");
    } catch (error: any) {

      console.error("Logout API failed:", error);
      // Even if API fails (e.g. session already expired), we should still clear local state
      if (error?.status === 401) {
        toast.info("Session already ended");
      } else {
        toast.error("Logout process encountered an issue, but clearing session...");
      }
    } finally {
      // Force redirect and refresh to clear any cached auth state
      window.location.href = "/login";
    }
  };


  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Profile Section */}
      <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
          <div className="relative group">
            <Avatar className="w-44 h-44 border-8 border-slate-50 shadow-xl rounded-[2.5rem]">
              <AvatarImage src={user.profileImage || user.image || ""} alt={user.name} className="object-cover" />
              <AvatarFallback className="bg-primary text-white text-5xl font-bold rounded-[2.5rem]">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem] cursor-pointer">
              <Camera className="text-white w-10 h-10" />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left space-y-4">
            <div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-3">
                <h1 className="text-5xl font-black tracking-tight text-slate-900">{user.name}</h1>
                <Badge variant="secondary" className="bg-primary/10 text-primary border-none font-bold uppercase tracking-wider text-[10px] px-3 py-1.5 rounded-lg">
                  {user.role}
                </Badge>
              </div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-8 text-slate-500 font-medium">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  {user.email}
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <Calendar className="w-4 h-4 text-primary" />
                  </div>
                  Joined {new Date(user.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
              <Link href="/profile/edit">
                <Button
                  className="rounded-2xl px-8 h-14 font-bold shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Edit className="w-5 h-5 mr-2" />
                  Update Profile
                </Button>
              </Link>

              <Button
                variant="outline"
                onClick={() => {
                  console.log("Logout clicked");
                  handleLogout();
                }}
                className="rounded-2xl w-14 h-14 p-0 border-slate-200 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all flex items-center justify-center cursor-pointer shadow-sm"
              >
                <LogOut className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Sidebar: Stats & Info */}
        <div className="space-y-8">
          <Card className="border-none bg-slate-50 shadow-none rounded-[2rem] overflow-hidden">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Your Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0 grid grid-cols-1 gap-4">
              <div className="bg-white p-5 rounded-2xl flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-50 rounded-xl">
                    <Plane className="w-6 h-6 text-blue-500" />
                  </div>
                  <span className="font-bold text-slate-600">Trips Planned</span>
                </div>
                <span className="text-2xl font-black text-blue-600">{stats?.itinerariesCount || 0}</span>
              </div>
              <div className="bg-white p-5 rounded-2xl flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-red-50 rounded-xl">
                    <Heart className="w-6 h-6 text-red-500" />
                  </div>
                  <span className="font-bold text-slate-600">Saved Spots</span>
                </div>
                <span className="text-2xl font-black text-red-600">{stats?.savedDestinationsCount || 0}</span>
              </div>
              <div className="bg-white p-5 rounded-2xl flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-amber-50 rounded-xl">
                    <Settings className="w-6 h-6 text-amber-500" />
                  </div>
                  <span className="font-bold text-slate-600">Reviews</span>
                </div>
                <span className="text-2xl font-black text-amber-600">{stats?.reviewsCount || 0}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none bg-slate-900 text-white rounded-[2rem] overflow-hidden shadow-2xl">
            <CardHeader className="p-8 pb-4">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Account Security
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-6">
              <div className="space-y-2">
                <p className="text-sm text-slate-400 font-medium">Status</p>
                <Badge className="bg-emerald-500/20 text-emerald-400 border-none px-3">Verified Account</Badge>
              </div>
              <div className="space-y-4">
                <p className="text-sm text-slate-300 leading-relaxed">
                  Your account is protected with end-to-end encryption and modern authentication.
                </p>
                <Button variant="link" className="text-primary p-0 h-auto font-bold">
                  Change Password <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Section: Recent Itineraries */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-900">Recent Itineraries</h2>
            <Link href="/itineraries">
              <Button variant="ghost" className="font-bold text-primary">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-32 w-full rounded-3xl" />)}
            </div>
          ) : itineraries.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {itineraries.slice(0, 5).map((it) => (
                <Link key={it.id} href={`/itineraries/${it.id}`}>
                  <Card className="border-none bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 rounded-[2rem] group cursor-pointer border-l-0 hover:border-l-8 border-primary overflow-hidden">
                    <CardContent className="p-8">
                      <div className="flex items-center justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <h3 className="text-xl font-bold text-slate-800 group-hover:text-primary transition-colors">
                              {it.title}
                            </h3>
                            <Badge variant="outline" className="text-[10px] uppercase font-bold text-slate-400 border-slate-200">
                              {it.travelStyle}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-6 text-sm text-slate-500 font-medium">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-primary/60" />
                              {it.destination.name}
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-primary/60" />
                              {it.totalDays} Days
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-4 h-4 text-primary/60" />
                              ${it.budgetEstimate}
                            </div>
                          </div>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-2xl group-hover:bg-primary/10 transition-colors">
                          <ChevronRight className="w-6 h-6 text-slate-400 group-hover:text-primary transition-all" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card className="border-dashed border-2 bg-slate-50/50 rounded-[2rem] p-20 text-center">
              <div className="max-w-xs mx-auto space-y-6">
                <div className="p-6 bg-white rounded-full w-20 h-20 mx-auto flex items-center justify-center shadow-sm">
                  <Plane className="w-8 h-8 text-slate-300" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-800">No itineraries yet</h3>
                  <p className="text-slate-500 font-medium">Start planning your dream trip today with our AI expert.</p>
                </div>
                <Link href="/itineraries/create">
                  <Button className="rounded-2xl font-bold px-8">Create New Plan</Button>
                </Link>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
