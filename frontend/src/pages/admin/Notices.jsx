import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { noticeApi } from '@/api/noticeApi';
import { Card, CardContent } from '@/components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/common/Loader';
import { ErrorState } from '@/components/common/ErrorState';
import { EmptyState } from '@/components/common/EmptyState';
import { InputField } from '@/components/forms/InputField';
import { MessageSquare, Plus, Trash2, X, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function Notices() {
  const queryClient = useQueryClient();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'MEDIUM',
  });

  const { data: response, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['adminNotices'],
    queryFn: noticeApi.getActiveNotices,
  });

  const createNoticeMutation = useMutation({
    mutationFn: (data) => noticeApi.createNotice(data),
    onSuccess: (res) => {
      toast.success(res.message || 'Notice created successfully!');
      queryClient.invalidateQueries({ queryKey: ['adminNotices'] });
      setShowCreateModal(false);
      setFormData({ title: '', description: '', priority: 'MEDIUM' });
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to create notice');
    },
  });

  const deleteNoticeMutation = useMutation({
    mutationFn: (id) => noticeApi.deleteNotice(id),
    onSuccess: (res) => {
      toast.success(res.message || 'Notice deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['adminNotices'] });
      setDeleteConfirm(null);
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to delete notice');
    },
  });

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }
    if (formData.title.trim().length < 3) {
      toast.error('Title must be at least 3 characters');
      return;
    }
    if (formData.description.trim().length < 10) {
      toast.error('Description must be at least 10 characters');
      return;
    }
    createNoticeMutation.mutate(formData);
  };

  const handleDelete = (id) => {
    deleteNoticeMutation.mutate(id);
  };

  if (isLoading) return <Loader className="mt-20" />;
  if (isError) return <ErrorState message={error.message} onRetry={refetch} />;

  const notices = response?.data?.notices || [];

  const priorityColors = {
    HIGH: 'bg-red-100 text-red-700',
    MEDIUM: 'bg-amber-100 text-amber-700',
    LOW: 'bg-blue-100 text-blue-700',
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notices</h1>
          <p className="text-muted-foreground">Manage announcements for students.</p>
        </div>
        <Button
          onClick={() => setShowCreateModal(true)}
          className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-lg shadow-indigo-500/25"
        >
          <Plus className="mr-2 h-4 w-4" /> Create Notice
        </Button>
      </div>

      {/* Create Notice Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowCreateModal(false)}>
          <div className="bg-card rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
              <h2 className="text-lg font-bold">Create Notice</h2>
              <button onClick={() => setShowCreateModal(false)} className="text-white/70 hover:text-white transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4">
              <InputField
                label="Title"
                type="text"
                placeholder="e.g. Mess Fee Deadline Extended"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  placeholder="Write a detailed announcement..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
              </div>
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
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700"
                  disabled={createNoticeMutation.isPending}
                >
                  {createNoticeMutation.isPending ? 'Creating...' : 'Create Notice'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)}>
          <div className="bg-card rounded-2xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 text-center space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
                <AlertTriangle className="h-7 w-7 text-red-600" />
              </div>
              <h3 className="text-lg font-bold">Delete Notice</h3>
              <p className="text-sm text-muted-foreground">Are you sure you want to delete this notice? This action cannot be undone.</p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setDeleteConfirm(null)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={() => handleDelete(deleteConfirm)}
                  disabled={deleteNoticeMutation.isPending}
                >
                  {deleteNoticeMutation.isPending ? 'Deleting...' : 'Delete'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Card className="border-0 shadow-md">
        <CardContent className="p-0">
          {notices.length === 0 ? (
            <div className="p-10">
              <EmptyState 
                icon={MessageSquare} 
                title="No Notices" 
                description="Create an announcement to broadcast to all students."
              />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Posted On</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notices.map((notice) => (
                    <TableRow key={notice._id} className="hover:bg-muted/50 transition-colors">
                      <TableCell className="font-medium">{notice.title}</TableCell>
                      <TableCell className="max-w-xs truncate text-muted-foreground">{notice.description}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                          priorityColors[notice.priority] || priorityColors.MEDIUM
                        }`}>
                          {notice.priority}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                          notice.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {notice.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm">{format(new Date(notice.createdAt), 'MMM dd, yyyy')}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteConfirm(notice._id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
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
