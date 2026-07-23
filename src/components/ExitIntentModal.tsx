import React from "react";
import { Sparkles, ArrowRight, X, Gift } from "lucide-react";
import AnimatedModal from "./AnimatedModal";

interface ExitIntentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExitIntentModal: React.FC<ExitIntentModalProps> = ({ isOpen, onClose }) => {
  const handleAccept = () => {
    onClose();
    // Smooth scroll to planos section
    const target = document.getElementById("planos");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.hash = "#planos";
    }
  };

  return (
    <AnimatedModal isOpen={isOpen} onClose={onClose}>
      <div id="exit-intent-modal-card" className="glass-card w-full max-w-lg p-8 border border-brand-gold/30 bg-[#0d1525]/95 relative overflow-hidden rounded-3xl shadow-[0_0_50px_rgba(201,151,30,0.15)] flex flex-col">
        {/* Background gradient flares */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          id="exit-intent-close-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-all cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon */}
        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-gold/10 border border-brand-gold/30 text-brand-gold mb-6 mx-auto animate-bounce-slow">
          <Gift className="w-7 h-7" />
        </div>

        {/* Content */}
        <div className="text-center">
          <span className="inline-block text-[10px] uppercase tracking-widest font-bold text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full mb-3 border border-brand-gold/20">
            Gratuito Para Um Imóvel Sempre
          </span>
          
          <h3 className="text-2xl font-bold text-white tracking-tight mb-3">
            Comece a Trocar Seu Imóvel Agora
          </h3>
          
          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            <strong className="text-white">Teste agora gratuitamente por um imóvel</strong>. Cadastre sua propriedade, encontre o match certo e negocie sem compromisso e sem cadastro de cartão.
          </p>

          {/* Bullet points for value prop */}
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 mb-6 text-left space-y-2.5">
            <div className="flex items-start gap-2.5 text-xs text-slate-300">
              <Sparkles className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
              <span>Gratuito para um imóvel sempre</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs text-slate-300">
              <Sparkles className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
              <span>Teste agora sem compromisso</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs text-slate-300">
              <Sparkles className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
              <span>Sem cadastro de cartão de crédito</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-3">
            <a
              id="exit-intent-accept-cta"
              href="https://app.swaphome.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="w-full py-4 px-6 rounded-xl bg-brand-gold text-brand-dark font-bold hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-brand-gold/20 flex items-center justify-center gap-2 cursor-pointer text-sm uppercase tracking-wider"
            >
              Acesse Agora Gratuitamente
              <ArrowRight className="w-4 h-4" />
            </a>
            
            <button
              id="exit-intent-dismiss-btn"
              onClick={onClose}
              className="w-full py-2 text-slate-400 hover:text-white transition-all text-xs cursor-pointer focus:outline-none"
            >
              Não, obrigado. Prefiro continuar navegando
            </button>
          </div>
        </div>
      </div>
    </AnimatedModal>
  );
};

export default ExitIntentModal;
