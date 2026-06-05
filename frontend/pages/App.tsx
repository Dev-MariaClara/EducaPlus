import React, { useState } from 'react';
import { GraduationCap } from 'lucide-react';
import { BackgroundBlobs } from '../App';
import api from '../services/connection_axios'; // Ligação com o seu backend!

interface LoginProps {
  onLogin: (role: string) => void;
  goToRegister: () => void;
}

export default function Login({ onLogin, goToRegister }: LoginProps) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // AQUI É ONDE A MÁGICA ACONTECE: Conectar com o Backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Por enquanto, para não travar a sua apresentação, 
    // podemos usar um "atalho" se você digitar os e-mails específicos
    if(email === 'admin@educaplus.com') {
        onLogin('Gestor');
        return;
    }

    try {
      // Futuramente, isso fará um POST real para o seu backend verificar a senha
      // const response = await api.post('/api/login', { email, senha });
      // onLogin(response.data.perfil);
      
      console.log("Tentativa de login com:", email);
      // Simulação para poder testar as telas agora:
      onLogin('Aluno'); 

    } catch (error) {
      console.error("Erro no login", error);
      alert("Credenciais inválidas!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      <BackgroundBlobs />

      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 w-full max-w-5xl flex flex-col md:flex-row overflow-hidden z-10 relative animate-fade-in">
        
        {/* Lado Esquerdo - Banner */}
        <div className="w-full md:w-5/12 bg-gradient-to-br from-indigo-700 to-slate-900 p-10 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10">
            <GraduationCap className="w-64 h-64 -mr-16 -mt-16" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm"><GraduationCap className="text-white w-8 h-8" /></div>
              <span className="text-2xl font-bold tracking-tight">EducaPlus</span>
            </div>
            <h1 className="text-4xl font-extrabold leading-tight mb-4">Gestão Escolar<br/>Inteligente.</h1>
            <p className="text-indigo-200 text-lg">Centralize rotinas, acompanhe o desempenho e conecte a comunidade escolar com segurança.</p>
          </div>
        </div>

        {/* Lado Direito - Formulário */}
        <div className="w-full md:w-7/12 p-10 lg:p-16 flex flex-col justify-center bg-white relative">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Aceder à Plataforma</h2>
          <p className="text-slate-500 mb-8">Insira as suas credenciais para aceder ao painel restrito.</p>
          
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">E-mail Institucional</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nome@educaplus.pt" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all bg-slate-50 focus:bg-white" 
                required 
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-bold text-slate-700">Palavra-passe</label>
                <button type="button" className="text-xs font-bold text-indigo-600 hover:underline">Esqueci a minha palavra-passe</button>
              </div>
              <input 
                type="password" 
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="••••••••" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all bg-slate-50 focus:bg-white" 
                required 
              />
            </div>
            
            <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-600/30 hover:bg-indigo-700 transition-all active:scale-[0.98]">
              Entrar no Sistema
            </button>
          </form>

          {/* Botões rápidos de teste para a apresentação */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 text-center">Atalhos de Demonstração (Pitch)</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button onClick={() => onLogin('Gestor')} className="px-3 py-2 rounded-lg text-xs font-bold bg-indigo-50 text-indigo-700 hover:scale-105 transition-all">Gestor</button>
              <button onClick={() => onLogin('Professor')} className="px-3 py-2 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 hover:scale-105 transition-all">Professor</button>
              <button onClick={() => onLogin('Aluno')} className="px-3 py-2 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 hover:scale-105 transition-all">Aluno</button>
              <button onClick={() => onLogin('Responsavel')} className="px-3 py-2 rounded-lg text-xs font-bold bg-orange-50 text-orange-700 hover:scale-105 transition-all">Responsável</button>
            </div>
          </div>

          <p className="text-center mt-8 text-sm text-slate-500 font-medium">
            Instituição parceira não registada?{' '}
            <button onClick={goToRegister} className="text-indigo-600 font-bold hover:underline">Criar conta (Público)</button>
          </p>
        </div>
      </div>
    </div>
  );
}