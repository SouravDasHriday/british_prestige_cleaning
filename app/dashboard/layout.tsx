import { ReactNode } from "react";
import Link from "next/link";
import { Sparkles, Calendar as CalendarIcon, User, LogOut, LayoutDashboard } from "lucide-react";
import { logout } from "@/app/actions/auth";
import { getCustomerProfile } from "@/app/actions/dashboard";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const { customer } = await getCustomerProfile();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-200 flex-shrink-0 flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">
              Cleaner<span className="text-primary">Pro</span>
            </span>
          </Link>
        </div>
        
        <div className="p-4 flex-1">
          <nav className="space-y-1">
            <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors font-medium">
              <LayoutDashboard className="w-5 h-5" />
              Overview
            </Link>
            <Link href="/dashboard/bookings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors font-medium">
              <CalendarIcon className="w-5 h-5" />
              My Bookings
            </Link>
            <Link href="/dashboard/profile" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors font-medium">
              <User className="w-5 h-5" />
              Profile
            </Link>
          </nav>
        </div>

        <div className="p-4 border-t border-gray-100">
          <form action={logout}>
            <button type="submit" className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium">
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4 md:px-8 md:py-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Customer Portal</h2>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
              {customer.fullName.charAt(0)}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-gray-900">{customer.fullName}</p>
              <p className="text-xs text-gray-500">{customer.email}</p>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
