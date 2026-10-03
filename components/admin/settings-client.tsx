"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { updateSiteSettings } from "@/app/actions/admin";
import { Loader2, Save, Plus, Trash2 } from "lucide-react";
import { SERVICES } from "@/lib/constants"; // fallback

type SiteSettings = {
  id: string;
  business_name: string;
  phone: string | null;
  email: string | null;
  address_line_1: string | null;
  city: string | null;
  postcode: string | null;
  bookings_enabled: boolean;
  coveredAreas?: string | null;
  whatsapp?: string | null;
  openingHours?: any;
  cancellationHours?: number;
  currency?: string;
  timezone?: string;
  heroHeadline?: string;
  heroSubtitle?: string;
  availableWindow?: string | null;
};

export default function SettingsClient({ initialSettings }: { initialSettings: SiteSettings }) {
  const [formData, setFormData] = useState({
    business_name: initialSettings.business_name || "",
    phone: initialSettings.phone || "",
    email: initialSettings.email || "",
    address_line_1: initialSettings.address_line_1 || "",
    city: initialSettings.city || "",
    postcode: initialSettings.postcode || "",
    bookings_enabled: initialSettings.bookings_enabled,
    coveredAreas: initialSettings.coveredAreas || "",
    whatsapp: initialSettings.whatsapp || "",
    openingHours: initialSettings.openingHours || "",
    cancellationHours: initialSettings.cancellationHours || 24,
    currency: initialSettings.currency || "GBP",
    timezone: initialSettings.timezone || "Europe/London",
    heroHeadline: initialSettings.heroHeadline || "",
    heroSubtitle: initialSettings.heroSubtitle || "",
    availableWindow: initialSettings.availableWindow || "",
  });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    setSaved(false);
    try {
      await updateSiteSettings(formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      alert("Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle>Business Details</CardTitle>
          <CardDescription>This information is displayed publicly on your website header and footer.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label>Business Name</Label>
              <Input value={formData.business_name} onChange={e => setFormData({...formData, business_name: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Public Email</Label>
              <Input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>WhatsApp Number</Label>
              <Input value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} placeholder="e.g. +44 7700 900000" />
            </div>
          </div>
          
          <div className="pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label>Office Address</Label>
              <Input value={formData.address_line_1} onChange={e => setFormData({...formData, address_line_1: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>City</Label>
              <Input value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Postcode</Label>
              <Input value={formData.postcode} onChange={e => setFormData({...formData, postcode: e.target.value})} />
            </div>
          </div>
          
          <div className="pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label>Areas We Cover</Label>
              <Input 
                value={formData.coveredAreas || ''} 
                onChange={e => setFormData({...formData, coveredAreas: e.target.value})} 
                placeholder="e.g. Birmingham, Solihull, Sutton Coldfield"
              />
              <p className="text-xs text-slate-500">Enter a comma-separated list of areas you cover.</p>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Available Window</Label>
              <Input 
                value={formData.availableWindow || ''} 
                onChange={e => setFormData({...formData, availableWindow: e.target.value})} 
                placeholder="e.g. 7 Days a week from 8am to 5pm"
              />
              <p className="text-xs text-slate-500">This will be displayed on the 'Areas We Cover' page.</p>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Opening Hours</Label>
              <Input 
                value={typeof formData.openingHours === 'string' ? formData.openingHours : ''} 
                onChange={e => setFormData({...formData, openingHours: e.target.value})} 
                placeholder="e.g. Mon-Fri: 9am - 5pm"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle>Homepage Content</CardTitle>
          <CardDescription>Edit the main text displayed on your landing page.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Hero Headline</Label>
            <Input 
              value={formData.heroHeadline} 
              onChange={e => setFormData({...formData, heroHeadline: e.target.value})} 
            />
          </div>
          <div className="space-y-2">
            <Label>Hero Subtitle</Label>
            <Input 
              value={formData.heroSubtitle} 
              onChange={e => setFormData({...formData, heroSubtitle: e.target.value})} 
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle>Global Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div>
              <p className="font-semibold text-slate-900">Accept New Bookings</p>
              <p className="text-sm text-slate-500">Turn this off to temporarily disable the booking form on your website.</p>
            </div>
            <Switch 
              checked={formData.bookings_enabled} 
              onCheckedChange={(checked: boolean) => setFormData({...formData, bookings_enabled: checked})} 
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <Label>Currency</Label>
              <select 
                value={formData.currency} 
                onChange={e => setFormData({...formData, currency: e.target.value})}
                className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="GBP">GBP (£)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Cancellation Window (Hours)</Label>
              <Input 
                type="number"
                value={formData.cancellationHours} 
                onChange={e => setFormData({...formData, cancellationHours: Number(e.target.value)})} 
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4 items-center">
        {saved && <span className="text-green-600 text-sm font-medium">Settings saved successfully!</span>}
        <Button onClick={handleSave} disabled={loading} className="bg-primary text-white">
          {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          Save Changes
        </Button>
      </div>
    </div>
  );
}
