import { useAuthStore } from '@/store/authStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Mail, Hash, BookOpen, Calendar, Shield } from 'lucide-react';
import { format } from 'date-fns';

export default function StudentProfile() {
  const { user } = useAuthStore();

  if (!user) return null;

  const profileFields = [
    { icon: Mail, label: 'Email Address', value: user.email },
    { icon: BookOpen, label: 'Batch', value: user.batch },
    { icon: Shield, label: 'Role', value: user.role, capitalize: true },
    { icon: Calendar, label: 'Account Created', value: user.createdAt ? format(new Date(user.createdAt), 'MMMM dd, yyyy') : 'N/A' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">Your personal information and account settings.</p>
      </div>

      <Card className="max-w-2xl border-0 shadow-lg overflow-hidden">
        <CardHeader className="pb-4 border-b bg-gradient-to-r from-blue-600 to-sky-500 text-white">
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
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100">
                    <field.icon className="h-3.5 w-3.5 text-blue-600" />
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
    </div>
  );
}
