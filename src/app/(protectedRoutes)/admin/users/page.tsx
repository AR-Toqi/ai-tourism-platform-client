"use client";

import { useEffect, useState } from "react";
import { UserManagementTable } from "@/components/admin/user-management-table";
import { adminService } from "@/services/admin.service";
import { IUser } from "@/types";
import { Loader2, Users, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"normal" | "content-managers">("normal");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await adminService.getUsers(activeTab);
      setUsers(response.data || []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [activeTab]);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tight text-slate-900">User Moderation</h1>
          <p className="text-lg text-slate-500 font-medium">Manage permissions and account statuses for all explorers.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <Tabs 
          defaultValue="normal" 
          className="w-full md:w-auto"
          onValueChange={(v) => setActiveTab(v as any)}
        >
          <TabsList className="bg-slate-100 p-1.5 rounded-2xl h-auto">
            <TabsTrigger 
              value="normal" 
              className="rounded-xl px-8 py-2.5 font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Travelers
            </TabsTrigger>
            <TabsTrigger 
              value="content-managers"
              className="rounded-xl px-8 py-2.5 font-bold data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              Content Squad
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input 
            placeholder="Search by name or email..." 
            className="pl-11 rounded-2xl border-slate-200 h-12 focus-visible:ring-primary/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      ) : filteredUsers.length > 0 ? (
        <UserManagementTable users={filteredUsers} onUpdate={fetchUsers} />
      ) : (
        <div className="text-center py-20 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400 mb-4">
            <Users className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-700">No users found</h3>
          <p className="text-slate-500">Try adjusting your search or switching tabs.</p>
        </div>
      )}
    </div>
  );
}
