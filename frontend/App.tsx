import React, { useState } from 'react';
import api from './services/connection_axios'; 
import { 
  BookOpen, Users, UserPlus, FileText, 
  Bell, LogOut, CheckSquare, BarChart as BarChartIcon, 
  Calendar, UploadCloud, GraduationCap, Home,
  Search, Clock, Award, AlertCircle,
  Plus, Edit2, Trash2, Database, Shield, History, Download, Mail,
  FileSpreadsheet, Paperclip, Send, ArrowLeft, CheckCircle2,
  File as FileIcon, Link as LinkIcon
} from 'lucide-react';

// --- ESTILOS CUSTOMIZADOS (Animações) ---
const CustomStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @keyframes blob {
      0% { transform: translate(0px, 0px) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
      100% { transform: translate(0px, 0px) scale(1); }
    }
    .animate-blob { animation: blob 7s infinite; }
    .animation-delay-2000 { animation-delay: 2s; }
    .animation-delay-4000 { animation-delay: 4s; }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
  `}} />
);

export default function App() {
  const [view, setView] = useState('login'); 
  const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [subTab, setSubTab] = useState('alunos');
  
  const [registerType, setRegisterType] = useState('');
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);

  // ==========================================
  // VARIÁVEIS REAIS DO FORMULÁRIO (MEMÓRIA)
  // ==========================================
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [matricula, setMatricula] = useState(''); 
  const [cpf, setCpf] = useState(''); 
  
  // VARIÁVEIS DE LOGIN
  const [loginEmail, setLoginEmail] = useState('');
  const [loginSenha, setLoginSenha] = useState('');

  const handleLogin = (role: string) => {
    setCurrentUserRole(role);
    setView('app');
    setActiveTab('home');
  };

  // FUNÇÃO REAL DE LOGIN
  const handleRealLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resposta = await api.post('/api/auth/login', {
        email: loginEmail,
        senha: loginSenha
      });

      const dadosUsuario = resposta.data;
      setCurrentUserRole(dadosUsuario.role);
      setView('app');
      setActiveTab('home');
      setLoginEmail('');
      setLoginSenha('');
    } catch (error) {
      console.error("Erro no login:", error);
      alert("E-mail ou senha incorretos!");
    }
  };

  // ==========================================
  // FUNÇÃO REAL DE CADASTRO NO BANCO DE DADOS
  // ==========================================
  const handleRealRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (registerType === 'Aluno') {
        const novoAluno = {
          nome: nome,
          email: email,
          senha: senha,
          matricula: matricula
        };
        await api.post('/api/alunos', novoAluno);
      } 
      else {
        console.log("Cadastro simulado para:", registerType);
      }
      
      setIsRegisterSuccess(true);
      setTimeout(() => {
        setIsRegisterSuccess(false);
        setView('login');
        setNome(''); setEmail(''); setSenha(''); setMatricula(''); setCpf('');
      }, 3000);

    } catch (error) {
      console.error("Erro ao salvar no banco:", error);
      alert("Erro ao cadastrar! Verifique se o e-mail ou matrícula já existem no banco.");
    }
  };

  if (view === 'login') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8 relative overflow-hidden font-sans">
        <CustomStyles />
        <BackgroundBlobs />

        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 w-full max-w-5xl flex flex-col md:flex-row overflow-hidden z-10 relative animate-fade-in">
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

          <div className="w-full md:w-7/12 p-10 lg:p-16 flex flex-col justify-center bg-white relative">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Login</h2>
            
            <form className="space-y-5" onSubmit={handleRealLogin}>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">E-mail Institucional</label>
                <input 
                  type="email" 
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="nome@educaplus.com.br" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all bg-slate-50 focus:bg-white" 
                  required 
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-bold text-slate-700">Senha</label>
                </div>
                <input 
                  type="password" 
                  value={loginSenha}
                  onChange={(e) => setLoginSenha(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all bg-slate-50 focus:bg-white" 
                  required 
                />
              </div>
              
              <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-600/30 hover:bg-indigo-700 transition-all active:scale-[0.98]">
                Entrar no Sistema
              </button>
            </form>

            <p className="text-center mt-8 text-sm text-slate-500 font-medium">
              Instituição parceira não registrada?{' '}
              <button onClick={() => setView('register')} className="text-indigo-600 font-bold hover:underline">Criar conta</button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'register') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8 relative overflow-hidden font-sans">
        <CustomStyles />
        <BackgroundBlobs />

        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 w-full max-w-3xl flex flex-col p-8 md:p-12 z-10 relative animate-fade-in">
          <button onClick={() => setView('login')} className="absolute top-8 left-8 text-slate-400 hover:text-slate-700 transition-colors flex items-center gap-2 font-medium text-sm">
            <ArrowLeft className="w-4 h-4"/> Voltar ao Login
          </button>

          <div className="text-center mb-8 mt-6">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-indigo-600/30">
              <UserPlus className="w-8 h-8 text-white"/>
            </div>
            <h2 className="text-3xl font-bold text-slate-800">Cadastro Institucional</h2>
            <p className="text-slate-500 mt-2">Crie a sua conta no EducaPlus de acordo com o seu perfil.</p>
          </div>

          {isRegisterSuccess ? (
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8 text-center animate-fade-in">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-emerald-800 mb-2">Cadastro Enviado!</h3>
              <p className="text-emerald-600 font-medium">Os seus dados foram salvos com sucesso. Redirecionando para o login...</p>
            </div>
          ) : (
            <form onSubmit={handleRealRegistration} className="animate-fade-in">
              <div className="mb-8">
                <label className="block text-sm font-bold text-slate-700 mb-3">Selecione o seu tipo de vínculo:</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <SelectTypeButton active={registerType === 'Aluno'} onClick={() => setRegisterType('Aluno')} icon={GraduationCap} label="Aluno" />
                  <SelectTypeButton active={registerType === 'Professor'} onClick={() => setRegisterType('Professor')} icon={BookOpen} label="Professor" />
                  <SelectTypeButton active={registerType === 'Gestor'} onClick={() => setRegisterType('Gestor')} icon={BarChartIcon} label="Gestor" />
                  <SelectTypeButton active={registerType === 'Responsavel'} onClick={() => setRegisterType('Responsavel')} icon={Users} label="Responsável" />
                </div>
              </div>

              {registerType && (
                <div className="space-y-5 animate-fade-in border-t border-slate-100 pt-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Nome Completo</label>
                      <input 
                        type="text" 
                        value={nome} 
                        onChange={(e) => setNome(e.target.value)} 
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none bg-slate-50" 
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">E-mail</label>
                      <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none bg-slate-50" 
                        required 
                      />
                    </div>
                  </div>

                  {registerType === 'Aluno' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Número de Matrícula</label>
                        <input 
                          type="text" 
                          value={matricula} 
                          onChange={(e) => setMatricula(e.target.value)} 
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none bg-slate-50" 
                          required 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Data de Nascimento</label>
                        <input type="date" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none bg-slate-50" />
                      </div>
                    </div>
                  )}

                  {registerType === 'Responsavel' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">CPF</label>
                        <input 
                          type="text" 
                          value={cpf} 
                          onChange={(e) => setCpf(e.target.value)} 
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none bg-slate-50" 
                          required 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Grau de Parentesco</label>
                        <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none bg-slate-50" required>
                          <option value="pai_mae">Pai / Mãe</option>
                          <option value="tutor">Tutor Legal</option>
                          <option value="outro">Outro</option>
                        </select>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Senha de Acesso</label>
                    <input 
                      type="password" 
                      value={senha} 
                      onChange={(e) => setSenha(e.target.value)} 
                      placeholder="Mínimo de 8 caracteres" 
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none bg-slate-50" 
                      required 
                    />
                  </div>

                  <button type="submit" className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl shadow-lg hover:bg-slate-800 transition-all mt-4">
                    Confirmar Cadastro e Enviar
                  </button>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    );
  }

  const getMenuItems = () => {
    switch (currentUserRole) {
      case 'Gestor':
        return [
          { id: 'home', icon: BarChartIcon, label: 'Dashboard Estratégico' },
          { id: 'cadastros', icon: Database, label: 'Gestão de Entidades' },
          { id: 'turmas', icon: Users, label: 'Matrículas e Turmas' },
        ];
      case 'Professor':
        return [
          { id: 'home', icon: Home, label: 'Minhas Turmas' },
          { id: 'diario', icon: CheckSquare, label: 'Diário de Turma' },
        ];
      case 'Aluno':
        return [
          { id: 'home', icon: Award, label: 'Painel do Estudante' },
          { id: 'tarefas', icon: CheckSquare, label: 'Minhas Tarefas' },
        ];
      case 'Responsavel':
        return [
          { id: 'home', icon: BarChartIcon, label: 'Acompanhamento Escolar' },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-800">
      <CustomStyles />
      
      {/* Barra Lateral (Sidebar) */}
      <aside className="w-full md:w-72 bg-slate-900 text-slate-300 flex flex-col z-20 shadow-2xl transition-all duration-300">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800 bg-slate-950/50">
          <div className="bg-indigo-600 p-2 rounded-xl"><GraduationCap className="w-6 h-6 text-white" /></div>
          <div>
            <span className="text-xl font-bold tracking-wide text-white">EducaPlus</span>
            <span className="block text-[10px] uppercase tracking-wider text-indigo-300 font-semibold mt-0.5">Gestão Acadêmica</span>
          </div>
        </div>
        
        <div className="p-4 flex-1 overflow-y-auto">
          <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-4 mt-2 px-2">Navegação Principal</div>
          <nav className="space-y-1.5">
            {getMenuItems().map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left font-medium ${
                    isActive ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/50' : 'hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-indigo-200' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-900">
          <button onClick={() => setView('login')} className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 rounded-lg text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition-colors border border-slate-700/50">
            <LogOut className="w-4 h-4" /> <span className="text-sm font-medium">Encerrar Sessão</span>
          </button>
        </div>
      </aside>

      {/* Área Principal de Conteúdo */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 p-4 flex justify-between items-center z-10 sticky top-0">
          <h2 className="text-xl font-bold text-slate-800 hidden sm:block">
            {getMenuItems().find(m => m.id === activeTab)?.label || 'Painel'}
          </h2>
        </header>

        <div className="flex-1 overflow-auto p-4 md:p-8 bg-slate-50/50">
          <div className="max-w-7xl mx-auto space-y-6">
            
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
               <h3 className="text-xl font-bold text-slate-800">Bem-vindo(a) ao EducaPlus!</h3>
               <p className="text-sm text-slate-500 mt-2">Você está logado como: <strong className="text-indigo-600">{currentUserRole}</strong></p>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

// --- COMPONENTES AUXILIARES E UI ---
const BackgroundBlobs = () => (
  <>
    <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
    <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
    <div className="absolute bottom-[-20%] left-[20%] w-[500px] h-[500px] bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
  </>
);

function SelectTypeButton({ active, onClick, icon: Icon, label }: { active: boolean, onClick: () => void, icon: any, label: string }) {
  return (
    <button type="button" onClick={onClick} className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${active ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm' : 'border-slate-200 bg-white text-slate-500 hover:border-indigo-300 hover:bg-slate-50'}`}>
      <Icon className={`w-6 h-6 mb-2 ${active ? 'text-indigo-600' : 'text-slate-400'}`} />
      <span className="font-bold text-sm">{label}</span>
    </button>
  );
}