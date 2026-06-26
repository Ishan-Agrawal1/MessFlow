import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Home, History, CreditCard, User, LogOut, Bell, Key } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { authApi } from '@/api/authApi';
import { toast } from 'sonner';
import GlobalFooter from '@/components/common/GlobalFooter';
import logo from '@/assets/logo.png';

export default function StudentLayout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

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
    { name: 'Home', path: '/student/dashboard', icon: Home },
    { name: 'History', path: '/student/history', icon: History },
    { name: 'Pay Dues', path: '/student/pay', icon: CreditCard },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background pb-16 md:pb-0">
      {/* Top Header */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-card px-4 shadow-sm md:h-16 md:px-6">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 font-bold text-lg">
            <img src={logo} alt="Madhav Namkeen Logo" className="h-8 w-auto" />
            <span className="text-foreground">Madhav Namkeen</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 text-sm font-medium transition-colors ${isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                  }`
                }
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3 md:gap-4">
          <button
            onClick={() => navigate('/student/change-password')}
            className="flex flex-col items-center justify-center gap-0.5 px-2 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Change Password"
          >
            <Key className="h-5 w-5" />
            <span className="text-[10px] font-medium leading-none">Change Password</span>
          </button>
          <button className="relative text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
            <Bell className="h-5 w-5" />
          </button>
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-600 to-sky-500 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-blue-500/20">
            <NavLink key='profile'
              to='/student/profile'
              className={({ isActive }) =>
                `flex items-center gap-2 text-sm font-medium transition-colors ${isActive
                  ? 'text-white'
                  : 'text-white hover:text-black'
                }`
              }
            >
              <User className="h-4 w-4" />
            </NavLink>
          </div>
          <button onClick={handleLogout} className="text-muted-foreground hover:text-red-500 transition-colors">
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-4xl">
          <Outlet />
        </div>
        {/* Global Footer — visible on all screens, sits above bottom nav on mobile */}
        <div className="mt-8">
          <GlobalFooter />
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t bg-card/95 backdrop-blur-md pb-safe md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <ul className="flex h-16 items-center justify-around px-2">
          {navItems.map((item) => (
            <li key={item.name} className="flex-1">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center gap-1 py-2 text-xs font-medium transition-all duration-200 ${isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className={`p-1.5 rounded-xl transition-all duration-200 ${isActive ? 'bg-blue-100' : ''}`}>
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span>{item.name}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
