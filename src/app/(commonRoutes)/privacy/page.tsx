import { Shield, Lock, Eye, FileText, Globe, Bell } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="container py-24 max-w-4xl animate-in fade-in duration-1000">
      <div className="space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-slate-100 pb-12">
          <h1 className="text-display-md font-black text-slate-900">Privacy Policy</h1>
          <p className="text-slate-500 font-medium">Last Updated: May 11, 2026</p>
        </div>

        {/* Content */}
        <div className="space-y-16">
          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl text-primary">
                <Shield className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Our Commitment</h2>
            </div>
            <p className="text-slate-600 leading-relaxed text-lg font-medium">
              At Wandr Travels, your privacy is our priority. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered tourism platform. We are committed to protecting your personal data and your right to privacy.
            </p>
          </section>

          <section className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 rounded-xl text-blue-500">
                <Eye className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Information We Collect</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-slate-50 rounded-[2rem] space-y-4 border border-slate-100">
                <h3 className="font-bold text-slate-800 text-xl">Personal Data</h3>
                <p className="text-slate-500 leading-relaxed font-medium">
                  We collect names, email addresses, and travel preferences to personalize your itineraries and manage your account.
                </p>
              </div>
              <div className="p-8 bg-slate-50 rounded-[2rem] space-y-4 border border-slate-100">
                <h3 className="font-bold text-slate-800 text-xl">Usage Data</h3>
                <p className="text-slate-500 leading-relaxed font-medium">
                  We collect information on how you interact with our AI assistant and which destinations you browse to improve our recommendations.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-50 rounded-xl text-emerald-500">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">How We Use Your Information</h2>
            </div>
            <ul className="space-y-4 list-none">
              {[
                "To provide and maintain our Service, including to monitor the usage of our Service.",
                "To manage Your Account: to manage Your registration as a user of the Service.",
                "To provide You with news, special offers and general information about other goods, services and events.",
                "To generate AI-powered travel itineraries tailored to your unique preferences."
              ].map((item, i) => (
                <li key={i} className="flex gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm font-medium text-slate-600">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="p-10 bg-slate-900 rounded-[3rem] text-white space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="flex items-center gap-4 relative z-10">
              <div className="p-3 bg-white/10 rounded-xl">
                <Globe className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Data Security</h2>
            </div>
            <p className="text-slate-300 leading-relaxed text-lg font-medium relative z-10">
              We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems.
            </p>
          </section>

          <section className="space-y-6">
             <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-50 rounded-xl text-amber-500">
                <Bell className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Updates to This Policy</h2>
            </div>
            <p className="text-slate-600 leading-relaxed font-medium">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
