import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '@/api/dashboardApi';
import { paymentApi } from '@/api/paymentApi';
import { useAppSelector } from '@/store/hooks';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/common/Loader';
import { ErrorState } from '@/components/common/ErrorState';
import { EmptyState } from '@/components/common/EmptyState';
import { ShieldCheck, CreditCard } from 'lucide-react';
import { toast } from 'sonner';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// Helper to load Razorpay script
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function PayDues() {
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const { data: response, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['studentDashboard'], // Reuse dashboard data to get current due
    queryFn: dashboardApi.getStudentDashboard,
  });

  const handlePayment = async () => {
    if (!response?.data?.currentDue) return;

    setIsProcessing(true);
    try {
      // 1. Load Razorpay script
      const res = await loadRazorpayScript();
      if (!res) {
        toast.error('Razorpay SDK failed to load. Are you online?');
        setIsProcessing(false);
        return;
      }

      // 2. Create order on backend
      const orderResponse = await paymentApi.createOrder({ dueId: response.data.currentDue._id });
      if (!orderResponse.success) {
        throw new Error(orderResponse.message);
      }

      const { orderId, amount, currency, keyId } = orderResponse.data;

      // 3. Initialize Razorpay
      const options = {
        key: keyId, // from backend .env
        amount: amount,
        currency: currency,
        name: 'Madhav Namkeen',
        description: `Fee Payment for ${response.data.currentDue.feeCycle ? MONTH_NAMES[(response.data.currentDue.feeCycle.month || 1) - 1] : 'Unknown'} ${response.data.currentDue.feeCycle?.year || ''}`,
        order_id: orderId,
        handler: async function (response) {
          // 4. Verify payment on backend
          try {
            toast.loading('Verifying payment...', { id: 'verify-payment' });

            const verifyRes = await paymentApi.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes.success) {
              toast.success('Payment successful!', { id: 'verify-payment' });
              navigate('/student/payment-success', {
                state: {
                  paymentId: verifyRes.data.payment.transactionId,
                  amount: verifyRes.data.payment.amount,
                  receiptNo: verifyRes.data.payment.receiptNumber
                }
              });
            } else {
              throw new Error(verifyRes.message);
            }
          } catch (err) {
            toast.error(err.message || 'Payment verification failed', { id: 'verify-payment' });
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: '#2563EB', // primary blue color
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (err) {
      toast.error(err.message || 'Failed to initiate payment');
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) return <Loader className="mt-20" />;
  if (isError) return <ErrorState message={error.message} onRetry={refetch} />;

  const { currentDue, paymentStatus } = response?.data || {};

  if (!currentDue || paymentStatus === 'PAID') {
    return (
      <div className="mt-10 max-w-xl mx-auto">
        <EmptyState
          icon={ShieldCheck}
          title="All Caught Up!"
          description="You have no pending dues for the current month."
          className="border-green-200 bg-green-50/50"
        />
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Pay Dues</h1>
        <p className="text-muted-foreground">Complete your payment securely via Razorpay.</p>
      </div>

      <Card className="border-0 shadow-lg overflow-hidden" style={{ borderTop: '4px solid #2563EB' }}>
        <CardHeader className="bg-muted/30 border-b pb-6">
          <CardTitle className="text-xl">Payment Details</CardTitle>
          <CardDescription>
            Fee Cycle: <span className="font-semibold text-foreground">{currentDue.feeCycle ? MONTH_NAMES[(currentDue.feeCycle.month || 1) - 1] : 'Unknown'} {currentDue.feeCycle?.year || ''}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Base Monthly Fee</span>
            <span className="font-medium">₹{currentDue.amount}</span> {/* Simplified UI representation, actual amount from currentDue */}
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-muted-foreground">Late Fines</span>
            <span className="font-medium text-destructive">₹0</span>
          </div>
          <div className="flex justify-between items-center py-4">
            <span className="text-lg font-bold">Total Amount to Pay</span>
            <span className="text-3xl font-black bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">₹{currentDue.amount}</span>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-4 bg-muted/20 border-t pt-6">
          <Button
            className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/25"
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <Loader size="sm" className="mr-2" />
            ) : (
              <CreditCard className="mr-2 h-5 w-5" />
            )}
            {isProcessing ? 'Processing...' : `Pay ₹${currentDue.amount} Securely`}
          </Button>
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-green-600" />
            Payments are secured and encrypted by Razorpay
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
