"use client";

import { useCMDestinations } from "@/hooks/use-content-manager";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MapPin, 
  Eye, 
  FileEdit, 
  Plus, 
  ArrowUpRight,
  Loader2,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export function CMDashboardView() {
  const { data: response, isLoading, isError } = useCMDestinations();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center bg-red-50 dark:bg-red-950/20 rounded-3xl border border-red-100 dark:border-red-900/30">
        <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-bold">Failed to load data</h3>
        <p className="text-muted-foreground">Please try refreshing the page or contact support.</p>
      </div>
    );
  }

  const destinations = response?.data || [];
  const publishedCount = destinations.filter(d => d.isPublished).length;
  const draftCount = destinations.length - publishedCount;
  
  const recentDestinations = [...destinations]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Dashboard Overview</h2>
          <p className="text-muted-foreground mt-1">Monitor your destination content and platform status.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button asChild className="rounded-2xl h-12 px-6 shadow-lg shadow-primary/20">
            <Link href="/content-manager/destinations/create">
              <Plus className="h-4 w-4 mr-2" />
              Add Destination
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="border-none shadow-sm bg-white dark:bg-slate-900 rounded-3xl overflow-hidden group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Destinations</CardTitle>
            <div className="h-10 w-10 rounded-xl bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{destinations.length}</div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3 text-emerald-500" />
              Manage all travel spots
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white dark:bg-slate-900 rounded-3xl overflow-hidden group">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Published Content</CardTitle>
            <div className="h-10 w-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Eye className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{publishedCount}</div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
              Live on the platform
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white dark:bg-slate-900 rounded-3xl overflow-hidden group sm:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Draft Items</CardTitle>
            <div className="h-10 w-10 rounded-xl bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <FileEdit className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{draftCount}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Work in progress
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        {/* Recent Activity */}
        <Card className="lg:col-span-4 border-none shadow-sm bg-white dark:bg-slate-900 rounded-3xl overflow-hidden">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Recent Destinations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentDestinations.length > 0 ? (
                recentDestinations.map((destination) => (
                  <div key={destination.id} className="flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                        {destination.coverImage ? (
                          <img src={destination.coverImage} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <MapPin className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold group-hover:text-primary transition-colors">{destination.name}</p>
                        <p className="text-xs text-muted-foreground">{destination.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={destination.isPublished ? "outline" : "secondary"} className="rounded-full px-3">
                        {destination.isPublished ? "Live" : "Draft"}
                      </Badge>
                      <Button variant="ghost" size="icon" asChild className="rounded-xl">
                        <Link href={`/content-manager/destinations/${destination.id}`}>
                          <FileEdit className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-muted-foreground">
                  No destinations found. Start by creating one!
                </div>
              )}
            </div>
            {destinations.length > 5 && (
              <Button variant="ghost" className="w-full mt-6 rounded-2xl text-xs font-bold" asChild>
                <Link href="/content-manager/destinations">View All Destinations</Link>
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Quick Tips / Meta */}
        <Card className="lg:col-span-3 border-none shadow-sm bg-gradient-to-br from-primary to-primary-foreground text-white rounded-3xl overflow-hidden">
          <CardContent className="p-8 h-full flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-4">Manager Tip</h3>
              <p className="text-primary-foreground/90 leading-relaxed">
                Remember to add at least 4 gallery images and a high-quality cover photo before publishing a destination. This significantly improves engagement!
              </p>
            </div>
            <div className="mt-10">
              <Button variant="secondary" className="w-full rounded-2xl h-12 font-bold shadow-xl" asChild>
                <Link href="/">Visit Platform</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
