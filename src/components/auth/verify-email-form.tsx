"use client";

import { useActionState, useEffect } from "react";
import { verifyEmailAction } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

const initialState = {
  success: false,
  message: "",
  errors: {} as Record<string, string[]>,
};

export function VerifyEmailForm() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [state, formAction, isPending] = useActionState(verifyEmailAction, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
        router.push("/login");
      } else if (!state.errors) {
        toast.error(state.message);
      }
    }
  }, [state, router]);

  return (
    <Card className="w-full max-w-3xl shadow-ambient border-none rounded-[2.5rem] mx-auto overflow-hidden bg-white space-y-8">
      <div className="w-full p-4 md:p-8 pb-6">
        <CardHeader className="space-y-6 text-center pb-12 p-0 mb-8">
          <CardTitle className="text-display-md text-primary font-bold leading-tight">
            Verify Your <br /> Email
          </CardTitle>
          <CardDescription className="text-on-surface-variant text-body-md leading-relaxed max-w-xs mx-auto">
            We've sent a 4-digit verification code to your email. Please enter it below to activate your account.
          </CardDescription>
        </CardHeader>
        
        <form action={formAction} className="space-y-8 p-0">
          <CardContent className="space-y-8 p-0">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-bold text-primary ml-1">Email Address</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                defaultValue={email}
                required 
                className={`h-16 rounded-[1.25rem] border-none bg-surface-container-low px-8 text-body-md placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-primary/10 transition-all ${state.errors?.email ? 'ring-2 ring-red-500' : ''}`}
              />
              {state.errors?.email && <p className="text-xs text-red-500 ml-1">{state.errors.email[0]}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="otp" className="text-sm font-bold text-primary ml-1">Verification Code (OTP)</Label>
              <Input 
                id="otp" 
                name="otp" 
                placeholder="1234" 
                required 
                maxLength={6}
                className={`h-16 rounded-[1.25rem] border-none bg-surface-container-low px-8 text-body-md text-center tracking-[1em] font-bold placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-primary/10 transition-all ${state.errors?.otp ? 'ring-2 ring-red-500' : ''}`}
              />
              {state.errors?.otp && <p className="text-xs text-red-500 ml-1">{state.errors.otp[0]}</p>}
            </div>
          </CardContent>

          <Button 
            type="submit" 
            className="w-full rounded-[1.25rem] h-16 bg-[#131b2e] hover:bg-[#1e293b] text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all cursor-pointer" 
            disabled={isPending}
          >
            {isPending ? "Verifying..." : "Verify Email"}
          </Button>
        </form>
      </div>

      <CardFooter className="bg-white py-8 text-center border-t border-surface-container flex justify-center p-0 mb-6">
        <p className="text-sm text-on-surface-variant">
          Didn't receive a code? <button className="text-primary font-bold hover:underline decoration-2 underline-offset-4 transition-all">Resend Code</button>
        </p>
      </CardFooter>
    </Card>
  );
}
