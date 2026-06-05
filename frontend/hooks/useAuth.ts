import { useState } from 'react';
import { PerfilAcesso } from '../types/UsuarioBase';

export function useAuth() {
  const [userRole, setUserRole] = useState<PerfilAcesso | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (role: PerfilAcesso) => {
    setLoading(true);
    try {
      // Aqui entraria a chamada para authService.login(email, senha) no futuro
      // Simulando um delay de rede para a apresentação
      await new Promise(resolve => setTimeout(resolve, 800));
      setUserRole(role);
    } catch (error) {
      console.error("Erro ao fazer login", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUserRole(null);
  };

  return { userRole, login, logout, loading };
}