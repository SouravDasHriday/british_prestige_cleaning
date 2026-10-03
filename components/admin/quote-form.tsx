"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { provideQuote } from "@/app/actions/admin";
import { Loader2, Send } from "lucide-react";

export default function QuoteForm({ bookingId, currentPrice, status }: { bookingId: string, currentPrice: number, status: string }) {
  const [price, setPrice] = useState(currentPrice.toString());
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!price || isNaN(Number(price))) return;
    setLoading(true);
    try {
      await provideQuote(bookingId, Number(price));
    } catch (err) {
      console.error(err);
      alert("Failed to send quote");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label className="text-slate-500 mb-1 block text-sm">Base Estimate</Label>
        <p className="text-2xl font-bold text-slate-300 line-through">£{currentPrice}</p>
      </div>
      
      <div className="space-y-2">
        <Label className="text-slate-900 font-semibold">Final Quote Price (£)</Label>
        <Input 
          type="number" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          className="text-lg font-bold bg-white"
          disabled={status === 'QUOTE_PROVIDED' || loading}
        />
      </div>

      <Button 
        onClick={handleSubmit} 
        disabled={status === 'QUOTE_PROVIDED' || loading}
        className="w-full bg-slate-900 hover:bg-slate-800 text-white"
      >
        {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
        {status === 'QUOTE_PROVIDED' ? 'Quote Sent' : 'Send Quote'}
      </Button>
      
      {status === 'QUOTE_PROVIDED' && (
        <p className="text-xs text-center text-slate-500 mt-2">Waiting for customer approval...</p>
      )}
    </div>
  );
}
