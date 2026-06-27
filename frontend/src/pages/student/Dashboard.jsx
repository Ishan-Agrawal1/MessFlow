import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '@/api/dashboardApi';
import { useAuthStore } from '@/store/authStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/common/Loader';
import { ErrorState } from '@/components/common/ErrorState';
import { CreditCard, CalendarDays, Bell, AlertCircle, CheckCircle2, History, TrendingUp, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export default function StudentDashboard() {
  const { user } = useAuthStore();

  const { data: response, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['studentDashboard'],
    queryFn: dashboardApi.getStudentDashboard,
  });

  if (isLoading) return <Loader className="mt-20" />;
  if (isError) return <ErrorState message={error.message} onRetry={refetch} />;

  const { currentDue, paymentStatus, recentPayments, activeNotices } = response?.data || {};

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-sky-600 p-6 text-white shadow-xl">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
            <Utensils className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Hello, {user?.name} 👋</h1>
            <p className="text-white/80 mt-1">Here is your mess summary for this month.</p>
          </div>
        </div>
      </div>

      {/* Due Status Card */}
      <Card className="shadow-lg border-0 overflow-hidden" style={{ borderLeft: '4px solid hsl(var(--primary))' }}>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-blue-600" />
              Current Due Status
            </span>
            {paymentStatus === 'PAID' ? (
              <span className="flex items-center text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
                <CheckCircle2 className="w-4 h-4 mr-1" /> Paid
              </span>
            ) : paymentStatus === 'OVERDUE' ? (
              <span className="flex items-center text-sm font-semibold text-red-600 bg-red-50 px-3 py-1.5 rounded-full">
                <AlertCircle className="w-4 h-4 mr-1" /> Overdue
              </span>
            ) : (
              <span className="flex items-center text-sm font-semibold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full">
                <CalendarDays className="w-4 h-4 mr-1" /> Pending
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentDue ? (
            <div className="space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">₹{currentDue.amount}</span>
                <span className="text-sm text-muted-foreground font-medium">
                  {MONTH_NAMES[(currentDue.feeCycle.month || 1) - 1]} {currentDue.feeCycle.year} — due by {format(new Date(currentDue.feeCycle.dueDate), 'MMM dd, yyyy')}
                </span>
              </div>

              {paymentStatus !== 'PAID' && (
                <Button asChild className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/25" size="lg">
                  <Link to="/student/pay">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Pay Now
                  </Link>
                </Button>
              )}
            </div>
          ) : (
            <div className="py-4 text-muted-foreground flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              No pending dues for the current cycle.
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Notices */}
        <Card className="shadow-md border-0 hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100">
                <Bell className="h-4 w-4 text-amber-600" />
              </div>
              Active Notices
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activeNotices && activeNotices.length > 0 ? (
              <div className="space-y-4">
                {activeNotices.map((notice) => (
                  <div key={notice._id} className="border-l-4 border-amber-400 bg-amber-50/50 rounded-r-lg pl-4 pr-3 py-3">
                    <h4 className="font-semibold text-sm">{notice.title}</h4>
                    <p className="text-sm text-foreground mt-1 whitespace-pre-wrap">{notice.description}</p>
                    <span className="text-xs text-foreground block mt-2">
                      {format(new Date(notice.createdAt), 'MMM dd, yyyy')}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-6">No active notices at the moment.</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="shadow-md border-0 hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                <History className="h-4 w-4 text-blue-600" />
              </div>
              Recent Payments
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentPayments && recentPayments.length > 0 ? (
              <div className="space-y-4">
                {recentPayments.map((payment) => (
                  <div key={payment._id} className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0">
                    <div>

                      <p className="font-medium text-sm">
                        {format(new Date(payment.createdAt), 'MMM dd, yyyy • hh:mm a')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-emerald-600">+₹{payment.amount}</p>
                      <p className="text-xs text-muted-foreground capitalize">{payment.status.toLowerCase()}</p>
                    </div>
                  </div>
                ))}
                <Button variant="link" asChild className="w-full mt-2 text-blue-600">
                  <Link to="/student/history">View all history</Link>
                </Button>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-6">No recent payments found.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
