import { useQuery } from '@tanstack/react-query';
import { studentApi } from '@/api/studentApi';
import { Card, CardContent } from '@/components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Loader } from '@/components/common/Loader';
import { ErrorState } from '@/components/common/ErrorState';
import { EmptyState } from '@/components/common/EmptyState';
import { CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

export default function PaidStudents() {
  const { data: response, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['adminPaidStudents'],
    queryFn: studentApi.getPaidStudents,
  });

  if (isLoading) return <Loader className="mt-20" />;
  if (isError) return <ErrorState message={error.message} onRetry={refetch} />;

  const paidStudents = response?.data?.paidStudents || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-emerald-600 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
            <CheckCircle className="h-5 w-5" />
          </div>
          Paid Students
        </h1>
        <p className="text-muted-foreground">Students who have cleared their dues for the current cycle.</p>
      </div>

      <Card className="border-0 shadow-md">
        <CardContent className="p-0">
          {paidStudents.length === 0 ? (
            <div className="p-10">
              <EmptyState 
                icon={CheckCircle} 
                title="No Paid Students" 
                description="No one has paid for the current cycle yet."
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
                    <TableHead>Amount Paid</TableHead>
                    <TableHead>Receipt #</TableHead>
                    <TableHead>Payment Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paidStudents.map((s, idx) => (
                    <TableRow key={idx} className="hover:bg-muted/50 transition-colors">
                      <TableCell className="font-semibold text-indigo-600">{s.studentId}</TableCell>
                      <TableCell className="font-medium">{s.studentName}</TableCell>
                      <TableCell>{s.batch}</TableCell>
                      <TableCell className="font-bold text-emerald-600">₹{s.amountPaid}</TableCell>
                      <TableCell className="text-muted-foreground font-mono text-xs">{s.receiptNumber}</TableCell>
                      <TableCell className="text-sm">
                        {s.paymentDate ? format(new Date(s.paymentDate), 'MMM dd, yyyy') : 'N/A'}
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
