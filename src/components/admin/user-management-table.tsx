"use client";

import { useState } from "react";
import { 
  MoreVertical, 
  ShieldAlert, 
  UserCheck, 
  Trash2, 
  ShieldCheck, 
  Loader2,
  Mail,
  UserPlus
} from "lucide-react";
import { IUser, UserRole, UserStatus } from "@/types";
import { adminService } from "@/services/admin.service";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface UserManagementTableProps {
  users: IUser[];
  onUpdate: () => void;
}

export function UserManagementTable({ users, onUpdate }: UserManagementTableProps) {
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const handleStatusChange = async (userId: string, currentStatus: UserStatus) => {
    try {
      setIsUpdating(userId);
      const newStatus = currentStatus === UserStatus.ACTIVE ? UserStatus.BLOCKED : UserStatus.ACTIVE;
      await adminService.updateUserStatus(userId, newStatus);
      toast.success(`User status updated to ${newStatus}`);
      onUpdate();
    } catch (error: any) {
      toast.error(error?.message || "Failed to update status");
    } finally {
      setIsUpdating(null);
    }
  };

  const handleRoleChange = async (userId: string, currentRole: UserRole) => {
    try {
      setIsUpdating(userId);
      const newRole = currentRole === UserRole.USER ? UserRole.CONTENT_MANAGER : UserRole.USER;
      await adminService.updateUserRole(userId, newRole);
      toast.success(`User promoted to ${newRole}`);
      onUpdate();
    } catch (error: any) {
      toast.error(error?.message || "Failed to update role");
    } finally {
      setIsUpdating(null);
    }
  };

  const handleDelete = async (userId: string) => {
    if (!confirm("Are you sure you want to soft-delete this user? This action cannot be easily undone.")) return;
    
    try {
      setIsUpdating(userId);
      await adminService.deleteUser(userId);
      toast.success("User soft-deleted successfully");
      onUpdate();
    } catch (error: any) {
      toast.error(error?.message || "Failed to delete user");
    } finally {
      setIsUpdating(null);
    }
  };

  return (
    <div className="rounded-[2rem] border border-slate-100 bg-white shadow-xl shadow-slate-200/50 overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50/50">
          <TableRow className="hover:bg-transparent border-slate-100">
            <TableHead className="w-[300px] py-6 pl-8 font-bold text-slate-500 uppercase tracking-widest text-xs">Explorer</TableHead>
            <TableHead className="font-bold text-slate-500 uppercase tracking-widest text-xs">Role</TableHead>
            <TableHead className="font-bold text-slate-500 uppercase tracking-widest text-xs">Status</TableHead>
            <TableHead className="font-bold text-slate-500 uppercase tracking-widest text-xs">Joined</TableHead>
            <TableHead className="text-right pr-8 font-bold text-slate-500 uppercase tracking-widest text-xs">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="hover:bg-slate-50/50 transition-colors border-slate-100 group">
              <TableCell className="py-6 pl-8">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black shadow-sm group-hover:scale-110 transition-transform">
                    {user.image ? (
                        <img src={user.image} alt={user.name} className="h-full w-full rounded-full object-cover" />
                    ) : user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-black text-slate-900 leading-none mb-1">{user.name}</span>
                    <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {user.email}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge 
                  className={cn(
                    "rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest border-none",
                    user.role === UserRole.ADMIN ? "bg-purple-100 text-purple-600" :
                    user.role === UserRole.CONTENT_MANAGER ? "bg-amber-100 text-amber-600" :
                    "bg-blue-100 text-blue-600"
                  )}
                >
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge 
                  className={cn(
                    "rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest border-none",
                    user.status === UserStatus.ACTIVE ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"
                  )}
                >
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell className="text-sm font-medium text-slate-500">
                {new Date(user.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right pr-8">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-10 w-10 p-0 rounded-xl hover:bg-slate-100" disabled={isUpdating === user.id}>
                      {isUpdating === user.id ? (
                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                      ) : (
                        <MoreVertical className="h-5 w-5 text-slate-400" />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 rounded-2xl border-slate-100 p-2 shadow-2xl">
                    <DropdownMenuLabel className="px-3 py-2 text-xs font-black text-slate-400 uppercase tracking-widest">Management</DropdownMenuLabel>
                    <DropdownMenuItem 
                      onClick={() => handleStatusChange(user.id, user.status)}
                      className="rounded-xl px-3 py-2.5 text-sm font-bold flex items-center gap-2 cursor-pointer focus:bg-primary/5 focus:text-primary"
                    >
                      {user.status === UserStatus.ACTIVE ? (
                        <><ShieldAlert className="h-4 w-4" /> Block User</>
                      ) : (
                        <><UserCheck className="h-4 w-4" /> Activate User</>
                      )}
                    </DropdownMenuItem>
                    
                    {user.role !== UserRole.ADMIN && (
                      <DropdownMenuItem 
                        onClick={() => handleRoleChange(user.id, user.role)}
                        className="rounded-xl px-3 py-2.5 text-sm font-bold flex items-center gap-2 cursor-pointer focus:bg-amber-50 focus:text-amber-600"
                      >
                        {user.role === UserRole.USER ? (
                          <><UserPlus className="h-4 w-4" /> Promote to Content-Manager</>
                        ) : (
                          <><ShieldCheck className="h-4 w-4" /> Demote to Traveler</>
                        )}
                      </DropdownMenuItem>
                    )}
                    
                    <DropdownMenuSeparator className="my-2 bg-slate-50" />
                    
                    <DropdownMenuItem 
                      onClick={() => handleDelete(user.id)}
                      className="rounded-xl px-3 py-2.5 text-sm font-bold flex items-center gap-2 cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                      Soft Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
