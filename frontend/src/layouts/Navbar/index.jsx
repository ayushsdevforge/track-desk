import { HiBars3 } from 'react-icons/hi2';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import NotificationBell from '@/components/NotificationBell';

const PAGE_TITLES = {
  '/dashboard': { title: 'Dashboard', subtitle: 'Overview of your account' },
  '/leaves': { title: 'Leaves', subtitle: 'Manage your leave requests' },
  '/attendance': { title: 'Attendance', subtitle: 'Track your daily attendance' },
  '/monthly-report': { title: 'Monthly Report', subtitle: 'View attendance & leave reports' },
  '/profile': { title: 'Profile', subtitle: 'Your personal information' },
  '/admin/dashboard': { title: 'Admin Dashboard', subtitle: 'Team overview & analytics' },
  '/admin/employees': { title: 'Employees', subtitle: 'Manage team members' },
  '/admin/leaves': { title: 'Leave Requests', subtitle: 'Review & approve requests' },
  '/admin/attendance': { title: 'Attendance', subtitle: 'Team attendance records' },
};

const Navbar = ({ onMenuClick }) => {
  const { user } = useAuth();
  const { pathname } = useLocation();
  const page = PAGE_TITLES[pathname] || { title: '', subtitle: '' };
  const firstName = user?.fullName?.split(' ')[0] || '';

  return (
    <header className="sticky top-0 z-30 bg-white/60 backdrop-blur-2xl border-b border-brand-100/40">
      <div className="flex items-center h-14 px-4 lg:px-6">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg hover:bg-brand-50 transition-colors lg:hidden mr-3"
        >
          <HiBars3 className="h-5 w-5 text-gray-600" />
        </button>

        {/* Page title */}
        <div className="min-w-0 flex-1">
          <h1 className="text-base font-bold text-brand-950 leading-tight truncate">{page.title}</h1>
          <p className="text-sm text-gray-500 hidden sm:block truncate">{page.subtitle}</p>
        </div>

        {/* Right side — greeting + notification */}
        <div className="flex items-center gap-4 ml-4">
          <p className="text-sm text-gray-600 hidden md:block whitespace-nowrap">
            Hi, <span className="font-semibold text-brand-800">{firstName}</span>
          </p>
          <NotificationBell />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
