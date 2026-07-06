import React, { useState } from 'react';
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
  Menu,
  X
} from 'lucide-react';
import { pb } from '../../api/pocketbase';

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    <div className="min-h-screen bg-gray-50 flex overflow-x-hidden">
      {/* Mobile Sidebar Drawer Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - responsive container translation - styled in organic dark forest green theme */}
      <aside 
        className={`fixed inset-y-0 left-0 w-64 bg-brand-orange border-r border-brand-gold/10 flex flex-col justify-between p-6 shrink-0 z-50 transform transition-transform duration-300 lg:translate-x-0 lg:static ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-8">
          {/* Logo & Mobile Close Button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2.5 rounded-xl text-brand-gold">
                <ChefHat className="w-6 h-6 text-brand-gold fill-brand-gold" />
              </div>
              <div>
                <h2 className="font-bold text-white leading-tight font-serif">SP SPICY</h2>
                <span className="text-[10px] text-brand-gold font-bold tracking-widest uppercase">Admin Panel</span>
              </div>
            </div>
            
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg hover:bg-white/10 text-white"
            >
              <X className="w-5 h-5" />
            </button>
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
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium text-sm transition-all ${
                    isActive
                      ? 'bg-white/10 text-brand-gold shadow-sm font-bold border border-brand-gold/20'
                      : 'text-brand-offwhite hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-brand-gold' : 'text-brand-offwhite'}`} />
                  <span className={isActive ? 'text-brand-gold' : 'text-brand-offwhite'}>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Logout */}
        <div className="space-y-4 pt-6 border-t border-brand-gold/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm text-red-400 hover:bg-white/5 transition-all"
          >
            <LogOut className="w-5 h-5 text-red-400" />
            <span className="text-red-400">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Top Header - styled in dark forest green (#0F2A1D) to match sidebar and logo visibility */}
        <header className="h-16 bg-brand-orange border-b border-brand-gold/10 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-md">
          <div className="flex items-center gap-3">
            {/* Hamburger button on mobile */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 text-white shrink-0"
              aria-label="Open sidebar menu"
            >
              <Menu className="w-6 h-6 text-white" />
            </button>
            
            <div className="text-base sm:text-lg font-bold text-white font-serif">
              Welcome, Staff User
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Live indicator / Notification bell */}
            <button className="p-2 text-white hover:text-brand-gold relative rounded-full hover:bg-white/10">
              <Bell className="w-6 h-6 text-white" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-brand-orange"></span>
            </button>
          </div>
        </header>

        {/* Dynamic View Outlet - responsive padding */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
