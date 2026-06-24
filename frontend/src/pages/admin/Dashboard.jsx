import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '@/api/dashboardApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Loader } from '@/components/common/Loader';
import { ErrorState } from '@/components/common/ErrorState';
import { Users, CheckCircle, AlertTriangle, IndianRupee, TrendingUp, BarChart3 } from 'lucide-react';

export default function AdminDashboard() {
  const { data: response, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['adminDashboard'],
    queryFn: dashboardApi.getAdminDashboard,
  });

  if (isLoading) return <Loader className="mt-20" />;
  if (isError) return <ErrorState message={error.message} onRetry={refetch} />;

  const { 
    totalStudents, 
    activeStudents, 
    paidStudents, 
    defaulters, 
    pendingRevenue, 
    collectedRevenue,
    monthlyRevenue
  } = response?.data || {};

  const kpiCards = [
    {
      title: 'Total Students',
      value: totalStudents || 0,
      subtitle: `${activeStudents || 0} active currently`,
      icon: Users,
      gradient: 'from-indigo-500 to-blue-600',
      bgClass: 'kpi-blue',
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
    },
    {
      title: 'Paid Students',
      value: paidStudents || 0,
      subtitle: 'For current active cycle',
      icon: CheckCircle,
      gradient: 'from-emerald-500 to-teal-600',
      bgClass: 'kpi-green',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
    },
    {
      title: 'Defaulters',
      value: defaulters || 0,
      subtitle: 'Pending payments',
      icon: AlertTriangle,
      gradient: 'from-red-500 to-rose-600',
      bgClass: 'kpi-red',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
    },
    {
      title: 'Collected Revenue',
      value: `₹${collectedRevenue || 0}`,
      subtitle: <span>Pending: <span className="text-red-500 font-semibold">₹{pendingRevenue || 0}</span></span>,
      icon: IndianRupee,
      gradient: 'from-violet-500 to-purple-600',
      bgClass: 'kpi-purple',
      iconBg: 'bg-violet-100',
      iconColor: 'text-violet-600',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 p-6 text-white shadow-xl">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 className="h-7 w-7" />
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          </div>
          <p className="text-white/80">Key performance metrics and current status.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiCards.map((card, idx) => (
          <Card key={idx} className={`${card.bgClass} border-0 shadow-md card-hover`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${card.iconBg}`}>
                <card.icon className={`h-4 w-4 ${card.iconColor}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{card.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Monthly Revenue Breakdown */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-md shadow-indigo-500/20">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            Monthly Revenue Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          {monthlyRevenue && monthlyRevenue.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {monthlyRevenue.map((month, idx) => (
                <div key={idx} className="flex flex-col border rounded-xl p-4 bg-gradient-to-br from-indigo-50/50 to-violet-50/50 hover:shadow-md transition-all duration-300">
                  <span className="text-sm font-medium text-muted-foreground mb-2">
                    {month._id.month} {month._id.year}
                  </span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                    ₹{month.totalAmount}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">No revenue data available yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
