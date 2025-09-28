'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { User, LogOut } from 'lucide-react';

export default function DashboardPage() {
  const { user, loading, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [loading, isAuthenticated, router]);

  const handleLogout = async () => {
    await logout();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Se está redirigiendo
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Mi Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                Hola, {user.name}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center"
              >
                <LogOut size={16} className="mr-2" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Welcome Card */}
          <Card className="col-span-full">
            <div className="text-center py-8">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-rose-100 mb-4">
                <User className="h-8 w-8 text-rose-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                ¡Bienvenido, {user.name}!
              </h2>
              <p className="text-gray-600 text-lg">
                Has iniciado sesión exitosamente en tu cuenta.
              </p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-md mx-auto">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">{user.email}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">Rol</p>
                  <p className="font-medium text-gray-900 capitalize">{user.rol}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">ID</p>
                  <p className="font-medium text-gray-900">#{user.id}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Actions Cards */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Acciones Rápidas
              </h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="font-medium text-gray-900">Ver Perfil</div>
                  <div className="text-sm text-gray-500">Administra tu información personal</div>
                </button>
                <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="font-medium text-gray-900">Configuración</div>
                  <div className="text-sm text-gray-500">Personaliza tu experiencia</div>
                </button>
              </div>
            </div>
          </Card>

          {/* Stats Card */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Estadísticas
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Sesiones activas</span>
                  <span className="font-semibold text-gray-900">1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Último acceso</span>
                  <span className="font-semibold text-gray-900">Ahora</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Actividad Reciente
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Inicio de sesión exitoso
                    </p>
                    <p className="text-xs text-gray-500">Hace unos momentos</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Cuenta verificada
                    </p>
                    <p className="text-xs text-gray-500">Al registrarse</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}