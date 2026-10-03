import { getSiteSettings } from "@/app/actions/admin";
import SettingsClient from "@/components/admin/settings-client";

export default async function SettingsAdminPage() {
  const settings = await getSiteSettings();

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Site Settings</h1>
        <p className="text-slate-500">Manage your business contact information and global booking preferences.</p>
      </div>

      <SettingsClient initialSettings={settings} />
    </div>
  );
}
