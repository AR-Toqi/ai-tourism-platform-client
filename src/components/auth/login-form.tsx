"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { loginAction } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ShieldCheck, User, UserCheck } from "lucide-react";
import { useAuth } from "@/providers/auth-provider";


const initialState = {
  success: false,
  message: "",
  errors: {} as Record<string, string[]>,
};

export function LoginForm() {
  const { refreshUser } = useAuth();
  const [state, formAction, isPending] = useActionState(loginAction, initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const router = useRouter();

  const [hasHandled, setHasHandled] = useState(false);

  useEffect(() => {
    if (state.message && !hasHandled) {
      if (state.success) {
        setHasHandled(true);
        toast.success(state.message);
        refreshUser().then((userData) => {
          if (userData?.role === "ADMIN") {
            router.push("/admin");
          } else if (userData?.role === "CONTENT_MANAGER") {
            router.push("/content-manager");
          } else {
            router.push("/");
          }
        });
      } else if (!state.errors) {
        toast.error(state.message);
      }
    }

    // Reset hasHandled when isPending starts (user clicks login again)
    if (isPending && hasHandled) {
      setHasHandled(false);
    }
  }, [state, router, refreshUser, hasHandled, isPending]);

  const handleDemoLogin = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    
    // Use a small timeout to ensure the state updates the input values before submission
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.requestSubmit();
      }
    }, 100);
  };



  return (
    <Card className="w-full max-w-3xl shadow-ambient border-none rounded-[2.5rem] mx-auto overflow-hidden bg-white space-y-8">
      <div className="w-full md:w-full p-4 md:p-8 pb-6">
        <CardHeader className="space-y-6 text-center pb-12 p-0 mb-8">
          <CardTitle className="text-display-md text-primary font-bold leading-tight">
            Welcome Back to <br /> Wandr Travels
          </CardTitle>
          <CardDescription className="text-on-surface-variant text-body-md leading-relaxed max-w-xs mx-auto">
            Re-enter the world's first AI-native luxury travel ecosystem and continue your journey.
          </CardDescription>
        </CardHeader>

        <form action={formAction} ref={formRef} className="space-y-8 p-0">
          <CardContent className="space-y-8 p-0">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-bold text-primary ml-1">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="evelyn@lumina.travel"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`h-16 rounded-[1.25rem] border-none bg-surface-container-low px-8 text-body-md placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-primary/10 transition-all ${state.errors?.email ? 'ring-2 ring-red-500' : ''}`}
              />
              {state.errors?.email && <p className="text-xs text-red-500 ml-1">{state.errors.email[0]}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <Label htmlFor="password" className="text-sm font-bold text-primary">Password</Label>
                <Link href="/forgot-password" title="Forgot Password" className="text-sm text-primary font-bold hover:underline decoration-2 underline-offset-4 cursor-pointer">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`h-16 rounded-[1.25rem] border-none bg-surface-container-low px-8 text-body-md placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-primary/10 transition-all pr-14 ${state.errors?.password ? 'ring-2 ring-red-500' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors cursor-pointer"
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
            {isPending ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="mt-8 space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500 font-medium">Demo Access</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleDemoLogin("clientwork1245@gmail.com", "rashed61990")}
              className="rounded-2xl border-slate-200 bg-slate-50/50 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 text-xs h-12 font-bold cursor-pointer group flex items-center gap-2"
              disabled={isPending}
            >
              <User className="w-4 h-4 text-primary group-hover:text-white" />
              <span>User</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleDemoLogin("abdullahragib1245@gmail.com", "manager61990")}
              className="rounded-2xl border-slate-200 bg-slate-50/50 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 text-xs h-12 font-bold cursor-pointer group flex items-center gap-2"
              disabled={isPending}
            >
              <UserCheck className="w-4 h-4 text-primary group-hover:text-white" />
              <span>Manager</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleDemoLogin("admin@wandr.ai.com", "admin61990")}
              className="rounded-2xl border-slate-200 bg-slate-50/50 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 text-xs h-12 font-bold cursor-pointer group flex items-center gap-2"
              disabled={isPending}
            >
              <ShieldCheck className="w-4 h-4 text-primary group-hover:text-white" />
              <span>Admin</span>
            </Button>
          </div>
        </div>
      </div>

      <CardFooter className="bg-white py-8 text-center border-t border-surface-container flex justify-center p-0 mb-6">
        <p className="text-sm text-on-surface-variant">
          Don't have an account?{" "}
          <Link href="/register" className="text-primary font-bold hover:underline decoration-2 underline-offset-4 cursor-pointer">
            Register here
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
