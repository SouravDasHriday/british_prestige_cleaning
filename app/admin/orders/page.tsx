import { getAllBookings } from "@/app/actions/admin";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export default async function AllOrdersPage() {
  const bookings = await getAllBookings();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case 'QUOTE_PROVIDED':
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case 'CONFIRMED':
        return "bg-indigo-100 text-indigo-800 hover:bg-indigo-200";
      case 'COMPLETED':
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case 'CANCELLED':
      case 'REJECTED':
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <div className="max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">All Orders Queue</h1>
        <p className="text-slate-500">Master list of all bookings in the system across all statuses.</p>
      </div>

      <Card className="overflow-hidden border-slate-200 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th scope="col" className="px-6 py-4 font-semibold">Order Ref / Date</th>
                <th scope="col" className="px-6 py-4 font-semibold">Service</th>
                <th scope="col" className="px-6 py-4 font-semibold">Customer</th>
                <th scope="col" className="px-6 py-4 font-semibold">Total Price</th>
                <th scope="col" className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No orders found in the system.
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking.id} className="bg-white border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900 mb-1">{booking.booking_reference}</div>
                      <div className="text-slate-500 text-xs">
                        {format(new Date(booking.appointment_date), "MMM d, yyyy")}
                      </div>
                      <div className="text-slate-500 text-xs">
                        {booking.start_time.substring(0, 5)} - {booking.end_time.substring(0, 5)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-700">{booking.services.name}</div>
                      <div className="text-slate-500 text-xs truncate max-w-[200px] mt-1" title={booking.service_city || undefined}>
                        {booking.service_city}, {booking.service_postcode}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{booking.customers.full_name}</div>
                      <div className="text-slate-500 text-xs">{booking.customers.email}</div>
                      <div className="text-slate-500 text-xs">{booking.customers.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">
                        {booking.total_amount > 0 ? `£${booking.total_amount}` : 'Pending'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={`border-0 uppercase tracking-wider text-[10px] ${getStatusColor(booking.status)}`}>
                        {booking.status.replace('_', ' ')}
                      </Badge>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
