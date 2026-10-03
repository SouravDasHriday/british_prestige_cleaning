"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toggleServiceStatus, updateService, createService, uploadServicesCSV } from "@/app/actions/admin";
import { Plus, Edit2, Check, X, Loader2, Upload, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

type Service = {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  priceType: string;
  base_price: number;
  duration_minutes: number;
  is_active: boolean;
  image_url: string;
  icon: string;
  features: string[];
};

export default function ServicesClient({ initialServices }: { initialServices: Service[] }) {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    shortDescription: "",
    description: "",
    priceType: "FROM_PRICE",
    base_price: 0,
    duration_minutes: 120,
    image_url: "",
    icon: "Sparkles",
    features: [] as string[]
  });

  const handleToggle = async (id: string, currentStatus: boolean) => {
    try {
      setServices(prev => prev.map(s => s.id === id ? { ...s, is_active: !currentStatus } : s));
      await toggleServiceStatus(id, !currentStatus);
    } catch (err) {
      alert("Failed to toggle status");
      // Revert on error
      setServices(prev => prev.map(s => s.id === id ? { ...s, is_active: currentStatus } : s));
    }
  };

  const startEdit = (service: Service) => {
    setFormData({
      name: service.name,
      shortDescription: service.shortDescription || "",
      description: service.description || "",
      priceType: service.priceType || "FROM_PRICE",
      base_price: service.base_price || 0,
      duration_minutes: service.duration_minutes || 120,
      image_url: service.image_url || "",
      icon: service.icon || "Sparkles",
      features: service.features || []
    });
    setEditingId(service.id);
    setIsAdding(false);
  };

  const handleSave = async (id: string) => {
    setLoading(true);
    try {
      await updateService(id, formData);
      setServices(prev => prev.map(s => s.id === id ? { ...s, ...formData } : s));
      setEditingId(null);
    } catch (err) {
      alert("Failed to update service");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    setLoading(true);
    try {
      await createService(formData);
      window.location.reload(); // Quick refresh to get new ID from server
    } catch (err) {
      alert("Failed to create service");
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const form = new FormData();
    form.append("file", file);

    try {
      const result: any = await uploadServicesCSV(form);
      if (result.success) {
        toast.success(`Successfully added ${result.added}, updated ${result.updated}, deleted ${result.deleted} services.`);
        setTimeout(() => window.location.reload(), 1500);
      }
    } catch (err: any) {
      toast.error(`Upload failed: ${err.message}`);
    } finally {
      setUploading(false);
      if (e.target) e.target.value = '';
    }
  };

  const downloadTemplate = () => {
    const template = `"Action (ADD/UPDATE/DELETE)","Service Name","Category","Description","Base Price (£)","Duration (mins)","Is Active (yes/no)","Image URL (optional)"\n"ADD","New Service","Category","Description","100","120","yes",""`;
    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'services_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" onClick={downloadTemplate} className="flex-1 sm:flex-none">
            <Download className="w-4 h-4 mr-2" /> Template
          </Button>
          <div className="relative flex-1 sm:flex-none">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
              disabled={uploading}
            />
            <Button variant="outline" className="w-full" disabled={uploading}>
              {uploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
              {uploading ? 'Uploading...' : 'Bulk Upload CSV'}
            </Button>
          </div>
        </div>
        <Button onClick={() => {
          setIsAdding(true);
          setEditingId(null);
          setFormData({ name: "", shortDescription: "", description: "", priceType: "FROM_PRICE", base_price: 0, duration_minutes: 120, image_url: "", icon: "Sparkles", features: [] });
        }} className="bg-primary text-white w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" /> Add New Service
        </Button>
      </div>

      {isAdding && (
        <Card className="border-primary bg-primary/5">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-bold text-lg">Create New Service</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Service Name</Label>
                <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Deep Cleaning" />
              </div>
              <div className="space-y-2">
                <Label>Icon</Label>
                <select value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm">
                  <option value="Sparkles">Sparkles</option>
                  <option value="Building2">Building</option>
                  <option value="Droplets">Droplets</option>
                  <option value="Waves">Waves</option>
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Short Description (For Cards & Banners)</Label>
                <Input value={formData.shortDescription} onChange={e => setFormData({...formData, shortDescription: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Price Type</Label>
                <select value={formData.priceType} onChange={e => setFormData({...formData, priceType: e.target.value})} className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm">
                  <option value="FIXED">Fixed</option>
                  <option value="FROM_PRICE">From Price</option>
                  <option value="QUOTE_REQUIRED">Quote Required</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Base Price (£)</Label>
                <Input type="number" value={formData.base_price} onChange={e => setFormData({...formData, base_price: Number(e.target.value)})} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Long Description</Label>
                <textarea 
                  className="flex min-h-[80px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})} 
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Features (Comma separated)</Label>
                <Input 
                  value={formData.features.join(", ")} 
                  onChange={e => setFormData({...formData, features: e.target.value.split(",").map(s => s.trim()).filter(Boolean)})} 
                  placeholder="e.g. Inside appliances, Deep carpet washing" 
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Image URL</Label>
                <Input value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} placeholder="/images/service-1.jpg" />
              </div>
            </div>
            <div className="flex gap-2 justify-end mt-4">
              <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
              <Button onClick={handleCreate} disabled={loading || !formData.name}>
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Check className="w-4 h-4 mr-2" />}
                Save Service
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {services.map(service => (
          <Card key={service.id} className={!service.is_active ? "opacity-75 bg-slate-50" : ""}>
            <CardContent className="p-6">
              {editingId === service.id ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Service Name</Label>
                      <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label>Icon</Label>
                      <select value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm">
                        <option value="Sparkles">Sparkles</option>
                        <option value="Building2">Building</option>
                        <option value="Droplets">Droplets</option>
                        <option value="Waves">Waves</option>
                      </select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Short Description (For Cards & Banners)</Label>
                      <Input value={formData.shortDescription} onChange={e => setFormData({...formData, shortDescription: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <Label>Price Type</Label>
                      <select value={formData.priceType} onChange={e => setFormData({...formData, priceType: e.target.value})} className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm">
                        <option value="FIXED">Fixed</option>
                        <option value="FROM_PRICE">From Price</option>
                        <option value="QUOTE_REQUIRED">Quote Required</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label>Base Price (£)</Label>
                      <Input type="number" value={formData.base_price} onChange={e => setFormData({...formData, base_price: Number(e.target.value)})} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Long Description</Label>
                      <textarea 
                        className="flex min-h-[80px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                        value={formData.description} 
                        onChange={e => setFormData({...formData, description: e.target.value})} 
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Features (Comma separated)</Label>
                      <Input 
                        value={formData.features.join(", ")} 
                        onChange={e => setFormData({...formData, features: e.target.value.split(",").map(s => s.trim()).filter(Boolean)})} 
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Image URL</Label>
                      <Input value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} />
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" size="sm" onClick={() => setEditingId(null)}>Cancel</Button>
                    <Button size="sm" onClick={() => handleSave(service.id)} disabled={loading}>
                      {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Check className="w-4 h-4 mr-2" />} Save
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-bold text-lg text-slate-900">{service.name}</h3>
                      <Badge variant={service.is_active ? "default" : "secondary"}>
                        {service.is_active ? "Active" : "Hidden"}
                      </Badge>
                    </div>
                    <p className="text-slate-500 text-sm max-w-xl">{service.description}</p>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Base Price</p>
                      <p className="font-bold text-xl text-slate-900">£{service.base_price}</p>
                    </div>
                    
                    <div className="flex items-center gap-2 border-l border-slate-200 pl-6">
                      <div className="flex items-center space-x-2 mr-2">
                        <Switch 
                          checked={service.is_active} 
                          onCheckedChange={() => handleToggle(service.id, service.is_active)} 
                        />
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => startEdit(service)}>
                        <Edit2 className="w-4 h-4 text-slate-500" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
