"use client";

import { useActionState, useEffect } from "react";
import { forgotPasswordAction } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { toast } from "sonner";

const initialState = {
  success: false,
  message: "",
  errors: {} as Record<string, string[]>,
};

export function ForgotPasswordForm() {
  const [state, formAction, isPending] = useActionState(forgotPasswordAction, initialState);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
      } else if (!state.errors) {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <Card className="w-full max-w-3xl shadow-ambient border-none rounded-[2.5rem] mx-auto overflow-hidden bg-white space-y-8">
      <div className="w-full p-4 md:p-8 pb-6">
        <CardHeader className="space-y-6 text-center pb-12 p-0 mb-8">
          <CardTitle className="text-display-md text-primary font-bold leading-tight">
            Forgot Your <br /> Password?
          </CardTitle>
          <CardDescription className="text-on-surface-variant text-body-md leading-relaxed max-w-xs mx-auto">
            Enter your email address and we'll send you a link to reset your password and restore your access.
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
                placeholder="evelyn@lumina.travel" 
                required 
                className={`h-16 rounded-[1.25rem] border-none bg-surface-container-low px-8 text-body-md placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-primary/10 transition-all ${state.errors?.email ? 'ring-2 ring-red-500' : ''}`}
              />
              {state.errors?.email && <p className="text-xs text-red-500 ml-1">{state.errors.email[0]}</p>}
            </div>
          </CardContent>

          <Button 
            type="submit" 
            className="w-full rounded-[1.25rem] h-16 bg-[#131b2e] hover:bg-[#1e293b] text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all cursor-pointer" 
            disabled={isPending}
          >
            {isPending ? "Sending Link..." : "Send Reset Link"}
          </Button>
        </form>
      </div>

      <CardFooter className="bg-white py-8 text-center border-t border-surface-container flex justify-center p-0 mb-6">
        <p className="text-sm text-on-surface-variant">
          Remembered your password?{" "}
          <Link href="/login" className="text-primary font-bold hover:underline decoration-2 underline-offset-4 transition-all">
            Back to login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
