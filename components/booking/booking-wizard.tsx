"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getAvailableSlots, createBooking } from "@/app/actions/booking";
import { CheckCircle2, ChevronRight, ChevronLeft, Loader2, Calendar as CalendarIcon, Clock, MapPin, Sparkles, AlertCircle } from "lucide-react";
import { format } from "date-fns";

type Step = 1 | 2 | 3 | 4;

export default function BookingWizard({ initialServices }: { initialServices: any[] }) {
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Form State
  const [serviceId, setServiceId] = useState<string>("");
  const [isCustom, setIsCustom] = useState(false);
  const [customDetails, setCustomDetails] = useState({ name: "", budget: "" });
  
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [slots, setSlots] = useState<any[]>([]);
  const [slotId, setSlotId] = useState<string>("");
  
  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postcode: "",
    propertyType: "residential",
    floors: "1",
    customerNotes: ""
  });

  // Success State
  const [bookingRef, setBookingRef] = useState<string | null>(null);

  // Fetch slots when date changes
  useEffect(() => {
    if (date) {
      setLoading(true);
      const dateStr = format(date, "yyyy-MM-dd");
      getAvailableSlots(dateStr)
        .then(data => {
          setSlots(data);
          setSlotId(""); // Reset slot selection
        })
        .catch(() => setError("Failed to load time slots"))
        .finally(() => setLoading(false));
    }
  }, [date]);

  const selectedService = initialServices.find(s => s.id === serviceId);
  const selectedSlot = slots.find(s => s.id === slotId);

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await createBooking({
        serviceId: isCustom ? 'custom-request' : serviceId,
        slotId,
        ...details,
        customerNotes: isCustom 
          ? `CUSTOM REQUEST: ${customDetails.name}\n\n${details.customerNotes}`
          : details.customerNotes,
        customBudget: isCustom ? customDetails.budget : undefined
      });
      setBookingRef(result.booking_reference);
      setStep(4);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step === 1 && !isCustom && !serviceId) return setError("Please select a service.");
    if (step === 1 && isCustom && (!customDetails.name || !customDetails.budget)) return setError("Please enter your custom requirement and estimated budget.");
    if (step === 2 && (!date || !slotId)) return setError("Please select a date and time.");
    if (step === 3 && (!details.firstName || !details.email || !details.address)) return setError("Please fill out all required details.");
    
    setError("");
    if (step === 3) {
      handleSubmit();
    } else {
      setStep((prev) => (prev + 1) as Step);
    }
  };

  if (step === 4 && bookingRef) {
    return (
      <Card className="border-0 shadow-xl bg-white text-center p-8 sm:p-12">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed!</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Thank you! Your cleaning service has been booked successfully. We will send you a confirmation email shortly.
        </p>
        <div className="bg-gray-50 rounded-xl p-6 mb-8 max-w-sm mx-auto border border-gray-100">
          <p className="text-sm text-gray-500 uppercase font-semibold tracking-wider mb-2">Booking Reference</p>
          <p className="text-2xl font-bold text-primary">{bookingRef}</p>
        </div>
        <Button onClick={() => window.location.href = "/"} size="lg" className="rounded-full px-8">
          Return to Home
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-8 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full z-0"></div>
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary rounded-full z-0 transition-all duration-500"
          style={{ width: `${((step - 1) / 2) * 100}%` }}
        ></div>
        
        {[1, 2, 3].map((s) => (
          <div key={s} className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm transition-colors duration-300 ${step >= s ? 'bg-primary text-white shadow-md' : 'bg-white text-gray-400 border-2 border-gray-200'}`}>
            {s}
          </div>
        ))}
      </div>

      {error && (
        <div className="bg-destructive/10 p-4 rounded-lg text-destructive text-sm font-medium flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}

      {/* STEP 1: SERVICE */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="flex bg-gray-100 p-1 rounded-xl max-w-sm mx-auto">
            <button
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${!isCustom ? 'bg-white shadow text-primary' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => { setIsCustom(false); setError(""); }}
            >
              Standard Services
            </button>
            <button
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${isCustom ? 'bg-white shadow text-primary' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => { setIsCustom(true); setError(""); }}
            >
              Custom Request
            </button>
          </div>

          {!isCustom ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {initialServices.map((service) => (
                <Card 
                  key={service.id} 
                  className={`cursor-pointer transition-all duration-300 ${serviceId === service.id ? 'border-primary ring-2 ring-primary/20 bg-primary/5' : 'hover:border-primary/50'}`}
                  onClick={() => { setServiceId(service.id); setError(""); }}
                >
                  <CardContent className="p-6 flex gap-4">
                    <div className={`p-3 rounded-xl ${serviceId === service.id ? 'bg-primary text-white' : 'bg-primary/10 text-primary'}`}>
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{service.name}</h3>
                      <p className="text-gray-500 text-sm line-clamp-2 mb-2">{service.description}</p>
                      <p className="font-semibold text-primary">From £{service.base_price}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="max-w-2xl mx-auto border-primary/20 shadow-lg">
              <CardContent className="p-8 space-y-6">
                <div>
                  <h3 className="font-bold text-xl mb-1 text-primary">Need something specific?</h3>
                  <p className="text-gray-500 text-sm">Tell us exactly what you need cleaned and your estimated budget. We'll tailor a service just for you.</p>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Requirement Name (e.g. Deep Clean Basement) *</Label>
                    <Input 
                      placeholder="What needs cleaning?" 
                      value={customDetails.name}
                      onChange={(e) => setCustomDetails({...customDetails, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Estimated Budget / Prize You Want to Pay (£) *</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">£</span>
                      <Input 
                        type="number"
                        placeholder="0.00" 
                        className="pl-8"
                        value={customDetails.budget}
                        onChange={(e) => setCustomDetails({...customDetails, budget: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* STEP 2: DATE & TIME */}
      {step === 2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><CalendarIcon className="w-5 h-5 text-primary"/> Select Date</h3>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border mx-auto bg-white"
              disabled={(date) => date < new Date() || date.getDay() === 0} // Disable past and Sundays
            />
          </Card>
          
          <Card className="p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Clock className="w-5 h-5 text-primary"/> Available Times</h3>
            {!date ? (
              <div className="text-center text-gray-500 py-12">Please select a date first.</div>
            ) : loading ? (
              <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
            ) : slots.length === 0 ? (
              <div className="text-center text-gray-500 py-12 bg-gray-50 rounded-lg">No slots available on this date. Please try another day.</div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {slots.map((slot) => (
                  <Button
                    key={slot.id}
                    variant={slotId === slot.id ? "default" : "outline"}
                    className={`w-full ${slotId === slot.id ? 'ring-2 ring-primary/20' : ''}`}
                    onClick={() => { setSlotId(slot.id); setError(""); }}
                  >
                    {slot.start_time.substring(0, 5)} - {slot.end_time.substring(0, 5)}
                  </Button>
                ))}
              </div>
            )}
          </Card>
        </div>
      )}

      {/* STEP 3: DETAILS */}
      {step === 3 && (
        <Card className="p-6 md:p-8 border-0 shadow-lg bg-white/80 backdrop-blur-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-bold text-lg border-b pb-2">Your Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First Name *</Label>
                  <Input value={details.firstName} onChange={e => setDetails({...details, firstName: e.target.value})} required className="bg-white" />
                </div>
                <div className="space-y-2">
                  <Label>Last Name *</Label>
                  <Input value={details.lastName} onChange={e => setDetails({...details, lastName: e.target.value})} required className="bg-white" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Email Address *</Label>
                <Input type="email" value={details.email} onChange={e => setDetails({...details, email: e.target.value})} required className="bg-white" />
              </div>
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input type="tel" value={details.phone} onChange={e => setDetails({...details, phone: e.target.value})} className="bg-white" />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-lg border-b pb-2 flex items-center gap-2"><MapPin className="w-5 h-5"/> Service Address</h3>
              <div className="space-y-2">
                <Label>Street Address *</Label>
                <Input value={details.address} onChange={e => setDetails({...details, address: e.target.value})} required className="bg-white" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>City *</Label>
                  <Input value={details.city} onChange={e => setDetails({...details, city: e.target.value})} required className="bg-white" />
                </div>
                <div className="space-y-2">
                  <Label>Postcode *</Label>
                  <Input value={details.postcode} onChange={e => setDetails({...details, postcode: e.target.value})} required className="bg-white" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                 <div className="space-y-2">
                  <Label>Property Type</Label>
                  <Select value={details.propertyType} onValueChange={(v: string) => setDetails({...details, propertyType: v})}>
                    <SelectTrigger className="bg-white"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Floors</Label>
                  <Select value={details.floors} onValueChange={(v: string) => setDetails({...details, floors: v})}>
                    <SelectTrigger className="bg-white"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Floor</SelectItem>
                      <SelectItem value="2">2 Floors</SelectItem>
                      <SelectItem value="3">3 Floors</SelectItem>
                      <SelectItem value="4">4+ Floors</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2 pt-2">
                <Label>Additional Notes & Special Requirements</Label>
                <textarea 
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Any specific instructions, parking details, or special cleaning requests?"
                  value={details.customerNotes} 
                  onChange={e => setDetails({...details, customerNotes: e.target.value})} 
                />
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t bg-gray-50 -mx-6 md:-mx-8 -mb-6 md:-mb-8 p-6 md:p-8 rounded-b-xl flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Total to Pay (After Service)</p>
              <p className="text-2xl font-bold text-gray-900">£{isCustom ? customDetails.budget || "0" : selectedService?.base_price}</p>
            </div>
            <div className="text-right text-sm text-gray-500">
              <p>{isCustom ? customDetails.name : selectedService?.name}</p>
              <p>{date ? format(date, "MMM do, yyyy") : ''} at {selectedSlot?.start_time.substring(0, 5)}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        {step > 1 ? (
          <Button variant="outline" onClick={() => { setStep((prev) => (prev - 1) as Step); setError(""); }}>
            <ChevronLeft className="w-4 h-4 mr-2" /> Back
          </Button>
        ) : <div></div>}
        
        <Button onClick={nextStep} disabled={loading} className="px-8 bg-primary hover:bg-primary/90 text-white rounded-full shadow-md">
          {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {step === 3 ? "Confirm Booking" : "Continue"} {!loading && step < 3 && <ChevronRight className="w-4 h-4 ml-2" />}
        </Button>
      </div>
    </div>
  );
}
