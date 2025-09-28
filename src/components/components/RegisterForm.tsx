'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { useAuth } from '@/hooks/useAuth';
import { RegisterFormData } from '@/lib/types';

const registerSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Ingresa un email válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmPassword: z.string().min(1, 'Confirma tu contraseña'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

export const RegisterForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string>('');
  const { register: registerUser, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setError('');
    const result = await registerUser(data);
    
    if (!result.success) {
      setError(result.error || 'Error en el registro');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Crear cuenta
          </h1>
          <p className="text-gray-600">
            Únete a nuestra comunidad
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

            {/* Name Input */}
            <Input
              {...register('name')}
              type="text"
              label="Nombre completo"
              placeholder="Juan Pérez"
              icon={<User size={20} />}
              error={errors.name?.message}
            />

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

            {/* Confirm Password Input */}
            <div className="relative">
              <Input
                {...register('confirmPassword')}
                type={showConfirmPassword ? 'text' : 'password'}
                label="Confirmar contraseña"
                placeholder="••••••••"
                icon={<Lock size={20} />}
                error={errors.confirmPassword?.message}
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              loading={loading}
              className="w-full"
              size="lg"
            >
              Crear Cuenta
            </Button>
          </form>
        </Card>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <Link
              href="/login"
              className="font-semibold text-rose-600 hover:text-rose-500 transition-colors"
            >
              Inicia sesión aquí
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500">
          <p>Al registrarte, aceptas nuestros términos de servicio y política de privacidad</p>
        </div>
      </div>
    </div>
  );
};