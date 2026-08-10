import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { 
  Shield, 
  User, 
  Database, 
  Lock, 
  MapPin, 
  MessageSquare, 
  Share2, 
  Cookie, 
  Trash2, 
  AlertTriangle, 
  Mail, 
  Globe, 
  Calendar, 
  ArrowLeft, 
  CheckCircle, 
  Key, 
  Image, 
  Clock, 
  Info,
  ChevronRight,
  Menu,
  X
} from "lucide-react";

const LOGO_URL = "https://lh3.googleusercontent.com/d/16FOqiYB4xcoXfqJ_k5sxP-c58SS6_zpL";

interface Section {
  id: string;
  title: string;
  icon: any;
}

export default function PrivacyPolicy({ onBack }: { onBack: () => void }) {
  const [activeSection, setActiveSection] = useState<string>("introducao");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sections: Section[] = [
    { id: "introducao", title: "Introdução", icon: Shield },
    { id: "quem-somos", title: "1. Quem somos", icon: Info },
    { id: "dados-coletamos", title: "2. Quais dados coletamos", icon: Database },
    { id: "como-utilizamos", title: "3. Como utilizamos seus dados", icon: CheckCircle },
    { id: "login", title: "4. Login", icon: Key },
    { id: "fotos-arquivos", title: "5. Fotos e arquivos", icon: Image },
    { id: "localizacao", title: "6. Localização", icon: MapPin },
    { id: "chat", title: "7. Chat", icon: MessageSquare },
    { id: "compartilhamento", title: "8. Compartilhamento", icon: Share2 },
    { id: "seguranca", title: "9. Segurança", icon: Lock },
    { id: "retencao", title: "10. Retenção dos dados", icon: Clock },
    { id: "exclusao-conta", title: "11. Exclusão da conta", icon: Trash2 },
    { id: "cookies", title: "12. Cookies", icon: Cookie },
    { id: "direitos-usuario", title: "13. Direitos do usuário", icon: User },
    { id: "menores-idade", title: "14. Menores de idade", icon: AlertTriangle },
    { id: "alteracoes", title: "15. Alterações nesta Política", icon: Calendar },
    { id: "contato", title: "16. Contato", icon: Mail },
  ];

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveSection(id);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col font-sans selection:bg-brand-gold/30 selection:text-white">
      {/* Policy Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={LOGO_URL} 
              alt="SwapHome Logo" 
              className="h-9 w-auto object-contain cursor-pointer"
              onClick={onBack}
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] font-mono text-brand-gold/90 bg-brand-gold/10 border border-brand-gold/20 px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
              Privacidade Protegida
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 cursor-pointer"
              aria-label="Abrir menu de navegação"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 flex gap-12 relative">
        {/* Sticky Lateral Navigation (Table of Contents) */}
        <aside className="hidden lg:block w-72 shrink-0">
          <div className="sticky top-32 max-h-[calc(100vh-180px)] overflow-y-auto pr-4 scrollbar-thin">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Navegação</h3>
            <nav className="space-y-1">
              {sections.map((sec) => {
                const Icon = sec.icon;
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => scrollToSection(sec.id)}
                    className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all cursor-pointer group ${
                      isActive 
                        ? "bg-brand-gold/10 text-white font-semibold border-l-2 border-brand-gold" 
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]"
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? "text-brand-gold" : "text-slate-500 group-hover:text-slate-300"}`} />
                    <span className="text-xs truncate">{sec.title}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        <div className={`fixed inset-0 z-40 bg-slate-950/95 transition-transform duration-300 transform ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"} lg:hidden pt-24 px-6 overflow-y-auto`}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Navegar por Seções</h3>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="space-y-2 pb-12">
            {sections.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => scrollToSection(sec.id)}
                  className={`w-full text-left flex items-center gap-3 p-3.5 rounded-xl transition-all cursor-pointer ${
                    isActive 
                      ? "bg-brand-gold/15 text-white font-bold border-l-4 border-brand-gold" 
                      : "bg-white/[0.01] border border-white/5 text-slate-300 hover:bg-white/[0.03]"
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-brand-gold" : "text-slate-400"}`} />
                  <span className="text-sm">{sec.title}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Policy Core Document */}
        <section className="flex-1 max-w-3xl">
          {/* Header Card */}
          <div className="mb-12 border-b border-white/5 pb-10">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
              Política de Privacidade
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                Última atualização: Julho de 2026
              </span>
              <span className="text-slate-500">•</span>
              <span>SwapHome Corp.</span>
            </div>
          </div>

          {/* Intro Section */}
          <div id="introducao" className="glass-card p-6 sm:p-8 rounded-3xl border-white/5 mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-2xl -z-10" />
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-brand-gold" />
              A sua privacidade é muito importante para nós.
            </h3>
            <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
              <p>
                O SwapHome foi desenvolvido para conectar proprietários, corretores e imobiliárias interessados em oportunidades de permuta de imóveis de forma segura, transparente e eficiente.
              </p>
              <p>
                Esta Política de Privacidade explica quais dados coletamos, como utilizamos essas informações, com quem elas podem ser compartilhadas e quais são os seus direitos.
              </p>
              <p className="font-semibold text-white bg-white/[0.02] p-4 rounded-xl border-l-2 border-brand-gold">
                Ao utilizar o aplicativo ou o site do SwapHome, você concorda com esta Política de Privacidade.
              </p>
            </div>
          </div>

          {/* Sections List */}
          <div className="space-y-16">
            {/* Section 1: Quem somos */}
            <div id="quem-somos" className="scroll-mt-24 border-b border-white/[0.03] pb-10">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
                  <Info className="w-4 h-4 text-brand-gold" />
                </div>
                1. Quem somos
              </h2>
              <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <p>
                  O SwapHome é uma plataforma digital destinada à conexão entre pessoas físicas, corretores e imobiliárias interessadas em realizar permutas imobiliárias.
                </p>
                <p>
                  Nosso objetivo é facilitar a descoberta de oportunidades compatíveis utilizando tecnologia, inteligência de dados e ferramentas de comunicação integradas.
                </p>
                <div className="mt-6 bg-slate-900/40 p-5 rounded-2xl border border-white/5 space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Contato Oficial</h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-brand-gold" />
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase">E-mail</p>
                        <a href="mailto:proteusiep@gmail.com" className="text-xs text-white font-medium hover:underline">
                          proteusiep@gmail.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Globe className="w-4 h-4 text-brand-gold" />
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase">Site</p>
                        <a href="https://swaphome.com.br" target="_blank" rel="noopener noreferrer" className="text-xs text-white font-medium hover:underline">
                          https://swaphome.com.br
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Quais dados coletamos */}
            <div id="dados-coletamos" className="scroll-mt-24 border-b border-white/[0.03] pb-10">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
                  <Database className="w-4 h-4 text-brand-gold" />
                </div>
                2. Quais dados coletamos
              </h2>
              <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                Durante o uso da plataforma poderemos coletar os seguintes dados.
              </p>

              <div className="space-y-6">
                {/* 2.1 Dados de cadastro */}
                <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5">
                  <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                    Dados de cadastro
                  </h3>
                  <ul className="grid sm:grid-cols-2 gap-2 text-xs text-slate-300">
                    <li className="flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5 text-brand-gold shrink-0" /> Nome completo</li>
                    <li className="flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5 text-brand-gold shrink-0" /> E-mail</li>
                    <li className="flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5 text-brand-gold shrink-0" /> Telefone</li>
                    <li className="flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5 text-brand-gold shrink-0" /> Foto do perfil (opcional)</li>
                    <li className="flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5 text-brand-gold shrink-0" /> Tipo de conta (Pessoa Física ou Imobiliária)</li>
                  </ul>
                </div>

                {/* 2.2 Dados dos imóveis */}
                <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5">
                  <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                    Dados dos imóveis
                  </h3>
                  <ul className="grid sm:grid-cols-2 gap-2 text-xs text-slate-300">
                    <li className="flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5 text-brand-gold shrink-0" /> Endereço</li>
                    <li className="flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5 text-brand-gold shrink-0" /> Cidade</li>
                    <li className="flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5 text-brand-gold shrink-0" /> Estado</li>
                    <li className="flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5 text-brand-gold shrink-0" /> Bairro</li>
                    <li className="flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5 text-brand-gold shrink-0" /> Tipo do imóvel</li>
                    <li className="flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5 text-brand-gold shrink-0" /> Valor</li>
                    <li className="flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5 text-brand-gold shrink-0" /> Área</li>
                    <li className="flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5 text-brand-gold shrink-0" /> Características</li>
                    <li className="flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5 text-brand-gold shrink-0" /> Fotos enviadas pelo usuário</li>
                    <li className="flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5 text-brand-gold shrink-0" /> Vídeos enviadas pelo usuário</li>
                    <li className="flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5 text-brand-gold shrink-0" /> Descrição do imóvel</li>
                  </ul>
                </div>

                {/* 2.3 Dados de utilização */}
                <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5">
                  <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                    Dados de utilização
                  </h3>
                  <ul className="grid sm:grid-cols-2 gap-2 text-xs text-slate-300">
                    <li className="flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5 text-brand-gold shrink-0" /> Curtidas (Likes)</li>
                    <li className="flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5 text-brand-gold shrink-0" /> Deslikes</li>
                    <li className="flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5 text-brand-gold shrink-0" /> Matches realizados</li>
                    <li className="flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5 text-brand-gold shrink-0" /> Conversas pelo chat</li>
                    <li className="flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5 text-brand-gold shrink-0" /> Histórico de utilização</li>
                    <li className="flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5 text-brand-gold shrink-0" /> Preferências de busca</li>
                    <li className="flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5 text-brand-gold shrink-0" /> Configurações do perfil</li>
                  </ul>
                </div>

                {/* 2.4 Dados técnicos */}
                <div className="p-5 rounded-2xl bg-white/[0.01] border border-white/5">
                  <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                    Dados técnicos
                  </h3>
                  <p className="text-[11px] text-slate-500 mb-3">Podemos coletar automaticamente:</p>
                  <ul className="grid sm:grid-cols-2 gap-2 text-xs text-slate-300">
                    <li className="flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5 text-brand-gold shrink-0" /> Endereço IP</li>
                    <li className="flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5 text-brand-gold shrink-0" /> Identificador do dispositivo</li>
                    <li className="flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5 text-brand-gold shrink-0" /> Modelo do aparelho</li>
                    <li className="flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5 text-brand-gold shrink-0" /> Sistema operacional</li>
                    <li className="flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5 text-brand-gold shrink-0" /> Versão do aplicativo</li>
                    <li className="flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5 text-brand-gold shrink-0" /> Data e horário de acesso</li>
                    <li className="flex items-center gap-2"><ChevronRight className="w-3.5 h-3.5 text-brand-gold shrink-0" /> Logs de erros</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 3: Como utilizamos seus dados */}
            <div id="como-utilizamos" className="scroll-mt-24 border-b border-white/[0.03] pb-10">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
                  <CheckCircle className="w-4 h-4 text-brand-gold" />
                </div>
                3. Como utilizamos seus dados
              </h2>
              <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                Utilizamos seus dados para:
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                {[
                  "criar sua conta",
                  "identificar o usuário",
                  "permitir login",
                  "conectar imóveis compatíveis",
                  "realizar o sistema de Match",
                  "disponibilizar o chat",
                  "permitir contato entre usuários",
                  "melhorar a experiência do aplicativo",
                  "oferecer suporte",
                  "enviar notificações importantes",
                  "prevenir fraudes",
                  "cumprir obrigações legais"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.01] border border-white/5">
                    <CheckCircle className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
              <p className="font-extrabold text-brand-gold text-sm bg-brand-gold/5 p-4 rounded-xl border border-brand-gold/20 flex items-center gap-2">
                <Shield className="w-4 h-4 shrink-0" />
                Jamais venderemos seus dados pessoais.
              </p>
            </div>

            {/* Section 4: Login */}
            <div id="login" className="scroll-mt-24 border-b border-white/[0.03] pb-10">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
                  <Key className="w-4 h-4 text-brand-gold" />
                </div>
                4. Login
              </h2>
              <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <p>
                  O aplicativo permite autenticação utilizando:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-300">
                  <li>Conta Google</li>
                  <li>E-mail e senha</li>
                </ul>
                <p>
                  No iOS também poderá ser utilizado:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-300">
                  <li>Login com Apple</li>
                </ul>
                <p className="text-xs text-slate-500 italic mt-4">
                  Esses provedores possuem suas próprias Políticas de Privacidade.
                </p>
              </div>
            </div>

            {/* Section 5: Fotos e arquivos enviados */}
            <div id="fotos-arquivos" className="scroll-mt-24 border-b border-white/[0.03] pb-10">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
                  <Image className="w-4 h-4 text-brand-gold" />
                </div>
                5. Fotos e arquivos enviados
              </h2>
              <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <p>
                  As fotos enviadas pelos usuários são utilizadas exclusivamente para divulgação dos imóveis cadastrados.
                </p>
                <p>
                  As imagens permanecem armazenadas em ambiente seguro.
                </p>
                <p className="font-semibold text-white">
                  O usuário é responsável pelos arquivos enviados.
                </p>
              </div>
            </div>

            {/* Section 6: Localização */}
            <div id="localizacao" className="scroll-mt-24 border-b border-white/[0.03] pb-10">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
                  <MapPin className="w-4 h-4 text-brand-gold" />
                </div>
                6. Localização
              </h2>
              <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <p>
                  O aplicativo poderá utilizar a localização do dispositivo para melhorar a busca por imóveis próximos.
                </p>
                <p className="font-semibold text-white bg-white/[0.02] p-4 rounded-xl border-l-2 border-brand-gold">
                  A localização somente será utilizada mediante autorização do usuário.
                </p>
              </div>
            </div>

            {/* Section 7: Chat */}
            <div id="chat" className="scroll-mt-24 border-b border-white/[0.03] pb-10">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
                  <MessageSquare className="w-4 h-4 text-brand-gold" />
                </div>
                7. Chat
              </h2>
              <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <p>
                  O SwapHome oferece um sistema interno de mensagens.
                </p>
                <p>
                  As mensagens são armazenadas para permitir o funcionamento da plataforma.
                </p>
                <p>
                  Os usuários são responsáveis pelo conteúdo compartilhado.
                </p>
                <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/15 text-xs text-red-300 space-y-2 mt-4">
                  <p className="font-bold flex items-center gap-2 text-red-400">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    É proibido utilizar o chat para:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>conteúdo ofensivo;</li>
                    <li>golpes;</li>
                    <li>spam;</li>
                    <li>atividades ilegais.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 8: Compartilhamento de dados */}
            <div id="compartilhamento" className="scroll-mt-24 border-b border-white/[0.03] pb-10">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
                  <Share2 className="w-4 h-4 text-brand-gold" />
                </div>
                8. Compartilhamento de dados
              </h2>
              <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <p>
                  O SwapHome poderá compartilhar informações apenas quando necessário.
                </p>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Exemplos de compartilhamento:</p>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li>provedores de hospedagem;</li>
                  <li>serviços de autenticação;</li>
                  <li>processamento de pagamentos;</li>
                  <li>armazenamento de arquivos;</li>
                  <li>autoridades públicas quando exigido por lei.</li>
                </ul>
                <p className="font-bold text-brand-gold bg-brand-gold/5 p-4 rounded-xl border border-brand-gold/15 inline-block text-xs">
                  💡 Jamais comercializamos dados pessoais.
                </p>
              </div>
            </div>

            {/* Section 9: Segurança */}
            <div id="seguranca" className="scroll-mt-24 border-b border-white/[0.03] pb-10">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
                  <Lock className="w-4 h-4 text-brand-gold" />
                </div>
                9. Segurança
              </h2>
              <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <p>
                  Adotamos medidas técnicas para proteger os dados dos usuários.
                </p>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Entre as medidas adotadas:</p>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li>conexões criptografadas (HTTPS);</li>
                  <li>autenticação segura;</li>
                  <li>controle de acesso;</li>
                  <li>armazenamento protegido;</li>
                  <li>monitoramento de atividades suspeitas.</li>
                </ul>
                <p className="text-xs text-slate-400 italic">
                  Apesar disso, nenhum sistema é completamente imune a riscos.
                </p>
              </div>
            </div>

            {/* Section 10: Retenção dos dados */}
            <div id="retencao" className="scroll-mt-24 border-b border-white/[0.03] pb-10">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
                  <Clock className="w-4 h-4 text-brand-gold" />
                </div>
                10. Retenção dos dados
              </h2>
              <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <p>
                  Os dados permanecem armazenados enquanto forem necessários para:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs">
                  <li>funcionamento da plataforma;</li>
                  <li>cumprimento de obrigações legais;</li>
                  <li>resolução de conflitos;</li>
                  <li>segurança do sistema.</li>
                </ul>
              </div>
            </div>

            {/* Section 11: Exclusão da conta */}
            <div id="exclusao-conta" className="scroll-mt-24 border-b border-white/[0.03] pb-10">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
                  <Trash2 className="w-4 h-4 text-brand-gold" />
                </div>
                11. Exclusão da conta
              </h2>
              <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <p>
                  O usuário poderá solicitar a exclusão da conta diretamente pelo aplicativo ou entrando em contato pelo e-mail:
                </p>
                <div className="bg-slate-900/60 p-4 rounded-xl border border-white/5 inline-flex items-center gap-2">
                  <Mail className="w-4 h-4 text-brand-gold" />
                  <a href="mailto:proteusiep@gmail.com" className="text-white font-bold hover:underline">
                    proteusiep@gmail.com
                  </a>
                </div>
                <p>
                  Após a solicitação:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs">
                  <li>a conta será removida;</li>
                  <li>os imóveis cadastrados serão excluídos;</li>
                  <li>os dados pessoais serão removidos, respeitando obrigações legais.</li>
                </ul>
                <p className="text-xs text-slate-500 italic">
                  Algumas informações poderão permanecer armazenadas pelo prazo exigido pela legislação.
                </p>
              </div>
            </div>

            {/* Section 12: Cookies */}
            <div id="cookies" className="scroll-mt-24 border-b border-white/[0.03] pb-10">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
                  <Cookie className="w-4 h-4 text-brand-gold" />
                </div>
                12. Cookies
              </h2>
              <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <p>
                  Nosso site poderá utilizar cookies para:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs">
                  <li>melhorar a navegação;</li>
                  <li>manter sessões;</li>
                  <li>estatísticas de acesso;</li>
                  <li>melhorar desempenho.</li>
                </ul>
                <p>
                  O usuário poderá desativar os cookies no navegador.
                </p>
              </div>
            </div>

            {/* Section 13: Direitos do usuário */}
            <div id="direitos-usuario" className="scroll-mt-24 border-b border-white/[0.03] pb-10">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
                  <User className="w-4 h-4 text-brand-gold" />
                </div>
                13. Direitos do usuário
              </h2>
              <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <p>
                  Nos termos da Lei Geral de Proteção de Dados (LGPD), o usuário poderá solicitar:
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    "confirmação da existência de tratamento",
                    "acesso aos dados",
                    "correção de informações",
                    "atualização cadastral",
                    "anonimização",
                    "exclusão dos dados",
                    "portabilidade",
                    "revogação do consentimento"
                  ].map((right, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-3 bg-white/[0.01] border border-white/5 rounded-xl text-xs text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                      <span>{right}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4">
                  Solicitações poderão ser feitas através do e-mail:
                </p>
                <div className="bg-slate-900/60 p-4 rounded-xl border border-white/5 inline-flex items-center gap-2">
                  <Mail className="w-4 h-4 text-brand-gold" />
                  <a href="mailto:proteusiep@gmail.com" className="text-white font-bold hover:underline">
                    proteusiep@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Section 14: Menores de idade */}
            <div id="menores-idade" className="scroll-mt-24 border-b border-white/[0.03] pb-10">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
                  <AlertTriangle className="w-4 h-4 text-brand-gold" />
                </div>
                14. Menores de idade
              </h2>
              <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <p>
                  O SwapHome destina-se exclusivamente a usuários maiores de 18 anos.
                </p>
                <p className="font-semibold text-white bg-red-500/5 border border-red-500/15 p-4 rounded-xl text-xs text-red-300">
                  Caso seja identificado cadastro realizado por menor de idade sem autorização legal, a conta poderá ser removida.
                </p>
              </div>
            </div>

            {/* Section 15: Alterações nesta Política */}
            <div id="alteracoes" className="scroll-mt-24 border-b border-white/[0.03] pb-10">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
                  <Calendar className="w-4 h-4 text-brand-gold" />
                </div>
                15. Alterações nesta Política
              </h2>
              <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <p>
                  Esta Política poderá ser atualizada periodicamente.
                </p>
                <p>
                  Sempre que ocorrerem alterações relevantes, informaremos os usuários através do aplicativo ou do site.
                </p>
              </div>
            </div>

            {/* Section 16: Contato */}
            <div id="contato" className="scroll-mt-24 pb-10">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
                  <Mail className="w-4 h-4 text-brand-gold" />
                </div>
                16. Contato
              </h2>
              <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <p>
                  Em caso de dúvidas sobre esta Política de Privacidade:
                </p>
                <div className="p-6 bg-slate-900/60 rounded-3xl border border-white/5 space-y-4">
                  <h4 className="font-bold text-white text-base">SwapHome</h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2.5">
                      <Globe className="w-4.5 h-4.5 text-brand-gold" />
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase">Site</p>
                        <a href="https://swaphome.com.br" target="_blank" rel="noopener noreferrer" className="text-xs text-white font-medium hover:underline">
                          https://swaphome.com.br
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Mail className="w-4.5 h-4.5 text-brand-gold" />
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase">E-mail</p>
                        <a href="mailto:proteusiep@gmail.com" className="text-xs text-white font-medium hover:underline">
                          proteusiep@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Institutional Footer */}
      <footer className="mt-auto bg-slate-950 border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img 
              src={LOGO_URL} 
              alt="SwapHome Logo" 
              className="h-8 w-auto object-contain cursor-pointer" 
              onClick={onBack}
              referrerPolicy="no-referrer"
            />
            <span className="text-slate-500 font-mono text-xs">|</span>
            <span className="text-slate-400 text-xs">Política de Privacidade</span>
          </div>

          <p className="text-slate-500 text-xs text-center md:text-right">
            © 2026 SwapHome. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
