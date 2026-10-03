import { getCustomerProfile } from "@/app/actions/dashboard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default async function ProfilePage() {
  const { customer } = await getCustomerProfile();

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-500">View your personal information and preferences.</p>
      </div>

      <Card className="border-0 shadow-sm bg-white">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>This information is used to pre-fill your future bookings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input disabled value={customer.fullName} className="bg-gray-50 cursor-not-allowed text-gray-700 font-medium" />
            </div>
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input disabled value={customer.email} className="bg-gray-50 cursor-not-allowed text-gray-700 font-medium" />
            </div>
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input disabled value={customer.phone || 'Not provided'} className="bg-gray-50 cursor-not-allowed text-gray-700 font-medium" />
            </div>
          </div>
          
          <div className="pt-6 border-t border-gray-100">
            <h3 className="font-semibold mb-4">Default Billing Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <Label>Street Address</Label>
                <Input disabled value={customer.addressLine1 || ''} className="bg-gray-50 cursor-not-allowed text-gray-700 font-medium" placeholder="Not provided" />
              </div>
              <div className="space-y-2">
                <Label>City</Label>
                <Input disabled value={customer.city || ''} className="bg-gray-50 cursor-not-allowed text-gray-700 font-medium" placeholder="Not provided" />
              </div>
              <div className="space-y-2">
                <Label>Postcode</Label>
                <Input disabled value={customer.postcode || ''} className="bg-gray-50 cursor-not-allowed text-gray-700 font-medium" placeholder="Not provided" />
              </div>
            </div>
          </div>
          
          <div className="pt-4 text-sm text-gray-500">
            * Profile editing capabilities will be enabled in a future update. If you need to change your details urgently, please contact support.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
