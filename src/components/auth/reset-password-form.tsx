"use client";

import { useActionState, useEffect, useState } from "react";
import { resetPasswordAction } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

const initialState = {
  success: false,
  message: "",
  errors: {} as Record<string, string[]>,
};

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [state, formAction, isPending] = useActionState(resetPasswordAction, initialState);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

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
            Secure Your <br /> Account
          </CardTitle>
          <CardDescription className="text-on-surface-variant text-body-md leading-relaxed max-w-xs mx-auto">
            Choose a strong new password to regain access to your Lumina Collective profile.
          </CardDescription>
        </CardHeader>
        
        <form action={formAction} className="space-y-8 p-0">
          <input type="hidden" name="token" value={token} />
          <CardContent className="space-y-8 p-0">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-bold text-primary ml-1">New Password</Label>
              <div className="relative">
                <Input 
                  id="password" 
                  name="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
                  required 
                  className={`h-16 rounded-[1.25rem] border-none bg-surface-container-low px-8 text-body-md placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-primary/10 transition-all pr-14 ${state.errors?.password ? 'ring-2 ring-red-500' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {state.errors?.password && <p className="text-xs text-red-500 ml-1">{state.errors.password[0]}</p>}
            </div>
          </CardContent>

          <Button 
            type="submit" 
            className="w-full rounded-[1.25rem] h-16 bg-[#131b2e] hover:bg-[#1e293b] text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all cursor-pointer" 
            disabled={isPending}
          >
            {isPending ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </div>

      <CardFooter className="bg-white py-8 text-center border-t border-surface-container flex justify-center p-0 mb-6">
        <p className="text-sm text-on-surface-variant">
          Need help? <Link href="/support" className="text-primary font-bold hover:underline decoration-2 underline-offset-4 transition-all">Contact Support</Link>
        </p>
      </CardFooter>
    </Card>
  );
}
