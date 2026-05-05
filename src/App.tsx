/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
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
  ArrowRight
} from "lucide-react";
import { useState, FormEvent } from "react";

const LOGO_URL = "https://lh3.googleusercontent.com/d/1s0hgQ316GB7xvwbRY1VRR49UmlcGmU33";

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/50 backdrop-blur-xl border-b border-white/5">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img src={LOGO_URL} alt="ImovelMatch Logo" className="h-14 w-auto" referrerPolicy="no-referrer" />
        <span className="font-display text-2xl font-bold tracking-tight text-white">
          Imovel<span className="text-brand-orange">Match</span>
        </span>
      </div>
      <div className="hidden md:flex items-center gap-8">
        <a href="#parceiros" className="text-sm font-medium text-slate-400 hover:text-brand-blue transition-colors">Parceiros</a>
        <a href="#anunciantes" className="text-sm font-medium text-slate-400 hover:text-brand-blue transition-colors">Anunciantes</a>
        <a href="#como-funciona" className="text-sm font-medium text-slate-400 hover:text-brand-blue transition-colors">Como Funciona</a>
        <a 
          href="#contato" 
          className="bg-brand-orange text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-orange-600 transition-all active:scale-95 shadow-lg shadow-brand-orange/20"
        >
          Seja um Parceiro
        </a>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
    {/* Decorative Blobs */}
    <div className="absolute top-[-100px] right-[-100px] w-96 h-96 bg-brand-blue/10 rounded-full blur-[120px] -z-10" />
    <div className="absolute bottom-[-50px] left-[-50px] w-80 h-80 bg-brand-orange/10 rounded-full blur-[100px] -z-10" />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-brand-blue/10 border border-brand-blue/20 px-3 py-1 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
            <span className="text-brand-blue text-xs font-bold uppercase tracking-wider">O Tinder da Permuta Imobiliária</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6 text-balance">
            Encontre o <span className="accent-gradient-text">Match Perfeito</span> para o seu Imóvel.
          </h1>
          <p className="text-lg lg:text-xl text-slate-400 mb-10 leading-relaxed text-balance">
            Deslize, conecte e negocie. O ImovelMatch utiliza algoritmos de inteligência para unir pessoas com interesses de troca complementares, transformando permuta em liquidez rápida.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#contato" 
              className="bg-brand-orange text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-all shadow-lg shadow-brand-orange/20 hover:-translate-y-1 active:translate-y-0"
            >
              Começar Agora <ArrowRight className="w-5 h-5" />
            </a>
            <a 
              href="#como-funciona" 
              className="glass-card px-8 py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
            >
              Ver Como Funciona
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 glass-card p-2 rounded-3xl shadow-2xl overflow-hidden max-w-[400px] mx-auto">
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1080" 
              alt="Imóvel em destaque" 
              className="rounded-2xl w-full h-[500px] object-cover opacity-90"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black via-black/40 to-transparent">
               <div className="flex justify-between items-end">
                  <div>
                    <h4 className="text-white text-2xl font-extrabold">Apartamento Jardins</h4>
                    <p className="text-slate-300 text-sm">São Paulo, SP • R$ 2.4M</p>
                  </div>
                  <div className="flex gap-2">
                     <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                        <Users className="w-6 h-6 text-white" />
                     </div>
                     <div className="w-12 h-12 bg-brand-orange rounded-full flex items-center justify-center shadow-lg shadow-brand-orange/40">
                        <Repeat className="w-6 h-6 text-white" />
                     </div>
                  </div>
               </div>
            </div>
            <div className="absolute top-6 left-6 glass-card px-3 py-1 rounded-full flex items-center gap-2 border-brand-orange/40">
              <span className="w-2 h-2 rounded-full bg-brand-orange" />
              <span className="text-[10px] font-bold text-white uppercase tracking-tighter">Interesse em Permuta</span>
            </div>
          </div>
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-brand-blue/10 rounded-full blur-3xl -z-10" />
        </motion.div>
      </div>
    </div>
  </section>
);

