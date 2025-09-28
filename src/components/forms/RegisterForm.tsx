import React from "react";

export const RegisterForm: React.FC = () => {
  return (
    <form className="space-y-4">
      <h2 className="text-xl font-bold">Registrarse</h2>
      <input type="text" placeholder="Nombre" className="border p-2 w-full rounded" />
      <input type="email" placeholder="Correo" className="border p-2 w-full rounded" />
      <input type="password" placeholder="Contraseña" className="border p-2 w-full rounded" />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full">Registrar</button>
    </form>
  );
};
