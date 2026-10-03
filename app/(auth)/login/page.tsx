import { Metadata } from "next";
import { BUSINESS } from "@/lib/constants";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { login } from "@/app/actions/auth";
import { AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: `Login | ${BUSINESS.name}`,
  description: `Log in to your ${BUSINESS.name} account to manage your bookings.`,
};

export default async function LoginPage(props: { searchParams: Promise<{ error?: string }> }) {
  const searchParams = await props.searchParams;
  const error = searchParams?.error;
  return (
    <Card className="border-0 shadow-xl bg-white/50 backdrop-blur-xl">
      <CardHeader className="space-y-2 text-center pb-6">
        <CardTitle className="text-3xl font-bold">Welcome back</CardTitle>
        <CardDescription className="text-base">
          Enter your email to sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="bg-destructive/10 p-3 rounded-md flex items-center gap-2 text-destructive text-sm font-medium mb-6">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}
        <form action={login} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              name="email"
              type="email" 
              placeholder="name@example.com" 
              required 
              className="bg-white"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link 
                href="/reset-password" 
                className="text-sm font-medium text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <PasswordInput 
              id="password" 
              name="password"
              required 
            />
          </div>
          
          <Button type="submit" className="w-full text-base h-12 bg-primary hover:bg-primary/90">
            Sign In
          </Button>
        </form>

        <div className="mt-8 text-center text-sm">
          <span className="text-muted-foreground">Don't have an account? </span>
          <Link href="/register" className="font-medium text-primary hover:underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
