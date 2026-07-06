import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Utensils, 
  ShoppingBag, 
  Receipt, 
  ChefHat, 
  TableProperties, 
  BarChart3, 
  LogOut,
  Bell,
  Settings
} from 'lucide-react';
import { pb } from '../../api/pocketbase';

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    pb.authStore.clear();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { label: 'Live Kitchen', icon: ChefHat, path: '/admin/kitchen' },
    { label: 'Orders', icon: ShoppingBag, path: '/admin/orders' },
    { label: 'Invoices', icon: Receipt, path: '/admin/invoices' },
    { label: 'Menu Items', icon: Utensils, path: '/admin/menu' },
    { label: 'Tables', icon: TableProperties, path: '/admin/tables' },
    { label: 'Reports', icon: BarChart3, path: '/admin/reports' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between p-6 shrink-0">
        <div className="space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-emerald-600 p-2.5 rounded-xl text-white">
              <ChefHat className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 leading-tight">SP SPICY</h2>
              <span className="text-xs text-gray-500 font-bold tracking-widest uppercase">Admin Panel</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              const Icon = item.icon;

              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium text-sm transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-600' : 'text-gray-400'}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Logout */}
        <div className="space-y-4 pt-6 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm text-red-600 hover:bg-red-50 transition-all"
          >
            <LogOut className="w-5 h-5 text-red-500" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="text-lg font-bold text-gray-800">
            Welcome, Staff User
          </div>

          <div className="flex items-center gap-4">
            {/* Live indicator / Notification bell */}
            <button className="p-2 text-gray-400 hover:text-gray-600 relative rounded-full hover:bg-gray-50">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white"></span>
            </button>
          </div>
        </header>

        {/* Dynamic View Outlet */}
        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
