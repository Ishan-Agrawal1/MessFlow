import { Link } from 'react-router-dom';

export default function GlobalFooter() {
  return (
    <footer className="border-t border-border bg-card/80 backdrop-blur-sm py-6 mt-auto">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Madhav Namkeen. All rights reserved.
        </p>
        <nav className="flex items-center gap-4 md:gap-6 flex-wrap justify-center">
          <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link>
          <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact Us</Link>
          <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms & Conditions</Link>
          <Link to="/refund-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Refund Policy</Link>
        </nav>
      </div>
    </footer>
  );
}
