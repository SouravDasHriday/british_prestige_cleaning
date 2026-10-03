import { Metadata } from "next";
import { BUSINESS } from "@/lib/constants";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { signup } from "@/app/actions/auth";
import { AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: `Create an Account | ${BUSINESS.name}`,
  description: `Sign up for a ${BUSINESS.name} account to easily book and manage cleaning services.`,
};

export default async function RegisterPage(props: { searchParams: Promise<{ error?: string }> }) {
  const searchParams = await props.searchParams;
  const error = searchParams?.error;
  return (
    <Card className="border-0 shadow-xl bg-white/50 backdrop-blur-xl">
      <CardHeader className="space-y-2 text-center pb-6">
        <CardTitle className="text-3xl font-bold">Create an account</CardTitle>
        <CardDescription className="text-base">
          Enter your details below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="bg-destructive/10 p-3 rounded-md flex items-center gap-2 text-destructive text-sm font-medium mb-6">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}
        <form action={signup} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input 
                id="firstName" 
                name="firstName"
                placeholder="John" 
                required 
                className="bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input 
                id="lastName" 
                name="lastName"
                placeholder="Doe" 
                required 
                className="bg-white"
              />
            </div>
          </div>
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
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              name="password"
              type="password"
              placeholder="Create a strong password" 
              required 
              minLength={6}
              className="bg-white"
            />
          </div>
          
          <Button type="submit" className="w-full text-base h-12 bg-primary hover:bg-primary/90 mt-2">
            Create Account
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <Link href="/terms-and-conditions" className="underline underline-offset-4 hover:text-primary">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy-policy" className="underline underline-offset-4 hover:text-primary">
            Privacy Policy
          </Link>
          .
        </div>

        <div className="mt-8 text-center text-sm">
          <span className="text-muted-foreground">Already have an account? </span>
          <Link href="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
