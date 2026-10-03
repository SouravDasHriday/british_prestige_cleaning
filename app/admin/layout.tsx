import { ReactNode } from "react";
import Link from "next/link";
import { Sparkles, Users, Calendar, LayoutDashboard, LogOut, Settings, ClipboardList, ShieldCheck } from "lucide-react";
import { logout } from "@/app/actions/auth";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 flex-shrink-0 flex flex-col text-slate-300">
        <div className="p-6 border-b border-slate-800">
          <Link href="/admin" className="flex items-center gap-2 group">
            <div className="bg-primary/20 p-2 rounded-lg text-primary">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              Admin<span className="text-primary">Portal</span>
            </span>
          </Link>
        </div>
        
        <div className="p-4 flex-1">
          <nav className="space-y-1">
            <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors font-medium">
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </Link>
            <Link href="/admin/orders" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors font-medium">
              <ClipboardList className="w-5 h-5" />
              All Orders (Queue)
            </Link>
            <Link href="/admin/services" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors font-medium">
              <Calendar className="w-5 h-5" />
              Services
            </Link>
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors cursor-not-allowed opacity-50">
              <Users className="w-5 h-5" />
              Customers
            </div>
            <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors font-medium">
              <Settings className="w-5 h-5" />
              Site Settings
            </Link>
            <Link href="/admin/admins" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors font-medium">
              <ShieldCheck className="w-5 h-5" />
              Administrators
            </Link>
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800">
          <form action={logout}>
            <button type="submit" className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 hover:text-white transition-colors font-medium">
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="bg-white border-b border-slate-200 p-4 md:px-8 md:py-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">Quote Management</h2>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-bold">
              A
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-900">Administrator</p>
            </div>
          </div>
        </header>
        
        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
