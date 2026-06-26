import { useQuery } from '@tanstack/react-query';
import { studentApi } from '@/api/studentApi';
import { Card, CardContent } from '@/components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Loader } from '@/components/common/Loader';
import { ErrorState } from '@/components/common/ErrorState';
import { EmptyState } from '@/components/common/EmptyState';
import { AlertTriangle } from 'lucide-react';

export default function Defaulters() {
  const { data: response, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['adminDefaulters'],
    queryFn: studentApi.getDefaulters,
  });

  if (isLoading) return <Loader className="mt-20" />;
  if (isError) return <ErrorState message={error.message} onRetry={refetch} />;

  const defaulters = response?.data?.defaulters || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-red-600 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100">
            <AlertTriangle className="h-5 w-5" />
          </div>
          Defaulters
        </h1>
        <p className="text-muted-foreground">Students with overdue or pending payments.</p>
      </div>

      <Card className="border-0 shadow-md">
        <CardContent className="p-0">
          {defaulters.length === 0 ? (
            <div className="p-10">
              <EmptyState 
                icon={AlertTriangle} 
                title="No Defaulters 🎉" 
                description="Great! Everyone has paid their dues."
              />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Batch</TableHead>
                    <TableHead>Fee Cycle</TableHead>
                    <TableHead>Due Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {defaulters.map((d, idx) => (
                    <TableRow key={idx} className="hover:bg-muted/50 transition-colors">
                      <TableCell className="font-semibold text-blue-600">{d.studentId}</TableCell>
                      <TableCell className="font-medium">{d.studentName}</TableCell>
                      <TableCell>{d.batch}</TableCell>
                      <TableCell>{d.monthName} {d.year}</TableCell>
                      <TableCell className="font-bold text-red-600">₹{d.amountDue}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                          d.status === 'OVERDUE' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {d.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
