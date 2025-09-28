'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { useAuth } from '@/hooks/useAuth';
import { LoginFormData } from '@/lib/types';

const loginSchema = z.object({
  email: z.string().email('Ingresa un email válido'),
  password: z.string().min(1, 'La contraseña es requerida'),
});

export const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>('');
  const { login, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setError('');
    const result = await login(data);
    
    if (!result.success) {
      setError(result.error || 'Error en el inicio de sesión');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bienvenido de vuelta
          </h1>
          <p className="text-gray-600">
            Inicia sesión en tu cuenta
          </p>
        </div>

        {/* Form Card */}
        <Card>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Email Input */}
            <Input
              {...register('email')}
              type="email"
              label="Email"
              placeholder="tu@ejemplo.com"
              icon={<Mail size={20} />}
              error={errors.email?.message}
            />

            {/* Password Input */}
            <div className="relative">
              <Input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                label="Contraseña"
                placeholder="••••••••"
                icon={<Lock size={20} />}
                error={errors.password?.message}
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              loading={loading}
              className="w-full"
              size="lg"
            >
              Iniciar Sesión
            </Button>
          </form>
        </Card>

        {/* Register Link */}
        <div className="text-center">
          <p className="text-gray-600">
            ¿No tienes una cuenta?{' '}
            <Link
              href="/register"
              className="font-semibold text-rose-600 hover:text-rose-500 transition-colors"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500">
          <p>Al iniciar sesión, aceptas nuestros términos y condiciones</p>
        </div>
      </div>
    </div>
  );
};