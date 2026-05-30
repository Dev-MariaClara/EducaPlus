import React, { useState } from 'react';
import { 
  BookOpen, Users, UserPlus, FileText, 
  Bell, LogOut, CheckSquare, BarChart as BarChartIcon, 
  Calendar, UploadCloud, GraduationCap, Home,
  Search, ChevronRight, Clock, Award, MessageSquare, AlertCircle
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line
} from 'recharts';

// --- DADOS MOCKADOS (Simulando a camada Model com mais detalhes) ---
const mockTurmas = [
  { id: 1, nome: '1º Ano A - Ensino Médio', alunos: 35, presenca: 92, media: 7.8, proxAula: '14:00' },
  { id: 2, nome: '2º Ano B - Ensino Médio', alunos: 32, presenca: 88, media: 7.1, proxAula: '15:40' },
  { id: 3, nome: 'Técnico em Informática', alunos: 28, presenca: 95, media: 8.5, proxAula: 'Amanhã' },
];

const mockNotas = [
  { disciplina: 'Matemática', nota: 8.5, faltas: 2, prof: 'Carlos Silva', status: 'Excelente' },
  { disciplina: 'Física', nota: 6.5, faltas: 4, prof: 'Ana Souza', status: 'Atenção' },
  { disciplina: 'História', nota: 9.2, faltas: 1, prof: 'Marcos Paulo', status: 'Excelente' },
  { disciplina: 'Química', nota: 7.0, faltas: 0, prof: 'Juliana Costa', status: 'Na Média' },
];

const mockMateriais = [
  { id: 1, titulo: 'Lista de Exercícios - Álgebra Linear', disciplina: 'Matemática', tipo: 'PDF', tamanho: '2.4 MB', data: 'Hoje, 10:30' },
  { id: 2, titulo: 'Apostila de Eletromagnetismo (Cap 1 a 3)', disciplina: 'Física', tipo: 'DOCX', tamanho: '5.1 MB', data: 'Ontem, 14:15' },
  { id: 3, titulo: 'Revolução Industrial - Slides', disciplina: 'História', tipo: 'PPTX', tamanho: '12 MB', data: '25/05/2026' },
];

