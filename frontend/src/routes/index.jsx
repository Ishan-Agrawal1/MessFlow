import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/components/navigation/ProtectedRoute';
import { Loader } from '@/components/common/Loader';

// Layouts
import StudentLayout from '@/layouts/StudentLayout';
import AdminLayout from '@/layouts/AdminLayout';
import PublicLayout from '@/layouts/PublicLayout';

// Auth
const Login = lazy(() => import('@/pages/auth/Login'));
const AdminLogin = lazy(() => import('@/pages/auth/AdminLogin'));

// Public Pages
const Home = lazy(() => import('@/pages/public/Home'));
const ContactUs = lazy(() => import('@/pages/public/ContactUs'));
const AboutUs = lazy(() => import('@/pages/public/AboutUs'));
const PrivacyPolicy = lazy(() => import('@/pages/public/PrivacyPolicy'));
const TermsConditions = lazy(() => import('@/pages/public/TermsConditions'));
const RefundPolicy = lazy(() => import('@/pages/public/RefundPolicy'));

// Student Pages
const StudentDashboard = lazy(() => import('@/pages/student/Dashboard'));
const PayDues = lazy(() => import('@/pages/student/PayDues'));
const PaymentSuccess = lazy(() => import('@/pages/student/PaymentSuccess'));
const PaymentHistory = lazy(() => import('@/pages/student/PaymentHistory'));
const StudentProfile = lazy(() => import('@/pages/student/Profile'));
const ChangePassword = lazy(() => import('@/pages/student/ChangePassword'));

// Admin Pages
const AdminDashboard = lazy(() => import('@/pages/admin/Dashboard'));
const Students = lazy(() => import('@/pages/admin/Students'));
const RegisterStudent = lazy(() => import('@/pages/admin/RegisterStudent'));
const Defaulters = lazy(() => import('@/pages/admin/Defaulters'));
const PaidStudents = lazy(() => import('@/pages/admin/PaidStudents'));
const FeeCycles = lazy(() => import('@/pages/admin/FeeCycles'));
const Notices = lazy(() => import('@/pages/admin/Notices'));
const Payments = lazy(() => import('@/pages/admin/Payments'));

const SuspenseLoader = () => <Loader fullScreen />;

export function AppRoutes() {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Public Routes (accessible without login) */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
        </Route>

        {/* Student Routes */}
        <Route element={<ProtectedRoute allowedRoles={['student']} />}>
          <Route element={<StudentLayout />}>
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/pay" element={<PayDues />} />
            <Route path="/student/payment-success" element={<PaymentSuccess />} />
            <Route path="/student/history" element={<PaymentHistory />} />
            <Route path="/student/profile" element={<StudentProfile />} />
            <Route path="/student/change-password" element={<ChangePassword />} />
          </Route>
        </Route>

        {/* Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/students" element={<Students />} />
            <Route path="/admin/students/register" element={<RegisterStudent />} />
            <Route path="/admin/defaulters" element={<Defaulters />} />
            <Route path="/admin/paid-students" element={<PaidStudents />} />
            <Route path="/admin/fee-cycles" element={<FeeCycles />} />
            <Route path="/admin/notices" element={<Notices />} />
            <Route path="/admin/payments" element={<Payments />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
