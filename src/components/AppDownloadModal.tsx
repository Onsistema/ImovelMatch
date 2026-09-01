import React from 'react';
import { X, Globe, Apple, Download, ExternalLink, Sparkles, CheckCircle2, Clock, Smartphone } from 'lucide-react';
import AnimatedModal from './AnimatedModal';

interface AppDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.swaphome.app&pcampaignid=web_share";
const WEB_APP_URL = "https://app.swaphome.com.br/";

export const AppDownloadModal: React.FC<AppDownloadModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatedModal isOpen={isOpen} onClose={onClose}>
      <div 
        id="app-download-modal-card"
        className="glass-card w-full max-w-xl p-6 sm:p-8 border border-brand-gold/30 bg-[#0c1220]/95 relative overflow-hidden rounded-3xl shadow-[0_0_60px_rgba(201,151,30,0.18)] flex flex-col text-slate-100"
      >
        {/* Background gradient flares */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-44 h-44 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          id="app-download-close-btn"
          onClick={onClose}
          aria-label="Fechar modal de acesso ao aplicativo"
          className="absolute top-4 right-4 p-2.5 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-all cursor-pointer z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-[11px] font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>Acesso ao SwapHome</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Como você deseja acessar?
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm mt-1.5 max-w-md mx-auto">
            Baixe o aplicativo para o seu celular ou acesse diretamente pelo seu navegador web.
          </p>
        </div>

        {/* Options Stack */}
        <div className="space-y-4 relative z-10">
          {/* OPTION 1: Android Google Play (AVAILABLE NOW) */}
          <a
            id="modal-btn-google-play"
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="group relative block p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-[#0e221b]/60 to-emerald-950/40 border-2 border-emerald-500/50 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-3.5 sm:gap-4">
                {/* Google Play / Android Icon badge */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#0f2e22] border border-emerald-400/40 flex items-center justify-center text-emerald-400 shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-current" viewBox="0 0 24 24">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a2.001 2.001 0 0 1-.61-1.42V3.234c0-.54.223-1.048.609-1.42zm11.238 11.241l2.457 2.457-11.45 6.44 8.993-8.897zm0-2.11L5.854 2.048l11.45 6.44-2.457 2.457zm1.489 1.055l3.823 2.15c.854.48.854 1.26 0 1.74l-3.823 2.15-2.228-2.228 2.228-2.228v.416z"/>
                  </svg>
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-white font-black text-base sm:text-lg group-hover:text-emerald-300 transition-colors">
                      Baixar no Google Play
                    </span>
                    <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Android
                    </span>
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm mt-0.5 font-medium">
                    Aplicativo oficial já disponível para smartphones e tablets Android.
                  </p>
                </div>
              </div>

              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-500 text-black flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                <Download className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
              </div>
            </div>
          </a>

          {/* OPTION 2: Apple App Store (COMING SOON NOTICE) */}
          <div 
            id="modal-notice-apple-store"
            className="relative p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-slate-300 transition-all"
          >
            <div className="flex items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-3.5 sm:gap-4">
                {/* Apple Icon */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/5 border border-white/15 flex items-center justify-center text-slate-300 shrink-0">
                  <Apple className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-slate-200 font-bold text-base sm:text-lg">
                      Apple App Store (iOS)
                    </span>
                    <span className="bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Em Breve
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
                    Em fase de aprovação na Apple. No iPhone/iPad, você pode acessar pelo navegador logo abaixo.
                  </p>
                </div>
              </div>

              <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-400 text-[11px] font-bold text-center shrink-0">
                iOS
              </div>
            </div>
          </div>

          {/* OPTION 3: Web Browser Access */}
          <a
            id="modal-btn-browser-access"
            href={WEB_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="group relative block p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-brand-gold/15 via-[#1a1710] to-brand-gold/15 border-2 border-brand-gold/50 hover:border-brand-gold hover:shadow-lg hover:shadow-brand-gold/20 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-3.5 sm:gap-4">
                {/* Globe / Browser Icon */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-brand-gold/15 border border-brand-gold/40 flex items-center justify-center text-brand-gold shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                  <Globe className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-white font-black text-base sm:text-lg group-hover:text-brand-gold transition-colors">
                      Acessar pelo Navegador
                    </span>
                    <span className="bg-brand-gold/20 text-brand-gold border border-brand-gold/30 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Web App
                    </span>
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm mt-0.5 font-medium">
                    Abra direto no Chrome, Safari ou Edge no PC, Mac, iPhone ou Android.
                  </p>
                </div>
              </div>

              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-gold text-brand-dark flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
              </div>
            </div>
          </a>
        </div>

        {/* Footer info notice */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-brand-gold shrink-0" />
            <span>Cadastre 1 imóvel gratuitamente para testar</span>
          </div>
          <span className="text-slate-500 font-medium">Sem necessidade de cartão de crédito</span>
        </div>
      </div>
    </AnimatedModal>
  );
};

export default AppDownloadModal;
