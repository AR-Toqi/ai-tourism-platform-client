"use server";

import { cookies } from "next/headers";
import { authService } from "@/services/auth.service";
import { redirect } from "next/navigation";
import z from "zod";
import { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema, verifyEmailSchema } from "@/lib/validations/auth.schema";

export interface AuthState {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  redirectTo?: string;
}

// ... other actions ...

export async function verifyEmailAction(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const rawData = Object.fromEntries(formData.entries());
  const validated = verifyEmailSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: z.flattenError(validated.error).fieldErrors,
    };
  }

  try {
    const response = await authService.verifyEmail(validated.data);
    if (response.success) {
      return { success: true, message: "Email verified successfully! You can now login." };
    } else {
      return { success: false, message: response.message || "Verification failed." };
    }
  } catch (error: any) {
    return { success: false, message: error.message || "Something went wrong." };
  }
}

export async function registerAction(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const rawData = Object.fromEntries(formData.entries());
  const validated = registerSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: z.flattenError(validated.error).fieldErrors,
    };
  }

  try {
    const response = await authService.register(validated.data);

    if (response.success) {
      return { success: true, message: "Registration successful! Please verify your email.", redirectTo: `/verify-email?email=${validated.data.email}` };
    } else {
      return { success: false, message: response.message || "Registration failed." };
    }
  } catch (error: any) {
    return { success: false, message: error.message || "Something went wrong." };
  }
}

export async function loginAction(prevState: any, formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  const validated = loginSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: z.flattenError(validated.error).fieldErrors,
    };
  }

  try {
    const response = await authService.login(validated.data);

    if (response.success && response.data) {
      const { accessToken, refreshToken } = response.data as any;
      const cookieStore = await cookies();

      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax" as const,
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 1 week
      };

      if (accessToken) cookieStore.set("accessToken", accessToken, cookieOptions);
      if (refreshToken) cookieStore.set("refreshToken", refreshToken, cookieOptions);
    }

    return {
      success: response.success,
      message: response.message || (response.success ? "Login successful!" : "Login failed."),
      errors: undefined
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Login failed.",
      errors: undefined
    };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  cookieStore.delete("better-auth.session_token");
  redirect("/login");
}

export async function forgotPasswordAction(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const rawData = Object.fromEntries(formData.entries());
  const validated = forgotPasswordSchema.safeParse(rawData);

  if (!validated.success) {
    console.log("Validation Failed:", z.flattenError(validated.error).fieldErrors);
    return {
      success: false,
      message: "Validation failed",
      errors: z.flattenError(validated.error).fieldErrors,
    };
  }

  try {
    const response = await authService.forgotPassword(validated.data.email);
    if (response.success) {
      return { success: true, message: "OTP sent to your email.", redirectTo: `/reset-password?email=${validated.data.email}` };
    } else {
      return { success: false, message: response.message || "Failed to send OTP." };
    }
  } catch (error: any) {
    return { success: false, message: error.message || "Something went wrong." };
  }
}

export async function resetPasswordAction(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const rawData = Object.fromEntries(formData.entries());
  const validated = resetPasswordSchema.safeParse(rawData);

  if (!validated.success) {
    console.log("Validation Failed:", z.flattenError(validated.error).fieldErrors);
    return {
      success: false,
      message: "Validation failed",
      errors: z.flattenError(validated.error).fieldErrors,
    };
  }

  try {
    const response = await authService.resetPassword(validated.data);
    if (response.success) {
      return { success: true, message: "Password reset successful! You can now login." };
    } else {
      return { success: false, message: response.message || "Failed to reset password." };
    }
  } catch (error: any) {
    return { success: false, message: error.message || "Something went wrong." };
  }
}
