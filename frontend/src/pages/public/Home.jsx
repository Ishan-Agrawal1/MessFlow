import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldHeart, faChartGantt, faReceipt, faBullhorn, faUser, faLock, faBuildingWheat, faLocationDot } from '@fortawesome/free-solid-svg-icons';

const features = [
  {
    icon: <FontAwesomeIcon icon={faShieldHeart} />,
    title: 'Secure Online Payments',
    description:
      'Pay your mess fees securely via Razorpay — UPI, cards, net banking, and wallets supported.',
  },
  {
    icon: <FontAwesomeIcon icon={faChartGantt} />,
    title: 'Monthly Due Tracking',
    description:
      'View your current dues, payment status, and upcoming fee cycles at a glance.',
  },
  {
    icon: <FontAwesomeIcon icon={faReceipt} />,
    title: 'Digital Receipts',
    description:
      'Get instant payment confirmations and downloadable receipts delivered to your email.',
  },
  {
    icon: <FontAwesomeIcon icon={faBullhorn} />,
    title: 'Notices & Announcements',
    description:
      'Stay updated with important mess announcements, schedule changes, and admin notices.',
  },
  {
    icon: <FontAwesomeIcon icon={faUser} />,
    title: 'Student Profiles',
    description:
      'Manage your profile, view your complete payment history, and track all transactions.',
  },
  {
    icon: <FontAwesomeIcon icon={faLock} />,
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
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* ───────── Hero Section ───────── */}
      <section className="relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
          <div className="absolute top-0 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 rounded-[100%] blur-3xl opacity-50" />
        </div>

        <div className="container mx-auto px-4 pt-24 pb-24 md:pt-32 md:pb-32 relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
            {/* Logo */}
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl scale-125" />
              <img
                src={logo}
                alt="Madhav Namkeen Logo"
                className="h-20 md:h-24 w-auto relative drop-shadow-sm"
              />
            </div>

            {/* Title */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground">
                Madhav Namkeen
              </h1>
              <p className="text-lg sm:text-xl font-medium text-muted-foreground">
                Mess Fee Management, Simplified.
              </p>
            </div>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              A clean, secure platform for mess fee collection and management.
              Pay your monthly mess fees online, track your payment history, download receipts,
              and stay updated — all from one place.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-8 py-3 text-sm font-medium rounded-full bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 transition-all duration-200"
              >
                Student Login
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-8 py-3 text-sm font-medium rounded-full border border-border bg-card hover:bg-accent transition-all duration-200 text-foreground shadow-sm"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Features Section ───────── */}
      <section className="py-20 md:py-28 relative bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Everything you need
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
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
                className="group bg-background border border-border rounded-2xl p-8 hover:bg-muted/50 hover:shadow-sm transition-all duration-300"
              >
                <div className="text-2xl text-primary mb-5">{feature.icon}</div>
                <h3 className="text-lg font-medium text-foreground mb-2">
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
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Simple process
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
              How It Works
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto relative">
            {steps.map((item, idx) => (
              <div key={idx} className="text-center space-y-4 relative z-10">
                <div className="mx-auto w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center text-foreground text-sm font-medium shadow-sm">
                  {item.step}
                </div>
                <h3 className="text-base font-medium text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
            {/* Subtle connecting line for desktop */}
            <div className="hidden lg:block absolute top-6 left-[10%] right-[10%] h-[1px] bg-border z-0" />
          </div>
        </div>
      </section>

      {/* ───────── About / Trust Section ───────── */}
      <section className="py-20 md:py-28 bg-card border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            <div className="bg-muted border border-border rounded-2xl p-8 space-y-4">
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-3">
                <span className="text-primary"><FontAwesomeIcon icon={faBuildingWheat} /></span> About Madhav Namkeen
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Madhav Namkeen is a trusted mess service provider based in Neemuch, Madhya Pradesh.
                We provide quality, hygienic food to students at affordable prices, managed by
                Proprietor Manoj Kumar Agrawal.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm">
                This platform — <strong className="text-foreground font-medium">Mess Flow</strong> — is our
                digital initiative to make fee collection seamless and transparent for everyone.
              </p>
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-8 text-foreground space-y-4 shadow-sm">
              <h2 className="text-xl font-semibold flex items-center gap-3">
                <span className="text-primary"><FontAwesomeIcon icon={faLocationDot} /></span> Contact Us
              </h2>
              <div className="space-y-4 text-muted-foreground text-sm mt-4">
                <p>
                  <strong className="text-foreground font-medium block mb-1">Address:</strong>
                  91A, Hanuman Nagar, Baghana<br />
                  Neemuch, MP 458441
                </p>
                <p>
                  <strong className="text-foreground font-medium block mb-1">Email:</strong>
                  madhavnamkeen.business@gmail.com
                </p>
                <p>
                  <strong className="text-foreground font-medium block mb-1">Phone:</strong>
                  +91 96170 19771
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Final CTA ───────── */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
              Ready to pay your mess fees?
            </h2>
            <p className="text-muted-foreground">
              Login with your Student ID or email to view your dues and make a payment.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-8 py-3 text-sm font-medium rounded-full bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 transition-all duration-200"
              >
                Student Login
              </Link>
              <Link
                to="/admin/login"
                className="inline-flex items-center gap-2 px-8 py-3 text-sm font-medium rounded-full border border-border bg-card hover:bg-accent transition-all duration-200 text-foreground shadow-sm"
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
