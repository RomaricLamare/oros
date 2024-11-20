import { useRouter } from 'next/router';
import adminProtection from '@/hoc/adminProtection';

const AdminHome = () => {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={() => handleNavigate('/admin/dashboard')}>Go to Dashboard</button>
      <button onClick={() => handleNavigate('/admin/users')}>Manage Users</button>
    </div>
  );
};

export default adminProtection(AdminHome);