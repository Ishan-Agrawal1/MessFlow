import { useState } from 'react';

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy submit
    alert('Message sent!');
    setFormData({ name: '', email: '', subject: '', message: '' });
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">Name</label>
              <input
                type="text"
                required
                className="w-full bg-input border-border rounded-md p-2 focus:ring-2 focus:ring-ring outline-none text-text-primary"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
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
              ></textarea>
            </div>
            <button type="submit" className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary-hover transition-colors font-medium">
              Send Message
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
