import { getPendingBookings, getConfirmedBookings, markBookingCompleted, getAdminStats } from "@/app/actions/admin";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import QuoteForm from "@/components/admin/quote-form";
import { Mail, CheckCircle2 } from "lucide-react";
import CancelBookingButton from "@/components/booking/cancel-booking-button";
import { Button } from "@/components/ui/button";

export default async function AdminPage() {
  const bookings = await getPendingBookings();
  const confirmedBookings = await getConfirmedBookings();
  const stats = await getAdminStats();

  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500">Welcome back. Here is the current status of your platform.</p>
      </div>
      
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-slate-50 border-slate-200 flex flex-col justify-center">
          <p className="text-sm font-medium text-slate-500">Pending Actions</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">{stats.totalPendingBookings}</p>
        </Card>
        <Card className="p-6 bg-slate-50 border-slate-200 flex flex-col justify-center">
          <p className="text-sm font-medium text-slate-500">Active Services</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">{stats.totalServices}</p>
        </Card>
        <Card className="p-6 bg-slate-50 border-slate-200 flex flex-col justify-center">
          <p className="text-sm font-medium text-slate-500">System Administrators</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">{stats.totalAdmins}</p>
        </Card>
      </div>

      <div className="pt-6">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Pending Quotes & Bookings</h2>
        <p className="text-slate-500 mb-4">Review property details and provide final pricing for pending bookings.</p>
      </div>

      <div className="space-y-4">
        {bookings.length === 0 ? (
          <Card className="p-12 text-center text-slate-500 border-dashed">
            No pending bookings require a quote right now.
          </Card>
        ) : (
          bookings.map(booking => {
            const emailSubject = encodeURIComponent(`Booking Update - British Prestige Cleaning Solutions (Ref: ${booking.booking_reference})`);
            const emailBody = encodeURIComponent(`Hello ${booking.customers.full_name},\n\nRegarding your booking for ${booking.services.name} on ${format(new Date(booking.appointment_date), "MMM do, yyyy")},\n\n[Add your message here]\n\nBest regards,\nBritish Prestige Cleaning Solutions`);
            const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${booking.customers.email}&su=${emailSubject}&body=${emailBody}`;

            return (
            <Card key={booking.id} className="overflow-hidden border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-3">
                {/* Details Section */}
                <div className="md:col-span-2 p-6 border-b md:border-b-0 md:border-r border-slate-100 space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">{booking.services.name}</h2>
                      <p className="text-sm text-slate-500 font-mono mt-1">Ref: {booking.booking_reference}</p>
                    </div>
                    <Badge variant={booking.status === 'QUOTE_PROVIDED' ? 'default' : 'secondary'} className="uppercase">
                      {booking.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-500 font-medium mb-1">Customer</p>
                      <p className="font-semibold">{booking.customers.full_name}</p>
                      <p>{booking.customers.email}</p>
                      <p>{booking.customers.phone}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 font-medium mb-1">Schedule</p>
                      <p className="font-semibold">{format(new Date(booking.appointment_date), "MMM do, yyyy")}</p>
                      <p>{booking.start_time.substring(0, 5)} - {booking.end_time.substring(0, 5)}</p>
                    </div>
                    <div className="col-span-2 bg-slate-50 p-4 rounded-lg mt-2">
                      <p className="text-slate-500 font-medium mb-2">Property Details (For Pricing)</p>
                      <div className="grid grid-cols-2 gap-2">
                        <p><span className="text-slate-400">Type:</span> {booking.property_type}</p>
                        <p><span className="text-slate-400">Floors:</span> {booking.number_of_floors}</p>
                        <p className="col-span-2"><span className="text-slate-400">Address:</span> {booking.service_address}, {booking.service_city}, {booking.service_postcode}</p>
                      </div>
                    </div>
                    
                    {booking.customerNotes && (
                      <div className="col-span-2 bg-yellow-50/50 border border-yellow-100 p-4 rounded-lg mt-2">
                        <p className="text-yellow-800 font-medium mb-1">Additional Notes & Special Requirements</p>
                        <p className="text-yellow-900/80 italic">"{booking.customerNotes}"</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Action Section */}
                <div className="p-6 bg-slate-50 flex flex-col justify-center gap-6 border-l border-slate-100">
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-slate-500">Communicate</p>
                    <a 
                      href={gmailLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-[#EA4335] hover:bg-[#EA4335]/90 text-white font-medium py-2.5 px-4 rounded-md shadow-sm transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      Contact via Gmail
                    </a>
                    
                    <CancelBookingButton bookingId={booking.id} className="w-full" />
                  </div>
                  
                  <div className="pt-6 border-t border-slate-200">
                    <p className="text-sm font-medium text-slate-500 mb-3">Finalize Pricing</p>
                    <QuoteForm 
                      bookingId={booking.id} 
                      currentPrice={booking.total_amount} 
                      status={booking.status} 
                    />
                  </div>
                </div>
              </div>
            </Card>
          )})
        )}
      </div>

      <div className="pt-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Active Work Queue</h2>
        <p className="text-slate-500 mb-6">Confirmed orders that are scheduled for delivery. Sorted by priority and date.</p>

        <div className="space-y-4">
          {confirmedBookings.length === 0 ? (
            <Card className="p-12 text-center text-slate-500 border-dashed bg-slate-50/50">
              Your work queue is currently empty.
            </Card>
          ) : (
            confirmedBookings.map(booking => {
              const emailSubject = encodeURIComponent(`Booking Confirmation - British Prestige Cleaning Solutions (Ref: ${booking.booking_reference})`);
              const emailBody = encodeURIComponent(`Hello ${booking.customers.full_name},\n\nWe are looking forward to your upcoming ${booking.services.name} on ${format(new Date(booking.appointment_date), "MMM do, yyyy")} between ${booking.start_time.substring(0, 5)} and ${booking.end_time.substring(0, 5)}.\n\nBest regards,\nBritish Prestige Cleaning Solutions`);
              const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${booking.customers.email}&su=${emailSubject}&body=${emailBody}`;

              return (
              <Card key={booking.id} className="overflow-hidden border-primary/20 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-3">
                  {/* Details Section */}
                  <div className="md:col-span-2 p-6 border-b md:border-b-0 md:border-r border-slate-100 space-y-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-lg font-bold text-slate-900">{booking.services.name}</h2>
                        <p className="text-sm text-slate-500 font-mono mt-1">Ref: {booking.booking_reference}</p>
                      </div>
                      <Badge variant="default" className="uppercase bg-primary text-primary-foreground">
                        {booking.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-slate-500 font-medium mb-1">Customer</p>
                        <p className="font-semibold">{booking.customers.full_name}</p>
                        <p>{booking.customers.email}</p>
                        <p>{booking.customers.phone}</p>
                      </div>
                      <div className="bg-primary/5 p-3 rounded-lg border border-primary/10">
                        <p className="text-primary font-bold mb-1">Scheduled Date & Time</p>
                        <p className="font-semibold">{format(new Date(booking.appointment_date), "EEEE, MMM do, yyyy")}</p>
                        <p className="font-medium">{booking.start_time.substring(0, 5)} - {booking.end_time.substring(0, 5)}</p>
                      </div>
                      <div className="col-span-2 bg-slate-50 p-4 rounded-lg mt-2">
                        <p className="text-slate-500 font-medium mb-2">Service Location & Details</p>
                        <div className="grid grid-cols-2 gap-2">
                          <p><span className="text-slate-400">Type:</span> {booking.property_type}</p>
                          <p><span className="text-slate-400">Floors:</span> {booking.number_of_floors}</p>
                          <p className="col-span-2 font-medium mt-1">
                            <span className="text-slate-400 font-normal">Address:</span> {booking.service_address}, {booking.service_city}, {booking.service_postcode}
                          </p>
                        </div>
                      </div>
                      
                      {booking.customerNotes && (
                        <div className="col-span-2 bg-yellow-50/50 border border-yellow-100 p-4 rounded-lg mt-2">
                          <p className="text-yellow-800 font-medium mb-1">Additional Notes & Special Requirements</p>
                          <p className="text-yellow-900/80 italic whitespace-pre-wrap">"{booking.customerNotes}"</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Action Section */}
                  <div className="p-6 bg-slate-50 flex flex-col gap-6 border-l border-slate-100">
                    <div className="text-center pb-4 border-b border-slate-200">
                      <p className="text-sm font-medium text-slate-500 mb-1">Agreed Final Price</p>
                      <p className="text-3xl font-bold text-slate-900">£{booking.total_amount}</p>
                    </div>

                    <div className="space-y-3 mt-auto">
                      <a 
                        href={gmailLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full bg-[#EA4335] hover:bg-[#EA4335]/90 text-white font-medium py-2.5 px-4 rounded-md shadow-sm transition-colors text-sm"
                      >
                        <Mail className="w-4 h-4" />
                        Contact Customer
                      </a>
                      
                      <form action={async () => {
                        "use server";
                        await markBookingCompleted(booking.id);
                      }}>
                        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          Mark as Delivered
                        </Button>
                      </form>

                      <CancelBookingButton bookingId={booking.id} className="w-full mt-2" />
                    </div>
                  </div>
                </div>
              </Card>
            )})
          )}
        </div>
      </div>
    </div>
  );
}
