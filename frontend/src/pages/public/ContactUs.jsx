import { useState } from 'react';
import { contactApi } from '@/api/contactApi';

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' }); // 'success' | 'error' | ''
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await contactApi.submit(formData);
      setStatus({ type: 'success', message: response.message || 'Message sent successfully!' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.message || 'Failed to send message. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-text-primary mb-4">Contact Us</h1>
        <p className="text-lg text-text-secondary">Have questions? We'd love to hear from you.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="bg-card border border-border p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-6 text-text-primary">Send us a Message</h2>

          {/* Status Messages */}
          {status.type === 'success' && (
            <div className="mb-4 p-3 rounded-md bg-green-500/10 border border-green-500/30 text-green-400 text-sm">
              ✅ {status.message}
            </div>
          )}
          {status.type === 'error' && (
            <div className="mb-4 p-3 rounded-md bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              ❌ {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Name</label>
              <input
                type="text"
                required
                className="w-full bg-input border-border rounded-md p-2 focus:ring-2 focus:ring-ring outline-none text-text-primary"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Email</label>
              <input
                type="email"
                required
                className="w-full bg-input border-border rounded-md p-2 focus:ring-2 focus:ring-ring outline-none text-text-primary"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Subject</label>
              <input
                type="text"
                required
                className="w-full bg-input border-border rounded-md p-2 focus:ring-2 focus:ring-ring outline-none text-text-primary"
                value={formData.subject}
                onChange={e => setFormData({ ...formData, subject: e.target.value })}
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Message</label>
              <textarea
                required
                rows={4}
                className="w-full bg-input border-border rounded-md p-2 focus:ring-2 focus:ring-ring outline-none text-text-primary"
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                disabled={isSubmitting}
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary-hover transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-text-primary mb-2">Madhav Namkeen</h3>
            <p className="text-text-secondary">Provding Best Quality Food in Neemuch</p>
            <p className="text-text-secondary">Proprieter : Manoj Kumar Agrawal</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-text-primary mb-2">Our Office</h3>
            <p className="text-text-secondary">91A, Hanuman Nagar, Baghana<br />Neemuch, MP 458441</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-text-primary mb-2">Contact Info</h3>
            <p className="text-text-secondary">Email: madhavnamkeen.business@gmail.com<br />Phone: +91 96170 19771</p>
          </div>

        </div>
      </div>
    </div>
  );
}
