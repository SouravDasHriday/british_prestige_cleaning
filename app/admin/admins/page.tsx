import { getAdmins } from "@/app/actions/admin";
import { AdminList } from "@/components/admin/admin-list";

export const metadata = {
  title: "Administrators - British Prestige Cleaning",
};

export default async function AdminsPage() {
  const admins = await getAdmins();

  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Administrator Management</h1>
        <p className="text-slate-500">View and manage system administrators.</p>
      </div>

      <AdminList initialAdmins={admins} />
    </div>
  );
}
