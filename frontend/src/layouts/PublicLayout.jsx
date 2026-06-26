import { Outlet, Link } from 'react-router-dom';
import GlobalFooter from '@/components/common/GlobalFooter';
import logo from '@/assets/logo.png';

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Madhav Namkeen Logo" className="h-10 w-auto" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
              Madhav Namkeen
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">About Us</Link>
            <Link to="/contact" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Contact</Link>
            <Link to="/login" className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary-hover transition-colors">Login</Link>
          </nav>
        </div>
      </header>
      <main className="flex-grow">
        <Outlet />
      </main>
      <GlobalFooter />
    </div>
  );
}
