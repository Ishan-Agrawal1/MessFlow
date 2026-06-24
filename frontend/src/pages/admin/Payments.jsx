import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { paymentApi } from '@/api/paymentApi';
import { Card, CardContent } from '@/components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/common/Loader';
import { ErrorState } from '@/components/common/ErrorState';
import { EmptyState } from '@/components/common/EmptyState';
import { CreditCard, ChevronLeft, ChevronRight, Receipt } from 'lucide-react';
import { format } from 'date-fns';

const MONTHS = [
  '', 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export default function Payments() {
  const [page, setPage] = useState(1);

  const { data: response, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['adminAllPayments', page],
    queryFn: () => paymentApi.getAllPayments(page, 15),
  });

  if (isLoading) return <Loader className="mt-20" />;
  if (isError) return <ErrorState message={error.message} onRetry={refetch} />;

  const { payments = [], total = 0, pages = 1 } = response?.data || {};

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">All Payments</h1>
          <p className="text-muted-foreground">
            View all system transactions.
            {total > 0 && <span className="ml-2 font-medium text-foreground">({total} total)</span>}
          </p>
        </div>
        <div className="flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-violet-50 rounded-xl px-4 py-2">
          <Receipt className="h-5 w-5 text-indigo-600" />
          <span className="text-sm font-semibold text-indigo-700">{total} Transactions</span>
        </div>
      </div>

      <Card className="border-0 shadow-md">
        <CardContent className="p-0">
          {payments.length === 0 ? (
            <div className="p-10">
              <EmptyState 
                icon={CreditCard} 
                title="No Payments Found" 
                description="Payments will appear here once students start paying their dues."
              />
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Student ID</TableHead>
                      <TableHead>Fee Cycle</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Paid On</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment) => (
                      <TableRow key={payment._id} className="hover:bg-muted/50 transition-colors">
                        <TableCell className="font-medium">{payment.student?.name || 'N/A'}</TableCell>
                        <TableCell className="text-muted-foreground">{payment.student?.studentId || 'N/A'}</TableCell>
                        <TableCell>
                          {payment.due?.feeCycle
                            ? `${MONTHS[payment.due.feeCycle.month] || ''} ${payment.due.feeCycle.year || ''}`
                            : 'N/A'
                          }
                        </TableCell>
                        <TableCell className="font-bold text-emerald-600">₹{payment.amount}</TableCell>
                        <TableCell className="text-sm">
                          {payment.paidAt
                            ? format(new Date(payment.paidAt), 'MMM dd, yyyy • hh:mm a')
                            : 'N/A'
                          }
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                            {payment.status}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              {pages > 1 && (
                <div className="flex items-center justify-between border-t p-4">
                  <p className="text-sm text-muted-foreground">
                    Page {page} of {pages}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={page <= 1}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={page >= pages}
                      onClick={() => setPage((p) => p + 1)}
                    >
                      Next <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
