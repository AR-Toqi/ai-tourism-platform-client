"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  MapPin,
  Globe,
  Search,
  Loader2,
  Edit3,
  Trash2,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog";
import { DestinationForm } from "./destination-form";
import { api } from "@/lib/api";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

import { IDestination, PaginatedResponse } from "@/types";

export function AdminDestinationPageView() {
  const [destinations, setDestinations] = useState<IDestination[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDestination, setEditingDestination] = useState<IDestination | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchDestinations = async () => {
    try {
      setIsLoading(true);
      const response = await api.get<PaginatedResponse<IDestination>>("/destinations?limit=100");
      setDestinations(response.data || []);
    } catch (error) {
      toast.error("Failed to fetch destinations");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      await api.patch(`/content-manager/destinations/${id}`, { isPublished: !currentStatus });
      toast.success(`Destination ${!currentStatus ? "published" : "moved to drafts"}`);
      fetchDestinations();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this destination?")) return;
    try {
      await api.delete(`/destinations/${id}`);
      toast.success("Destination deleted");
      fetchDestinations();
    } catch (error) {
      toast.error("Failed to delete destination");
    }
  };

  const filteredDestinations = destinations.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tight text-slate-900">Destination Hub</h1>
          <p className="text-lg text-slate-500 font-medium">Add, edit, or remove world-class destinations from Wandr.</p>
        </div>

        <Dialog open={isFormOpen} onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) setEditingDestination(null);
        }}>
          <DialogTrigger asChild>
            <Button className="rounded-full px-8 h-12 font-black shadow-xl shadow-primary/20 flex items-center gap-2 hover:scale-[1.05] transition-transform">
              <Plus className="h-5 w-5" />
              New Destination
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto rounded-[3rem] border-none shadow-2xl p-0">
            <div className="p-10">
              <DialogHeader className="mb-8">
                <DialogTitle className="text-3xl font-black text-slate-900">
                  {editingDestination ? "Modify Destination" : "Add New Location"}
                </DialogTitle>
                <DialogDescription className="text-slate-500 font-medium mt-2">
                    {editingDestination ? "Update the information for this location." : "Create a new world-class destination for explorers."}
                </DialogDescription>
              </DialogHeader>
              <DestinationForm
                initialData={editingDestination}
                onSuccess={() => {
                  setIsFormOpen(false);
                  fetchDestinations();
                }}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative w-full max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Filter by name, location or country..."
          className="pl-11 rounded-2xl border-slate-200 h-12 focus-visible:ring-primary/20"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      ) : (
        <div className="rounded-[2.5rem] border border-slate-100 bg-white shadow-xl shadow-slate-200/50 overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="hover:bg-transparent border-slate-100">
                <TableHead className="py-6 pl-8 font-bold text-slate-500 uppercase tracking-widest text-xs">Destination</TableHead>
                <TableHead className="font-bold text-slate-500 uppercase tracking-widest text-xs">Category</TableHead>
                <TableHead className="font-bold text-slate-500 uppercase tracking-widest text-xs">Budget</TableHead>
                <TableHead className="font-bold text-slate-500 uppercase tracking-widest text-xs">Status</TableHead>
                <TableHead className="text-right pr-8 font-bold text-slate-500 uppercase tracking-widest text-xs">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDestinations.map((destination) => (
                <TableRow key={destination.id} className="hover:bg-slate-50/50 transition-colors border-slate-100 group">
                  <TableCell className="py-6 pl-8">
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 rounded-2xl bg-slate-100 overflow-hidden shadow-sm group-hover:scale-110 transition-transform">
                        <img
                          src={destination.coverImage || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800"}
                          alt={destination.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-black text-slate-900 leading-none mb-1">{destination.name}</span>
                        <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {destination.location}, {destination.country}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-600 border-none">
                      {destination.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-bold text-slate-600">
                    ${destination.budgetMin} - ${destination.budgetMax}
                  </TableCell>
                  <TableCell>
                    {destination.isPublished ? (
                      <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-black uppercase tracking-widest">
                        <CheckCircle2 className="h-4 w-4" /> Published
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-slate-400 text-xs font-black uppercase tracking-widest">
                        <XCircle className="h-4 w-4" /> Draft
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-10 w-10 p-0 rounded-xl hover:bg-slate-100">
                          <MoreVertical className="h-5 w-5 text-slate-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56 rounded-2xl border-slate-100 p-2 shadow-2xl">
                        <DropdownMenuLabel className="px-3 py-2 text-xs font-black text-slate-400 uppercase tracking-widest">Management</DropdownMenuLabel>
                        <DropdownMenuItem 
                          onClick={() => handleToggleStatus(destination.id, destination.isPublished)}
                          className="rounded-xl px-3 py-2.5 text-sm font-bold flex items-center gap-2 cursor-pointer focus:bg-emerald-50 focus:text-emerald-600"
                        >
                          {destination.isPublished ? (
                            <><XCircle className="h-4 w-4" /> Move to Drafts</>
                          ) : (
                            <><CheckCircle2 className="h-4 w-4" /> Publish Location</>
                          )}
                        </DropdownMenuItem>
                        
                        <DropdownMenuItem
                          onClick={() => {
                            setEditingDestination(destination);
                            setIsFormOpen(true);
                          }}
                          className="rounded-xl px-3 py-2.5 text-sm font-bold flex items-center gap-2 cursor-pointer focus:bg-primary/5 focus:text-primary"
                        >
                          <Edit3 className="h-4 w-4" /> Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-xl px-3 py-2.5 text-sm font-bold flex items-center gap-2 cursor-pointer focus:bg-slate-50">
                          <Eye className="h-4 w-4" /> View Public Page
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="my-2 bg-slate-50" />
                        <DropdownMenuItem
                          onClick={() => handleDelete(destination.id)}
                          className="rounded-xl px-3 py-2.5 text-sm font-bold flex items-center gap-2 cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" /> Delete Permanently
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
