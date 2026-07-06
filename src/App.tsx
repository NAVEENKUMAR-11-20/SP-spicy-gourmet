import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { CartProvider } from './context/CartContext';
import ScrollToTop from './components/ScrollToTop';

// Customer Pages
import Welcome from './pages/customer/Welcome';
import OrderType from './pages/customer/OrderType';
import FullMenu from './pages/FullMenu';
import ChefSpecials from './pages/ChefSpecials';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Reviews from './pages/Reviews';
import Offers from './pages/Offers';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Location from './pages/Location';
import Checkout from './pages/customer/Checkout';
import OrderSuccess from './pages/customer/OrderSuccess';
import OrderTracking from './pages/customer/OrderTracking';
import OrderLookup from './pages/customer/OrderLookup';

// Admin Protected & Layouts
import AdminLayout from './components/layout/AdminLayout';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import OrdersList from './pages/admin/OrdersList';
import OrderDetail from './pages/admin/OrderDetail';
import KitchenBoard from './pages/admin/KitchenBoard';
import InvoicesList from './pages/admin/InvoicesList';
import InvoiceDetail from './pages/admin/InvoiceDetail';
import MenuManagement from './pages/admin/MenuManagement';
import AddEditFoodItem from './pages/admin/AddEditFoodItem';
import TableManagement from './pages/admin/TableManagement';
import Reports from './pages/admin/Reports';

// Auth Guard for admin panel demo bypasses or real pocketbase validation
const AdminProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isMockLogged = localStorage.getItem('sp_mock_logged') === 'true';
  // Check pocketbase state too
  const isPBLogged = !!localStorage.getItem('pocketbase_auth');
  
  if (!isMockLogged && !isPBLogged) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Customer Ordering Portal */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Welcome />} />
            <Route path="order-type" element={<OrderType />} />
            <Route path="menu" element={<FullMenu />} />
            <Route path="specials" element={<ChefSpecials />} />
            <Route path="about" element={<About />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="offers" element={<Offers />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="contact" element={<Contact />} />
            <Route path="location" element={<Location />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="order-success/:orderId" element={<OrderSuccess />} />
            <Route path="track/:orderId" element={<OrderTracking />} />
            <Route path="lookup" element={<OrderLookup />} />
          </Route>

          {/* Admin Login Gateway */}
          <Route path="/admin/login" element={<Login />} />

          {/* Admin Dashboard System */}
          <Route 
            path="/admin" 
            element={
              <AdminProtectedRoute>
                <AdminLayout />
              </AdminProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="kitchen" element={<KitchenBoard />} />
            <Route path="orders" element={<OrdersList />} />
            <Route path="orders/:id" element={<OrderDetail />} />
            <Route path="invoices" element={<InvoicesList />} />
            <Route path="invoices/:id" element={<InvoiceDetail />} />
            <Route path="menu" element={<MenuManagement />} />
            <Route path="menu/new" element={<AddEditFoodItem />} />
            <Route path="menu/edit/:id" element={<AddEditFoodItem />} />
            <Route path="tables" element={<TableManagement />} />
            <Route path="reports" element={<Reports />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;