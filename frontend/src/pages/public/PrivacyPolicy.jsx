export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold text-text-primary mb-8 text-center">Privacy Policy</h1>

      <div className="bg-card border border-border p-8 rounded-lg shadow-sm prose prose-slate max-w-none dark:prose-invert">
        <p className="text-text-secondary mb-6">Last updated: {new Date().toLocaleDateString()}</p>

        <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">1. Information We Collect</h2>
        <p className="text-text-secondary mb-4">We collect information that you provide directly to us, including your name, email address, student ID, and payment information when you use our mess management services.</p>

        <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">2. How We Use Your Information</h2>
        <p className="text-text-secondary mb-4">We use the information we collect to operate, maintain, and improve our services, process transactions, send notices, and communicate with you about your account.</p>

        <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">3. Information Sharing</h2>
        <p className="text-text-secondary mb-4">We do not sell or rent your personal information to third parties. We may share your information with service providers who assist us in operating our platform, such as payment processors.</p>

        <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">4. Data Security</h2>
        <p className="text-text-secondary mb-4">We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.</p>

        <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">5. Contact Us</h2>
        <p className="text-text-secondary mb-4">If you have any questions about this Privacy Policy, please contact us at madhavnamkeen.business@gmail.com</p>
      </div>
    </div>
  );
}
