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
  X
} from "lucide-react";
import { useState, FormEvent } from "react";

const LOGO_URL = "https://lh3.googleusercontent.com/d/16FOqiYB4xcoXfqJ_k5sxP-c58SS6_zpL";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Solução", href: "#solucao" },
    { label: "Benefícios", href: "#beneficios" },
    { label: "Planos", href: "#planos" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#B09D75]/50 backdrop-blur-xl border-b border-black/5 shadow-xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center relative">
          <img 
            src={LOGO_URL} 
            alt="SwapHome Logo" 
            className="h-16 w-auto transition-all hover:scale-110 duration-500 relative z-10" 
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
            href="#contato" 
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
            className="md:hidden bg-[#B09D75] border-t border-black/5 overflow-hidden"
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
                href="#contato"
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
  <section className="relative pt-44 pb-20 lg:pt-64 lg:pb-32 overflow-hidden">
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
            className="text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6 text-balance"
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
              href="#contato" 
              whileHover={{ scale: 1.05, backgroundColor: "#A87D17" }}
              whileTap={{ scale: 0.95 }}
              className="bg-brand-gold text-brand-dark px-8 py-4 rounded-xl font-bold flex flex-col items-center justify-center gap-1 transition-all shadow-lg shadow-brand-gold/20"
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
            className="relative z-10 glass-card p-2 rounded-3xl shadow-2xl overflow-hidden max-w-[400px] mx-auto"
          >
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
                        whileHover={{ scale: 1.1 }}
                        className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20"
                      >
                        <Users className="w-6 h-6 text-white" />
                     </motion.div>
                     <motion.div 
                        whileHover={{ scale: 1.1, rotate: 180 }}
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
          </motion.div>
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-brand-blue/10 rounded-full blur-3xl -z-10" />
        </motion.div>
      </div>
    </div>
  </section>
);

const SectionHeading = ({ badge, title, subtitle, centered = false }: { badge: string, title: string, subtitle: string, centered?: boolean }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6 }}
    className={`mb-16 ${centered ? 'text-center' : ''}`}
  >
    <span className="text-brand-gold font-bold text-sm tracking-widest uppercase mb-4 block italic">{badge}</span>
    <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 text-balance">{title}</h2>
    <p className="text-lg text-slate-400 max-w-2xl mx-auto">{subtitle}</p>
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
        badge="Prova Social"
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
        badge="Realidade do Mercado"
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
                badge="Proposta de Valor"
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
                          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-2 mx-auto border border-white/10">
                             <Building2 className="w-8 h-8 text-slate-400" />
                          </div>
                          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Seu Imóvel</span>
                       </div>
                       <ArrowRightLeft className="w-8 h-8 text-brand-gold animate-pulse" />
                       <div className="text-center">
                          <div className="w-16 h-16 bg-brand-gold/10 rounded-2xl flex items-center justify-center mb-2 mx-auto border border-brand-gold/20">
                             <Target className="w-8 h-8 text-brand-gold" />
                          </div>
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
        badge="Protocolo"
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
        badge="Diferenciais"
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
        badge="Nossas Ofertas"
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
               <a href="#contato" className="block text-center py-4 rounded-xl border border-white/10 text-white font-bold hover:bg-white hover:text-brand-dark transition-all">Começar Agora</a>
            </div>

            {/* CPF PRO */}
            <div className="glass-card p-10 rounded-3xl border-brand-gold/30 bg-brand-gold/5 relative overflow-hidden">
               <div className="absolute top-4 right-4 bg-brand-gold text-brand-dark text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg">Popular</div>
               <h4 className="text-brand-gold font-bold uppercase tracking-widest text-xs mb-4">Plano Pro</h4>
               <p className="text-4xl font-bold text-white mb-4">R$ 49,90 <span className="text-sm font-normal text-slate-500">/mês</span></p>
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
               <a href="#contato" className="block text-center py-4 rounded-xl bg-brand-gold text-brand-dark font-bold hover:opacity-90 transition-all shadow-lg shadow-brand-gold/20">Assinar Pro</a>
            </div>
         </div>
      </div>

      <div>
         <h3 className="text-2xl font-bold text-white mb-8 text-center bg-brand-gold/10 py-3 rounded-xl border border-brand-gold/20 max-w-sm mx-auto">Para Corretores & Imobiliárias (B2B)</h3>
         <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Starter", price: "149", items: "10", desc: "Para corretores individuais." },
              { name: "Growth", price: "259", items: "30", desc: "Para equipes em expansão." },
              { name: "Enterprise", price: "699", items: "100", desc: "Para grandes estoques." }
            ].map((plan, i) => (
              <div key={i} className="glass-card p-8 rounded-3xl border-white/5 bg-slate-900/20">
                 <h4 className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-4">{plan.name}</h4>
                 <p className="text-3xl font-bold text-white mb-4">R$ {plan.price} <span className="text-sm font-normal text-slate-500">/mês</span></p>
                 <p className="text-slate-400 text-xs mb-6 leading-relaxed">{plan.desc}</p>
                 <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-brand-gold" /> Até {plan.items} imóveis
                    </li>
                    <li className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-brand-gold" /> Dashboard de gestão
                    </li>
                    {i > 0 && (
                      <li className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-brand-gold" /> Relatórios de performance
                      </li>
                    )}
                 </ul>
                 <a href="#contato" className="block text-center py-3 rounded-xl border border-white/10 text-white font-bold text-sm hover:border-brand-gold transition-all">Solicitar Acesso</a>
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
          badge="Dúvidas Recentes"
          title="Quebra de Objeções"
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
                badge="Contato"
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

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <PainPoints />
      <ValueProp />
      <HowItWorks />
      <Benefits />
      <Testimonials />
      <Pricing />
      <FAQ />
      <ContactForm />
      <Footer />
    </div>
  );
}