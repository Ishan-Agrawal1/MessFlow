import { useLocation, Navigate, Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CheckCircle, Home, FileText } from 'lucide-react';
import { format } from 'date-fns';

export default function PaymentSuccess() {
  const location = useLocation();
  const state = location.state;

  if (!state || !state.paymentId) {
    return <Navigate to="/student/dashboard" replace />;
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center p-4">
      <Card className="w-full max-w-md border-t-8 border-t-green-500 shadow-xl text-center">
        <CardContent className="pt-10 pb-6 space-y-6">
          <div className="flex justify-center">
            <div className="rounded-full bg-green-100 p-4">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-green-600">Payment Successful</h1>
            <p className="text-muted-foreground">Thank you! Your payment has been received.</p>
          </div>

          <div className="rounded-lg bg-muted p-4 text-left space-y-3 mt-8">
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Amount Paid</span>
              <span className="font-bold">₹{state.amount}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Transaction ID</span>
              <span className="font-mono text-xs mt-1">{state.paymentId}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-muted-foreground">Receipt No</span>
              <span className="font-mono text-xs mt-1">{state.receiptNo}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date</span>
              <span className="text-sm font-medium">{format(new Date(), 'MMM dd, yyyy HH:mm')}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3 pb-8">
          <Button asChild className="w-full">
            <Link to="/student/dashboard">
              <Home className="mr-2 h-4 w-4" /> Back to Dashboard
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link to="/student/history">
              <FileText className="mr-2 h-4 w-4" /> View Payment History
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