const SectionHeading = ({ badge, title, subtitle, centered = false }: { badge: string, title: string, subtitle: string, centered?: boolean }) => (
  <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
    <span className="text-brand-orange font-bold text-sm tracking-widest uppercase mb-4 block italic">{badge}</span>
    <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 text-balance">{title}</h2>
    <p className="text-lg text-slate-400 max-w-2xl mx-auto">{subtitle}</p>
  </div>
);

const Partners = () => (
  <section id="parceiros" className="py-24 bg-brand-dark/50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading 
        badge="Para Parceiros"
        title="Otimize sua Carteira com a Tecnologia Match."
        subtitle="Imobiliárias e corretores utilizam o ImovelMatch para descobrir conexões de permuta ocultas e acelerar o giro de ativos imobiliários."
      />
      
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            icon: BarChart3,
            color: "text-brand-orange",
            title: "Giro Inteligente",
            description: "Encontre instantaneamente parceiros que possuem o perfil de imóvel ideal para a troca do seu cliente."
          },
          {
            icon: MessageSquare,
            color: "text-brand-blue",
            title: "Comunicação Ágil",
            description: "Negocie detalhes diretamente via chat e acompanhe o progresso das conversas em tempo real."
          },
          {
            icon: Zap,
            color: "text-brand-orange",
            title: "Liquidez sob Demanda",
            description: "Reduza o tempo de espera no estoque transformando buscas passivas em matches ativos."
          }
        ].map((item, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -5 }}
            className="glass-card p-8 rounded-2xl hover:border-white/20 hover:bg-slate-800/60 transition-all group"
          >
            <div className={`w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <item.icon className={`w-8 h-8 ${item.color}`} />
            </div>
            <h3 className="text-xl font-bold text-white mb-4 italic">{item.title}</h3>
            <p className="text-slate-400 leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const Advertisers = () => (
  <section id="anunciantes" className="py-24 relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative order-2 lg:order-1">
          <div className="relative z-10 glass-card p-2 rounded-[2.5rem] shadow-2xl overflow-hidden aspect-[4/5] lg:aspect-auto lg:h-[600px]">
             <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1080" 
              alt="Luxury Home" 
              className="rounded-[2rem] w-full h-full object-cover opacity-60"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 to-transparent" />
            <div className="absolute bottom-10 left-10 right-10">
              <div className="flex items-center gap-3 bg-brand-blue/20 backdrop-blur-md border border-brand-blue/30 px-4 py-2 rounded-full w-fit mb-4">
                <Target className="w-4 h-4 text-brand-blue" />
                <span className="text-brand-blue text-xs font-bold uppercase tracking-wider">Interface Swipe</span>
              </div>
              <h4 className="text-white text-3xl font-bold">Descubra novos lares deslizando</h4>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <SectionHeading 
            badge="Para Anunciantes"
            title="Sua próxima casa pode estar a um match de distância."
            subtitle="Simplificamos a complexidade da permuta com uma interface focada na descoberta. Encontre, curta e abra o chat."
          />
          
          <ul className="space-y-6">
            {[
              "Navegação visual e intuitiva estilo 'Discovery'",
              "Filtros de correspondência por valor e localização",
              "Chat criptografado para negociar diretamente",
              "Matches instantâneos com perfis verificados"
            ].map((text, i) => (
              <li key={i} className="flex items-start gap-4">
                <div className="mt-1 bg-brand-blue/10 p-1.5 rounded-full border border-brand-blue/20">
                  <CheckCircle2 className="w-5 h-5 text-brand-blue" />
                </div>
                <span className="text-lg text-slate-300 font-medium">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

const HowItWorks = () => (
  <section id="como-funciona" className="py-24 bg-brand-dark relative">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-20">
        <span className="text-brand-orange font-bold text-sm tracking-widest uppercase mb-4 block italic">Processo Simples</span>
        <h2 className="text-4xl lg:text-6xl font-bold mb-6">Explore, Escolha e Negocie.</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        {[
          {
            step: "01",
            title: "Descoberta",
            subtitle: "Exploração de Ativos",
            description: "Navegue por uma curadoria inteligente de imóveis cujos proprietários buscam exatamente o que você tem a oferecer."
          },
          {
            step: "02",
            title: "Match AI",
            subtitle: "Conexão de Interesses",
            description: "Quando o interesse é mútuo, o Match acontece! Nossa IA valida a compatibilidade de valores e regiões instantaneamente."
          },
          {
            step: "03",
            title: "Chat Direto",
            subtitle: "Negociação Facilitada",
            description: "Abra um canal de conversa seguro dentro do app para alinhar detalhes, agendar visitas e fechar a sua permuta."
          }
        ].map((item, i) => (
          <div key={i} className="flex gap-6 items-start">
            <span className="text-5xl font-display font-black text-white/10 italic">
              {item.step}
            </span>
            <div>
              <div className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-2">
                <span className="block text-slate-200">{item.title}</span>
                {item.subtitle}
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    empresa: "",
    email: "",
    telefone: "",
    perfil: "Parceiro"
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contato" className="py-24 bg-brand-dark relative overflow-hidden border-t border-white/5">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="glass-card rounded-[2.5rem] shadow-2xl p-8 md:p-10 border-white/10">
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
                className="text-brand-orange font-bold hover:underline"
              >
                Enviar outra mensagem
              </button>
            </motion.div>
          ) : (
            <>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Seja um Parceiro</h2>
                <p className="text-slate-400 text-sm">Deixe seus dados para automatizar seus leads de permuta.</p>
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
                    required 
                    className="w-full p-4 rounded-xl input-field"
                    placeholder="Empresa"
                    onChange={e => setFormData({...formData, empresa: e.target.value})}
                  />
                  <input 
                    type="tel" 
                    required 
                    className="w-full p-4 rounded-xl input-field"
                    placeholder="Telefone"
                    onChange={e => setFormData({...formData, telefone: e.target.value})}
                  />
                </div>
                <input 
                  type="email" 
                  required 
                  className="w-full p-4 rounded-xl input-field"
                  placeholder="E-mail Corporativo"
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
                <select 
                  className="w-full p-4 rounded-xl input-field appearance-none cursor-pointer"
                  onChange={e => setFormData({...formData, perfil: e.target.value})}
                >
                  <option value="Parceiro">Parceiro (Imobiliária/Corretor)</option>
                  <option value="Anunciante">Anunciante (Proprietário)</option>
                </select>

                <button 
                  type="submit" 
                  className="w-full py-4 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-bold text-lg shadow-lg shadow-orange-500/20 transition-all mt-4 uppercase tracking-wide"
                >
                  Solicitar Acesso
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-brand-dark pt-12 pb-10 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:row items-center justify-between gap-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-brand-orange text-white">
            <ArrowRightLeft className="w-5 h-5" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-white">
            Imovel<span className="text-brand-orange">Match</span>
          </span>
        </div>
        
        <nav className="flex gap-8 text-xs font-bold uppercase tracking-widest text-slate-500">
          <a href="#" className="hover:text-brand-blue transition-colors">Termos</a>
          <a href="#" className="hover:text-brand-blue transition-colors">Privacidade</a>
          <a href="#" className="hover:text-brand-blue transition-colors">Cookies</a>
        </nav>

        <div className="text-xs text-slate-600 font-medium">
          © {new Date().getFullYear()} ImovelMatch — Transformando ativos em oportunidades.
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
      <Partners />
      <Advertisers />
      <HowItWorks />
      <ContactForm />
      <Footer />
    </div>
  );
}