const mockTarefas = [
  { id: 1, titulo: 'Trabalho de Física - Leis de Newton', prazo: 'Amanhã, 23:59', status: 'Pendente', cor: 'bg-orange-100 text-orange-700 border-orange-200' },
  { id: 2, titulo: 'Redação: Impactos da IA', prazo: '30/05/2026', status: 'Entregue', cor: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
];

const chartDataAlunos = [
  { name: 'Jan', matriculas: 1100, ativas: 1050 },
  { name: 'Fev', matriculas: 1250, ativas: 1200 },
  { name: 'Mar', matriculas: 1280, ativas: 1230 },
  { name: 'Abr', matriculas: 1290, ativas: 1240 },
  { name: 'Mai', matriculas: 1310, ativas: 1254 },
];

const chartDataDesempenho = [
  { name: '1º Bim', media: 7.2 },
  { name: '2º Bim', media: 7.5 },
  { name: '3º Bim', media: 7.8 },
  { name: '4º Bim', media: 8.1 },
];

export default function App() {
  // CORREÇÃO: Adicionada a tipagem do TypeScript para o useState
  const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('home');

  // Tela de Login Premium
  if (!currentUserRole) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 w-full max-w-5xl flex flex-col md:flex-row overflow-hidden z-10 relative">
          
          {/* Lado Esquerdo - Branding */}
          <div className="w-full md:w-5/12 bg-linear-to-br from-indigo-600 to-violet-800 p-10 text-white flex flex-col justify-between relative overflow-hidden">
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
              <p className="text-indigo-100 text-lg">Centralize rotinas, acompanhe o desempenho e conecte toda a comunidade escolar em uma única plataforma.</p>
            </div>
            <div className="mt-12">
              <div className="flex -space-x-4 mb-4">
                {[1,2,3,4].map(i => (
                  <img key={i} className="w-10 h-10 rounded-full border-2 border-indigo-600" src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                ))}
              </div>
              <p className="text-sm text-indigo-200">Junte-se a mais de 5.000 usuários ativos.</p>
            </div>
          </div>

          {/* Lado Direito - RBAC Seleção */}
          <div className="w-full md:w-7/12 p-10 lg:p-16 flex flex-col justify-center bg-white">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Bem-vindo de volta!</h2>
            <p className="text-slate-500 mb-10">Selecione o seu perfil de acesso (Simulação RBAC) para entrar no sistema.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <RoleButton role="Gestor" icon={BarChartIcon} color="indigo" onClick={() => setCurrentUserRole('Gestor')} desc="Diretoria e Coordenação" />
              <RoleButton role="Professor" icon={BookOpen} color="blue" onClick={() => setCurrentUserRole('Professor')} desc="Corpo Docente" />
              <RoleButton role="Aluno" icon={GraduationCap} color="emerald" onClick={() => setCurrentUserRole('Aluno')} desc="Portal do Estudante" />
              <RoleButton role="Responsavel" icon={Users} color="orange" onClick={() => setCurrentUserRole('Responsavel')} desc="Acompanhamento Familiar" />
            </div>

            <div className="mt-10 pt-6 border-t border-slate-100 text-center">
              <p className="text-sm text-slate-400">Ambiente de Demonstração • Integração LGPD</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getMenuItems = () => {
    switch (currentUserRole) {
      case 'Gestor':
        return [
          { id: 'home', icon: Home, label: 'Painel Gerencial' },
          { id: 'usuarios', icon: UserPlus, label: 'Usuários (RBAC)' },
          { id: 'turmas', icon: Users, label: 'Matrículas e Turmas' },
          { id: 'relatorios', icon: BarChartIcon, label: 'Relatórios Avançados' },
        ];
      case 'Professor':
        return [
          { id: 'home', icon: Home, label: 'Minhas Turmas' },
          { id: 'notas', icon: CheckSquare, label: 'Caderneta Digital' },
          { id: 'materiais', icon: UploadCloud, label: 'Publicar Material' },
          { id: 'tarefas', icon: FileText, label: 'Corrigir Tarefas' },
        ];
      case 'Aluno':
        return [
          { id: 'home', icon: Home, label: 'Meu Boletim' },
          { id: 'tarefas', icon: CheckSquare, label: 'Minhas Tarefas' },
          { id: 'materiais', icon: BookOpen, label: 'Ambiente Virtual' },
        ];
      case 'Responsavel':
        return [
          { id: 'home', icon: Home, label: 'Visão Geral' },
          { id: 'boletim', icon: Award, label: 'Boletim Detalhado' },
          { id: 'notificacoes', icon: MessageSquare, label: 'Comunicados' },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-800">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-72 bg-slate-900 text-slate-300 flex flex-col z-20 shadow-2xl transition-all duration-300">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800 bg-slate-950/50">
          <div className="bg-indigo-600 p-2 rounded-xl">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-wide text-white">EducaPlus</span>
            <span className="block text-[10px] uppercase tracking-wider text-indigo-300 font-semibold mt-0.5">Versão 2.0</span>
          </div>
        </div>
        
        <div className="p-4 flex-1 overflow-y-auto">
          <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-4 mt-2 px-2">Menu Principal</div>
          <nav className="space-y-1.5">
            {getMenuItems().map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left font-medium ${
                    isActive 
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/50 transform scale-[1.02]' 
                      : 'hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-indigo-200' : 'text-slate-400'}`} />
                  {item.label}
                  {isActive && <ChevronRight className="w-4 h-4 ml-auto opacity-50" />}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Profile Footer in Sidebar */}
        <div className="p-4 border-t border-slate-800 bg-slate-900">
          <div className="flex items-center gap-3 mb-4 px-2">
            <img className="w-10 h-10 rounded-full border border-slate-700" src="https://i.pravatar.cc/100?img=11" alt="Avatar" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">Usuário Teste</p>
              <p className="text-xs text-indigo-400 truncate capitalize">{currentUserRole}</p>
            </div>
          </div>
          <button 
            onClick={() => { setCurrentUserRole(null); setActiveTab('home'); }} 
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 rounded-lg text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition-colors border border-slate-700/50"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Sair da Conta</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        
        {/* Top Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 p-4 flex justify-between items-center z-10 sticky top-0">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-slate-800 hidden sm:block">
              {getMenuItems().find(m => m.id === activeTab)?.label || 'Painel'}
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Search Bar Simples */}
            <div className="hidden md:flex items-center bg-slate-100 px-3 py-2 rounded-full border border-slate-200 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
              <Search className="w-4 h-4 text-slate-400 mr-2" />
              <input type="text" placeholder="Buscar no EducaPlus..." className="bg-transparent border-none outline-none text-sm w-48 text-slate-700 placeholder-slate-400" />
            </div>

            <button className="relative p-2 text-slate-400 hover:text-indigo-600 transition-colors bg-slate-50 hover:bg-indigo-50 rounded-full border border-slate-100">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Scrollable Content View */}
        <div className="flex-1 overflow-auto p-4 md:p-8 bg-slate-50/50">
          <div className="max-w-7xl mx-auto space-y-6">
            
            {/* VIEW DO GESTOR */}
            {currentUserRole === 'Gestor' && activeTab === 'home' && (
              <div className="space-y-6 animate-fade-in">
                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatCard title="Alunos Ativos" value="1.254" trend="+5.2%" icon={Users} color="indigo" />
                  <StatCard title="Professores" value="84" trend="Estável" icon={BookOpen} color="emerald" />
                  <StatCard title="Turmas Abertas" value="32" trend="+2" icon={CheckSquare} color="blue" />
                  <StatCard title="Média Institucional" value="7.6" trend="+0.3" icon={Award} color="amber" />
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-6">Evolução de Matrículas (2026)</h3>
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartDataAlunos}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                          <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                          <Bar dataKey="ativas" name="Alunos Ativos" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-6">Desempenho Geral (Média)</h3>
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartDataDesempenho}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                          <YAxis domain={[5, 10]} axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                          <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                          <Line type="monotone" dataKey="media" name="Média" stroke="#10b981" strokeWidth={3} dot={{r: 6, fill: '#10b981', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 8}} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW DO PROFESSOR */}
            {currentUserRole === 'Professor' && activeTab === 'home' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">Visão Geral das Turmas</h2>
                    <p className="text-slate-500">Acompanhe o engajamento e desempenho de suas disciplinas.</p>
                  </div>
                  <button className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg hover:bg-slate-50 transition shadow-sm font-medium flex items-center gap-2">
                    <Calendar className="w-4 h-4"/> Ver Calendário
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {mockTurmas.map(turma => (
                    <div key={turma.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow group">
                      <div className="bg-linear-to-r from-slate-800 to-slate-700 p-5 text-white">
                        <div className="flex justify-between items-start mb-2">
                          <span className="bg-white/20 px-2 py-1 rounded text-xs font-semibold backdrop-blur-sm">Cód: TM{turma.id}026</span>
                          <span className="flex items-center gap-1 text-xs text-slate-300"><Clock className="w-3 h-3"/> {turma.proxAula}</span>
                        </div>
                        <h3 className="text-lg font-bold truncate" title={turma.nome}>{turma.nome}</h3>
                      </div>
                      
                      <div className="p-5">
                        <div className="flex justify-between items-center mb-6">
                          <div className="text-center">
                            <p className="text-xs text-slate-400 uppercase font-semibold mb-1">Alunos</p>
                            <p className="text-xl font-bold text-slate-800">{turma.alunos}</p>
                          </div>
                          <div className="h-8 w-px bg-slate-200"></div>
                          <div className="text-center">
                            <p className="text-xs text-slate-400 uppercase font-semibold mb-1">Frequência</p>
                            <p className="text-xl font-bold text-emerald-600">{turma.presenca}%</p>
                          </div>
                          <div className="h-8 w-px bg-slate-200"></div>
                          <div className="text-center">
                            <p className="text-xs text-slate-400 uppercase font-semibold mb-1">Média</p>
                            <p className="text-xl font-bold text-indigo-600">{turma.media}</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <button className="w-full bg-indigo-50 text-indigo-700 py-2.5 rounded-xl hover:bg-indigo-600 hover:text-white transition-colors text-sm font-semibold flex items-center justify-center gap-2">
                            <CheckSquare className="w-4 h-4"/> Lançar Frequência
                          </button>
                          <button className="w-full bg-white border border-slate-200 text-slate-600 py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-sm font-semibold">
                            Ver Diário de Classe
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VIEW DO ALUNO */}
            {currentUserRole === 'Aluno' && activeTab === 'home' && (
              <div className="space-y-6 animate-fade-in">
                {/* Header Profile Aluno */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col md:flex-row gap-6 items-center md:items-start relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-20 -mt-20"></div>
                  
                  <div className="w-24 h-24 rounded-full bg-slate-100 border-4 border-white shadow-lg overflow-hidden shrink-0 z-10">
                     <img src="https://i.pravatar.cc/150?img=33" alt="Aluno" className="w-full h-full object-cover"/>
                  </div>
                  <div className="flex-1 text-center md:text-left z-10">
                    <h2 className="text-2xl font-bold text-slate-800">João Silva Carvalho</h2>
                    <p className="text-slate-500 mb-4">Matrícula: 2026001 • 1º Ano A - Ensino Médio</p>
                    
                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                      <div className="bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-lg flex items-center gap-3">
                        <div className="bg-emerald-500 p-1.5 rounded-md text-white"><Award className="w-4 h-4"/></div>
                        <div>
                          <p className="text-xs text-emerald-600 font-bold uppercase">Média Geral</p>
                          <p className="text-lg font-black text-emerald-700">7.8</p>
                        </div>
                      </div>
                      <div className="bg-blue-50 border border-blue-100 px-4 py-2 rounded-lg flex items-center gap-3">
                        <div className="bg-blue-500 p-1.5 rounded-md text-white"><Calendar className="w-4 h-4"/></div>
                        <div>
                          <p className="text-xs text-blue-600 font-bold uppercase">Frequência</p>
                          <p className="text-lg font-black text-blue-700">92%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tabela de Notas e Tarefas */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                      <CheckSquare className="w-5 h-5 text-indigo-500"/> Desempenho por Disciplina
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-100 text-slate-400 text-sm">
                            <th className="pb-3 font-semibold">Disciplina</th>
                            <th className="pb-3 font-semibold">Progresso / Nota</th>
                            <th className="pb-3 font-semibold text-center">Faltas</th>
                            <th className="pb-3 font-semibold text-right">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {mockNotas.map((item, index) => (
                            <tr key={index} className="hover:bg-slate-50 transition-colors group">
                              <td className="py-4">
                                <p className="font-bold text-slate-800">{item.disciplina}</p>
                                <p className="text-xs text-slate-400">{item.prof}</p>
                              </td>
                              <td className="py-4 pr-6">
                                <div className="flex items-center gap-3">
                                  <span className="font-black text-slate-700 w-8">{item.nota.toFixed(1)}</span>
                                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div 
                                      className={`h-full rounded-full ${item.nota >= 7 ? 'bg-emerald-500' : 'bg-amber-500'}`} 
                                      style={{width: `${(item.nota / 10) * 100}%`}}>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 text-center">
                                <span className={`px-2 py-1 rounded-md text-sm font-semibold ${item.faltas > 3 ? 'bg-red-50 text-red-600' : 'text-slate-600'}`}>
                                  {item.faltas}
                                </span>
                              </td>
                              <td className="py-4 text-right">
                                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                                  item.nota >= 7 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                                }`}>
                                  {item.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Sidebar Aluno (Tarefas) */}
                  <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-orange-500"/> Próximas Entregas
                      </h3>
                      <div className="space-y-4">
                        {mockTarefas.map(tarefa => (
                          <div key={tarefa.id} className={`p-4 rounded-xl border ${tarefa.cor} bg-opacity-50`}>
                            <h4 className="font-bold mb-1 text-sm">{tarefa.titulo}</h4>
                            <div className="flex justify-between items-center mt-3">
                              <span className="text-xs font-semibold opacity-80 flex items-center gap-1">
                                <Calendar className="w-3 h-3"/> {tarefa.prazo}
                              </span>
                              <span className="text-xs font-black uppercase tracking-wider">{tarefa.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button className="w-full mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition">Ver todas as tarefas &rarr;</button>
                    </div>

                    <div className="bg-linear-to-br from-indigo-600 to-violet-700 p-6 rounded-2xl text-white shadow-md relative overflow-hidden">
                      <div className="absolute top-0 right-0 opacity-20"><BookOpen className="w-24 h-24 -mt-4 -mr-4"/></div>
                      <h3 className="font-bold text-lg mb-2 relative z-10">Biblioteca Virtual</h3>
                      <p className="text-indigo-100 text-sm mb-4 relative z-10">Novos materiais da disciplina de Matemática foram adicionados.</p>
                      <button onClick={() => setActiveTab('materiais')} className="bg-white text-indigo-700 px-4 py-2 rounded-lg text-sm font-bold shadow-sm hover:shadow-md transition relative z-10 w-full">
                        Acessar AVA
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW DO RESPONSÁVEL */}
            {currentUserRole === 'Responsavel' && activeTab === 'home' && (
              <div className="space-y-6 animate-fade-in">
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-100 pb-6 mb-6 gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-linear-to-tr from-indigo-100 to-purple-100 rounded-full flex items-center justify-center border-2 border-indigo-200">
                          <img src="https://i.pravatar.cc/150?img=33" alt="Filho" className="w-full h-full object-cover rounded-full p-0.5"/>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-800">João Silva Carvalho (Filho)</h3>
                          <p className="text-slate-500 font-medium">Matrícula: 2026001 • 1º Ano A</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                         <button className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-100 transition">Trocar Dependente</button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="border border-slate-100 bg-slate-50/50 rounded-xl p-5">
                         <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2"><AlertCircle className="w-4 h-4 text-amber-500"/> Ocorrências Recentes</h4>
                         <ul className="space-y-3">
                           <li className="flex items-start gap-3 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                             <div className="bg-red-100 text-red-600 p-2 rounded-md mt-0.5"><Calendar className="w-4 h-4"/></div>
                             <div>
                               <p className="text-sm font-bold text-slate-800">Falta Registrada - Física</p>
                               <p className="text-xs text-slate-500">Ontem, 14:00. Justificativa pendente.</p>
                             </div>
                           </li>
                           <li className="flex items-start gap-3 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                             <div className="bg-emerald-100 text-emerald-600 p-2 rounded-md mt-0.5"><Award className="w-4 h-4"/></div>
                             <div>
                               <p className="text-sm font-bold text-slate-800">Nota Excelente - História</p>
                               <p className="text-xs text-slate-500">O aluno tirou 9.2 na avaliação bimestral.</p>
                             </div>
                           </li>
                         </ul>
                      </div>

                      <div className="border border-slate-100 bg-slate-50/50 rounded-xl p-5 flex flex-col justify-center items-center text-center">
                        <MessageSquare className="w-12 h-12 text-slate-300 mb-3"/>
                        <h4 className="font-bold text-slate-700 mb-1">Contato com a Escola</h4>
                        <p className="text-sm text-slate-500 mb-4">Envie mensagens diretamente para a coordenação ou professores.</p>
                        <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-indigo-700 transition w-full max-w-xs">
                          Nova Mensagem
                        </button>
                      </div>
                    </div>
                 </div>
              </div>
            )}

            {/* Placeholder genérico para abas não implementadas completamente */}
            {['usuarios', 'relatorios', 'notas', 'materiais', 'boletim', 'notificacoes'].includes(activeTab) && (
              <div className="bg-white p-12 rounded-2xl shadow-sm border border-slate-100 text-center animate-fade-in">
                <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                  <BookOpen className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Módulo em Desenvolvimento</h3>
                <p className="text-slate-500 max-w-md mx-auto">
                  A visualização completa de <strong>{activeTab}</strong> será renderizada aqui, invocando os métodos correspondentes do backend.
                </p>
                <button 
                  onClick={() => setActiveTab('home')}
                  className="mt-6 text-indigo-600 font-bold hover:underline"
                >
                  &larr; Voltar ao Início
                </button>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}

// --- COMPONENTES AUXILIARES E TIPAGEM ---

interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  icon: any; 
  color: 'indigo' | 'emerald' | 'blue' | 'amber';
}

function StatCard({ title, value, trend, icon: Icon, color }: StatCardProps) {
  const colorMap = {
    indigo: 'bg-indigo-100 text-indigo-600',
    emerald: 'bg-emerald-100 text-emerald-600',
    blue: 'bg-blue-100 text-blue-600',
    amber: 'bg-amber-100 text-amber-600',
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${colorMap[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
          {trend}
        </span>
      </div>
      <p className="text-slate-500 text-sm font-semibold mb-1">{title}</p>
      <p className="text-3xl font-black text-slate-800">{value}</p>
    </div>
  );
}

interface RoleButtonProps {
  role: string;
  icon: any;
  color: 'indigo' | 'blue' | 'emerald' | 'orange';
  onClick: () => void;
  desc: string;
}

function RoleButton({ role, icon: Icon, color, onClick, desc }: RoleButtonProps) {
  const colorMap = {
    indigo: 'hover:border-indigo-500 hover:shadow-indigo-100',
    blue: 'hover:border-blue-500 hover:shadow-blue-100',
    emerald: 'hover:border-emerald-500 hover:shadow-emerald-100',
    orange: 'hover:border-orange-500 hover:shadow-orange-100',
  };

  const iconBgMap = {
    indigo: 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white',
    blue: 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white',
    emerald: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white',
    orange: 'bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white',
  };

  return (
    <button 
      onClick={onClick} 
      className={`group flex flex-col items-center text-center p-6 bg-white border-2 border-slate-100 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${colorMap[color]}`}
    >
      <div className={`p-4 rounded-full mb-4 transition-colors duration-300 ${iconBgMap[color]}`}>
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-1">Entrar como {role}</h3>
      <p className="text-xs text-slate-500 font-medium">{desc}</p>
    </button>
  );
}