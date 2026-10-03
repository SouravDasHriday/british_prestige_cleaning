import { getCustomerBookings } from "@/app/actions/dashboard";
import { format, isAfter } from "date-fns";
import { Calendar as CalendarIcon, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import QuoteActions from "@/components/booking/quote-actions";
import CancelBookingButton from "@/components/booking/cancel-booking-button";
import { differenceInHours } from "date-fns";

export default async function DashboardOverview() {
  const bookings = await getCustomerBookings();
  const upcomingBookings = bookings.filter(b => 
    isAfter(new Date(`${b.appointment_date}T${b.end_time}`), new Date()) && 
    b.status !== 'CANCELLED' && b.status !== 'REJECTED'
  );

  const nextBooking = upcomingBookings.length > 0 ? upcomingBookings[0] : null;

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
        <p className="text-gray-500">Welcome back! Here is a summary of your account.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Next Appointment Card */}
        <Card className="md:col-span-2 border-0 shadow-sm bg-white overflow-hidden relative">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-500 text-sm tracking-wider uppercase mb-4">Next Appointment</h3>
            
            {nextBooking ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{nextBooking.services.name}</h2>
                    <Badge variant="secondary" className="mt-2 bg-primary/10 text-primary hover:bg-primary/20">
                      {nextBooking.status}
                    </Badge>
                  </div>
                  <span className="text-lg font-bold text-gray-900">£{nextBooking.total_amount}</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-3 text-gray-700">
                    <CalendarIcon className="w-5 h-5 text-gray-400" />
                    <span className="font-medium">{format(new Date(nextBooking.appointment_date), "EEEE, MMMM do, yyyy")}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span className="font-medium">{nextBooking.start_time.substring(0, 5)} - {nextBooking.end_time.substring(0, 5)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700 sm:col-span-2">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span className="font-medium truncate">{nextBooking.service_address}, {nextBooking.service_city}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-end items-end sm:items-center gap-2 pt-4 border-t border-gray-100">
                  {nextBooking.status === 'QUOTE_PROVIDED' ? (
                    <QuoteActions bookingId={nextBooking.id} booking={nextBooking} />
                  ) : (
                    <>
                      <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-0 mr-auto sm:mr-4 mb-2 sm:mb-0">
                        Payment {nextBooking.status === 'COMPLETED' ? 'Paid' : 'Pending'}
                      </Badge>
                      {nextBooking.status !== 'CANCELLED' && nextBooking.status !== 'COMPLETED' && (
                        <CancelBookingButton 
                          bookingId={nextBooking.id} 
                          disabledReason={differenceInHours(new Date(`${nextBooking.appointment_date}T${nextBooking.start_time}`), new Date()) < 48 ? "Cannot cancel within 48 hours of appointment" : undefined}
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-gray-500 mb-4">You have no upcoming appointments.</p>
                <Button asChild className="bg-primary hover:bg-primary/90 text-white rounded-full">
                  <Link href="/book">Book a Cleaning</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats Card */}
        <Card className="border-0 shadow-sm bg-white">
          <CardContent className="p-6 flex flex-col justify-center h-full space-y-6">
            <div>
              <h3 className="font-semibold text-gray-500 text-sm tracking-wider uppercase mb-1">Total Bookings</h3>
              <p className="text-4xl font-bold text-gray-900">{bookings.length}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-500 text-sm tracking-wider uppercase mb-1">Account Status</h3>
              <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                <div className="w-2 h-2 rounded-full bg-green-500"></div> Active
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
