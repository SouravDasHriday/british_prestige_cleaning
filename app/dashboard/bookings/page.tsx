import { getCustomerBookings } from "@/app/actions/dashboard";
import { format, differenceInHours } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, MapPin, Clock } from "lucide-react";
import QuoteActions from "@/components/booking/quote-actions";
import CancelBookingButton from "@/components/booking/cancel-booking-button";

export default async function BookingsPage() {
  const bookings = await getCustomerBookings();

  return (
    <div className="max-w-5xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Bookings</h1>
        <p className="text-gray-500">View and manage all your past and upcoming cleaning services.</p>
      </div>

      <div className="space-y-4">
        {bookings.length === 0 ? (
          <Card className="border-0 shadow-sm bg-white p-12 text-center">
            <p className="text-gray-500 text-lg">No bookings found.</p>
          </Card>
        ) : (
          bookings.map((booking) => (
            <Card key={booking.id} className="border-0 shadow-sm bg-white overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-0 flex flex-col md:flex-row">
                
                {/* Date Block */}
                <div className="bg-gray-50 p-6 flex flex-col items-center justify-center md:w-48 border-b md:border-b-0 md:border-r border-gray-100">
                  <span className="text-sm font-semibold text-gray-500 uppercase">{format(new Date(booking.appointment_date), "MMM")}</span>
                  <span className="text-4xl font-bold text-gray-900">{format(new Date(booking.appointment_date), "dd")}</span>
                  <span className="text-sm text-gray-500 mt-1">{format(new Date(booking.appointment_date), "yyyy")}</span>
                </div>

                {/* Details Block */}
                <div className="p-6 flex-1 flex flex-col sm:flex-row justify-between gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-xl text-gray-900">{booking.services.name}</h3>
                      <Badge variant="outline" className={
                        booking.status === 'COMPLETED' ? "border-green-200 text-green-700 bg-green-50" :
                        booking.status === 'CANCELLED' ? "border-red-200 text-red-700 bg-red-50" :
                        "border-blue-200 text-blue-700 bg-blue-50"
                      }>
                        {booking.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{booking.start_time.substring(0, 5)} - {booking.end_time.substring(0, 5)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="truncate">{booking.service_address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-400">Ref:</span>
                        <span className="font-mono">{booking.booking_reference}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-start sm:items-end justify-between border-t sm:border-t-0 pt-4 sm:pt-0 border-gray-100">
                    <div className="text-right">
                      {booking.status === 'QUOTE_PROVIDED' && (
                        <p className="text-xs text-primary font-bold uppercase tracking-wider mb-1">Final Price</p>
                      )}
                      <div className="text-2xl font-bold text-gray-900 mb-2">£{booking.total_amount}</div>
                    </div>
                    
                    {booking.status === 'QUOTE_PROVIDED' ? (
                      <QuoteActions bookingId={booking.id} booking={booking} />
                    ) : (
                      <div className="flex flex-col items-end gap-2">
                        <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-0">
                          Payment {booking.status === 'COMPLETED' ? 'Paid' : 'Pending'}
                        </Badge>
                        {booking.status !== 'CANCELLED' && booking.status !== 'COMPLETED' && (
                          <CancelBookingButton 
                            bookingId={booking.id} 
                            disabledReason={differenceInHours(new Date(`${booking.appointment_date}T${booking.start_time}`), new Date()) < 48 ? "Cannot cancel within 48 hours of appointment" : undefined}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>

              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
