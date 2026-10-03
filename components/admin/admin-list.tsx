"use client";

import { useState } from "react";
import { format } from "date-fns";
import { createAdmin } from "@/app/actions/admin";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserPlus, Shield, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function AdminList({ initialAdmins }: { initialAdmins: any[] }) {
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const result = await createAdmin(formData);
    
    setIsLoading(false);
    
    if (result.success) {
      toast.success("Admin user created successfully.");
      setIsCreating(false);
      (e.target as HTMLFormElement).reset();
    } else {
      toast.error(result.error || "Failed to create admin.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800">Current Admins</h2>
        <Button onClick={() => setIsCreating(!isCreating)} className="gap-2">
          <UserPlus className="w-4 h-4" />
          {isCreating ? "Cancel" : "Add Admin"}
        </Button>
      </div>

      {isCreating && (
        <Card className="p-6 bg-slate-50 border-slate-200">
          <form onSubmit={onSubmit} className="space-y-4 max-w-md">
            <h3 className="font-semibold text-slate-800">Create New Administrator</h3>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-slate-700">Full Name</label>
                <Input name="fullName" placeholder="John Doe" required />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Email Address</label>
                <Input name="email" type="email" placeholder="john@example.com" required />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Password</label>
                <Input name="password" type="password" required minLength={8} />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                Create Administrator Account
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid gap-4">
        {initialAdmins.map((admin) => (
          <Card key={admin.id} className="p-4 flex items-center justify-between border-slate-200">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 border border-slate-200">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-bold text-slate-900">{admin.fullName}</p>
                <p className="text-sm text-slate-500">{admin.email}</p>
              </div>
            </div>
            <div className="text-right text-sm text-slate-500 hidden sm:block">
              <p>Created on</p>
              <p className="font-medium text-slate-700">{format(new Date(admin.createdAt), "MMM d, yyyy")}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
