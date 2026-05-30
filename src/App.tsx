/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { 
  Building2, 
  Users, 
  ArrowRightLeft, 
  Target, 
  CheckCircle2, 
  BarChart3,
  MessageSquare,
  Repeat,
  Zap,
  ArrowRight,
  Plus,
  Minus,
  Check,
  AlertCircle,
  Clock,
  ShieldCheck,
  Smartphone,
  CheckCircle,
  HelpCircle,
  Menu,
  X,
  Settings,
  Database
} from "lucide-react";
import { useState, useEffect, FormEvent } from "react";
import BorderGlow from "./components/BorderGlow";

const LOGO_URL = "https://lh3.googleusercontent.com/d/16FOqiYB4xcoXfqJ_k5sxP-c58SS6_zpL";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Solução", href: "#solucao" },
    { label: "Simulador", href: "#simulador" },
    { label: "Benefícios", href: "#beneficios" },
    { label: "Planos", href: "#planos" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/40 backdrop-blur-xl border-b border-black/5 shadow-xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between overflow-hidden">
        <div className="flex items-center relative h-full overflow-hidden">
          <img 
            src={LOGO_URL} 
            alt="SwapHome Logo" 
            className="h-24 w-auto transition-all hover:scale-110 duration-500 relative z-10" 
            referrerPolicy="no-referrer" 
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <a 
              key={item.label} 
              href={item.href} 
              className="text-sm font-bold text-[#1B3E5F] hover:text-brand-gold transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a 
            href="https://app.swaphome.com.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-gold text-brand-dark px-6 py-2 rounded-full text-sm font-black hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-brand-gold/20 uppercase tracking-tight"
          >
            Cadastrar Grátis
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-[#1B3E5F] p-2 hover:bg-black/5 rounded-lg transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/80 border-t border-black/5 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-lg font-bold text-[#1B3E5F] hover:text-brand-dark transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="https://app.swaphome.com.br/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-center bg-brand-gold text-brand-dark px-6 py-3 rounded-xl text-md font-black shadow-lg uppercase tracking-tight"
              >
                Cadastrar Grátis
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => (
  <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
    <div className="absolute top-[-100px] right-[-100px] w-96 h-96 bg-brand-blue/10 rounded-full blur-[120px] -z-10" />
    <div className="absolute bottom-[-50px] left-[-50px] w-80 h-80 bg-brand-gold/10 rounded-full blur-[100px] -z-10" />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-brand-blue/10 border border-brand-blue/20 px-3 py-1 rounded-full mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
            <span className="text-brand-blue text-xs font-bold uppercase tracking-wider">A Evolução Inteligente da Permuta Imobiliária</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6 text-balance"
          >
            Troque seu imóvel <span className="accent-gradient-text">sem vender</span>, sem financiar e sem burocracia.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg lg:text-xl text-slate-400 mb-10 leading-relaxed text-balance"
          >
            O SwapHome conecta você a proprietários que também querem trocar. Cadastre seu imóvel, encontre o match certo e feche negócio — em 3 passos simples, direto pelo celular.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.a 
              href="https://app.swaphome.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, backgroundColor: "#A87D17" }}
              whileTap={{ scale: 0.95 }}
              className="bg-brand-gold text-brand-dark px-8 py-4 rounded-xl font-bold flex flex-col items-center justify-center gap-1 transition-all shadow-lg shadow-brand-gold/20 text-center w-full sm:w-auto"
            >
              <span className="flex items-center gap-2">Quero encontrar meu match agora <ArrowRight className="w-5 h-5" /></span>
              <span className="text-[10px] opacity-70 font-normal uppercase tracking-wider">Comece de graça · Leva menos de 3 minutos</span>
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 max-w-[400px] mx-auto"
          >
            <BorderGlow
              animated={true}
              glowIntensity={2.0}
              glowColor="45 95 65"
              colors={['#FFD700', '#FFA500', '#FF8C00']}
              backgroundColor="#050811"
              borderRadius={28}
              glowRadius={80}
              fillOpacity={0.65}
              borderWidth={3.5}
              className="glass-card shadow-2xl p-[1px]"
            >
              <div className="relative w-full h-full p-1 rounded-[27px] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1080" 
                  alt="Imóvel em destaque" 
                  className="rounded-2xl w-full h-[500px] object-cover opacity-90"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black via-black/40 to-transparent">
                   <div className="flex justify-between items-end">
                      <div>
                        <h4 className="text-white text-2xl font-extrabold">Casa em Alphaville</h4>
                        <p className="text-slate-300 text-sm">Pode ser sua via Permuta Direta</p>
                      </div>
                      <div className="flex gap-2">
                         <motion.div 
                            whileHover={{ scale: 1.1, rotate: -10 }}
                            whileInView={{ scale: [1, 1.1, 1], rotate: [0, -10, 0] }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.5, delay: 1.2 }}
                            className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20"
                          >
                            <Users className="w-6 h-6 text-white" />
                         </motion.div>
                         <motion.div 
                            whileHover={{ scale: 1.1, rotate: 180 }}
                            whileInView={{ scale: [1, 1.1, 1], rotate: [0, 180, 0] }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.8, delay: 1.5 }}
                            className="w-12 h-12 bg-brand-gold rounded-full flex items-center justify-center shadow-lg shadow-brand-gold/40"
                          >
                            <Repeat className="w-6 h-6 text-white" />
                         </motion.div>
                      </div>
                   </div>
                </div>
                <div className="absolute top-6 left-6 glass-card px-3 py-1 rounded-full flex items-center gap-2 border-brand-gold/40">
                  <span className="w-2 h-2 rounded-full bg-brand-gold" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-tighter">Match Inteligente</span>
                </div>
              </div>
            </BorderGlow>
          </motion.div>
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-brand-blue/10 rounded-full blur-3xl -z-10" />
        </motion.div>
      </div>
    </div>
  </section>
);

const SectionHeading = ({ badge, title, subtitle, centered = false }: { badge?: string, title: string, subtitle?: string, centered?: boolean }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6 }}
    className={`mb-16 ${centered ? 'text-center' : ''}`}
  >
    {badge && <span className="text-brand-gold font-bold text-sm tracking-widest uppercase mb-4 block italic">{badge}</span>}
    <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 text-balance">{title}</h2>
    {subtitle && <p className="text-lg text-slate-400 max-w-2xl mx-auto">{subtitle}</p>}
  </motion.div>
);

