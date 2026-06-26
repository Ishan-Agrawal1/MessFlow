import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { paymentApi } from '@/api/paymentApi';
import { Card, CardContent } from '@/components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/common/Loader';
import { ErrorState } from '@/components/common/ErrorState';
import { EmptyState } from '@/components/common/EmptyState';
import { InputField } from '@/components/forms/InputField';
import { CalendarDays, Plus, Activity, X } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export default function FeeCycles() {
  const queryClient = useQueryClient();
  const [isGenerating, setIsGenerating] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    batch: '',
    amount: '',
    dueDate: '',
  });

  const { data: response, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['adminFeeCycles'],
    queryFn: paymentApi.getAllFeeCycles,
  });

  const generateDuesMutation = useMutation({
    mutationFn: (id) => paymentApi.generateDues(id),
    onSuccess: (res) => {
      toast.success(res.message || 'Dues generated successfully');
      queryClient.invalidateQueries({ queryKey: ['adminFeeCycles'] });
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to generate dues');
    },
    onSettled: () => {
      setIsGenerating(null);
    }
  });

  const createFeeCycleMutation = useMutation({
    mutationFn: (data) => paymentApi.createFeeCycle(data),
    onSuccess: (res) => {
      toast.success(res.message || 'Fee cycle created successfully!');
      queryClient.invalidateQueries({ queryKey: ['adminFeeCycles'] });
      setShowCreateModal(false);
      setFormData({ month: new Date().getMonth() + 1, year: new Date().getFullYear(), batch: '', amount: '', dueDate: '' });
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to create fee cycle');
    },
  });

  const handleGenerateDues = (id) => {
    setIsGenerating(id);
    generateDuesMutation.mutate(id);
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.dueDate) {
      toast.error('Please fill in all required fields');
      return;
    }
    createFeeCycleMutation.mutate({
      month: parseInt(formData.month),
      year: parseInt(formData.year),
      batch: formData.batch ? parseInt(formData.batch) : null,
      amount: parseFloat(formData.amount),
      dueDate: formData.dueDate,
    });
  };

  if (isLoading) return <Loader className="mt-20" />;
  if (isError) return <ErrorState message={error.message} onRetry={refetch} />;

  const feeCycles = response?.data?.feeCycles || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fee Cycles</h1>
          <p className="text-muted-foreground">Manage monthly fee cycles and generate dues.</p>
        </div>
        <Button
          onClick={() => setShowCreateModal(true)}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/25"
        >
          <Plus className="mr-2 h-4 w-4" /> Create Cycle
        </Button>
      </div>

      {/* Create Fee Cycle Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowCreateModal(false)}>
          <div className="bg-card rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-600 to-sky-500 text-white">
              <h2 className="text-lg font-bold">Create Fee Cycle</h2>
              <button onClick={() => setShowCreateModal(false)} className="text-white/70 hover:text-white transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Month</label>
                  <select
                    value={formData.month}
                    onChange={(e) => setFormData({ ...formData, month: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {MONTHS.map((name, idx) => (
                      <option key={idx} value={idx + 1}>{name}</option>
                    ))}
                  </select>
                </div>
                <InputField
                  label="Year"
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  min="2020"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <InputField
                    label="Batch (Optional)"
                    type="number"
                    placeholder="e.g. 2024"
                    value={formData.batch}
                    onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                    min="2000"
                    max="2100"
                  />
                  <p className="text-xs text-muted-foreground">Leave empty to create for all students</p>
                </div>
                <InputField
                  label="Base Amount (₹)"
                  type="number"
                  placeholder="e.g. 3500"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  min="1"
                />
              </div>
              <InputField
                label="Due Date"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              />
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  disabled={createFeeCycleMutation.isPending}
                >
                  {createFeeCycleMutation.isPending ? 'Creating...' : 'Create Cycle'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Card className="border-0 shadow-md">
        <CardContent className="p-0">
          {feeCycles.length === 0 ? (
            <div className="p-10">
              <EmptyState 
                icon={CalendarDays} 
                title="No Fee Cycles" 
                description="Create your first fee cycle to start collecting payments."
              />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Month/Year</TableHead>
                    <TableHead>Batch</TableHead>
                    <TableHead>Base Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {feeCycles.map((cycle) => (
                    <TableRow key={cycle._id} className="hover:bg-muted/50 transition-colors">
                      <TableCell className="font-medium capitalize">{MONTHS[cycle.month - 1]} {cycle.year}</TableCell>
                      <TableCell>
                        {cycle.batch ? (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                            Batch {cycle.batch}
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                            All Batches
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="font-semibold text-blue-600">₹{cycle.amount}</TableCell>
                      <TableCell>{format(new Date(cycle.dueDate), 'MMM dd, yyyy')}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                          Active
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          disabled={isGenerating === cycle._id}
                          onClick={() => handleGenerateDues(cycle._id)}
                          className="hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
                        >
                          {isGenerating === cycle._id ? (
                            <Loader size="sm" className="mr-2" />
                          ) : (
                            <Activity className="mr-2 h-4 w-4" />
                          )}
                          Generate Dues
                        </Button>
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
