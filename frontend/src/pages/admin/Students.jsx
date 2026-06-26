import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { studentApi } from '@/api/studentApi';
import { Card, CardContent } from '@/components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Loader } from '@/components/common/Loader';
import { ErrorState } from '@/components/common/ErrorState';
import { EmptyState } from '@/components/common/EmptyState';
import { Users, Plus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useState } from 'react';

export default function Students() {
  const queryClient = useQueryClient();
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const { data: response, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['adminStudents'],
    queryFn: studentApi.getAllStudents,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => studentApi.deleteStudent(id),
    onSuccess: (res) => {
      toast.success(res.message || 'Student deleted');
      queryClient.invalidateQueries({ queryKey: ['adminStudents'] });
      setDeleteConfirm(null);
    },
    onError: (err) => toast.error(err.message || 'Failed to delete student'),
  });

  if (isLoading) return <Loader className="mt-20" />;
  if (isError) return <ErrorState message={error.message} onRetry={refetch} />;

  const students = response?.data?.students || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Management</h1>
          <p className="text-muted-foreground">Manage all registered students.</p>
        </div>
        <Button asChild className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-500/25">
          <Link to="/admin/students/register">
            <Plus className="mr-2 h-4 w-4" /> Register Student
          </Link>
        </Button>
      </div>

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)}>
          <div className="bg-card rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6 text-center space-y-4" onClick={(e) => e.stopPropagation()}>
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
              <Trash2 className="h-7 w-7 text-red-600" />
            </div>
            <h3 className="text-lg font-bold">Delete Student</h3>
            <p className="text-sm text-muted-foreground">This will permanently remove the student. Continue?</p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
              <Button variant="destructive" className="flex-1" onClick={() => deleteMutation.mutate(deleteConfirm)} disabled={deleteMutation.isPending}>
                {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </div>
        </div>
      )}

      <Card className="border-0 shadow-md">
        <CardContent className="p-0">
          {students.length === 0 ? (
            <div className="p-10">
              <EmptyState 
                icon={Users} 
                title="No students found" 
                description="Register your first student to get started."
              />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Batch</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student._id} className="hover:bg-muted/50 transition-colors">
                      <TableCell className="font-semibold text-blue-600">{student.studentId}</TableCell>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell className="text-muted-foreground">{student.email}</TableCell>
                      <TableCell>{student.batch}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                          student.isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {student.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteConfirm(student._id)}
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
