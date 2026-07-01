import { useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { studentApi } from '@/api/studentApi';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PasswordField } from '@/components/forms/PasswordField';
import { Key } from 'lucide-react';
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

export default function ChangePassword() {
  const user = useAppSelector((state) => state.auth.user);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  if (!user) return null;

  const onSubmitPasswordChange = async (data) => {
    try {
      const response = await studentApi.updateProfile({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
      if (response.success) {
        toast.success('Password changed successfully');
        reset();
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
        <h1 className="text-3xl font-bold tracking-tight">Change Password</h1>
        <p className="text-muted-foreground">Update your account security settings.</p>
      </div>

      <Card className="max-w-xl border-0 shadow-lg">
        <CardHeader className="border-b bg-muted/30 pb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
              <Key className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg">Security Settings</CardTitle>
              <CardDescription>Ensure your account is using a long, random password to stay secure.</CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmitPasswordChange)} className="space-y-4">
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
            <div className="pt-4">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 h-12 text-md"
              >
                {isSubmitting ? 'Saving...' : 'Update Password'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
