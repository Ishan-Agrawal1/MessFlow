import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  AlertTriangle, 
  CheckCircle, 
  CalendarDays, 
  MessageSquare, 
  CreditCard,
  Menu,
  LogOut,
  Bell,
  X
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { authApi } from '@/api/authApi';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import GlobalFooter from '@/components/common/GlobalFooter';
import logo from '@/assets/logo.png';

export default function AdminLayout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = async () => {
    try {
      await authApi.logout();
      logout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Students', path: '/admin/students', icon: Users },
    { name: 'Register Student', path: '/admin/students/register', icon: UserPlus },
    { name: 'Paid Students', path: '/admin/paid-students', icon: CheckCircle },
    { name: 'Defaulters', path: '/admin/defaulters', icon: AlertTriangle },
    { name: 'Payments', path: '/admin/payments', icon: CreditCard },
    { name: 'Fee Cycles', path: '/admin/fee-cycles', icon: CalendarDays },
    { name: 'Notices', path: '/admin/notices', icon: MessageSquare },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
          "sidebar-gradient text-white",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-6">
          <span className="text-lg font-bold tracking-tight flex items-center gap-2">
            <img src={logo} alt="Madhav Namkeen" className="h-8 w-auto brightness-0 invert" />
            <span className="text-white">Admin</span>
          </span>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-white/70 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="grid gap-1 px-3">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  onClick={() => window.innerWidth < 1024 && setIsSidebarOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                      isActive 
                        ? "bg-white/20 text-white shadow-lg shadow-black/10 backdrop-blur-sm" 
                        : "text-white/60 hover:bg-white/10 hover:text-white"
                    )
                  }
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="border-t border-white/10 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/60 hover:bg-red-500/20 hover:text-red-300 transition-all duration-200"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b bg-card px-4 shadow-sm md:px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden text-muted-foreground hover:text-foreground transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-semibold capitalize hidden sm:block text-foreground">
              {window.location.pathname.split('/').pop().replace('-', ' ')}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2 text-sm">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-600 to-sky-500 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20">
                {user?.name?.charAt(0)?.toUpperCase() || 'A'}
              </div>
              <span className="hidden md:inline font-medium">{user?.name || 'Admin'}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
          {/* Global Footer */}
          <div className="mt-8">
            <GlobalFooter />
          </div>
        </main>
      </div>
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
