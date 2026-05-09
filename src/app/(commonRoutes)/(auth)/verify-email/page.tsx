import { VerifyEmailForm } from "@/components/auth/verify-email-form";
import { Suspense } from "react";

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <Suspense fallback={<div>Loading...</div>}>
        <VerifyEmailForm />
      </Suspense>
    </div>
  );
}
