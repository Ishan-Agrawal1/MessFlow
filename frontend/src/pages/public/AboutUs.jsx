export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
          About Us
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Simplifying mess fee management with a secure, transparent, and convenient digital system.
        </p>
      </div>

      {/* Welcome & Mission */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-card border border-border p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-foreground flex items-center gap-2">
            <span className="text-blue-500">👋</span> Welcome to Madhav Namkeen
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Madhav Namkeen is a modern mess management platform designed to simplify monthly fee collection, payment tracking, and communication between students and the mess administration.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Our goal is to replace manual registers and cash handling with a secure, transparent, and convenient digital system.
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-sky-500 p-8 rounded-2xl shadow-lg text-white">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="bg-white/20 p-2 rounded-lg">🎯</span> Our Mission
          </h2>
          <p className="text-white/90 leading-relaxed text-lg">
            Our mission is to provide a simple, reliable, and transparent platform that makes mess fee management easier for both students and administrators while ensuring a smooth payment experience.
          </p>
        </div>
      </div>

      {/* Offerings & Benefits */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-card border-l-4 border-l-sky-500 border-border p-8 rounded-r-2xl shadow-sm">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">What We Offer</h2>
          <ul className="space-y-3">
            {[
              "Secure online fee payments",
              "Monthly due tracking",
              "Digital payment history",
              "Instant payment confirmation",
              "Downloadable payment receipts",
              "Important notices and announcements",
              "Student profile management"
            ].map((item, idx) => (
              <li key={idx} className="flex items-center gap-3 text-muted-foreground">
                <div className="h-2 w-2 rounded-full bg-sky-500 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-card border-l-4 border-l-emerald-500 border-border p-8 rounded-r-2xl shadow-sm">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">Why Choose Madhav Namkeen?</h2>
          <ul className="space-y-3">
            {[
              "Transparent payment records",
              "Secure online transactions",
              "Easy access to payment history",
              "Mobile-friendly interface",
              "Fast and convenient fee payments",
              "Centralized student management"
            ].map((item, idx) => (
              <li key={idx} className="flex items-center gap-3 text-muted-foreground">
                <div className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-muted/30 border border-border p-8 rounded-2xl text-center max-w-2xl mx-auto mt-12">
        <h2 className="text-2xl font-semibold mb-3 text-foreground">Contact</h2>
        <p className="text-muted-foreground">
          For any queries related to mess services or payments, please contact the mess administration using the details provided on the Contact Us page.
        </p>
      </div>
    </div>
  );
}
