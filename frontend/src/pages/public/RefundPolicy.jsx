export default function RefundPolicy() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold text-text-primary mb-8 text-center">Refund Policy</h1>
      
      <div className="bg-card border border-border p-8 rounded-lg shadow-sm prose prose-slate max-w-none dark:prose-invert">
        <p className="text-text-secondary mb-6">Last updated: {new Date().toLocaleDateString()}</p>
        
        <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">1. General Refund Rules</h2>
        <p className="text-text-secondary mb-4">Mess fees once paid are generally non-refundable. However, exceptions may be made under specific circumstances such as withdrawal from the institution or medical emergencies.</p>

        <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">2. Excess Payments</h2>
        <p className="text-text-secondary mb-4">If an excess payment is made due to technical errors or double deductions, the excess amount will be adjusted against future dues or refunded upon verification by the administration.</p>

        <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">3. Leave of Absence</h2>
        <p className="text-text-secondary mb-4">Refunds or adjustments for periods of absence will only be processed if prior written approval was obtained from the designated authorities in accordance with the institution's leave policy.</p>

        <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">4. Process for Refund Claim</h2>
        <p className="text-text-secondary mb-4">To request a refund, students must submit a formal application to the mess administration through the designated channel. The request will be reviewed, and if approved, processed within 14-21 business days.</p>
        
        <h2 className="text-2xl font-semibold text-text-primary mt-8 mb-4">5. Contact for Disputes</h2>
        <p className="text-text-secondary mb-4">For any payment-related disputes or to follow up on a refund request, please contact the administration office or email madhavnamkeen.business@gmail.com.</p>
      </div>
    </div>
  );
}
