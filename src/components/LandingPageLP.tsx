import React, { useEffect } from 'react';
import {
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  Clock3,
  Eye,
  Layers3,
  LockKeyhole,
  Menu,
  Repeat2,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  X,
  Zap,
} from 'lucide-react';
import { motion } from 'motion/react';
import WhatsAppButton from './WhatsAppButton';

interface LandingPageLPProps {
  onBack?: () => void;
}

const APP_URL = 'https://app.swaphome.com.br';
const LOGO_URL = 'https://lh3.googleusercontent.com/d/16FOqiYB4xcoXfqJ_k5sxP-c58SS6_zpL';
const HERO_IMAGE = '/lp-assets/swaphome-client-pain.webp';
const OPPORTUNITY_IMAGE = '/lp-assets/swaphome-opportunity.webp';
const CLOSING_IMAGE = '/lp-assets/swaphome-closing.webp';

const goToApp = () => {
  window.location.href = APP_URL;
};

const FadeIn = ({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 22 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.18 }}
    transition={{ duration: 0.55, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const SectionEyebrow = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-brand-gold">
    <Sparkles className="h-3.5 w-3.5" />
    {children}
  </div>
);

const PrimaryButton = ({ label, className = '' }: { label: string; className?: string }) => (
  <button
    onClick={goToApp}
    className={`group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-xl bg-brand-gold px-6 py-3.5 text-sm font-black text-[#07111f] shadow-[0_14px_35px_rgba(245,185,64,0.18)] transition hover:-translate-y-0.5 hover:bg-[#ffd166] focus:outline-none focus:ring-4 focus:ring-brand-gold/20 ${className}`}
  >
    <span>{label}</span>
    <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover:translate-x-1" />
  </button>
);

export const LandingPageLP: React.FC<LandingPageLPProps> = ({ onBack }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  useEffect(() => {
    const originalTitle = document.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    const originalDesc = metaDesc?.getAttribute('content') || '';

    document.title = 'SwapHome | Permuta Imobiliária para Corretores e Imobiliárias';

    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Destrave negociações de clientes que precisam vender ou permutar outro imóvel. A SwapHome busca oportunidades em imóveis anunciados por terceiros e ajuda o corretor a encontrar opções compatíveis com a necessidade do cliente.'
      );
    }

    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

    return () => {
      document.title = originalTitle;
      if (metaDesc) metaDesc.setAttribute('content', originalDesc);
    };
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-surface-0 text-slate-100 selection:bg-brand-gold/30">
      <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#07111f]/88 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => (onBack ? onBack() : window.scrollTo({ top: 0, behavior: 'smooth' }))}
            className="flex items-center gap-3"
            aria-label="SwapHome"
          >
            <img src={LOGO_URL} alt="SwapHome" className="h-10 w-10 rounded-xl object-cover" />
            <div className="text-left leading-none">
              <div className="font-display text-lg font-extrabold tracking-tight text-white">
                Swap<span className="text-brand-gold">Home</span>
              </div>
              <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                para profissionais
              </div>
            </div>
          </button>

          <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-300 lg:flex">
            <a href="#problema" className="transition hover:text-white">O problema</a>
            <a href="#como-funciona" className="transition hover:text-white">Como funciona</a>
            <a href="#profissionais" className="transition hover:text-white">Para quem é</a>
            <a href="#faq" className="transition hover:text-white">Dúvidas</a>
          </nav>

          <div className="hidden lg:block">
            <PrimaryButton label="Acessar a plataforma" />
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg border border-white/10 p-2 text-white lg:hidden"
            aria-label="Abrir menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-white/10 bg-[#07111f] px-4 pb-5 pt-4 lg:hidden">
            <div className="flex flex-col gap-4 text-sm font-semibold text-slate-300">
              <a href="#problema" onClick={() => setMobileOpen(false)}>O problema</a>
              <a href="#como-funciona" onClick={() => setMobileOpen(false)}>Como funciona</a>
              <a href="#profissionais" onClick={() => setMobileOpen(false)}>Para quem é</a>
              <a href="#faq" onClick={() => setMobileOpen(false)}>Dúvidas</a>
              <PrimaryButton label="Acessar a plataforma" className="mt-1 w-full" />
            </div>
          </div>
        )}
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-white/[0.06] bg-[#07111f]">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-[10%] top-0 h-[420px] w-[420px] rounded-full bg-brand-gold/[0.08] blur-[120px]" />
            <div className="absolute right-[5%] top-[15%] h-[380px] w-[380px] rounded-full bg-sky-500/[0.07] blur-[120px]" />
          </div>

          <div className="relative mx-auto grid max-w-7xl gap-14 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-[1.02fr_.98fr] lg:items-center lg:px-8 lg:pb-28 lg:pt-24">
            <div className="max-w-3xl">
              <FadeIn>
                <SectionEyebrow>Feito para corretores e imobiliárias</SectionEyebrow>
              </FadeIn>

              <FadeIn delay={0.08}>
                <h1 className="mt-6 text-balance font-display text-[2.55rem] font-black leading-[1.03] tracking-[-0.045em] text-white sm:text-5xl lg:text-[4.25rem]">
                  Pare de perder vendas porque seu cliente
                  <span className="text-brand-gold"> precisa vender outro imóvel primeiro.</span>
                </h1>
              </FadeIn>

              <FadeIn delay={0.16}>
                <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                  Cadastre o imóvel que o cliente tem, informe o que ele procura e deixe a
                  <strong className="font-extrabold text-white"> SwapHome buscar oportunidades compatíveis entre imóveis de terceiros</strong>.
                  {' '}Menos busca manual em anúncios. Mais caminhos para a negociação avançar.
                </p>
              </FadeIn>

              <FadeIn delay={0.24}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <PrimaryButton label="Buscar oportunidades para meu cliente" className="sm:min-w-[310px]" />
                  <a
                    href="#como-funciona"
                    className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/12 bg-white/[0.04] px-5 py-3 text-sm font-bold text-white transition hover:bg-white/[0.08]"
                  >
                    Ver como funciona
                  </a>
                </div>
              </FadeIn>

              <FadeIn delay={0.32}>
                <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-slate-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Acesso pelo navegador
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Foco em permutas e parcerias
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Busca em imóveis de terceiros
                  </div>
                </div>
              </FadeIn>
            </div>

            <FadeIn delay={0.12} className="relative">
              <div className="absolute -inset-5 rounded-[32px] bg-gradient-to-br from-brand-gold/15 via-transparent to-sky-500/10 blur-2xl" />
              <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0d1a2c] shadow-[0_35px_100px_rgba(0,0,0,0.45)]">
                <img
                  src={HERO_IMAGE}
                  alt="Corretor apresenta um imóvel a clientes cuja compra depende do imóvel atual"
                  width={760}
                  height={570}
                  fetchPriority="high"
                  decoding="async"
                  className="h-auto w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#07111f]/90 via-[#07111f]/20 to-transparent px-5 pb-4 pt-12">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#07111f]/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-200 backdrop-blur-md">
                    <Search className="h-3.5 w-3.5 text-brand-gold" />
                    A dor que a SwapHome ajuda a destravar
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        <section id="problema" className="bg-surface-1 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FadeIn className="mx-auto max-w-3xl text-center">
              <SectionEyebrow>O problema não é falta de cliente</SectionEyebrow>
              <h2 className="mt-5 text-balance font-display text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                É a negociação depender de uma outra venda que você não controla.
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-400 sm:text-lg">
                Quando o comprador precisa vender o imóvel atual antes de avançar, a oportunidade pode esfriar enquanto o corretor procura a outra ponta manualmente.
              </p>
            </FadeIn>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {[
                {
                  icon: Clock3,
                  title: 'Tempo perdido em busca manual',
                  text: 'Grupos, mensagens e ligações para descobrir quem tem um imóvel compatível com a troca.',
                },
                {
                  icon: X,
                  title: 'Negociação que não sai do lugar',
                  text: 'O cliente gostou, mas não consegue avançar enquanto o imóvel atual continua sem destino.',
                },
                {
                  icon: Eye,
                  title: 'Oportunidade escondida entre anúncios',
                  text: 'O imóvel compatível pode já estar anunciado por um terceiro — o desafio é encontrá-lo no meio de tantas opções.',
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <FadeIn delay={index * 0.08} key={item.title}>
                    <div className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.035] p-6">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-400/10 text-red-300">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-5 text-xl font-extrabold text-white">{item.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-slate-400">{item.text}</p>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>

        </section>

        <section id="como-funciona" className="bg-surface-0 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FadeIn className="max-w-3xl">
              <SectionEyebrow>Simples de entender. Rápido de usar.</SectionEyebrow>
              <h2 className="mt-5 text-balance font-display text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                Você informa o imóvel do cliente e o que ele procura. A SwapHome busca a outra ponta.
              </h2>
            </FadeIn>

            <div className="relative mt-14 grid gap-6 lg:grid-cols-3">
              {[
                {
                  n: '01',
                  icon: Building2,
                  title: 'Cadastre o imóvel que o cliente tem',
                  text: 'Inclua localização, faixa de valor, tipo do imóvel e as informações relevantes para a negociação.',
                },
                {
                  n: '02',
                  icon: Search,
                  title: 'Informe o que ele quer comprar',
                  text: 'Defina região, tipo, faixa de valor e as condições que fazem sentido para a próxima compra.',
                },
                {
                  n: '03',
                  icon: Repeat2,
                  title: 'Receba oportunidades encontradas',
                  text: 'A plataforma busca em imóveis de terceiros opções que podem fazer sentido para a necessidade cadastrada e apresenta os resultados para avaliação.',
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <FadeIn delay={index * 0.09} key={item.n}>
                    <div className="relative h-full overflow-hidden rounded-3xl border border-white/[0.08] bg-surface-2 p-7">
                      <div className="absolute right-5 top-3 font-display text-6xl font-black text-white/[0.035]">{item.n}</div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gold/12 text-brand-gold">
                        <Icon className="h-5.5 w-5.5" />
                      </div>
                      <h3 className="mt-7 pr-8 text-xl font-extrabold text-white">{item.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-slate-400">{item.text}</p>
                    </div>
                  </FadeIn>
                );
              })}
            </div>

            <FadeIn className="mt-10 flex justify-center">
              <PrimaryButton label="Quero buscar oportunidades agora" />
            </FadeIn>
          </div>
        </section>

        <section className="border-y border-white/[0.06] bg-[#0b1728] py-20 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-8">
            <FadeIn>
              <SectionEyebrow>Produto, não promessa abstrata</SectionEyebrow>
              <h2 className="mt-5 text-balance font-display text-3xl font-black tracking-tight text-white sm:text-4xl">
                O corretor precisa bater o olho e entender a oportunidade.
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-400">
                A proposta da SwapHome é transformar as informações do imóvel do cliente e da próxima compra em uma busca estruturada por oportunidades disponíveis em imóveis de terceiros.
              </p>

              <div className="mt-7 space-y-4">
                {[
                  ['Imóvel do cliente bem definido', 'Registre o que o cliente tem e quais condições de permuta fazem sentido.'],
                  ['Busca em imóveis de terceiros', 'A plataforma procura oportunidades fora da base do próprio corretor.'],
                  ['Resultados para avaliação', 'O corretor analisa as opções encontradas e decide quais fazem sentido para avançar.'],
                  ['Torna e faixa de valor', 'Considere diferença financeira como parte do cenário da permuta.'],
                ].map(([title, text]) => (
                  <div key={title} className="flex gap-3">
                    <Check className="mt-1 h-4.5 w-4.5 shrink-0 text-brand-gold" />
                    <div>
                      <div className="text-sm font-extrabold text-white">{title}</div>
                      <div className="mt-1 text-sm leading-6 text-slate-400">{text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="rounded-[28px] border border-white/10 bg-[#07111f] p-4 shadow-2xl sm:p-6">
                <div className="rounded-2xl border border-white/[0.07] bg-[#0e1b2e]">
                  <div className="flex items-center justify-between border-b border-white/[0.07] px-4 py-3">
                    <div className="text-xs font-extrabold text-white">Oportunidades para este cliente</div>
                    <div className="rounded-md bg-white/[0.05] px-2 py-1 text-[10px] text-slate-400">exemplo visual</div>
                  </div>
                  <div className="space-y-3 p-4">
                    {[
                      ['Casa em condomínio', 'Valinhos', 'R$ 1,25 mi', 'Aceita apartamento até R$ 900 mil'],
                      ['Casa térrea', 'Campinas', 'R$ 1,38 mi', 'Aceita imóvel + torna'],
                      ['Sobrado', 'Paulínia', 'R$ 1,32 mi', 'Avalia apartamento em Campinas'],
                    ].map((row, i) => (
                      <div key={row[0]} className="grid gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] p-4 sm:grid-cols-[1fr_auto] sm:items-center">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-gold/10 text-[10px] font-black text-brand-gold">{i + 1}</span>
                            <span className="text-sm font-extrabold text-white">{row[0]}</span>
                          </div>
                          <div className="ml-9 mt-1 text-xs text-slate-500">{row[1]} • {row[2]}</div>
                          <div className="ml-9 mt-2 text-[11px] font-semibold text-emerald-300">{row[3]}</div>
                        </div>
                        <button onClick={goToApp} className="rounded-lg border border-white/10 bg-white/[0.05] px-3 py-2 text-xs font-bold text-white transition hover:border-brand-gold/40">
                          Ver oportunidade
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

                <section className="bg-surface-1 py-20 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[.82fr_1.18fr] lg:items-center lg:px-8">
            <FadeIn className="mx-auto w-full max-w-sm">
              <div className="overflow-hidden rounded-[28px] border border-brand-gold/20 bg-[#07111f] shadow-[0_28px_80px_rgba(0,0,0,0.35)]">
                <img
                  src={OPPORTUNITY_IMAGE}
                  alt="Exemplo ilustrativo de oportunidade imobiliária encontrada entre anúncios de terceiros"
                  width={320}
                  height={400}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full"
                />
              </div>
            </FadeIn>

            <FadeIn delay={0.08}>
              <SectionEyebrow>Do anúncio à oportunidade</SectionEyebrow>
              <h2 className="mt-5 text-balance font-display text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                O imóvel certo pode já estar anunciado por um terceiro. O difícil é encontrá-lo na hora certa.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
                A SwapHome organiza a necessidade do cliente e ajuda o corretor a localizar opções compatíveis fora da própria base, para que ele gaste menos tempo procurando e mais tempo avaliando negócios que podem avançar.
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  'Busca orientada pela necessidade do cliente',
                  'Oportunidades em imóveis de terceiros',
                  'Informações reunidas para avaliação',
                  'Corretor decide se vale avançar',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] p-4 text-sm font-semibold text-slate-300">
                    <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brand-gold" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-7">
                <PrimaryButton label="Ver oportunidades na SwapHome" />
              </div>
            </FadeIn>
          </div>
        </section>

<section id="profissionais" className="bg-surface-0 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FadeIn className="mx-auto max-w-3xl text-center">
              <SectionEyebrow>Uma dor, dois ganhos diferentes</SectionEyebrow>
              <h2 className="mt-5 text-balance font-display text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                Para o corretor, menos busca manual. Para a imobiliária, mais eficiência para encontrar oportunidades fora da própria base.
              </h2>
            </FadeIn>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              <FadeIn>
                <div className="h-full rounded-3xl border border-brand-gold/20 bg-gradient-to-b from-brand-gold/[0.07] to-transparent p-7 sm:p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gold text-[#07111f]">
                    <Users className="h-5.5 w-5.5" />
                  </div>
                  <h3 className="mt-6 text-2xl font-black text-white">Para corretores</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    Use a permuta como alternativa real quando o cliente depende do imóvel atual para avançar — sem limitar a busca aos imóveis que você já conhece.
                  </p>
                  <div className="mt-6 space-y-3">
                    {[
                      'Buscar imóveis de terceiros sem depender só de grupos, portais e contatos pessoais',
                      'Apresentar novas possibilidades antes que a negociação esfrie',
                      'Manter o corretor no centro da análise e da condução da negociação',
                    ].map((x) => (
                      <div key={x} className="flex gap-3 text-sm text-slate-300">
                        <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brand-gold" />
                        <span>{x}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.08}>
                <div className="h-full rounded-3xl border border-sky-400/15 bg-gradient-to-b from-sky-400/[0.06] to-transparent p-7 sm:p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-400/15 text-sky-300">
                    <Layers3 className="h-5.5 w-5.5" />
                  </div>
                  <h3 className="mt-6 text-2xl font-black text-white">Para imobiliárias</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    Dê à equipe uma forma mais eficiente de buscar, fora da própria base, imóveis que podem destravar negociações em andamento.
                  </p>
                  <div className="mt-6 space-y-3">
                    {[
                      'Estruturar melhor o que cada cliente tem e o que está procurando',
                      'Buscar oportunidades em imóveis de terceiros para negociações travadas',
                      'Reduzir o tempo gasto pesquisando manualmente em diferentes fontes',
                    ].map((x) => (
                      <div key={x} className="flex gap-3 text-sm text-slate-300">
                        <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-sky-300" />
                        <span>{x}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="bg-surface-1 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FadeIn className="mx-auto max-w-3xl text-center">
              <SectionEyebrow>Confiança antes do clique</SectionEyebrow>
              <h2 className="mt-5 text-balance font-display text-3xl font-black tracking-tight text-white sm:text-4xl">
                O objetivo é facilitar a parceria, não tirar o profissional da negociação.
              </h2>
            </FadeIn>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {[
                {
                  icon: LockKeyhole,
                  title: 'O corretor continua no controle',
                  text: 'A SwapHome ajuda a encontrar oportunidades de terceiros; a análise, o contato e a condução da negociação continuam com o profissional.',
                },
                {
                  icon: ShieldCheck,
                  title: 'Pensada para uso profissional',
                  text: 'A lógica da solução parte do fluxo real de quem capta, atende compradores e negocia parcerias.',
                },
                {
                  icon: Target,
                  title: 'Foco no que pode avançar',
                  text: 'Em vez de procurar imóveis sem contexto, o ponto de partida é uma necessidade concreta de compra e permuta.',
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <FadeIn delay={index * 0.08} key={item.title}>
                    <div className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6">
                      <Icon className="h-6 w-6 text-brand-gold" />
                      <h3 className="mt-5 text-lg font-extrabold text-white">{item.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-slate-400">{item.text}</p>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>

                <section className="border-y border-white/[0.06] bg-[#0b1728] py-20 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[.92fr_1.08fr] lg:items-center lg:px-8">
            <FadeIn>
              <SectionEyebrow>O resultado que importa</SectionEyebrow>
              <h2 className="mt-5 text-balance font-display text-3xl font-black tracking-tight text-white sm:text-4xl">
                Em vez de voltar para o cliente com “não encontrei”, volte com opções para avaliar.
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-400">
                A tecnologia faz a busca. O corretor continua fazendo o trabalho que exige experiência: analisar o imóvel, conversar com as partes, validar a condição de permuta e conduzir a negociação.
              </p>
              <div className="mt-7 space-y-3 text-sm text-slate-300">
                <div className="flex gap-3"><Check className="mt-1 h-4.5 w-4.5 shrink-0 text-brand-gold" /><span>Mais alternativas para apresentar ao cliente.</span></div>
                <div className="flex gap-3"><Check className="mt-1 h-4.5 w-4.5 shrink-0 text-brand-gold" /><span>Menos tempo perdido procurando manualmente.</span></div>
                <div className="flex gap-3"><Check className="mt-1 h-4.5 w-4.5 shrink-0 text-brand-gold" /><span>Decisão e negociação permanecem com o profissional.</span></div>
              </div>
            </FadeIn>

            <FadeIn delay={0.08}>
              <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#07111f] shadow-[0_28px_80px_rgba(0,0,0,0.35)]">
                <img
                  src={CLOSING_IMAGE}
                  alt="Corretor apresenta aos clientes oportunidades encontradas entre imóveis de terceiros"
                  width={320}
                  height={240}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full"
                />
                <div className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-[#07111f]/85 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-white backdrop-blur-md">
                  Exemplo visual do resultado
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

<section id="faq" className="bg-surface-0 py-20 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <FadeIn className="text-center">
              <SectionEyebrow>Antes de começar</SectionEyebrow>
              <h2 className="mt-5 font-display text-3xl font-black tracking-tight text-white sm:text-4xl">
                As dúvidas que normalmente travam o primeiro acesso
              </h2>
            </FadeIn>

            <div className="mt-10 space-y-3">
              {[
                ['A SwapHome substitui meu CRM ou portal imobiliário?', 'Não. A proposta é resolver uma dor específica: a partir do imóvel do cliente e do que ele procura, buscar oportunidades compatíveis entre imóveis de terceiros.'],
                ['Preciso instalar aplicativo?', 'Não para começar. O acesso principal pode ser feito diretamente pelo navegador em app.swaphome.com.br.'],
                ['Outro corretor passa a ter acesso ao meu cliente?', 'A lógica é conectar oportunidades profissionais. Dados sensíveis de atendimento e relacionamento comercial devem continuar sob gestão do corretor ou da imobiliária responsável.'],
                ['Serve só para Campinas?', 'Não. A plataforma pode apoiar profissionais de outras regiões. A operação comercial pode ter foco inicial em determinadas cidades sem limitar o uso da solução.'],
                ['E se não existir uma permuta perfeita?', 'A plataforma ajuda a identificar possibilidades compatíveis. A decisão final, a avaliação do imóvel, a torna e os termos da negociação continuam sendo definidos pelos profissionais e clientes envolvidos.'],
              ].map(([q, a]) => (
                <details key={q} className="group rounded-2xl border border-white/[0.08] bg-white/[0.025] open:bg-white/[0.04]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-left text-sm font-extrabold text-white sm:text-base">
                    <span>{q}</span>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] text-brand-gold transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="px-5 pb-5 pr-14 text-sm leading-6 text-slate-400">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-y border-brand-gold/20 bg-brand-gold py-16 sm:py-20">
          <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white_0,transparent_30%),radial-gradient(circle_at_80%_80%,white_0,transparent_30%)]" />
          <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <FadeIn>
              <div className="mx-auto inline-flex rounded-full bg-[#07111f]/10 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#07111f]">
                A oportunidade certa pode já estar anunciada por um terceiro
              </div>
              <h2 className="mx-auto mt-5 max-w-4xl text-balance font-display text-3xl font-black tracking-[-0.035em] text-[#07111f] sm:text-5xl">
                Antes de dizer “esse cliente precisa vender primeiro”, veja se existe uma permuta possível.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base font-semibold leading-7 text-[#142033]/80">
                Cadastre a necessidade, deixe a SwapHome buscar imóveis de terceiros e avalie novas rotas para a negociação continuar.
              </p>
              <button
                onClick={goToApp}
                className="group mt-8 inline-flex min-h-14 items-center justify-center gap-3 rounded-xl bg-[#07111f] px-8 py-4 text-base font-black text-white shadow-2xl transition hover:-translate-y-0.5 hover:bg-[#0d1a2c]"
              >
                Acessar a SwapHome agora
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </FadeIn>
          </div>
        </section>
      </main>

      <footer className="bg-[#050c16] py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-center sm:px-6 md:flex-row md:text-left lg:px-8">
          <div className="flex items-center gap-3">
            <img src={LOGO_URL} alt="SwapHome" className="h-8 w-8 rounded-lg object-cover" />
            <div className="text-sm font-extrabold text-white">Swap<span className="text-brand-gold">Home</span></div>
          </div>
          <div className="text-xs text-slate-500">
            © {new Date().getFullYear()} SwapHome. Plataforma para profissionais do mercado imobiliário.
          </div>
          <button onClick={goToApp} className="text-xs font-extrabold text-brand-gold hover:underline">
            Acessar plataforma
          </button>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
};
