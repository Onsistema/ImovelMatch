import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  Repeat, 
  Users, 
  Zap, 
  MessageSquare,
  MapPin,
  ExternalLink,
  Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import BorderGlow from './BorderGlow';
import ExitIntentModal from './ExitIntentModal';
import WhatsAppButton from './WhatsAppButton';

const APP_URL = 'https://app.swaphome.com.br';

interface LandingPageLPProps {
  onBack?: () => void;
}

interface SavedDoubt {
  id: string;
  name: string;
  contact: string;
  question: string;
  date: string;
}

export const LandingPageLP: React.FC<LandingPageLPProps> = ({ onBack }) => {
  // SEO optimization on mount
  useEffect(() => {
    const originalTitle = document.title;
    document.title = "SwapHome | Permuta Imobiliária para Corretores e Imobiliárias";

    // Set meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    const originalDesc = metaDesc ? metaDesc.getAttribute("content") : "";
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      'Cruze oportunidades de permuta imobiliária com mais agilidade. A SwapHome conecta corretores e imobiliárias, organiza interesses de troca e ajuda a encontrar combinações entre imóveis.'
    );

    // Set meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute(
      'content',
      'imobiliaria campinas, corretor de imoveis campinas, permuta de imoveis, plataforma de permuta imobiliaria, parcerias imobiliarias, permuta apartamento campinas, permuta casa campinas, cruzar permutas'
    );

    // Inject JSON-LD Schema.org structured data
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.id = 'seo-schema-lp';
    schemaScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "SwapHome - Permuta Imobiliária para Corretores e Imobiliárias",
      "operatingSystem": "Web, Mobile",
      "applicationCategory": "BusinessApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "BRL"
      },
      "description": "Plataforma de inteligência e cruzamento de permutas imobiliárias para corretores e imobiliárias em Campinas e Brasil.",
      "areaServed": {
        "@type": "AdministrativeArea",
        "name": "Campinas e Região Metropolitana"
      }
    });
    document.head.appendChild(schemaScript);

    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

    return () => {
      document.title = originalTitle;
      if (metaDesc && originalDesc) metaDesc.setAttribute('content', originalDesc);
      const existingSchema = document.getElementById('seo-schema-lp');
      if (existingSchema) existingSchema.remove();
    };
  }, []);

  // Exit intent popup state for LP
  const [isExitIntentModalOpen, setIsExitIntentModalOpen] = useState(false);
  
  // O popup e de INTENCAO DE SAIDA. Ele existe para aparecer quando a pessoa
  // esta indo embora, nunca enquanto ela ainda esta lendo o titulo.
  //
  // Antes havia aqui um setTimeout de 4 segundos, comentado no proprio codigo
  // como "for testing", que foi para producao. Ele disparava para todo mundo,
  // em toda visita, cobrindo o hero antes da primeira palavra ser lida. Numa
  // pagina que recebe trafego pago isso e o clique comprado batendo num popup.
  useEffect(() => {
    // Uma vez por sessao. Quem ja viu e fechou nao ve de novo a cada F5.
    if (sessionStorage.getItem("lp-exit-visto") === "1") return;

    let disparado = false;
    const disparar = () => {
      if (disparado) return;
      disparado = true;
      sessionStorage.setItem("lp-exit-visto", "1");
      setIsExitIntentModalOpen(true);
    };

    // Desktop: o mouse sai pelo topo da janela, rumo a aba ou a barra de
    // endereco. E o sinal classico de saida.
    const aoSairComMouse = (e: MouseEvent) => {
      if (e.clientY < 30) disparar();
    };
    document.addEventListener("mouseleave", aoSairComMouse);

    // Celular nao tem ponteiro para sair pelo topo, entao o equivalente
    // honesto e engajamento: a pessoa leu boa parte da pagina, passou tempo
    // nela e mesmo assim nao clicou em nada. So ai a oferta faz sentido.
    const aoRolar = () => {
      const alcance = document.body.scrollHeight - window.innerHeight;
      if (alcance > 0 && window.scrollY / alcance > 0.55) disparar();
    };
    const tempoMinimo = window.setTimeout(() => {
      window.addEventListener("scroll", aoRolar, { passive: true });
    }, 20000);

    return () => {
      document.removeEventListener("mouseleave", aoSairComMouse);
      window.removeEventListener("scroll", aoRolar);
      window.clearTimeout(tempoMinimo);
    };
  }, []);

  // Simulator state
  const [step, setStep] = useState<"input" | "calculating" | "result">("input");
  const [loadingText, setLoadingText] = useState("");
  const [progress, setProgress] = useState(0);

  // Simulator TEM state
  const [hasType, setHasType] = useState("Apartamento");
  const [hasCity, setHasCity] = useState("Campinas");
  const [hasValue, setHasValue] = useState(500000);

  // Simulator BUSCA state
  const [wantType, setWantType] = useState("Casa");
  const [wantCity, setWantCity] = useState("Campinas");
  const [wantValue, setWantValue] = useState(800000);

  const [results, setResults] = useState({
    matchScore: 0,
    matchCount: 0,
    tornaValue: 0,
    tornaType: "none" as "receive" | "pay" | "none",
  });

  const handleSimulate = () => {
    setStep("calculating");
    setProgress(0);
    
    const steps = [
      { text: "Cruzando dados regionais...", delay: 0 },
      { text: "Analisando compatibilidade de valores...", delay: 800 },
      { text: "Verificando ofertas de troca com torna...", delay: 1600 },
      { text: "Gerando match score...", delay: 2400 },
    ];

    steps.forEach((s, index) => {
      setTimeout(() => {
        setLoadingText(s.text);
        setProgress((index + 1) * 25);
      }, s.delay);
    });

    setTimeout(() => {
      const diff = hasValue - wantValue;
      const tornaType = diff > 0 ? "receive" : diff < 0 ? "pay" : "none";
      const tornaValue = Math.abs(diff);
      
      const isSameCity = hasCity.toLowerCase().trim() === wantCity.toLowerCase().trim();
      const baseScore = isSameCity ? 92 : 85;
      const randomModifier = Math.floor(Math.random() * 8);
      const matchScore = Math.min(baseScore + randomModifier, 98);
      
      const matchCount = Math.floor(Math.random() * 12) + 4;
      setResults({
        matchScore,
        matchCount,
        tornaValue,
        tornaType,
      });
      setStep("result");
    }, 3200);
  };

  const handleReset = () => {
    setStep("input");
  };

  const valueOptions = [
    { label: "Até R$ 300.000", value: 250000 },
    { label: "R$ 300.000 a R$ 500.000", value: 400000 },
    { label: "R$ 500.000 a R$ 800.000", value: 650000 },
    { label: "R$ 800.000 a R$ 1.200.000", value: 1000000 },
    { label: "R$ 1.200.000 a R$ 2.000.000", value: 1600000 },
    { label: "Acima de R$ 2.000.000", value: 2500000 },
  ];

  const propertyTypes = ["Apartamento", "Casa", "Terreno", "Comercial", "Chácara/Sítio"];
  const cities = ["Campinas", "São Paulo", "Indaiatuba", "Valinhos", "Vinhedo", "Paulínia", "Sorocaba", "Curitiba", "Rio de Janeiro", "Belo Horizonte", "Santos"];

  // Form state for "Dúvidas"
  const [doubtName, setDoubtName] = useState('');
  const [doubtContact, setDoubtContact] = useState('');
  const [doubtQuestion, setDoubtQuestion] = useState('');
  const [doubtSubmitted, setDoubtSubmitted] = useState(false);
  const [savedDoubts, setSavedDoubts] = useState<SavedDoubt[]>(() => {
    try {
      const stored = localStorage.getItem('sb_lp_doubts');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const handleDoubtSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doubtQuestion.trim()) return;

    const newDoubt: SavedDoubt = {
      id: Date.now().toString(),
      name: doubtName.trim() || 'Corretor / Imobiliária',
      contact: doubtContact.trim() || 'Não informado',
      question: doubtQuestion.trim(),
      date: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    const updated = [newDoubt, ...savedDoubts];
    setSavedDoubts(updated);
    try {
      localStorage.setItem('sb_lp_doubts', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }

    setDoubtSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-surface-0 text-slate-100 font-sans selection:bg-brand-gold selection:text-brand-dark">
      {/* Top Navigation for LP */}
      {/* O cabecalho e uma barra que FLUTUA sobre a pagina, entao precisa ser a
          superficie mais alta da escada, nao a mais baixa. Estava em surface-0,
          o preto mais fundo do site, e por isso a faixa inteira sumia. */}
      <header className="sticky top-0 z-50 bg-surface-2/95 backdrop-blur-md border-b border-white/15 shadow-lg shadow-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => { window.location.href = APP_URL; }}
              className="flex items-center gap-3 cursor-pointer focus:outline-none rounded-xl focus-visible:ring-2 focus-visible:ring-brand-gold"
              aria-label="SwapHome Página Inicial"
            >
              {/* PENDENTE: falta o arquivo de logo de verdade.
                  O que havia aqui era uma foto de 1536x1024 e 2,1 MB, de um logo
                  montado numa parede cinza, com o fundo cinza e o brilho pintados
                  dentro da propria imagem, servida do Google Drive. Renderizada
                  com 48px de altura, o cinza se misturava com a barra escura e a
                  metade azul-marinho da marca desaparecia.
                  Ate existir um vetor da marca, o cabecalho usa a assinatura
                  escrita. Nao e perda: texto vivo fica nitido em qualquer tela,
                  pesa zero, e mantem a divisao de duas cores da identidade. */}
              <span className="font-display text-2xl font-bold tracking-tight leading-none">
                <span className="text-white">Swap</span><span className="text-brand-gold">Home</span>
              </span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => { window.location.href = APP_URL; }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-gold to-amber-500 text-brand-dark font-extrabold text-sm hover:brightness-110 transition-all shadow-lg shadow-brand-gold/20 flex items-center gap-2 cursor-pointer"
            >
              <span>Acessar o App</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden bg-gradient-to-b from-[#0A0D14] via-[#111622] to-[#0A0D14]">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-brand-gold/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 items-center text-left">
            {/* Column Left: Main Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs font-bold tracking-wide uppercase"
              >
                <Sparkles className="w-4 h-4 text-brand-gold" />
                <span>Permuta imobiliária com inteligência para profissionais</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight"
              >
                Transforme clientes travados em novas possibilidades com <span className="bg-gradient-to-r from-brand-gold via-amber-300 to-amber-500 bg-clip-text text-transparent">Permuta Inteligente</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl"
              >
                Uma solução feita para <strong>corretores e imobiliárias</strong> que precisam encontrar combinações de permuta com mais rapidez, organizar interesses de troca e criar novas possibilidades de negócio entre carteiras.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
              >
                <button 
                  onClick={() => { window.location.href = APP_URL; }}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-brand-gold via-amber-400 to-amber-500 text-brand-dark font-black text-base hover:scale-[1.02] transition-all shadow-xl shadow-brand-gold/25 flex items-center justify-center gap-3 cursor-pointer"
                >
                  <span>Começar agora na SwapHome</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>

              {/* Trust badges strip */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold text-white">Cruzamento automático</span> de interesses
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-gold" />
                  <span className="font-bold text-white">Rede profissional</span> para novas parcerias
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span className="font-bold text-white">Acesso web imediato</span>
                </div>
              </div>
            </div>

            {/* Column Right: Top Fold Featured Property Card Image with BorderGlow */}
            <div className="lg:col-span-5">
              <motion.div 
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative max-w-[420px] mx-auto"
              >
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10"
                >
                  <BorderGlow
                    animated={true}
                    glowIntensity={2.0}
                    glowColor="45 95 65"
                    colors={['#FFD700', '#FFA500', '#FF8C00']}
                    backgroundColor="#0A0D14"
                    borderRadius={28}
                    glowRadius={80}
                    fillOpacity={0.7}
                    borderWidth={3.5}
                    className="glass-card shadow-2xl p-[1px]"
                  >
                    <div className="relative w-full h-full p-1 rounded-[27px] overflow-hidden group">
                      <img 
                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=75&w=800" 
                        alt="Imóvel em destaque para permuta" 
                        width={800}
                        height={380}
                        decoding="async"
                        fetchPriority="high"
                        className="rounded-2xl w-full h-[320px] sm:h-[380px] object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black via-black/60 to-transparent">
                         <div className="flex justify-between items-end">
                            <div>
                              <span className="text-brand-gold text-xs font-bold uppercase tracking-wider block mb-1">Destaque de Permuta</span>
                              <h4 className="text-white text-xl font-extrabold">Casa em Alphaville (Campinas)</h4>
                              <p className="text-slate-300 text-xs mt-0.5">Aceita Apartamento de menor valor + torna</p>
                            </div>
                            <div className="flex gap-2">
                               <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                                  <Users className="w-5 h-5 text-white" />
                               </div>
                               <div className="w-10 h-10 bg-brand-gold rounded-full flex items-center justify-center shadow-lg shadow-brand-gold/40">
                                  <Repeat className="w-5 h-5 text-brand-dark" />
                               </div>
                            </div>
                         </div>
                      </div>
                      
                      {/* Match Badge floating top left */}
                      <div className="absolute top-5 left-5 glass-card px-3 py-1.5 rounded-full flex items-center gap-2 border border-brand-gold/50 bg-black/60 backdrop-blur-md">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                        <span className="text-xs font-extrabold text-white">98% Match de Permuta</span>
                      </div>

                      {/* Floating Indicator bottom left badge */}
                      <div className="absolute top-5 right-5 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-[11px] font-bold text-amber-300">
                        R$ 2.400.000
                      </div>
                    </div>
                  </BorderGlow>
                </motion.div>

                {/* Decorative blur circle behind */}
                <div className="absolute -top-10 -right-10 w-60 h-60 bg-brand-gold/20 rounded-full blur-3xl -z-10" />
                <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-blue-500/20 rounded-full blur-3xl -z-10" />
              </motion.div>
            </div>
          </div>

          {/* SIMULADOR DE PERMUTA REPLICADO DA PAGINA INICIAL */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 max-w-4xl mx-auto text-left"
          >
            <div className="bg-gradient-to-b from-white/[0.06] to-white/[0.02] rounded-3xl border border-white/10 shadow-2xl p-6 md:p-10 relative overflow-hidden backdrop-blur-xl">
              <div className="text-center mb-8">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-brand-gold/10 text-brand-gold border border-brand-gold/20">
                  Simulador de Compatibilidade
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-3">
                  Simule Permuta
                </h3>
                <p className="text-slate-400 text-sm mt-1 max-w-lg mx-auto">
                  Faça a simulação de permuta: descubra se existem imóveis compatíveis para troca e veja uma estimativa de torna financeira em tempo real.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {step === "input" && (
                  <motion.div
                    key="input"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-8"
                  >
                    <div className="grid md:grid-cols-2 gap-6 md:gap-10">
                      {/* Lado TEM */}
                      <div className="space-y-4 bg-black/20 p-5 rounded-2xl border border-white/5">
                        <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                          <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                            <Building2 className="w-4 h-4 text-blue-400" />
                          </div>
                          <h4 className="text-base font-bold text-white">1. O que o cliente TEM</h4>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <label htmlFor="lp-has-type" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Tipo de Imóvel</label>
                            <select 
                              id="lp-has-type"
                              aria-label="Tipo de imóvel que o cliente tem"
                              value={hasType}
                              onChange={(e) => setHasType(e.target.value)}
                              className="w-full p-3 rounded-xl bg-surface-2 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-gold cursor-pointer"
                            >
                              {propertyTypes.map((type) => (
                                <option key={type} value={type} className="bg-slate-900">{type}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label htmlFor="lp-has-city" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Cidade do Imóvel</label>
                            <select 
                              id="lp-has-city"
                              aria-label="Cidade do imóvel que o cliente tem"
                              value={hasCity}
                              onChange={(e) => setHasCity(e.target.value)}
                              className="w-full p-3 rounded-xl bg-surface-2 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-gold cursor-pointer"
                            >
                              {cities.map((city) => (
                                <option key={city} value={city} className="bg-slate-900">{city}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label htmlFor="lp-has-value" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Valor Estimado</label>
                            <select 
                              id="lp-has-value"
                              aria-label="Valor estimado do imóvel que o cliente tem"
                              value={hasValue}
                              onChange={(e) => setHasValue(Number(e.target.value))}
                              className="w-full p-3 rounded-xl bg-surface-2 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-gold cursor-pointer"
                            >
                              {valueOptions.map((opt) => (
                                <option key={opt.value} value={opt.value} className="bg-slate-900">{opt.label}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Lado BUSCA */}
                      <div className="space-y-4 bg-black/20 p-5 rounded-2xl border border-white/5">
                        <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                          <div className="w-8 h-8 rounded-full bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
                            <Target className="w-4 h-4 text-brand-gold" />
                          </div>
                          <h4 className="text-base font-bold text-white">2. O que o cliente BUSCA</h4>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <label htmlFor="lp-want-type" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Tipo Desejado</label>
                            <select 
                              id="lp-want-type"
                              aria-label="Tipo de imóvel que o cliente busca"
                              value={wantType}
                              onChange={(e) => setWantType(e.target.value)}
                              className="w-full p-3 rounded-xl bg-surface-2 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-gold cursor-pointer"
                            >
                              {propertyTypes.map((type) => (
                                <option key={type} value={type} className="bg-slate-900">{type}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label htmlFor="lp-want-city" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Cidade Desejada</label>
                            <select 
                              id="lp-want-city"
                              aria-label="Cidade que o cliente deseja para o imóvel"
                              value={wantCity}
                              onChange={(e) => setWantCity(e.target.value)}
                              className="w-full p-3 rounded-xl bg-surface-2 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-gold cursor-pointer"
                            >
                              {cities.map((city) => (
                                <option key={city} value={city} className="bg-slate-900">{city}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label htmlFor="lp-want-value" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Valor Desejado</label>
                            <select 
                              id="lp-want-value"
                              aria-label="Faixa de valor que o cliente busca"
                              value={wantValue}
                              onChange={(e) => setWantValue(Number(e.target.value))}
                              className="w-full p-3 rounded-xl bg-surface-2 border border-white/10 text-white text-sm focus:outline-none focus:border-brand-gold cursor-pointer"
                            >
                              {valueOptions.map((opt) => (
                                <option key={opt.value} value={opt.value} className="bg-slate-900">{opt.label}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={handleSimulate}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-gold via-amber-400 to-amber-500 hover:brightness-110 text-brand-dark font-black text-base shadow-lg shadow-brand-gold/20 transition-all flex items-center justify-center gap-2 uppercase tracking-wider active:scale-[0.98] cursor-pointer"
                      >
                        <Repeat className="w-5 h-5" />
                        Simular Compatibilidade
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === "calculating" && (
                  <motion.div
                    key="calculating"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center py-12 text-center space-y-6"
                  >
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-4 border-slate-800 border-t-brand-gold animate-spin" />
                      <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center border border-brand-gold/20 animate-pulse">
                        <Repeat className="w-8 h-8 text-brand-gold" />
                      </div>
                    </div>
                    <div className="space-y-3 max-w-sm w-full">
                      <h4 className="text-lg font-bold text-white tracking-tight">{loadingText}</h4>
                      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-brand-gold rounded-full"
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Aguarde, calculando score...</p>
                    </div>
                  </motion.div>
                )}

                {step === "result" && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-8"
                  >
                    <div className="text-center space-y-1">
                      <span className="text-brand-gold font-bold text-xs uppercase tracking-widest italic">Simulação Concluída</span>
                      <h4 className="text-2xl font-extrabold text-white">Resultado do Cruzamento</h4>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 items-center">
                      {/* Score de Match */}
                      <div className="p-6 rounded-2xl border border-white/10 text-center flex flex-col items-center justify-center bg-black/30">
                        <div className="relative w-20 h-20 flex items-center justify-center mb-2">
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <circle 
                              cx="50" cy="50" r="40" 
                              stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="transparent" 
                            />
                            <motion.circle 
                              cx="50" cy="50" r="40" 
                              stroke="#C9971E" strokeWidth="8" fill="transparent" 
                              strokeDasharray="251.2"
                              initial={{ strokeDashoffset: 251.2 }}
                              animate={{ strokeDashoffset: 251.2 - (251.2 * results.matchScore) / 100 }}
                              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                            />
                          </svg>
                          <span className="absolute text-xl font-black text-white">{results.matchScore}%</span>
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Compatibilidade</span>
                      </div>

                      {/* Matches Encontrados */}
                      <div className="p-6 rounded-2xl border border-white/10 text-center flex flex-col items-center justify-center bg-black/30">
                        <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/20 mb-2">
                          <Building2 className="w-6 h-6 text-blue-400 animate-bounce" />
                        </div>
                        <div className="text-3xl font-black text-white mb-1">{results.matchCount}</div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Imóveis Compatíveis</span>
                      </div>

                      {/* Cálculo da Torna */}
                      <div className="p-6 rounded-2xl border border-white/10 text-center flex flex-col items-center justify-center bg-black/30">
                        {results.tornaType === "none" ? (
                          <>
                            <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20 mb-2">
                              <CheckCircle2 className="w-6 h-6 text-green-400" />
                            </div>
                            <div className="text-base font-bold text-green-400 uppercase tracking-tight mb-1">Permuta Equivalente</div>
                            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Sem Torna Financeira</span>
                          </>
                        ) : (
                          <>
                            <div className="text-xs text-slate-400 font-semibold mb-1">
                              {results.tornaType === "receive" ? "Cliente recebe torna de:" : "Cliente paga torna de:"}
                            </div>
                            <div className="text-xl font-black text-brand-gold mb-1">
                              R$ {results.tornaValue.toLocaleString('pt-BR')}
                            </div>
                            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Estimativa do Negócio</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-2">
                      <button 
                        onClick={() => { window.location.href = APP_URL; }}
                        className="flex-1 py-4 px-6 rounded-xl bg-gradient-to-r from-brand-gold via-amber-400 to-amber-500 text-brand-dark font-black text-sm hover:brightness-110 transition-all text-center flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-brand-gold/20"
                      >
                        <span>Ver Opções e Fazer Parceria no App</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={handleReset}
                        className="py-4 px-6 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-all cursor-pointer"
                      >
                        Nova Simulação
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem vs Solution Section */}
      <section className="py-20 bg-surface-1 border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-3">
              O Grande Gargalo do Mercado Imobiliário
            </h2>
            <p className="text-2xl sm:text-4xl font-extrabold text-white">
              Quantas vendas ficam paradas porque o cliente precisa vender ou permutar outro imóvel?
            </p>
            <p className="text-slate-400 mt-4 text-base">
              Quando o cliente depende de vender ou usar outro imóvel como parte do negócio, encontrar a combinação certa pode exigir dezenas de contatos e buscas manuais. A SwapHome organiza esse processo e facilita o encontro entre interesses compatíveis.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* The Old Way */}
            <div className="p-8 rounded-3xl bg-red-950/20 border border-red-500/20 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 font-bold">
                  ✕
                </div>
                <h3 className="text-xl font-bold text-white">Modelo Tradicional das Imobiliárias</h3>
              </div>
              <ul className="space-y-4 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-0.5 font-bold">•</span>
                  <span>Anúncios passivos em portais tradicionais que dependem de pesquisas genéricas.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-0.5 font-bold">•</span>
                  <span>Dificuldade manual de encontrar qual imobiliária tem o imóvel exato que seu cliente aceita permutar.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-0.5 font-bold">•</span>
                  <span>Perda de comissão porque o cliente desiste por não conseguir vender o imóvel antigo.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-0.5 font-bold">•</span>
                  <span>Falta de parâmetros padronizados para comparar o torna-valor e a equivalência das permutas.</span>
                </li>
              </ul>
            </div>

            {/* The SwapHome Way */}
            <div className="p-8 rounded-3xl bg-brand-gold/5 border border-brand-gold/30 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-gold/20 flex items-center justify-center text-brand-gold font-bold">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-white">Com a Plataforma SwapHome</h3>
              </div>
              <ul className="space-y-4 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <span><strong>Algoritmo de Matching Instantâneo:</strong> Cruza tipo, valor, bairro e torna-valor automaticamente.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <span><strong>Rede Exclusiva B2B de Corretores:</strong> Parcerias de co-brokerage seguras e éticas entre profissionais.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <span><strong>Destravamento do VGV:</strong> Aumente o giro de vendas da sua carteira de imóveis em Campinas e região.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <span><strong>Acesso Direto no App:</strong> Gestão simples sem mensalidades abusivas e com foco total no fechamento.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={() => { window.location.href = APP_URL; }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm transition-all cursor-pointer"
            >
              <span>Acessar a SwapHome</span>
              <ExternalLink className="w-4 h-4 text-brand-gold" />
            </button>
          </div>
        </div>
      </section>

      {/* Visual Showcase Section: Examples of Properties in Permuta */}
      <section className="py-20 bg-surface-1 relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-brand-gold/10 text-brand-gold border border-brand-gold/20">
              Oportunidades Reais em Carteira
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-4">
              Exemplos de Imóveis Prontos para Cruzamento de Permuta
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              Veja o tipo de acervo cadastrado diariamente por corretores parceiros em Campinas e região.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Property Card 1 */}
            <div className="rounded-3xl bg-surface-2 border border-white/10 overflow-hidden hover:border-brand-gold/50 transition-all duration-300 group flex flex-col justify-between shadow-xl">
              <div className="relative h-60 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=75&w=800" 
                  alt="Casa em Alphaville" 
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={500}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-brand-gold/40 text-xs font-black text-brand-gold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  98% Match
                </div>
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-xs font-bold text-white">
                  Alphaville • Campinas
                </div>
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0C101A] to-transparent" />
              </div>
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-2xl font-black text-white mb-1">R$ 2.400.000</div>
                  <h3 className="text-lg font-bold text-slate-200">Sobrado em Condomínio Fechado</h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                    <strong>Aceita Permuta:</strong> Apartamento em Cambuí ou São Paulo até R$ 1.000.000 + Torna em dinheiro.
                  </p>
                </div>
                <button 
                  onClick={() => { window.location.href = APP_URL; }}
                  className="w-full py-3 rounded-xl bg-white/10 hover:bg-brand-gold hover:text-brand-dark text-white font-bold text-xs transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Analisar oportunidade</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Property Card 2 */}
            <div className="rounded-3xl bg-surface-2 border border-white/10 overflow-hidden hover:border-brand-gold/50 transition-all duration-300 group flex flex-col justify-between shadow-xl">
              <div className="relative h-60 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=75&w=800" 
                  alt="Mansão Contemporânea" 
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={500}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-brand-gold/40 text-xs font-black text-brand-gold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  95% Match
                </div>
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-xs font-bold text-white">
                  Valinhos • SP
                </div>
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0C101A] to-transparent" />
              </div>
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-2xl font-black text-white mb-1">R$ 3.800.000</div>
                  <h3 className="text-lg font-bold text-slate-200">Mansão Arquitetura Contemporânea</h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                    <strong>Aceita Permuta:</strong> Terreno em condomínio ou sala comercial de alto padrão como parte de pagamento.
                  </p>
                </div>
                <button 
                  onClick={() => { window.location.href = APP_URL; }}
                  className="w-full py-3 rounded-xl bg-white/10 hover:bg-brand-gold hover:text-brand-dark text-white font-bold text-xs transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Analisar oportunidade</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Property Card 3 */}
            <div className="rounded-3xl bg-surface-2 border border-white/10 overflow-hidden hover:border-brand-gold/50 transition-all duration-300 group flex flex-col justify-between shadow-xl">
              <div className="relative h-60 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=75&w=800" 
                  alt="Apartamento de Luxo" 
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={500}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-brand-gold/40 text-xs font-black text-brand-gold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  92% Match
                </div>
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-xs font-bold text-white">
                  Cambuí • Campinas
                </div>
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0C101A] to-transparent" />
              </div>
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-2xl font-black text-white mb-1">R$ 1.350.000</div>
                  <h3 className="text-lg font-bold text-slate-200">Apartamento de Alto Padrão</h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                    <strong>Aceita Permuta:</strong> Busca Casa maior em condomínio em Paulínia, Vinhedo ou Barão Geraldo.
                  </p>
                </div>
                <button 
                  onClick={() => { window.location.href = APP_URL; }}
                  className="w-full py-3 rounded-xl bg-white/10 hover:bg-brand-gold hover:text-brand-dark text-white font-bold text-xs transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Analisar oportunidade</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features for Real Estate Agencies & Brokers */}
      <section className="py-20 bg-surface-0 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-gold mb-3">
              Recursos para Corretores e Imobiliárias
            </h2>
            <p className="text-2xl sm:text-4xl font-extrabold text-white">
              Um fluxo simples para transformar permutas em novas oportunidades
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-surface-2 border border-white/10 hover:border-brand-gold/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-brand-gold/10 text-brand-gold flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Repeat className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Matching de Dupla Entrada</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Cadastre o imóvel que seu cliente tem e o que ele busca. Nosso sistema encontra na hora a contrapartida exata para a troca.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-2 border border-white/10 hover:border-brand-gold/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Sigilo e Proteção da Captação</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Suas captações e contatos de proprietários permanecem sob sua total gestão e sigilo, garantindo a ética do profissional.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-2 border border-white/10 hover:border-brand-gold/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Rede de Parcerias Ativa</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Conecte-se diretamente com outros corretores credenciados de Campinas e outras regiões para dividir a comissão com transparência.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-2 border border-white/10 hover:border-brand-gold/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Simulador de Torna-Valor</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Calcule a diferença financeira exata entre os imóveis envolvidos, facilitando a apresentação de propostas viáveis aos clientes.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-2 border border-white/10 hover:border-brand-gold/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Foco em Campinas & RMC</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Forte presença e banco de dados atualizado nas principais cidades do interior paulista e grandes capitais.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface-2 border border-white/10 hover:border-brand-gold/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Acesso Imediato sem Burocracia</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Acesse pelo navegador, cadastre seus imóveis e interesses de permuta e comece a buscar combinações sem instalação.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Doubts / Question Form Section ("Campo de Dúvida") */}
      <section id="duvidas" className="py-20 bg-surface-0 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-surface-3 border border-white/10 relative overflow-hidden">
            <div className="text-center mb-10">
              <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 text-brand-gold flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Ficou com alguma dúvida sobre o SwapHome?
              </h2>
              <p className="text-slate-400 text-sm mt-2 max-w-xl mx-auto">
                Envie sua pergunta abaixo. Nossa equipe especializada em atendimento a corretoras e imobiliárias responde rapidamente!
              </p>
            </div>

            {doubtSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-2">Sua dúvida foi registrada com sucesso!</h3>
                <p className="text-slate-300 text-sm mb-6">
                  Salvamos sua pergunta no nosso sistema. Caso prefira uma resposta imediata via WhatsApp, clique no botão abaixo para conversar diretamente com um consultor:
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a 
                    href={`https://wa.me/5519997428649?text=${encodeURIComponent(`Olá! Tenho uma dúvida sobre a plataforma SwapHome para imobiliárias: "${doubtQuestion}"`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-sm hover:bg-emerald-400 transition-all flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Falar no WhatsApp Agora</span>
                  </a>
                  <button 
                    onClick={() => {
                      setDoubtSubmitted(false);
                      setDoubtQuestion('');
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all"
                  >
                    Enviar outra pergunta
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleDoubtSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                      Seu Nome ou Imobiliária
                    </label>
                    <input 
                      type="text" 
                      placeholder="Ex: Carlos - Corretor / Imobiliária Campinas" 
                      value={doubtName}
                      onChange={(e) => setDoubtName(e.target.value)}
                      className="w-full bg-surface-2 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                      WhatsApp ou E-mail para retorno
                    </label>
                    <input 
                      type="text" 
                      placeholder="(19) 99999-9999" 
                      value={doubtContact}
                      onChange={(e) => setDoubtContact(e.target.value)}
                      className="w-full bg-surface-2 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1">
                    Qual é a sua dúvida? *
                  </label>
                  <textarea 
                    required
                    rows={3}
                    placeholder="Escreva aqui sua dúvida sobre permutas, como cadastrar carteiras, comissões..." 
                    value={doubtQuestion}
                    onChange={(e) => setDoubtQuestion(e.target.value)}
                    className="w-full bg-surface-2 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between flex-wrap gap-4">
                  <p className="text-xs text-slate-500">
                    Sua dúvida será salva e nossa equipe dará retorno rapidamente.
                  </p>
                  <button 
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-brand-gold text-brand-dark font-extrabold text-sm hover:bg-amber-400 transition-all shadow-lg shadow-brand-gold/10 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Salvar Dúvida</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* List of previously saved doubts on this device */}
            {savedDoubts.length > 0 && (
              <div className="mt-8 pt-8 border-t border-white/10">
                <h4 className="text-xs font-bold uppercase text-slate-400 mb-3">
                  Minhas Dúvidas Enviadas ({savedDoubts.length}):
                </h4>
                <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                  {savedDoubts.map((d) => (
                    <div key={d.id} className="p-3 rounded-xl bg-surface-2 border border-white/5 text-xs">
                      <div className="flex items-center justify-between text-slate-400 mb-1">
                        <span className="font-semibold text-brand-gold">{d.name}</span>
                        <span>{d.date}</span>
                      </div>
                      <p className="text-slate-200">{d.question}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SEO & Regional Text Content for Real Estate Brokers in Campinas & Region */}
      <section className="py-16 bg-surface-0 text-slate-400 text-xs leading-relaxed border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
            Solução de Permuta Imobiliária para Imobiliárias e Corretores em Campinas e Região
          </h2>
          <p>
            O mercado imobiliário da Região Metropolitana de Campinas (RMC) — englobando cidades como Campinas, Indaiatuba, Vinhedo, Valinhos, Paulínia e Sumaré — possui uma altíssima demanda por transações envolvendo <strong>permuta imobiliária</strong>. A plataforma SwapHome foi desenvolvida para acelerar a rotina de corretores de imóveis e imobiliárias, automatizando o cruzamento de intenções de troca.
          </p>
          <p>
            Ao utilizar o SwapHome, o corretor de imóveis tem acesso a um ecossistema inteligente que compara valores de avaliação, localização dos imóveis, torna-valor desejada e características físicas do bem. Seja para permuta de apartamento no Cambuí ou Mansões Santo Antônio por casa em condomínio fechado em Barão Geraldo, o algoritmo realiza a compatibilização exata.
          </p>
          <p>
            Acesse o aplicativo da plataforma em <a href="https://app.swaphome.com.br/" target="_blank" rel="noopener noreferrer" className="text-brand-gold underline">app.swaphome.com.br</a> e potencialize suas negociações com a maior rede de permuta imobiliária do Brasil.
          </p>
        </div>
      </section>

      {/* Final Conversion Banner */}
      <section className="py-20 bg-gradient-to-r from-amber-600 via-brand-gold to-amber-500 text-brand-dark relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
            Pronto para destravar as permutas da sua carteira?
          </h2>
          <p className="mt-4 text-brand-dark/90 text-base sm:text-lg max-w-2xl mx-auto font-medium">
            Acesse a plataforma, cadastre seus imóveis e interesses e comece a descobrir combinações de permuta com outros profissionais.
          </p>
          <div className="mt-8">
            <button 
              onClick={() => { window.location.href = APP_URL; }}
              className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-brand-dark text-white font-black text-lg hover:scale-[1.03] transition-all shadow-2xl shadow-brand-dark/40 cursor-pointer"
            >
              <span>Acessar a SwapHome agora</span>
              <ArrowRight className="w-6 h-6 text-brand-gold" />
            </button>
          </div>
        </div>
      </section>

      {/* Simple Footer for LP */}
      <footer className="py-8 bg-surface-0 border-t border-white/10 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display text-sm font-bold tracking-tight">
              <span className="text-slate-200">Swap</span><span className="text-brand-gold">Home</span>
            </span>
            <span>© {new Date().getFullYear()} SwapHome. Todos os direitos reservados.</span>
          </div>
          <div className="flex items-center gap-6">
            {onBack && (
              <button onClick={onBack} className="hover:text-slate-300 transition-colors">
                Página Inicial
              </button>
            )}
            <button 
              onClick={() => { window.location.href = APP_URL; }}
              className="text-brand-gold hover:underline font-bold cursor-pointer"
            >
              Acessar SwapHome
            </button>
          </div>
        </div>
      </footer>

      {/* Exit intent modal for LP */}
      <ExitIntentModal 
        isOpen={isExitIntentModalOpen} 
        onClose={() => setIsExitIntentModalOpen(false)}
        onOpenAppModal={() => { window.location.href = APP_URL; }}
      />


      {/* Floating WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
};
