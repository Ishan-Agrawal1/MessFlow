import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { paymentApi } from '@/api/paymentApi';
import { Card, CardContent } from '@/components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/common/Loader';
import { ErrorState } from '@/components/common/ErrorState';
import { EmptyState } from '@/components/common/EmptyState';
import { ReceiptText, ChevronLeft, ChevronRight, History } from 'lucide-react';
import { format } from 'date-fns';

export default function PaymentHistory() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: response, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['paymentHistory', page],
    queryFn: () => paymentApi.getPaymentHistory(page, limit),
  });

  if (isLoading) return <Loader className="mt-20" />;
  if (isError) return <ErrorState message={error.message} onRetry={refetch} />;

  const { payments, pagination } = response?.data || {};

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-md shadow-indigo-500/20">
            <History className="h-5 w-5 text-white" />
          </div>
          Payment History
        </h1>
        <p className="text-muted-foreground">View all your past transactions.</p>
      </div>

      <Card className="border-0 shadow-md">
        <CardContent className="p-0">
          {!payments || payments.length === 0 ? (
            <div className="p-10">
              <EmptyState 
                icon={ReceiptText} 
                title="No payments yet" 
                description="You haven't made any payments. When you do, they will appear here."
              />
            </div>
          ) : (
            <>
              {/* Desktop Table view */}
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Fee Cycle</TableHead>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment) => (
                      <TableRow key={payment._id} className="hover:bg-muted/50 transition-colors">
                        <TableCell>{format(new Date(payment.createdAt), 'MMM dd, yyyy')}</TableCell>
                        <TableCell>{payment.feeCycle?.month} {payment.feeCycle?.year}</TableCell>
                        <TableCell className="font-mono text-xs text-muted-foreground">{payment.transactionId || 'N/A'}</TableCell>
                        <TableCell className="font-bold text-emerald-600">₹{payment.amount}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                            payment.status === 'SUCCESS' ? 'bg-emerald-100 text-emerald-700' : 
                            payment.status === 'FAILED' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {payment.status.toLowerCase()}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Card view */}
              <div className="md:hidden divide-y">
                {payments.map((payment) => (
                  <div key={payment._id} className="p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{payment.feeCycle?.month} {payment.feeCycle?.year}</p>
                        <p className="text-sm text-muted-foreground">{format(new Date(payment.createdAt), 'MMM dd, yyyy')}</p>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                        payment.status === 'SUCCESS' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {payment.status.toLowerCase()}
                      </span>
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="text-xs text-muted-foreground font-mono">
                        {payment.transactionId || 'N/A'}
                      </div>
                      <p className="font-bold text-lg text-emerald-600">₹{payment.amount}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {pagination && pagination.pages > 1 && (
                <div className="flex items-center justify-between border-t px-4 py-3 sm:px-6">
                  <p className="text-sm text-muted-foreground hidden sm:block">
                    Page <span className="font-medium">{page}</span> of <span className="font-medium">{pagination.pages}</span>
                  </p>
                  <div className="flex gap-2 w-full justify-between sm:w-auto">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
                      disabled={page === pagination.pages}
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
