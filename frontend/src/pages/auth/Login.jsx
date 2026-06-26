import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { authApi } from '@/api/authApi';
import { useAuthStore } from '@/store/authStore';
import { InputField } from '@/components/forms/InputField';
import { PasswordField } from '@/components/forms/PasswordField';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { toast } from 'sonner';
import logo from '@/assets/logo.png';

const loginSchema = z.object({
  identifier: z.string().min(1, 'Student ID or Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await authApi.login(data);
      if (response.success && response.data?.user) {
        setAuth(response.data.user);
        toast.success(response.message || 'Login successful!');
        
        // Redirect based on role
        if (response.data.user.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/student/dashboard');
        }
      }
    } catch (error) {
      toast.error(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 login-bg">
      {/* Animated background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <Card className="w-full max-w-md shadow-2xl border-0 bg-card/80 backdrop-blur-xl relative z-10" style={{ borderTop: '4px solid hsl(var(--primary))' }}>
        <CardHeader className="space-y-3 text-center pb-2">
          <div className="mx-auto flex items-center justify-center">
            <img src={logo} alt="Madhav Namkeen Logo" className="h-16 w-auto drop-shadow-md" />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
            Madhav Namkeen
          </CardTitle>
          <CardDescription className="text-base">Sign in with your Student ID and password</CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <InputField
              label="Student ID or Email"
              type="text"
              placeholder="e.g. STU123 or admin@mess.com"
              {...register('identifier')}
              error={errors.identifier}
            />
            <PasswordField
              label="Password"
              placeholder="••••••••"
              {...register('password')}
              error={errors.password}
            />
            <Button type="submit" className="w-full mt-6 h-11 text-base font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/25 transition-all duration-300" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Default student password is <br/>
            <span className="font-mono bg-muted p-1.5 rounded-md text-xs mt-1 inline-block">{'[studentId]@messpassword'}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
