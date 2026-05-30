import React from 'react';
import { GraduationCap, BarChart as BarChartIcon, BookOpen, Users } from 'lucide-react';
import { RoleButton } from '../components/common/RoleButton';
import { PerfilAcesso } from '../types/Usuario';

interface LoginProps {
  onLogin: (role: PerfilAcesso) => void;
}

export function Login({ onLogin }: LoginProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 w-full max-w-5xl flex flex-col md:flex-row overflow-hidden z-10 relative">
        {/* Lado Esquerdo - Branding */}
        <div className="w-full md:w-5/12 bg-gradient-to-br from-indigo-600 to-violet-800 p-10 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10">
            <GraduationCap className="w-64 h-64 -mr-16 -mt-16" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                <GraduationCap className="text-white w-8 h-8" />
              </div>
              <span className="text-2xl font-bold tracking-tight">EducaPlus</span>
            </div>
            <h1 className="text-4xl font-extrabold leading-tight mb-4">Gestão Escolar<br/>Inteligente.</h1>
            <p className="text-indigo-100 text-lg">Centralize rotinas, acompanhe o desempenho e conecte toda a comunidade escolar.</p>
          </div>
        </div>

        {/* Lado Direito - RBAC Seleção */}
        <div className="w-full md:w-7/12 p-10 lg:p-16 flex flex-col justify-center bg-white">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Bem-vindo de volta!</h2>
          <p className="text-slate-500 mb-10">Selecione o seu perfil de acesso para entrar no sistema.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <RoleButton role="Gestor" icon={BarChartIcon} color="indigo" onClick={() => onLogin('GESTOR')} desc="Diretoria e Coordenação" />
            <RoleButton role="Professor" icon={BookOpen} color="blue" onClick={() => onLogin('PROFESSOR')} desc="Corpo Docente" />
            <RoleButton role="Aluno" icon={GraduationCap} color="emerald" onClick={() => onLogin('ALUNO')} desc="Portal do Estudante" />
            <RoleButton role="Responsavel" icon={Users} color="orange" onClick={() => onLogin('RESPONSAVEL')} desc="Acompanhamento Familiar" />
          </div>
        </div>
      </div>
    </div>
  );
}