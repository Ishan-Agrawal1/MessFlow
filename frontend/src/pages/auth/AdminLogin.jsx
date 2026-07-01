import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { authApi } from '@/api/authApi';
import { useAppDispatch } from '@/store/hooks';
import { setAuth, logout } from '@/store/authSlice';
import { InputField } from '@/components/forms/InputField';
import { PasswordField } from '@/components/forms/PasswordField';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { toast } from 'sonner';
import logo from '@/assets/logo.png';
import { ShieldAlert } from 'lucide-react';

const adminLoginSchema = z.object({
  identifier: z.string().email('Admin Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function AdminLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(adminLoginSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await authApi.login(data);
      if (response.success && response.data?.user) {
        if (response.data.user.role !== 'admin') {
          // If a student tries to log in through admin portal, deny them
          toast.error('Access denied. Admin privileges required.');
          dispatch(logout());
          return;
        }

        dispatch(setAuth(response.data.user));
        toast.success(response.message || 'Admin login successful!');
        navigate('/admin/dashboard');
      }
    } catch (error) {
      toast.error(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-slate-900">
      {/* Animated background blobs for admin */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-slate-700/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-red-900/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-slate-800/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <Card className="w-full max-w-md shadow-2xl border-0 bg-slate-800/90 text-slate-100 backdrop-blur-xl relative z-10" style={{ borderTop: '4px solid hsl(var(--destructive))' }}>
        <CardHeader className="space-y-3 text-center pb-2">
          <div className="mx-auto flex items-center justify-center bg-slate-900 p-3 rounded-full mb-2">
            <ShieldAlert className="h-10 w-10 text-red-500 drop-shadow-md" />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight text-white">
            Admin Portal
          </CardTitle>
          <CardDescription className="text-slate-400 text-base">Sign in with your administrator email</CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="text-slate-900">
              <InputField
                label={<span className="text-slate-200">Admin Email</span>}
                type="email"
                placeholder="admin@mess.com"
                {...register('identifier')}
                error={errors.identifier}
              />
            </div>
            <div className="text-slate-900">
              <PasswordField
                label={<span className="text-slate-200">Password</span>}
                placeholder="••••••••"
                {...register('password')}
                error={errors.password}
              />
            </div>
            <Button type="submit" variant="destructive" className="w-full mt-6 h-11 text-base font-semibold shadow-lg shadow-red-900/50 transition-all duration-300" disabled={isLoading}>
              {isLoading ? 'Authenticating...' : 'Secure Login'}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm text-slate-500">
            Unauthorized access is strictly prohibited.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
