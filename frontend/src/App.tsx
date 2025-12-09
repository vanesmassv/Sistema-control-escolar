import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthProvider';
import { useAuth } from './contexts/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { MaestroDashboard } from './pages/maestro/MaestroDashboard';
import { PublicRoute } from './routes/PublicRoute';
import UnauthorizedPage from './pages/NotFound';
import NotFoundPage from './pages/Unauthorized';

const ProtectedLayout = ({ rolRequerido }: { rolRequerido: 'ADMIN' | 'MAESTRO' }) => {

    const { user, loading } = useAuth();

    if (loading) return <div className="p-10 text-center">Cargando...</div>;

    
    if (!user || user.role !== rolRequerido) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                  <LoginPage />
              </PublicRoute>
            } 
          />

          {/* --- ZONA PROTEGIDA DE ADMINS --- */}
          <Route element={<ProtectedLayout rolRequerido="ADMIN" />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>

          {/* --- ZONA PROTEGIDA DE MAESTROS --- */}
          <Route element={<ProtectedLayout rolRequerido="MAESTRO" />}>
              <Route path="/maestro/dashboard" element={<MaestroDashboard/>} />
          </Route> 

          {/* REDIRECCIÓN DEFAULT */}
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="*" element={<NotFoundPage />} />
            

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;