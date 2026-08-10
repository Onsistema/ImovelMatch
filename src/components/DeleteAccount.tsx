import { motion } from "motion/react";
import { useState, useEffect, FormEvent } from "react";
import { 
  Shield, 
  Trash2, 
  Mail, 
  AlertTriangle, 
  FileText, 
  MessageSquare, 
  Database, 
  Clock, 
  HelpCircle, 
  User, 
  Globe, 
  ArrowLeft, 
  CheckCircle, 
  ChevronRight,
  Menu,
  X,
  Smartphone,
  Check,
  Calendar,
  Lock,
  Sparkles
} from "lucide-react";

const LOGO_URL = "https://lh3.googleusercontent.com/d/16FOqiYB4xcoXfqJ_k5sxP-c58SS6_zpL";

interface Section {
  id: string;
  title: string;
  icon: any;
}

export default function DeleteAccount({ onBack }: { onBack: () => void }) {
  const [activeSection, setActiveSection] = useState<string>("introducao");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const sections: Section[] = [
    { id: "introducao", title: "Introdução", icon: Shield },
    { id: "como-excluir-app", title: "1. Excluir pelo App", icon: Smartphone },
    { id: "solicitacao-email", title: "2. Solicitar por E-mail", icon: Mail },
    { id: "dados-excluidos", title: "3. Dados Excluídos", icon: Trash2 },
    { id: "mensagens-conversas", title: "4. Mensagens e Conversas", icon: MessageSquare },
    { id: "dados-mantidos", title: "5. Dados Mantidos", icon: Database },
    { id: "prazo-processamento", title: "6. Prazo de Processamento", icon: Clock },
    { id: "pos-exclusao", title: "7. O que acontece após", icon: HelpCircle },
    { id: "exclusao-parcial", title: "8. Exclusão Parcial", icon: FileText },
    { id: "seguranca-solicitacao", title: "9. Segurança da Solicitação", icon: Lock },
    { id: "direitos-usuario", title: "10. Direitos do Usuário (LGPD)", icon: User },
    { id: "contato", title: "11. Contatos e Informações", icon: Globe },
    { id: "formulario-solicitacao", title: "Formulário de Solicitação", icon: Sparkles }
  ];

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) {
      setErrorMsg("Por favor, preencha o seu nome completo.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Por favor, preencha um e-mail válido.");
      return;
    }
    if (!confirmed) {
      setErrorMsg("Você deve marcar a caixa de confirmação para prosseguir.");
      return;
    }

    setIsSubmitting(true);

    // Simulate backend submission
    setTimeout(() => {
      /* 
         INTEGRATION CORNER:
         To connect with Supabase, API, or service of email:
         
         const { error } = await supabase
           .from('account_deletion_requests')
           .insert([{ 
              name, 
              email, 
              phone, 
              reason, 
              confirmed_at: new Date().toISOString() 
           }]);
         
         or make a POST request:
         await fetch('/api/delete-request', {
           method: 'POST',
           body: JSON.stringify({ name, email, phone, reason })
         });
      */
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col font-sans selection:bg-brand-gold/30 selection:text-white">
      {/* Header Top Bar */}
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
            <span className="text-[11px] font-mono text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
              Exclusão de Dados
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
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight">
              Exclusão de Conta e Dados — SwapHome
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed max-w-2xl mb-6">
              Solicite a exclusão definitiva da sua conta e dos dados associados ao aplicativo SwapHome.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                Compatível com Google Play & LGPD
              </span>
            </div>
          </div>

          {/* Highlight Warning Card */}
          <div className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-2xl mb-12 flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-amber-400 mb-1">AVISO IMPORTANTE</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                A exclusão da conta é definitiva. Antes de confirmar, verifique se deseja salvar alguma informação importante.
              </p>
            </div>
          </div>

          {/* Intro Paragraph */}
          <div id="introducao" className="space-y-4 text-slate-300 text-sm leading-relaxed scroll-mt-24 mb-12">
            <p>
              O SwapHome valoriza a privacidade dos seus usuários. Caso você não queira mais utilizar nossa plataforma para permutas imobiliárias, garantimos seu direito de remover permanentemente sua conta e todos os dados armazenados associados.
            </p>
            <p>
              Abaixo apresentamos todas as informações de como proceder, quais dados são eliminados e quais prazos são aplicados em conformidade com as diretrizes do Google Play e a Lei Geral de Proteção de Dados (LGPD).
            </p>
          </div>

          {/* Core Content Sections */}
          <div className="space-y-16">
            
            {/* Seção 1 — Como excluir sua conta pelo aplicativo */}
            <div id="como-excluir-app" className="scroll-mt-24 border-b border-white/[0.03] pb-10">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
                  <Smartphone className="w-4 h-4 text-brand-gold" />
                </div>
                Seção 1 — Como excluir sua conta pelo aplicativo
              </h2>
              <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <p>
                  O caminho mais rápido e seguro para realizar a exclusão é diretamente pelas configurações do seu perfil de usuário no app:
                </p>
                
                <ol className="relative border-l border-white/10 ml-3 space-y-6">
                  {[
                    "Abra o aplicativo SwapHome.",
                    "Acesse a aba Perfil.",
                    "Entre em Configurações.",
                    "Selecione Privacidade e Segurança.",
                    "Toque em Excluir minha conta.",
                    "Leia as informações apresentadas.",
                    "Confirme a exclusão da conta."
                  ].map((step, idx) => (
                    <li key={idx} className="ml-6">
                      <span className="absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full bg-slate-950 border border-brand-gold/40 text-[10px] text-brand-gold font-bold">
                        {idx + 1}
                      </span>
                      <p className="text-xs text-slate-300">{step}</p>
                    </li>
                  ))}
                </ol>
                <p className="text-xs text-slate-400 bg-white/[0.01] p-3 rounded-lg border border-white/5 italic">
                  Após a confirmação, a solicitação será registrada para processamento imediato pela nossa equipe.
                </p>
              </div>
            </div>

            {/* Seção 2 — Solicitação pelo site ou e-mail */}
            <div id="solicitacao-email" className="scroll-mt-24 border-b border-white/[0.03] pb-10">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
                  <Mail className="w-4 h-4 text-brand-gold" />
                </div>
                Seção 2 — Solicitação pelo site ou e-mail
              </h2>
              <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <p>
                  Caso você não consiga acessar o aplicativo ou prefira fazer a requisição de outra forma, poderá solicitar a exclusão enviando um e-mail para:
                </p>
                
                <div className="bg-slate-900/60 p-5 rounded-2xl border border-white/5 space-y-3 max-w-md">
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Informações do E-mail</h4>
                  <div className="space-y-1.5 text-xs">
                    <p className="text-slate-400"><span className="text-slate-500">Destinatário:</span> contato@swaphome.com.br</p>
                    <p className="text-slate-400"><span className="text-slate-500">Assunto sugerido:</span> Solicitação de exclusão de conta — SwapHome</p>
                  </div>
                </div>

                <p className="text-xs">
                  Para que possamos realizar a exclusão com segurança, você deverá informar no corpo do e-mail:
                </p>

                <ul className="grid sm:grid-cols-2 gap-2 text-xs text-slate-400 pl-2">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-brand-gold shrink-0" /> Nome completo</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-brand-gold shrink-0" /> E-mail utilizado no cadastro</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-brand-gold shrink-0" /> Número de telefone (se aplicável)</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-brand-gold shrink-0" /> Confirmação expressa do desejo de exclusão</li>
                </ul>

                <div className="pt-4">
                  <a 
                    href="mailto:contato@swaphome.com.br?subject=Solicitação%20de%20exclusão%20de%20conta%20-%20SwapHome"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-gold text-brand-dark font-extrabold text-xs tracking-wider uppercase hover:opacity-95 transition-all shadow-lg shadow-brand-gold/10"
                  >
                    <Mail className="w-4 h-4" />
                    Solicitar exclusão por e-mail
                  </a>
                </div>
              </div>
            </div>

            {/* Seção 3 — Dados que serão excluídos */}
            <div id="dados-excluidos" className="scroll-mt-24 border-b border-white/[0.03] pb-10">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
                  <Trash2 className="w-4 h-4 text-brand-gold" />
                </div>
                Seção 3 — Dados que serão excluídos
              </h2>
              <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <p>
                  Após a conclusão do processo de exclusão de conta, todos os seguintes dados cadastrais e operacionais do usuário serão eliminados:
                </p>

                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    "Nome e E-mail de cadastro",
                    "Número de telefone",
                    "Foto de perfil",
                    "Configurações e preferências da conta",
                    "Imóveis cadastrados e seu descritivo",
                    "Fotos e vídeos dos imóveis",
                    "Curtidas (likes) e descurtidas",
                    "Matches realizados",
                    "Imóveis salvos nos favoritos",
                    "Histórico de uso associado ao perfil",
                    "Notificações recebidas",
                    "Dados pessoais vinculados à conta"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.01] border border-white/5 text-xs text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Seção 4 — Mensagens e conversas */}
            <div id="mensagens-conversas" className="scroll-mt-24 border-b border-white/[0.03] pb-10">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
                  <MessageSquare className="w-4 h-4 text-brand-gold" />
                </div>
                Seção 4 — Mensagens e conversas
              </h2>
              <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <p>
                  As mensagens enviadas em conversas bilaterais poderão ser excluídas, anonimizadas ou mantidas por período limitado quando isso for estritamente necessário para:
                </p>

                <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-300">
                  <li>Segurança e integridade da plataforma;</li>
                  <li>Análise de denúncias de infração de termos de uso;</li>
                  <li>Prevenção de fraudes e golpes;</li>
                  <li>Cumprimento de obrigações legais;</li>
                  <li>Resolução de conflitos de qualquer natureza.</li>
                </ul>

                <p className="text-xs text-slate-400">
                  Quando mantidas para as finalidades acima descritas, essas informações serão protegidas por criptografia de dados e acessíveis apenas sob controle estrito.
                </p>
              </div>
            </div>

            {/* Seção 5 — Dados que poderão ser mantidos */}
            <div id="dados-mantidos" className="scroll-mt-24 border-b border-white/[0.03] pb-10">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
                  <Database className="w-4 h-4 text-brand-gold" />
                </div>
                Seção 5 — Dados que poderão ser mantidos
              </h2>
              <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <p>
                  Conforme autorizado pela legislação brasileira e exigido por órgãos reguladores, alguns dados específicos poderão ser mantidos pelo período necessário para:
                </p>

                <ul className="list-disc pl-5 space-y-2 text-xs text-slate-300">
                  <li><strong>Cumprimento de obrigações legais ou regulatórias:</strong> manutenção de logs de conexão nos termos do Marco Civil da Internet;</li>
                  <li><strong>Prevenção de fraudes e segurança dos usuários:</strong> identificadores técnicos que impeçam novos acessos em caso de banimento por má conduta;</li>
                  <li><strong>Defesa jurídica:</strong> preservação de dados necessários para instruir processos judiciais ou administrativos;</li>
                  <li><strong>Registros financeiros e fiscais:</strong> guarda de notas fiscais ou transações de assinatura (quando houver) pelo prazo fiscal obrigatório.</li>
                </ul>

                <p className="text-xs text-brand-gold italic">
                  Sempre que aplicável, esses dados mantidos passarão por processos de anonimização ou terão seu acesso restrito unicamente a administradores de segurança.
                </p>
              </div>
            </div>

            {/* Seção 6 — Prazo de processamento */}
            <div id="prazo-processamento" className="scroll-mt-24 border-b border-white/[0.03] pb-10">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
                  <Clock className="w-4 h-4 text-brand-gold" />
                </div>
                Seção 6 — Prazo de processamento
              </h2>
              <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <p className="font-semibold text-white">
                  A solicitação de exclusão será analisada e totalmente processada em até 30 dias, salvo quando houver obrigação legal que exija prazo diferente.
                </p>
                <p>
                  Durante esse período de processamento, a conta poderá ficar imediatamente desativada e indisponível para qualquer tipo de visualização ou login na plataforma por parte do usuário ou terceiros.
                </p>
                <p className="text-xs text-red-400 font-bold bg-red-500/5 p-4 rounded-xl border border-red-500/10">
                  Importante: Quando o processo de exclusão for concluído pelo sistema, a exclusão será definitiva e não poderá ser desfeita sob hipótese alguma.
                </p>
              </div>
            </div>

            {/* Seção 7 — O que acontece após a exclusão */}
            <div id="pos-exclusao" className="scroll-mt-24 border-b border-white/[0.03] pb-10">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
                  <HelpCircle className="w-4 h-4 text-brand-gold" />
                </div>
                Seção 7 — O que acontece após a exclusão
              </h2>
              <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <p>
                  Uma vez que a exclusão for totalmente efetivada:
                </p>

                <div className="grid sm:grid-cols-2 gap-3.5">
                  {[
                    "Você perderá instantaneamente o acesso à conta.",
                    "Seus imóveis cadastrados deixarão de aparecer para buscas.",
                    "Todos os seus matches, curtidas e favoritos serão permanentemente apagados.",
                    "O seu perfil de usuário não ficará visível em nenhuma tela.",
                    "Os dados excluídos não poderão ser recuperados pelo suporte técnico.",
                    "Uma nova conta poderá ser criada futuramente utilizando os mesmos dados (salvo histórico de bloqueios por segurança)."
                  ].map((text, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white/[0.01] border border-white/5 text-xs text-slate-300 flex items-start gap-2.5">
                      <ChevronRight className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Seção 8 — Exclusão parcial de dados */}
            <div id="exclusao-parcial" className="scroll-mt-24 border-b border-white/[0.03] pb-10">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
                  <FileText className="w-4 h-4 text-brand-gold" />
                </div>
                Seção 8 — Exclusão parcial de dados
              </h2>
              <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <p>
                  Caso você não queira excluir toda a sua conta, mas apenas limpar determinados dados cadastrados ou remover imóveis específicos, poderá fazer isso diretamente nas telas correspondentes do aplicativo SwapHome.
                </p>
                <p>
                  Alternativamente, você poderá entrar em contato com a equipe do SwapHome para solicitar a correção ou exclusão de determinados dados pessoais, quando permitido pela legislação.
                </p>
                <div className="p-4 rounded-xl bg-white/[0.01] border border-white/5 inline-flex items-center gap-2 text-xs">
                  <Mail className="w-4 h-4 text-brand-gold" />
                  <span className="text-slate-400">Envie solicitações para:</span>
                  <a href="mailto:contato@swaphome.com.br" className="text-white font-bold hover:underline">
                    contato@swaphome.com.br
                  </a>
                </div>
              </div>
            </div>

            {/* Seção 9 — Segurança da solicitação */}
            <div id="seguranca-solicitacao" className="scroll-mt-24 border-b border-white/[0.03] pb-10">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
                  <Lock className="w-4 h-4 text-brand-gold" />
                </div>
                Seção 9 — Segurança da solicitação
              </h2>
              <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <p>
                  Para proteger a segurança da sua conta contra invasões e solicitações de exclusão indevidas feitas por terceiros mal-intencionados, o SwapHome reserva-se o direito de solicitar informações adicionais de confirmação de identidade antes de acatar o pedido.
                </p>
                <p className="font-semibold text-white bg-slate-900/60 p-4 rounded-xl border-l-2 border-brand-gold text-xs">
                  ⚠️ Importante: O SwapHome NUNCA solicitará a senha da sua conta ou dados bancários por e-mail, telefone, WhatsApp ou SMS.
                </p>
              </div>
            </div>

            {/* Seção 10 — Direitos do usuário */}
            <div id="direitos-usuario" className="scroll-mt-24 border-b border-white/[0.03] pb-10">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
                  <User className="w-4 h-4 text-brand-gold" />
                </div>
                Seção 10 — Direitos do usuário
              </h2>
              <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <p>
                  De acordo com a Lei Geral de Proteção de Dados (LGPD), como titular de dados pessoais, você pode solicitar a qualquer momento:
                </p>

                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    "Confirmação do tratamento de seus dados",
                    "Acesso completo aos dados pessoais mantidos",
                    "Correção de dados incompletos ou inexatos",
                    "Anonimização, bloqueio ou eliminação de dados desnecessários",
                    "Eliminação de dados tratados com o seu consentimento",
                    "Portabilidade dos dados para outra plataforma",
                    "Revogação do consentimento concedido anteriormente",
                    "Informações sobre o compartilhamento de seus dados"
                  ].map((right, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.01] border border-white/5 text-xs text-slate-300">
                      <CheckCircle className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                      <span>{right}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Seção 11 — Contato */}
            <div id="contato" className="scroll-mt-24 border-b border-white/[0.03] pb-10">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
                  <Globe className="w-4 h-4 text-brand-gold" />
                </div>
                Seção 11 — Contato
              </h2>
              <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <p>
                  Caso tenha restado qualquer dúvida sobre o processo de exclusão de dados pessoais ou pretenda exercer os seus direitos, entre em contato através dos nossos canais de atendimento:
                </p>

                <div className="p-6 bg-slate-900/40 border border-white/5 rounded-3xl space-y-4">
                  <h4 className="font-bold text-white text-base">SwapHome</h4>
                  <div className="grid sm:grid-cols-2 gap-4 text-xs">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase">E-mail de suporte</p>
                        <a href="mailto:contato@swaphome.com.br" className="text-white hover:underline font-bold">
                          contato@swaphome.com.br
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-brand-gold shrink-0" />
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase">Página Inicial</p>
                        <a href="https://swaphome.com.br" target="_blank" rel="noopener noreferrer" className="text-white hover:underline font-bold">
                          https://swaphome.com.br
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-white/5 flex items-center gap-2 text-xs">
                    <Shield className="w-4 h-4 text-brand-gold shrink-0" />
                    <span className="text-slate-400">Política de Privacidade Oficial:</span>
                    <a href="https://swaphome.com.br/privacidade" onClick={(e) => { e.preventDefault(); onBack(); }} className="text-brand-gold hover:underline font-bold">
                      https://swaphome.com.br/privacidade
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulario de Solicitacao */}
            <div id="formulario-solicitacao" className="scroll-mt-24">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
                  <Sparkles className="w-4 h-4 text-brand-gold" />
                </div>
                Formulário de Solicitação
              </h2>
              
              <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 relative overflow-hidden bg-slate-950/40">
                <div className="absolute top-0 right-0 w-48 h-48 bg-red-500/[0.02] rounded-full blur-3xl pointer-events-none" />
                
                <h3 className="text-base font-bold text-white mb-2">Preencha os dados do cadastro</h3>
                <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                  Para agilizar a exclusão da sua conta, você pode preencher o formulário abaixo. Nosso sistema registrará sua intenção e nossa equipe entrará em contato para confirmar a segurança da operação.
                </p>

                {submitSuccess ? (
                  <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h4 className="text-sm font-bold text-white">Solicitação enviada com sucesso</h4>
                    <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
                      Solicitação recebida. Nossa equipe analisará o pedido e poderá entrar em contato para confirmar sua identidade.
                    </p>
                    <button 
                      onClick={() => {
                        setName("");
                        setEmail("");
                        setPhone("");
                        setReason("");
                        setConfirmed(false);
                        setSubmitSuccess(false);
                      }}
                      className="mt-2 text-xs text-brand-gold font-bold hover:underline cursor-pointer"
                    >
                      Enviar outra solicitação
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {errorMsg && (
                      <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/25 text-xs text-red-300 font-bold flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <div className="space-y-1">
                      <label htmlFor="name-input" className="block text-xs font-bold text-slate-400">Nome completo <span className="text-red-400">*</span></label>
                      <input 
                        id="name-input"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Insira seu nome completo"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-white/5 focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/20 text-slate-100 text-xs transition-all outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="email-input" className="block text-xs font-bold text-slate-400">E-mail utilizado na conta <span className="text-red-400">*</span></label>
                      <input 
                        id="email-input"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seu-email@dominio.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-white/5 focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/20 text-slate-100 text-xs transition-all outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="phone-input" className="block text-xs font-bold text-slate-400">Telefone <span className="text-slate-500 font-normal">(opcional)</span></label>
                      <input 
                        id="phone-input"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(00) 00000-0000"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-white/5 focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/20 text-slate-100 text-xs transition-all outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="reason-input" className="block text-xs font-bold text-slate-400">Motivo da exclusão <span className="text-slate-500 font-normal">(opcional)</span></label>
                      <textarea 
                        id="reason-input"
                        rows={3}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Nos ajude a melhorar. Por que você está nos deixando?"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-white/5 focus:border-brand-gold/50 focus:ring-1 focus:ring-brand-gold/20 text-slate-100 text-xs transition-all outline-none resize-none"
                      />
                    </div>

                    {/* Checkbox Confirmo */}
                    <div className="flex items-start gap-3 pt-2">
                      <div className="flex items-center h-5">
                        <input 
                          id="confirm-checkbox"
                          type="checkbox"
                          checked={confirmed}
                          onChange={(e) => setConfirmed(e.target.checked)}
                          className="w-4 h-4 rounded border-white/10 bg-slate-900 text-brand-gold focus:ring-brand-gold/20 cursor-pointer"
                        />
                      </div>
                      <label htmlFor="confirm-checkbox" className="text-[11px] text-slate-400 leading-relaxed select-none cursor-pointer">
                        Confirmo que desejo solicitar a exclusão permanente da minha conta SwapHome e compreendo que os dados excluídos não poderão ser recuperados.
                      </label>
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-4 bg-red-500 hover:bg-red-600 disabled:bg-red-500/40 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-red-500/10 cursor-pointer mt-4 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Processando...</span>
                        </>
                      ) : (
                        <>
                          <Trash2 className="w-4 h-4" />
                          <span>Enviar solicitação de exclusão</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
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
            <span className="text-slate-400 text-xs">Exclusão de Conta</span>
          </div>

          <nav className="flex gap-6 text-[11px] font-bold uppercase tracking-widest text-slate-500">
            <a href="/privacidade" onClick={(e) => { e.preventDefault(); onBack(); }} className="hover:text-brand-gold transition-colors cursor-pointer">Política de Privacidade</a>
            <a href="#" onClick={(e) => { e.preventDefault(); }} className="hover:text-brand-gold transition-colors">Termos de Uso</a>
            <a href="mailto:contato@swaphome.com.br" className="hover:text-brand-gold transition-colors">Contato</a>
            <button onClick={onBack} className="hover:text-brand-gold transition-colors cursor-pointer bg-transparent border-none text-[11px] font-bold uppercase tracking-widest text-slate-500">Voltar ao site</button>
          </nav>

          <p className="text-slate-500 text-xs text-center md:text-right">
            © 2026 SwapHome. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
