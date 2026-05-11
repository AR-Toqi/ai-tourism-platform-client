import { FileText, CheckCircle2, AlertTriangle, Scale, UserCheck, ShieldAlert } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="container py-24 max-w-4xl animate-in fade-in duration-1000">
      <div className="space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-slate-100 pb-12">
          <h1 className="text-display-md font-black text-slate-900">Terms & Conditions</h1>
          <p className="text-slate-500 font-medium">Last Updated: May 11, 2026</p>
        </div>

        {/* Content */}
        <div className="space-y-16">
          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl text-primary">
                <FileText className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">1. Agreement to Terms</h2>
            </div>
            <p className="text-slate-600 leading-relaxed text-lg font-medium">
              By accessing or using Wandr Travels, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to all of these terms, do not use the Service.
            </p>
          </section>

          <section className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-xl text-blue-500">
                <UserCheck className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">2. User Accounts</h2>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {[
                {
                  title: "Account Responsibility",
                  desc: "You are responsible for maintaining the confidentiality of your account and password."
                },
                {
                  title: "Accuracy of Info",
                  desc: "You must provide accurate and complete information when creating an account."
                }
              ].map((item, i) => (
                <div key={i} className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-start gap-6">
                  <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-bold text-slate-800 text-xl">{item.title}</h3>
                    <p className="text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-50 rounded-xl text-amber-500">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">3. AI-Generated Content</h2>
            </div>
            <p className="text-slate-600 leading-relaxed font-medium text-lg">
              Our service uses AI to generate travel itineraries. While we strive for accuracy, these itineraries are provided for informational purposes only. You should verify all details, including bookings, travel requirements, and safety conditions, independently.
            </p>
          </section>

          <section className="space-y-6 p-10 bg-slate-50 rounded-[3rem] border border-slate-200 shadow-inner">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-900 rounded-xl text-white">
                <Scale className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">4. Limitation of Liability</h2>
            </div>
            <p className="text-slate-600 leading-relaxed font-medium">
              Wandr Travels shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>
          </section>

          <section className="space-y-6">
             <div className="flex items-center gap-4">
              <div className="p-3 bg-red-50 rounded-xl text-red-500">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">5. Termination</h2>
            </div>
            <p className="text-slate-600 leading-relaxed font-medium">
              We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
