import React, { useState } from 'react';
import { Home, Users, UserPlus, BarChartIcon, BookOpen, CheckSquare, UploadCloud, FileText, Award, MessageSquare } from 'lucide-react';

import { Login } from './pages/Login';
import { DashboardGestor } from './pages/DashboardGestor';
import { DashboardProfessor } from './pages/DashboardProfessor';
import { DashboardAluno } from './pages/DashboardAluno';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { useAuth } from './hooks/useAuth';

export default function App() {
  const { userRole, login, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('home');

  if (!userRole) {
    return <Login onLogin={login} />;
  }

  const getMenuItems = () => {
    switch (userRole) {
      case 'GESTOR':
        return [
          { id: 'home', icon: Home, label: 'Painel Gerencial' },
          { id: 'turmas', icon: Users, label: 'Matrículas e Turmas' },
        ];
      case 'PROFESSOR':
        return [
          { id: 'home', icon: Home, label: 'Minhas Turmas' },
          { id: 'notas', icon: CheckSquare, label: 'Caderneta Digital' },
        ];
      case 'ALUNO':
        return [
          { id: 'home', icon: Home, label: 'Meu Boletim' },
          { id: 'materiais', icon: BookOpen, label: 'Ambiente Virtual' },
        ];
      default:
        return [];
    }
  };

  const renderContent = () => {
    if (activeTab !== 'home') {
      return (
        <div className="bg-white p-12 rounded-2xl shadow-sm text-center">
          <h3 className="text-xl font-bold text-slate-800">Módulo em Desenvolvimento</h3>
          <button onClick={() => setActiveTab('home')} className="mt-4 text-indigo-600 font-bold hover:underline">
            &larr; Voltar ao Início
          </button>
        </div>
      );
    }

    switch (userRole) {
      case 'GESTOR': return <DashboardGestor />; // (Você pode usar o seu código estático do mockup para o Gestor)
      case 'PROFESSOR': return <DashboardProfessor />;
      case 'ALUNO': return <DashboardAluno />;
      default: return <div>Perfil não configurado.</div>;
    }
  };

  const menuItems = getMenuItems();
  const currentTitle = menuItems.find(m => m.id === activeTab)?.label || 'Painel';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-800">
      <Sidebar 
        userRole={userRole} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        menuItems={menuItems} 
        onLogout={logout} 
      />
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <Header title={currentTitle} />
        <div className="flex-1 overflow-auto p-4 md:p-8 bg-slate-50/50">
          <div className="max-w-7xl mx-auto space-y-6">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
}