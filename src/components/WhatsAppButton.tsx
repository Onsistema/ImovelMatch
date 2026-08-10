import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const whatsappUrl = "https://wa.me/5519997428649?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20a%20SwapHome.";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl hover:shadow-emerald-500/30 hover:scale-105 transition-all duration-300 group cursor-pointer border border-white/20"
    >
      <div className="relative flex items-center justify-center">
        {/* Pulse effect */}
        <span className="absolute -inset-1 rounded-full bg-white/40 animate-ping opacity-75" />
        <MessageCircle className="w-6 h-6 fill-white text-[#25D366] shrink-0 relative z-10" />
      </div>
      <span className="hidden sm:inline font-bold text-sm tracking-wide text-white drop-shadow-sm">
        Falar no WhatsApp
      </span>
    </a>
  );
};

export default WhatsAppButton;
