import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { studentApi } from '@/api/studentApi';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { InputField } from '@/components/forms/InputField';
import { toast } from 'sonner';
import { UserPlus } from 'lucide-react';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  studentId: z.string().min(3, 'Student ID is required'),
  batch: z.coerce.number().int().min(2000).max(2100),
});

export default function RegisterStudent() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      batch: new Date().getFullYear(),
    }
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await studentApi.registerStudent(data);
      if (response.success) {
        toast.success(response.message || 'Student registered successfully!');
        navigate('/admin/students');
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to register student');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-md shadow-indigo-500/20">
            <UserPlus className="h-5 w-5 text-white" />
          </div>
          Register Student
        </h1>
        <p className="text-muted-foreground">Add a new student to the mess management system.</p>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Student Details</CardTitle>
          <CardDescription>Enter the student's personal and academic information.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InputField
                label="Full Name"
                placeholder="John Doe"
                {...register('name')}
                error={errors.name}
              />
              <InputField
                label="Student ID"
                placeholder="e.g. STU123"
                {...register('studentId')}
                error={errors.studentId}
              />
              <InputField
                label="Email Address"
                type="email"
                placeholder="student@example.com"
                {...register('email')}
                error={errors.email}
              />
              <InputField
                label="Batch (Year)"
                type="number"
                {...register('batch')}
                error={errors.batch}
              />
            </div>
            
            <div className="pt-4 flex gap-4">
              <Button type="button" variant="outline" onClick={() => navigate('/admin/students')} disabled={isLoading}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-lg shadow-indigo-500/25"
              >
                {isLoading ? 'Registering...' : 'Register Student'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
