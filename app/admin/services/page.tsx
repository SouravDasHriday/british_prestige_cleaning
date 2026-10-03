import { getAdminServices } from "@/app/actions/admin";
import ServicesClient from "@/components/admin/services-client";

export default async function ServicesAdminPage() {
  const services = await getAdminServices();

  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Services Management</h1>
        <p className="text-slate-500">Add, edit, or disable the cleaning services offered on your website.</p>
      </div>

      <ServicesClient initialServices={services} />
    </div>
  );
}
