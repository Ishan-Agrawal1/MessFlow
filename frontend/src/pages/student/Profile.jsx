import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { studentApi } from '@/api/studentApi';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { InputField } from '@/components/forms/InputField';
import { PasswordField } from '@/components/forms/PasswordField';
import { User, Mail, Hash, BookOpen, Calendar, Shield, Key } from 'lucide-react';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

const passwordSchema = z.object({
  oldPassword: z.string().min(6, 'Old password must be at least 6 characters'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Confirm password must be at least 6 characters'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function StudentProfile() {
  const { user } = useAuthStore();
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  if (!user) return null;

  const profileFields = [
    { icon: Mail, label: 'Email Address', value: user.email },
    { icon: BookOpen, label: 'Batch', value: user.batch },
    { icon: Shield, label: 'Role', value: user.role, capitalize: true },
    { icon: Calendar, label: 'Account Created', value: user.createdAt ? format(new Date(user.createdAt), 'MMMM dd, yyyy') : 'N/A' },
  ];

  const onSubmitPasswordChange = async (data) => {
    try {
      const response = await studentApi.updateProfile({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
      if (response.success) {
        toast.success('Password changed successfully');
        reset();
        setIsChangingPassword(false);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to change password');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">Your personal information and account settings.</p>
      </div>

      <Card className="max-w-2xl border-0 shadow-lg overflow-hidden">
        <CardHeader className="pb-4 border-b bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {user.name?.charAt(0)?.toUpperCase() || 'S'}
            </div>
            <div>
              <CardTitle className="text-2xl text-white">{user.name}</CardTitle>
              <CardDescription className="text-base mt-1 flex items-center gap-1 text-white/80">
                <Hash className="h-4 w-4" /> {user.studentId}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            {profileFields.map((field, idx) => (
              <div key={idx} className="sm:col-span-1">
                <dt className="text-sm font-medium text-muted-foreground flex items-center gap-2 mb-1">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-100">
                    <field.icon className="h-3.5 w-3.5 text-indigo-600" />
                  </div>
                  {field.label}
                </dt>
                <dd className={`text-sm font-semibold ml-9 ${field.capitalize ? 'capitalize' : ''}`}>
                  {field.value}
                </dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>

      <Card className="max-w-2xl border-0 shadow-lg">
        <CardHeader className="border-b bg-muted/30 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100">
                <Key className="h-4 w-4 text-indigo-600" />
              </div>
              <CardTitle className="text-lg">Security Settings</CardTitle>
            </div>
            {!isChangingPassword && (
              <Button variant="outline" size="sm" onClick={() => setIsChangingPassword(true)}>
                Change Password
              </Button>
            )}
          </div>
        </CardHeader>
        
        {isChangingPassword && (
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit(onSubmitPasswordChange)} className="space-y-4 max-w-sm">
              <PasswordField
                label="Current Password"
                {...register('oldPassword')}
                error={errors.oldPassword}
              />
              <PasswordField
                label="New Password"
                {...register('newPassword')}
                error={errors.newPassword}
              />
              <PasswordField
                label="Confirm New Password"
                {...register('confirmPassword')}
                error={errors.confirmPassword}
              />
              <div className="flex gap-3 pt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setIsChangingPassword(false);
                    reset();
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700"
                >
                  {isSubmitting ? 'Saving...' : 'Save Password'}
                </Button>
              </div>
            </form>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