const Stats = () => (
  <section className="py-12 bg-brand-gold/10 border-y border-brand-gold/20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       <div className="flex flex-col md:flex-row justify-around items-center gap-8 text-center">
          <div className="space-y-1">
             <div className="text-3xl font-black text-white italic">1.250+</div>
             <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Imóveis Cadastrados</div>
          </div>
          <div className="w-px h-12 bg-white/10 hidden md:block" />
          <div className="space-y-1">
             <div className="text-3xl font-black text-brand-gold italic">120+</div>
             <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Permutas Realizadas</div>
          </div>
          <div className="w-px h-12 bg-white/10 hidden md:block" />
          <div className="space-y-1">
             <div className="text-3xl font-black text-white italic">24</div>
             <div className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Estados Cobertos</div>
          </div>
       </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-24 bg-brand-dark/50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading 
        title="O que dizem sobre nós."
        subtitle="Transformando a vida de proprietários e o negócio de corretores em todo o Brasil."
        centered
      />
      
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            text: "Troquei meu apartamento em São Paulo por uma casa no interior em 4 semanas, sem precisar vender antes. O match foi perfeito!",
            author: "Ricardo S.",
            role: "Proprietário em Sorocaba/SP"
          },
          {
            text: "Cadastrei 15 imóveis da minha carteira e já fechei 2 permutas que nunca teria encontrado sozinho. Ferramenta indispensável para o corretor moderno.",
            author: "Marcos V.",
            role: "Corretor CRECI 12.345"
          },
          {
            text: "Achei que seria complicado. Em 10 minutos já tinha meu imóvel cadastrado e o primeiro match apareceu no mesmo dia. Incrível!",
            author: "Juliana L.",
            role: "Proprietária em Curitiba/PR"
          }
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-8 glass-card border-white/5 relative"
          >
            <div className="absolute top-0 right-8 -translate-y-1/2 text-brand-gold italic opacity-10 text-8xl font-serif">"</div>
            <p className="text-slate-300 italic mb-8 relative z-10 leading-relaxed">"{item.text}"</p>
            <div>
               <div className="text-white font-bold">{item.author}</div>
               <div className="text-brand-gold text-[10px] font-bold uppercase tracking-widest">{item.role}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const PainPoints = () => (
  <section className="py-24 bg-brand-dark">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading 
        title="Por que trocar de imóvel precisa ser tão complicado?"
        subtitle="O mercado imobiliário tradicional foi feito pra ser lento. O SwapHome foi feito pra ser diferente."
        centered
      />
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          "Você anuncia o imóvel… e fica meses esperando uma proposta séria",
          "Quando aparece comprador, o banco reprova o financiamento dele",
          "Você encontra o imóvel perfeito — mas ainda não vendeu o seu",
          "Corretora cobra comissão, cartório cobra escritura, banco cobra juros… e você paga tudo",
          "Você sabe que existe 'permuta imobiliária' mas não sabe por onde começar",
          "Fica preso num imóvel que não serve mais pra sua vida — por falta de opção"
        ].map((pain, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex gap-4 p-6 glass-card rounded-2xl border-white/5 bg-slate-900/40"
          >
            <div className="mt-1">
              <AlertCircle className="w-5 h-5 text-red-400/60" />
            </div>
            <p className="text-slate-300 text-sm font-medium leading-relaxed">{pain}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const ValueProp = () => (
   <section className="py-24 relative overflow-hidden">
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
           <div>
              <SectionHeading 
                title="A plataforma que conecta quem quer trocar imóvel."
                subtitle=""
              />
              <div className="space-y-6 text-slate-400 text-lg font-light leading-relaxed">
                 <p>Você tem um imóvel. Mas não é exatamente onde — ou o que — você quer pra sua vida agora.</p>
                 <p>Vender demora. Financiar pesa. E esperar o mercado "melhorar" pode custar anos.</p>
                 <p className="text-white font-medium">E se existisse uma forma de trocar seu imóvel diretamente com outro proprietário — sem precisar de dinheiro no meio, sem correr atrás de comprador, sem depender de banco?</p>
                 <p>É isso que o <span className="text-brand-gold font-bold">SwapHome</span> faz. De forma rápida, simples e segura.</p>
              </div>
           </div>
           <div className="relative">
              <div className="glass-card py-24 px-12 rounded-[3rem] border-brand-gold/15 relative overflow-hidden group min-h-[500px] flex items-center justify-center">
                 {/* Background Image */}
                 <img 
                    src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1080" 
                    alt="Luxury Mansion" 
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                 />
                 <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-dark/60 to-transparent" />
                 
                 <div className="relative z-10 text-center w-full">
                    <div className="text-brand-gold font-display font-black text-6xl mb-4 italic opacity-20">SWAP</div>
                    <h3 className="text-2xl font-bold text-white mb-6">Seu imóvel como <br/> moeda de troca direta.</h3>
                    <div className="flex items-center justify-center gap-6">
                        <div className="text-center">
                           <motion.div 
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              whileInView={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                              viewport={{ once: false }}
                              transition={{ duration: 0.6, delay: 1.2 }}
                              className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-2 mx-auto border border-white/10"
                           >
                              <Building2 className="w-8 h-8 text-slate-400" />
                           </motion.div>
                           <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Seu Imóvel</span>
                        </div>
                        <motion.div
                           whileInView={{ scale: [1, 1.2, 1] }}
                           transition={{ duration: 0.8, delay: 1.4 }}
                        >
                           <ArrowRightLeft className="w-8 h-8 text-brand-gold animate-pulse" />
                        </motion.div>
                        <div className="text-center">
                           <motion.div 
                              whileHover={{ scale: 1.1, rotate: -5 }}
                              whileInView={{ scale: [1, 1.1, 1], rotate: [0, -5, 0] }}
                              viewport={{ once: false }}
                              transition={{ duration: 0.6, delay: 1.6 }}
                              className="w-16 h-16 bg-brand-gold/10 rounded-2xl flex items-center justify-center mb-2 mx-auto border border-brand-gold/20"
                           >
                              <Target className="w-8 h-8 text-brand-gold" />
                           </motion.div>
                           <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold">Seu Match</span>
                        </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
     </div>
   </section>
);

const HowItWorks = () => (
  <section id="como-funciona" className="py-24 bg-brand-dark/50 relative">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading 
        title="Como funciona em 3 passos simples."
        subtitle="O SwapHome é o primeiro SaaS de permuta imobiliária do Brasil. Simples assim."
        centered
      />

      <div className="grid md:grid-cols-3 gap-12">
        {[
          {
            step: "01",
            title: "Cadastre seu imóvel",
            description: "Rápido, fácil, pelo celular. Conte o que você tem e o que está buscando para sua nova fase."
          },
          {
            step: "02",
            title: "Encontre imóveis",
            description: "Nosso algoritmo de matching faz o cruzamento de interesses complementares para você em tempo real."
          },
          {
            step: "03",
            title: "Faça negócio",
            description: "O match aconteceu? Conecte-se diretamente ao proprietário e negocie os detalhes com total autonomia."
          }
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="flex gap-6 items-start glass-card p-8 rounded-3xl border-white/5"
          >
            <span className="text-4xl font-display font-black text-brand-gold italic opacity-30">
              {item.step}
            </span>
            <div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Benefits = () => (
  <section id="beneficios" className="py-24">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading 
        title="O match é o negócio da sua vida."
        subtitle="Sem depender de banco. Sem perder patrimônio. Sem anos de espera."
        centered
      />
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { title: "Troque sem vender primeiro", desc: "Seu imóvel vira moeda de troca diretamente, sem esperar comprador." },
          { title: "Imóveis fora do radar", desc: "Propriedades que nunca apareceriam num portal de anúncio comum." },
          { title: "Negocie direto", desc: "Sem intermediários obrigatórios, sem comissão embutida no preço." },
          { title: "Pelo celular", desc: "Interface tão simples quanto um app de relacionamento." },
          { title: "Economize tempo", desc: "Troque em semanas o que levaria meses no mercado imobiliário tradicional." },
          { title: "Controle total", desc: "Veja seus matches, mensagens e negociações em uma plataforma só." }
        ].map((benefit, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-8 glass-card border-brand-gold/5 hover:border-brand-gold/20 transition-all group"
          >
            <div className="w-10 h-10 bg-brand-gold/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
               <Check className="w-5 h-5 text-brand-gold" />
            </div>
            <h4 className="text-lg font-bold text-white mb-3">{benefit.title}</h4>
            <p className="text-slate-400 text-sm leading-relaxed">{benefit.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Pricing = () => (
  <section id="planos" className="py-24 bg-brand-dark/30 relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading 
        title="Escolha o plano que faz sentido para você."
        subtitle="Comece grátis, faça upgrade quando quiser. Sem pegadinhas."
        centered
      />

      <div className="mb-16">
         <h3 className="text-2xl font-bold text-white mb-8 text-center bg-brand-blue/10 py-3 rounded-xl border border-brand-blue/20 max-w-sm mx-auto">Para Proprietários (PF)</h3>
         <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* CPF FREE */}
            <div className="glass-card p-10 rounded-3xl border-white/5 relative overflow-hidden">
               <h4 className="text-brand-gold font-bold uppercase tracking-widest text-xs mb-4">Plano Free</h4>
               <p className="text-4xl font-bold text-white mb-4">Grátis <span className="text-sm font-normal text-slate-500">/para sempre</span></p>
               <p className="text-slate-400 text-sm mb-8">Para quem busca um match único e direto.</p>
               <ul className="space-y-4 mb-10">
                  <li className="flex items-center gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold" /> 1 imóvel cadastrado
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold" /> Acesso ao matching
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold" /> Sem cartão de crédito
                  </li>
               </ul>
               <button 
                 onClick={() => window.dispatchEvent(new CustomEvent("open-check-modal"))}
                 className="w-full block text-center py-4 rounded-xl border border-white/10 text-white font-bold hover:bg-white hover:text-brand-dark transition-all cursor-pointer"
               >
                 Começar Agora
               </button>
            </div>

            {/* CPF PRO */}
            <div className="glass-card p-10 rounded-3xl border-brand-gold/30 bg-brand-gold/5 relative overflow-hidden flex flex-col justify-between">
               <div>
                  <div className="absolute top-4 right-4 bg-brand-gold text-brand-dark text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg">Popular</div>
                  <h4 className="text-brand-gold font-bold uppercase tracking-widest text-xs mb-4">Plano Pro</h4>
                  <p className="text-4xl font-black mb-4 flex items-baseline gap-2 flex-wrap">
                     <span className="line-through text-slate-500 text-2xl font-bold">R$ 49,90</span>
                     <span className="text-white">R$ 0,00</span>
                     <span className="text-xs font-normal text-slate-500">/30 dias</span>
                  </p>
                  
                  <div className="bg-gradient-to-r from-brand-gold via-amber-300 to-brand-gold text-brand-dark text-[11px] font-black py-2 px-3 rounded-xl text-center shadow-[0_0_20px_rgba(201,151,30,0.6)] border border-brand-gold mb-6 uppercase tracking-wider animate-pulse flex items-center justify-center gap-1.5">
                     <Zap className="w-3.5 h-3.5 fill-brand-dark text-brand-dark shrink-0 animate-bounce" />
                     <span>Qualquer plano grátis por 30 dias • Teste agora</span>
                  </div>

                  <p className="text-slate-400 text-sm mb-8">Visibilidade prioritária e curadoria assistida.</p>
                  <ul className="space-y-4 mb-10">
                     <li className="flex items-center gap-3 text-sm text-slate-300">
                       <CheckCircle2 className="w-4 h-4 text-brand-gold" /> Até 3 imóveis cadastrados
                     </li>
                     <li className="flex items-center gap-3 text-sm text-slate-300">
                       <CheckCircle2 className="w-4 h-4 text-brand-gold" /> Matches ilimitados
                     </li>
                     <li className="flex items-center gap-3 text-sm text-slate-300">
                       <CheckCircle2 className="w-4 h-4 text-brand-gold" /> Mensagens diretas
                     </li>
                     <li className="flex items-center gap-3 text-sm text-slate-300">
                       <CheckCircle2 className="w-4 h-4 text-brand-gold" /> Suporte prioritário
                     </li>
                  </ul>
               </div>
               <a 
                 href="https://app.swaphome.com.br/" 
                 target="_blank"
                 rel="noopener noreferrer"
                 className="block text-center py-4 rounded-xl bg-brand-gold text-brand-dark font-bold hover:opacity-90 transition-all shadow-lg shadow-brand-gold/20 animate-bounce-slow" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent("open-check-modal")); }}
               >
                 Assinar Pro
               </a>
            </div>
         </div>
      </div>

      <div>
         <h3 className="text-2xl font-bold text-white mb-8 text-center bg-brand-gold/10 py-3 rounded-xl border border-brand-gold/20 max-w-sm mx-auto">Para Corretores & Imobiliárias (B2B)</h3>
         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                name: "Starter", 
                price: "149", 
                desc: "Para corretores individuais.",
                features: [
                  "Até 10 imóveis",
                  "Dashboard de gestão (em breve)"
                ]
              },
              { 
                name: "Growth", 
                price: "259", 
                desc: "Para equipes em expansão.",
                features: [
                  "Até 30 imóveis",
                  "Dashboard de gestão (em breve)",
                  "Relatórios de performance (em breve)"
                ]
              },
              { 
                name: "Enterprise", 
                price: "699", 
                desc: "Para grandes estoques.",
                features: [
                  "Até 100 imóveis",
                  "Dashboard de gestão (em breve)",
                  "Relatórios de performance (em breve)",
                  "Aviso de novos imóveis no Telegram (em breve)",
                  "IA para encontrar oportunidades (em breve)"
                ]
              },
              { 
                name: "Enterprise Pro", 
                price: "Plano Personalizado", 
                desc: "Para grandes empresas.",
                features: [
                  "Imóveis ilimitados",
                  "Dashboard de gestão (em breve)",
                  "Relatórios de performance (em breve)",
                  "Aviso de novos imóveis no Telegram (em breve)",
                  "IA para encontrar oportunidades (em breve)"
                ]
              }
            ].map((plan, i) => (
              <div key={i} className={`glass-card p-6 rounded-3xl flex flex-col justify-between ${plan.name === "Enterprise Pro" ? "border-brand-gold/30 bg-brand-gold/5" : "border-white/5 bg-slate-900/20"}`}>
                 <div>
                    <h4 className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-4">{plan.name}</h4>
                    <p className="text-3xl font-extrabold mb-4 flex items-baseline gap-2 flex-wrap">
                      {plan.price === "Plano Personalizado" ? (
                        <span className="text-xl tracking-tight text-white">{plan.price}</span>
                      ) : (
                        <>
                          <span className="line-through text-slate-500 text-lg font-bold">R$ {plan.price}</span>
                          <span className="text-white">R$ 0</span>
                          <span className="text-xs font-normal text-slate-500">/30 dias</span>
                        </>
                      )}
                    </p>
                    
                    <div className="bg-gradient-to-r from-brand-gold via-amber-300 to-brand-gold text-brand-dark text-[11px] font-black py-2 px-3 rounded-xl text-center shadow-[0_0_20px_rgba(201,151,30,0.6)] border border-brand-gold mb-4 uppercase tracking-wider animate-pulse flex items-center justify-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 fill-brand-dark text-brand-dark shrink-0 animate-bounce" />
                      <span>Qualquer plano grátis por 30 dias • Teste agora</span>
                    </div>

                    <p className="text-slate-400 text-xs mb-6 leading-relaxed">{plan.desc}</p>
                    <ul className="space-y-3 mb-8">
                       {plan.features.map((feature, featureIdx) => (
                         <li key={featureIdx} className="flex items-start gap-2 text-xs text-slate-300">
                           <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" /> 
                           <span>{feature}</span>
                         </li>
                       ))}
                    </ul>
                 </div>
                 <button onClick={() => window.dispatchEvent(new CustomEvent("open-check-modal"))} className="block text-center py-3 rounded-xl border border-white/10 text-white font-bold text-sm hover:border-brand-gold transition-all mt-auto cursor-pointer w-full">Solicitar Acesso</button>
              </div>
            ))}
         </div>
      </div>
    </div>
  </section>
);

const FAQ = () => {
  const [activeTab, setActiveTab] = useState<number | null>(0);

  const faqs = [
    {
      q: "Mas os imóveis precisam ter o mesmo valor?",
      a: "Não necessariamente. Na permuta é possível combinar uma diferença em dinheiro — chamada de 'torna'. O SwapHome conecta você a proprietários compatíveis e a negociação do valor fica entre as partes."
    },
    {
      q: "Mas isso é seguro? E a parte jurídica?",
      a: "A plataforma conecta os proprietários — a formalização segue os mesmos trâmites legais de qualquer transação imobiliária (escritura, registro em cartório). Recomendamos sempre um profissional de confiança na etapa final."
    },
    {
      q: "Tem imóvel na minha cidade?",
      a: "A plataforma está em expansão nacional. Quanto mais proprietários cadastram, mais matches surgem — e cada novo cadastro aumenta as chances de todo mundo."
    },
    {
      q: "O SwapHome é para qualquer tipo de imóvel?",
      a: "Sim — apartamentos, casas, terrenos, imóveis comerciais e rurais. Se tem proprietário, tem match possível."
    },
    {
      q: "Preciso ter CRECI para usar?",
      a: "Não. Qualquer pessoa física pode cadastrar seu imóvel. Corretores e imobiliárias têm planos específicos com mais recursos."
    }
  ];

  return (
    <section id="faq" className="py-24 relative overflow-hidden bg-brand-dark/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Perguntas Frequentes"
          subtitle="Tudo o que você precisa saber para fechar o negócio da sua vida."
          centered
        />
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i}
              className="glass-card rounded-2xl border-white/5 overflow-hidden"
            >
              <button 
                onClick={() => setActiveTab(activeTab === i ? null : i)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-white/[0.02] transition-all"
              >
                <h4 className={`text-lg font-bold transition-all ${activeTab === i ? 'text-brand-gold' : 'text-white'}`}>{faq.q}</h4>
                <div className={`transition-transform duration-300 ${activeTab === i ? 'rotate-45 text-brand-gold' : 'text-slate-500'}`}>
                   <Plus className="w-5 h-5" />
                </div>
              </button>
              <AnimatePresence>
                {activeTab === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-slate-400 text-sm leading-relaxed border-t border-white/5 italic">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    empresa: "",
    email: "",
    telefone: "",
    perfil: "Proprietário"
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contato" className="py-24 bg-brand-dark relative overflow-hidden border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
           <div>
              <SectionHeading 
                title="Sua próxima casa já está aqui."
                subtitle="O imóvel que você quer pode estar cadastrado agora mesmo — esperando exatamente pelo imóvel que você tem."
              />
              <div className="space-y-6">
                 <div className="flex gap-4">
                    <div className="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center shrink-0">
                       <CheckCircle className="w-6 h-6 text-brand-gold" />
                    </div>
                    <div>
                       <h4 className="text-white font-bold mb-1">Leva menos de 3 minutos</h4>
                       <p className="text-slate-400 text-sm italic">Cadastro rápido e intuitivo pelo celular.</p>
                    </div>
                 </div>

              </div>
           </div>

           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="glass-card rounded-[2.5rem] shadow-2xl p-8 md:p-10 border-white/10"
           >
             {submitted ? (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="text-center py-8"
               >
                 <div className="w-20 h-20 bg-brand-blue/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-brand-blue/30 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                   <CheckCircle2 className="w-10 h-10 text-brand-blue" />
                 </div>
                 <h2 className="text-3xl font-bold text-white mb-4">Solicitação Enviada!</h2>
                 <p className="text-slate-400 mb-8">Nossa equipe entrará em contato em breve para liberar seu acesso.</p>
                 <button 
                   onClick={() => setSubmitted(false)}
                   className="text-brand-gold font-bold hover:underline"
                 >
                   Enviar outra mensagem
                 </button>
               </motion.div>
             ) : (
               <>
                 <div className="text-center mb-8">
                   <h2 className="text-2xl font-bold text-white mb-2">Cadastrar Grátis</h2>
                   <p className="text-slate-400 text-sm">Junte-se à maior rede de permuta imobiliária.</p>
                 </div>
   
                 <form onSubmit={handleSubmit} className="space-y-4">
                   <input 
                     type="text" 
                     required 
                     className="w-full p-4 rounded-xl input-field"
                     placeholder="Nome Completo"
                     onChange={e => setFormData({...formData, nome: e.target.value})}
                   />
                   <div className="grid grid-cols-2 gap-4">
                     <input 
                       type="text" 
                       className="w-full p-4 rounded-xl input-field"
                       placeholder="Sua Identidade"
                       onChange={e => setFormData({...formData, empresa: e.target.value})}
                     />
                     <input 
                       type="tel" 
                       required 
                       className="w-full p-4 rounded-xl input-field"
                       placeholder="WhatsApp (+55)"
                       onChange={e => setFormData({...formData, telefone: e.target.value})}
                     />
                   </div>
                   <input 
                     type="email" 
                     required 
                     className="w-full p-4 rounded-xl input-field"
                     placeholder="E-mail"
                     onChange={e => setFormData({...formData, email: e.target.value})}
                   />
                   <select 
                     className="w-full p-4 rounded-xl input-field appearance-none cursor-pointer"
                     onChange={e => setFormData({...formData, perfil: e.target.value})}
                   >
                     <option value="Proprietário">Proprietário (PF)</option>
                     <option value="Corretor">Corretor Elite</option>
                     <option value="Investidor">Investidor</option>
                   </select>

                   <div className="py-2">
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest text-center">
                        Ao se cadastrar, você concorda com nossa Política de Privacidade e com o tratamento dos seus dados conforme a LGPD.
                      </p>
                   </div>
   
                   <button 
                     type="submit" 
                     className="w-full py-4 rounded-xl bg-brand-gold hover:opacity-90 text-brand-dark font-bold text-lg shadow-lg shadow-brand-gold/20 transition-all mt-4 uppercase tracking-wide"
                   >
                     Cadastrar meu imóvel grátis
                   </button>
                 </form>
               </>
             )}
           </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-brand-dark pt-12 pb-10 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:row items-center justify-between gap-8">
        <div className="flex items-center">
          <img src={LOGO_URL} alt="SwapHome Logo" className="h-24 w-auto opacity-70 hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
        </div>
        
        <nav className="flex gap-8 text-xs font-bold uppercase tracking-widest text-slate-500">
          <a href="#" className="hover:text-brand-blue transition-colors">Termos</a>
          <a href="#" className="hover:text-brand-blue transition-colors">Privacidade</a>
          <a href="#" className="hover:text-brand-blue transition-colors">Cookies</a>
        </nav>

        <div className="text-xs text-slate-600 font-medium">
          © {new Date().getFullYear()} SwapHome — Transformando ativos em oportunidades.
        </div>
      </div>
    </div>
  </footer>
);

const PermutaSimulator = () => {
  const [step, setStep] = useState<"input" | "calculating" | "result">("input");
  const [loadingText, setLoadingText] = useState("");
  const [progress, setProgress] = useState(0);
  // Estados para o que TEM
  const [hasType, setHasType] = useState("Apartamento");
  const [hasCity, setHasCity] = useState("São Paulo");
  const [hasValue, setHasValue] = useState(500000);
  // Estados para o que BUSCA
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
      
      // Cálculo do score fictício
      const isSameCity = hasCity.toLowerCase().trim() === wantCity.toLowerCase().trim();
      const baseScore = isSameCity ? 92 : 85;
      const randomModifier = Math.floor(Math.random() * 8); // 0-7
      const matchScore = Math.min(baseScore + randomModifier, 98);
      
      const matchCount = Math.floor(Math.random() * 12) + 4; // 4 a 15 matches
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
  const scrollToContact = () => {
    const el = document.getElementById("contato");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
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
  const cities = ["São Paulo", "Campinas", "Sorocaba", "Curitiba", "Rio de Janeiro", "Belo Horizonte", "Valinhos", "Indaiatuba", "Florianópolis", "Santos"];
  return (
    <section id="simulador" className="py-24 relative overflow-hidden bg-brand-dark/40 border-y border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Simulador de Compatibilidade"
          subtitle="Descubra se existem imóveis compatíveis para troca e veja uma estimativa de torna financeira."
          centered
        />
        <div className="glass-card rounded-[2.5rem] border-white/10 shadow-2xl p-8 md:p-12 relative overflow-hidden min-h-[450px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {step === "input" && (
              <motion.div
                key="input"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-8 flex-1 flex flex-col justify-between"
              >
                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                  {/* Lado TEM */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 pb-2 border-b border-white/5">
                      <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center border border-brand-blue/20">
                        <Building2 className="w-4 h-4 text-brand-blue" />
                      </div>
                      <h3 className="text-lg font-bold text-white">O que você TEM</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Tipo de Imóvel</label>
                        <select 
                          value={hasType}
                          onChange={(e) => setHasType(e.target.value)}
                          className="w-full p-4 rounded-xl input-field appearance-none cursor-pointer text-slate-100"
                        >
                          {propertyTypes.map((type) => (
                            <option key={type} value={type} className="bg-slate-900">{type}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Cidade do Imóvel</label>
                        <select 
                          value={hasCity}
                          onChange={(e) => setHasCity(e.target.value)}
                          className="w-full p-4 rounded-xl input-field appearance-none cursor-pointer text-slate-100"
                        >
                          {cities.map((city) => (
                            <option key={city} value={city} className="bg-slate-900">{city}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Valor Estimado</label>
                        <select 
                          value={hasValue}
                          onChange={(e) => setHasValue(Number(e.target.value))}
                          className="w-full p-4 rounded-xl input-field appearance-none cursor-pointer text-slate-100"
                        >
                          {valueOptions.map((opt) => (
                            <option key={opt.value} value={opt.value} className="bg-slate-900">{opt.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  {/* Lado BUSCA */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 pb-2 border-b border-white/5">
                      <div className="w-8 h-8 rounded-full bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
                        <Target className="w-4 h-4 text-brand-gold" />
                      </div>
                      <h3 className="text-lg font-bold text-white">O que você BUSCA</h3>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Tipo Desejado</label>
                        <select 
                          value={wantType}
                          onChange={(e) => setWantType(e.target.value)}
                          className="w-full p-4 rounded-xl input-field appearance-none cursor-pointer text-slate-100"
                        >
                          {propertyTypes.map((type) => (
                            <option key={type} value={type} className="bg-slate-900">{type}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Cidade Desejada</label>
                        <select 
                          value={wantCity}
                          onChange={(e) => setWantCity(e.target.value)}
                          className="w-full p-4 rounded-xl input-field appearance-none cursor-pointer text-slate-100"
                        >
                          {cities.map((city) => (
                            <option key={city} value={city} className="bg-slate-900">{city}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Valor Desejado</label>
                        <select 
                          value={wantValue}
                          onChange={(e) => setWantValue(Number(e.target.value))}
                          className="w-full p-4 rounded-xl input-field appearance-none cursor-pointer text-slate-100"
                        >
                          {valueOptions.map((opt) => (
                            <option key={opt.value} value={opt.value} className="bg-slate-900">{opt.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-6">
                  <button
                    onClick={handleSimulate}
                    className="w-full py-4 rounded-xl bg-brand-gold hover:opacity-90 text-brand-dark font-bold text-lg shadow-lg shadow-brand-gold/20 transition-all flex items-center justify-center gap-2 uppercase tracking-wider active:scale-[0.98] cursor-pointer"
                  >
                    <Repeat className="w-5 h-5 animate-spin-slow" />
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
                className="flex flex-col items-center justify-center py-12 flex-1 text-center space-y-8"
              >
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-4 border-slate-800 border-t-brand-gold animate-spin" />
                  <div className="w-20 h-20 bg-brand-gold/10 rounded-full flex items-center justify-center border border-brand-gold/20 animate-pulse">
                    <Repeat className="w-10 h-10 text-brand-gold" />
                  </div>
                </div>
                <div className="space-y-3 max-w-sm w-full">
                  <h3 className="text-xl font-bold text-white tracking-tight">{loadingText}</h3>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
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
                className="space-y-8 flex-1 flex flex-col justify-between"
              >
                <div className="text-center space-y-2">
                  <span className="text-brand-gold font-bold text-xs uppercase tracking-widest italic">Simulação Concluída</span>
                  <h3 className="text-3xl font-extrabold text-white">Resultado do Match</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-6 items-center">
                  {/* Score de Match */}
                  <div className="glass-card p-6 rounded-2xl border-white/5 text-center flex flex-col items-center justify-center min-h-[160px] bg-slate-950/20">
                    <div className="relative w-24 h-24 flex items-center justify-center mb-3">
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
                      <span className="absolute text-2xl font-black text-white italic">{results.matchScore}%</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 font-sans">Compatibilidade</span>
                  </div>
                  {/* Matches Encontrados */}
                  <div className="glass-card p-6 rounded-2xl border-white/5 text-center flex flex-col items-center justify-center min-h-[160px] bg-slate-950/20">
                    <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center border border-brand-blue/20 mb-3">
                      <Building2 className="w-6 h-6 text-brand-blue animate-bounce" />
                    </div>
                    <div className="text-3xl font-black text-white italic mb-1">{results.matchCount}</div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 font-sans">Imóveis Compatíveis</span>
                  </div>
                  {/* Cálculo da Torna */}
                  <div className="glass-card p-6 rounded-2xl border-white/5 text-center flex flex-col items-center justify-center min-h-[160px] bg-slate-950/20">
                    {results.tornaType === "none" ? (
                      <>
                        <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20 mb-3">
                          <CheckCircle2 className="w-6 h-6 text-green-500" />
                        </div>
                        <div className="text-lg font-bold text-green-400 uppercase tracking-tight mb-1">Permuta Equivalente</div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 font-sans">Sem Torna Financeira</span>
                      </>
                    ) : (
                      <>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center border mb-3 ${
                          results.tornaType === "receive" 
                            ? "bg-green-500/10 border-green-500/20" 
                            : "bg-brand-gold/10 border-brand-gold/20"
                        }`}>
                          <ArrowRightLeft className={`w-6 h-6 ${results.tornaType === "receive" ? "text-green-500" : "text-brand-gold"}`} />
                        </div>
                        <div className="text-2xl font-black text-white italic mb-1">
                          R$ {results.tornaValue.toLocaleString("pt-BR")}
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 font-sans">
                          {results.tornaType === "receive" ? "Você Recebe de Torna" : "Você Paga de Torna"}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                {/* Botões do rodapé */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    onClick={handleReset}
                    className="flex-1 py-4 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all text-sm uppercase tracking-wider active:scale-[0.98] cursor-pointer"
                  >
                    Nova Simulação
                  </button>
                  <a
                    href="https://app.swaphome.com.br/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-4 rounded-xl bg-brand-gold text-brand-dark font-bold hover:opacity-90 transition-all text-sm uppercase tracking-wider shadow-lg shadow-brand-gold/20 flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer text-center"
                  >
                    Ver Imóveis Disponíveis
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const CheckAccessModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "found" | "new" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [countdown, setCountdown] = useState(3);
  const [isSimulated, setIsSimulated] = useState(false);

  // Supabase states with LocalStorage binding
  const [supabaseUrl, setSupabaseUrl] = useState(() => localStorage.getItem("sb_url") || "");
  const [supabaseKey, setSupabaseKey] = useState(() => localStorage.getItem("sb_key") || "");
  const [tableName, setTableName] = useState(() => localStorage.getItem("sb_table") || "users");
  const [emailColumn, setEmailColumn] = useState(() => localStorage.getItem("sb_column") || "email");
  const [redirectRegistration, setRedirectRegistration] = useState(() => localStorage.getItem("sb_redirect_reg") || "https://app.swaphome.com.br/");
  const [redirectCheckout, setRedirectCheckout] = useState(() => localStorage.getItem("sb_redirect_chk") || "https://app.swaphome.com.br/checkout");

  const [showSettings, setShowSettings] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isServerConfigured, setIsServerConfigured] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Check if server has pre-configured Supabase
      fetch("/api/health")
        .then((res) => res.json())
        .then((data) => {
          if (data && data.supabaseConfigured) {
            setIsServerConfigured(true);
          }
        })
        .catch((err) => console.error("Error checking database status:", err));
    }
  }, [isOpen]);

  useEffect(() => {
    // Reset state when modal is opened/closed
    if (isOpen) {
      setEmail("");
      setStatus("idle");
      setErrorMsg("");
      setCountdown(3);
      setIsSimulated(false);
      setShowSettings(false);
      setSaveSuccess(false);
    }
  }, [isOpen]);

  // Handle Countdown for redirection
  useEffect(() => {
    if ((status === "found" || status === "new") && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((c) => c - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [status, countdown]);

  if (!isOpen) return null;

  const handleSaveSettings = (e: FormEvent) => {
    e.preventDefault();
    localStorage.setItem("sb_url", supabaseUrl.trim());
    localStorage.setItem("sb_key", supabaseKey.trim());
    localStorage.setItem("sb_table", tableName.trim());
    localStorage.setItem("sb_column", emailColumn.trim());
    localStorage.setItem("sb_redirect_reg", redirectRegistration.trim());
    localStorage.setItem("sb_redirect_chk", redirectCheckout.trim());
    
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setShowSettings(false);
    }, 1500);
  };

  const handleClearSettings = () => {
    setSupabaseUrl("");
    setSupabaseKey("");
    setTableName("users");
    setEmailColumn("email");
    setRedirectRegistration("https://app.swaphome.com.br/");
    setRedirectCheckout("https://app.swaphome.com.br/checkout");

    localStorage.removeItem("sb_url");
    localStorage.removeItem("sb_key");
    localStorage.removeItem("sb_table");
    localStorage.removeItem("sb_column");
    localStorage.removeItem("sb_redirect_reg");
    localStorage.removeItem("sb_redirect_chk");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMsg("Por favor, insira um endereço de e-mail válido.");
      setStatus("error");
      return;
    }

    setStatus("checking");
    setErrorMsg("");

    try {
      // Only send custom credentials if the server does NOT have a pre-configured database in .env
      const customCredentials = (supabaseUrl && supabaseKey && !isServerConfigured) ? {
        url: supabaseUrl,
        key: supabaseKey,
        tableName,
        emailColumn,
        redirectRegistration,
        redirectCheckout
      } : undefined;

      const res = await fetch("/api/check-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, customCredentials }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Falha ao comunicar com o servidor.");
      }

      const data = await res.json();
      setIsSimulated(!!data.simulation);

      if (data.exists) {
        setStatus("found");
        setTimeout(() => {
          window.location.href = data.redirectUrl;
        }, 3000);
      } else {
        setStatus("new");
        setTimeout(() => {
          window.location.href = data.redirectUrl;
        }, 3000);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "E-mail não pôde ser verificado. Tente novamente.");
      setStatus("error");
    }
  };

  const isConfigured = !!(supabaseUrl && supabaseKey) || isServerConfigured;

  const getMecanismoLabel = () => {
    if (isServerConfigured) {
      return "Supabase Conectado";
    }
    if (supabaseUrl && supabaseKey) {
      return "Supabase (Personalizado)";
    }
    return "Simulação Local";
  };

  return (
    <div className="fixed inset-0 bg-[#060a12]/85 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="glass-card max-w-lg w-full border border-brand-gold/30 bg-[#0d1525]/95 relative overflow-hidden p-8 rounded-3xl shadow-[0_0_50px_rgba(201,151,30,0.15)] flex flex-col max-h-[90vh]"
      >
        {/* Background gradient flares */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between mb-6 relative z-10 border-b border-white/5 pb-4">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-brand-gold" />
            <h3 className="text-white font-bold text-lg font-sans tracking-tight">Portal SwapHome</h3>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-white p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content States */}
        {showSettings ? (
          <div className="relative z-10 flex flex-col h-full overflow-y-auto pr-1 max-h-[60vh] space-y-4 text-left scrollbar-thin">
            <div>
              <h4 className="text-white font-extrabold text-xl mb-1 flex items-center gap-2">
                <Database className="w-5 h-5 text-brand-gold" />
                Configurar Banco de Dados
              </h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Insira suas credenciais do Supabase para fazer consultas reais no seu banco. Elas serão salvas localmente neste navegador.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Supabase URL</label>
                  <input
                    type="url"
                    placeholder="https://your-project.supabase.co"
                    value={supabaseUrl}
                    onChange={(e) => setSupabaseUrl(e.target.value)}
                    className="w-full p-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-slate-500 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/50 transition-all text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">API Key (Anon ou Service Role)</label>
                  <input
                    type="password"
                    placeholder="eyJhbGciOi..."
                    value={supabaseKey}
                    onChange={(e) => setSupabaseKey(e.target.value)}
                    className="w-full p-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-slate-500 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/50 transition-all text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Nome da Tabela</label>
                    <input
                      type="text"
                      placeholder="users"
                      value={tableName}
                      required
                      onChange={(e) => setTableName(e.target.value)}
                      className="w-full p-3 rounded-xl border border-white/10 bg-white/5 text-white focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/50 transition-all text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Coluna de E-mail</label>
                    <input
                      type="text"
                      placeholder="email"
                      value={emailColumn}
                      required
                      onChange={(e) => setEmailColumn(e.target.value)}
                      className="w-full p-3 rounded-xl border border-white/10 bg-white/5 text-white focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/50 transition-all text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">URL se Não Cadastrado (Novo)</label>
                  <input
                    type="url"
                    placeholder="https://app.swaphome.com.br/"
                    value={redirectRegistration}
                    required
                    onChange={(e) => setRedirectRegistration(e.target.value)}
                    className="w-full p-3 rounded-xl border border-white/10 bg-white/5 text-white focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/50 transition-all text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">URL se Já Cadastrado (Checkout)</label>
                  <input
                    type="url"
                    placeholder="https://app.swaphome.com.br/checkout"
                    value={redirectCheckout}
                    required
                    onChange={(e) => setRedirectCheckout(e.target.value)}
                    className="w-full p-3 rounded-xl border border-white/10 bg-white/5 text-white focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/50 transition-all text-xs"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleClearSettings}
                  className="flex-1 py-3 border border-red-500/20 hover:border-red-500/50 text-red-400 hover:bg-red-500/5 font-bold rounded-xl transition-all text-xs cursor-pointer focus:outline-none"
                >
                  Limpar Campos
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-brand-gold text-brand-dark font-black rounded-xl hover:opacity-90 transition-all text-xs uppercase tracking-wider cursor-pointer"
                >
                  {saveSuccess ? "Salvo com sucesso!" : "Salvar Dados"}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="relative z-10 flex flex-col">
            {status === "idle" && (
              <div>
                <h4 className="text-white font-extrabold text-xl mb-1 tracking-tight">Verificar Acesso à Plataforma</h4>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                  Informe seu e-mail abaixo para verificarmos se você já possui cadastro e direcioná-lo corretamente.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Seu E-mail</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-4 rounded-xl border border-white/10 bg-white/5 text-white placeholder-slate-500 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/50 transition-all font-sans text-sm"
                      placeholder="seuemail@exemplo.com"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-brand-gold text-brand-dark font-black rounded-xl hover:opacity-90 transition-all text-sm uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-brand-gold/20"
                  >
                    Verificar Cadastro <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}

            {status === "checking" && (
              <div className="text-center py-8 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full border-t-2 border-brand-gold animate-spin mb-6" />
                <h4 className="text-white font-bold text-lg mb-2">Buscando Registro...</h4>
                <p className="text-slate-400 text-sm">Aguarde enquanto verificamos seu cadastro.</p>
              </div>
            )}

            {status === "found" && (
              <div className="text-center py-6 flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(34,197,94,0.2)] animate-pulse">
                  <Check className="w-8 h-8 text-green-400" />
                </div>
                <h4 className="text-white font-extrabold text-xl mb-2">Cadastro Ativo Encontrado!</h4>
                <p className="text-slate-400 text-sm mb-4">Escolha seu plano na próxima tela</p>
                <p className="text-slate-500 text-xs">Redirecionando em {countdown} segundo{countdown !== 1 ? "s" : ""}...</p>
              </div>
            )}

            {status === "new" && (
              <div className="text-center py-6 flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-brand-gold/10 border border-brand-gold/30 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(201,151,30,0.2)] animate-pulse">
                  <Building2 className="w-8 h-8 text-brand-gold" />
                </div>
                <h4 className="text-white font-extrabold text-xl mb-2">E-mail não Encontrado</h4>
                <p className="text-slate-400 text-sm mb-4">Faça o cadastro e volte para escolher seu plano</p>
                <p className="text-slate-500 text-xs">Redirecionando em {countdown} segundo{countdown !== 1 ? "s" : ""}...</p>
              </div>
            )}

            {status === "error" && (
              <div>
                <div className="text-center py-4 flex flex-col items-center justify-center">
                  <div className="w-14 h-14 bg-red-500/10 border border-red-500/30 rounded-full flex items-center justify-center mb-4">
                    <AlertCircle className="w-7 h-7 text-red-500" />
                  </div>
                  <h4 className="text-white font-bold text-lg mb-2">Erro na Consulta</h4>
                  <p className="text-red-400 text-sm mb-6 leading-relaxed">{errorMsg}</p>
                </div>

                <button
                  onClick={() => setStatus("idle")}
                  className="w-full py-4 border border-white/10 hover:border-brand-gold text-white font-bold rounded-xl transition-all text-sm uppercase tracking-wider flex items-center justify-center cursor-pointer"
                >
                  Tentar Novamente
                </button>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default function App() {
  const [isCheckModalOpen, setIsCheckModalOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsCheckModalOpen(true);
    window.addEventListener("open-check-modal", handleOpen);
    return () => {
      window.removeEventListener("open-check-modal", handleOpen);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <PermutaSimulator />
      <HowItWorks />
      <Stats />
      <ValueProp />
      <Benefits />
      <Testimonials />
      <PainPoints />
      <Pricing />
      <FAQ />
      {/* <ContactForm /> */}
      <Footer />
      <CheckAccessModal isOpen={isCheckModalOpen} onClose={() => setIsCheckModalOpen(false)} />
    </div>
  );
}