export default function TermsConditions() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold text-text-primary mb-8 text-center">Terms & Conditions</h1>
      
      <div className="bg-card border border-border p-8 rounded-lg shadow-sm prose prose-slate max-w-none dark:prose-invert">
        <p className="text-text-secondary mb-6">Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">1. Acceptance of Terms</h2>
        <p className="text-text-secondary mb-4">By accessing and using Madhav Namkeen, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.</p>

        <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">2. User Responsibilities</h2>
        <p className="text-text-secondary mb-4">You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate and current information during registration.</p>

        <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">3. Payments and Dues</h2>
        <p className="text-text-secondary mb-4">All mess fee payments must be made by the stipulated deadlines. Failure to clear dues may result in late fees or suspension of mess privileges as determined by the administration.</p>

        <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">4. System Usage</h2>
        <p className="text-text-secondary mb-4">You agree not to misuse the Madhav Namkeen platform. This includes attempting to gain unauthorized access, disrupting the service, or using it for any illegal purposes.</p>
        
        <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">5. Modifications to Service</h2>
        <p className="text-text-secondary mb-4">We reserve the right to modify or discontinue the service at any time without prior notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance.</p>
      </div>
    </div>
  );
}
