import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';

const features = [
  {
    icon: '💳',
    title: 'Secure Online Payments',
    description:
      'Pay your mess fees securely via Razorpay — UPI, cards, net banking, and wallets supported.',
  },
  {
    icon: '📊',
    title: 'Monthly Due Tracking',
    description:
      'View your current dues, payment status, and upcoming fee cycles at a glance.',
  },
  {
    icon: '🧾',
    title: 'Digital Receipts',
    description:
      'Get instant payment confirmations and downloadable receipts delivered to your email.',
  },
  {
    icon: '📢',
    title: 'Notices & Announcements',
    description:
      'Stay updated with important mess announcements, schedule changes, and admin notices.',
  },
  {
    icon: '👤',
    title: 'Student Profiles',
    description:
      'Manage your profile, view your complete payment history, and track all transactions.',
  },
  {
    icon: '🔒',
    title: 'Safe & Transparent',
    description:
      'All payment records are digitally maintained for full transparency and accountability.',
  },
];

const steps = [
  { step: '01', title: 'Sign In', description: 'Log in with your Student ID or email.' },
  { step: '02', title: 'View Dues', description: "Check your current month's mess fee status." },
  { step: '03', title: 'Pay Online', description: 'Pay securely through Razorpay in seconds.' },
  { step: '04', title: 'Get Receipt', description: 'Receive instant confirmation & email receipt.' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ───────── Hero Section ───────── */}
      <section className="relative overflow-hidden">
        {/* Animated gradient blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-sky-500/15 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: '1s' }}
          />
          <div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: '2s' }}
          />
        </div>

        <div className="container mx-auto px-4 pt-20 pb-24 md:pt-28 md:pb-32 relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
            {/* Logo */}
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl scale-150" />
              <img
                src={logo}
                alt="Madhav Namkeen Logo"
                className="h-24 w-auto relative drop-shadow-xl"
              />
            </div>

            {/* Title */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
                <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-blue-600 bg-clip-text text-transparent">
                  Madhav Namkeen
                </span>
              </h1>
              <p className="text-xl sm:text-2xl font-medium text-muted-foreground">
                Mess Fee Management, Simplified.
              </p>
            </div>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              A modern, secure platform for mess fee collection and management.
              Pay your monthly mess fees online, track your payment history, download receipts,
              and stay updated — all from one place.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:-translate-y-0.5"
              >
                Student Login
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-base font-semibold rounded-xl border border-border bg-card hover:bg-muted transition-all duration-300 text-foreground"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ───────── Features Section ───────── */}
      <section className="py-20 md:py-28 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-500">
              Everything you need
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              What We Offer
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A complete digital solution for hassle-free mess fee management for students and administrators.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group bg-card border border-border rounded-2xl p-7 hover:shadow-xl hover:shadow-blue-500/5 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-blue-500 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── How It Works ───────── */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <p className="text-sm font-semibold uppercase tracking-widest text-sky-500">
              Simple process
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              How It Works
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {steps.map((item, idx) => (
              <div key={idx} className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-blue-500/20">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── About / Trust Section ───────── */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-2xl p-8 space-y-4">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <span className="text-blue-500">🏢</span> About Madhav Namkeen
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Madhav Namkeen is a trusted mess service provider based in Neemuch, Madhya Pradesh.
                We provide quality, hygienic food to students at affordable prices, managed by
                Proprietor Manoj Kumar Agrawal.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This platform — <strong className="text-foreground">Mess Flow</strong> — is our
                digital initiative to make fee collection seamless and transparent for everyone.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-sky-500 rounded-2xl p-8 text-white space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <span className="bg-white/20 p-2 rounded-lg">📍</span> Contact Us
              </h2>
              <div className="space-y-3 text-white/90">
                <p>
                  <strong className="text-white">Address:</strong><br />
                  91A, Hanuman Nagar, Baghana<br />
                  Neemuch, MP 458441
                </p>
                <p>
                  <strong className="text-white">Email:</strong><br />
                  madhavnamkeen.business@gmail.com
                </p>
                <p>
                  <strong className="text-white">Phone:</strong><br />
                  +91 96170 19771
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Final CTA ───────── */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center bg-card border border-border rounded-2xl p-10 shadow-sm space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Ready to pay your mess fees?
            </h2>
            <p className="text-muted-foreground">
              Login with your Student ID or email to view your dues and make a payment.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-8 py-3 text-base font-semibold rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25 hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
              >
                Student Login
              </Link>
              <Link
                to="/admin/login"
                className="inline-flex items-center gap-2 px-8 py-3 text-base font-semibold rounded-xl border border-border bg-card hover:bg-muted transition-all duration-300 text-foreground"
              >
                Admin Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
