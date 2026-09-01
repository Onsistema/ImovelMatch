import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

import './BubbleMenu.css';

export interface MenuItem {
  label: string;
  href: string;
  ariaLabel?: string;
  rotation?: number;
  hoverStyles?: {
    bgColor?: string;
    textColor?: string;
  };
  onClick?: () => void;
}

const DEFAULT_ITEMS: MenuItem[] = [
  {
    label: 'Solução',
    href: '#solucao',
    ariaLabel: 'Solução',
    rotation: -4,
    hoverStyles: { bgColor: '#C9971E', textColor: '#020617' }
  },
  {
    label: 'Simulador',
    href: '#simulador',
    ariaLabel: 'Simulador',
    rotation: 4,
    hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' }
  },
  {
    label: 'Benefícios',
    href: '#beneficios',
    ariaLabel: 'Benefícios',
    rotation: -4,
    hoverStyles: { bgColor: '#C9971E', textColor: '#020617' }
  },
  {
    label: 'Planos',
    href: '#planos',
    ariaLabel: 'Planos',
    rotation: 4,
    hoverStyles: { bgColor: '#3b82f6', textColor: '#ffffff' }
  },
  {
    label: 'FAQ',
    href: '#faq',
    ariaLabel: 'FAQ',
    rotation: -4,
    hoverStyles: { bgColor: '#C9971E', textColor: '#020617' }
  },
  {
    label: 'Cadastrar Grátis',
    href: 'https://app.swaphome.com.br/',
    ariaLabel: 'Cadastrar Grátis',
    rotation: 4,
    hoverStyles: { bgColor: '#C9971E', textColor: '#1a1f2c' }
  }
];

interface BubbleMenuProps {
  logo?: React.ReactNode | string;
  onMenuClick?: (isOpen: boolean) => void;
  className?: string;
  style?: React.CSSProperties;
  menuAriaLabel?: string;
  menuBg?: string;
  menuContentColor?: string;
  useFixedPosition?: boolean;
  items?: MenuItem[];
  animationEase?: string;
  animationDuration?: number;
  staggerDelay?: number;
}

export default function BubbleMenu({
  logo,
  onMenuClick,
  className,
  style,
  menuAriaLabel = 'Alternar menu',
  menuBg = 'rgba(15, 23, 42, 0.75)',
  menuContentColor = '#ffffff',
  useFixedPosition = false,
  items,
  animationEase = 'back.out(1.4)',
  animationDuration = 0.45, // Fine-tuned duration for snappier mobile feel
  staggerDelay = 0.08      // Faster stagger delay for smooth mobile sequencing
}: BubbleMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const menuItems = items?.length ? items : DEFAULT_ITEMS;
  const containerClassName = ['bubble-menu', useFixedPosition ? 'fixed' : 'relative', className]
    .filter(Boolean)
    .join(' ');

  const handleToggle = () => {
    const nextState = !isMenuOpen;
    if (nextState) setShowOverlay(true);
    setIsMenuOpen(nextState);
    onMenuClick?.(nextState);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    onMenuClick?.(false);
  };

  useEffect(() => {
    const overlay = overlayRef.current;
    const bubbles = bubblesRef.current.filter((b): b is HTMLAnchorElement => b !== null);
    const labels = labelRefs.current.filter((l): l is HTMLSpanElement => l !== null);

    if (!overlay || !bubbles.length) return;

    if (isMenuOpen) {
      // Open animation flow
      gsap.set(overlay, { display: 'flex' });
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.set(bubbles, { scale: 0, transformOrigin: '50% 50%' });
      gsap.set(labels, { y: 16, autoAlpha: 0 });

      bubbles.forEach((bubble, i) => {
        const itemRotation = menuItems[i]?.rotation ?? 0;
        const delay = i * staggerDelay;
        const tl = gsap.timeline({ delay });

        tl.to(bubble, {
          scale: 1,
          rotation: itemRotation,
          duration: animationDuration,
          ease: animationEase
        });

        if (labels[i]) {
          tl.to(
            labels[i],
            {
              y: 0,
              autoAlpha: 1,
              duration: animationDuration * 0.8,
              ease: 'power2.out'
            },
            `-=${animationDuration * 0.85}`
          );
        }
      });
    } else if (showOverlay) {
      // Close animation flow - optimized to be ultra-fast on mobile
      gsap.killTweensOf([...bubbles, ...labels]);
      
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(overlay, { display: 'none' });
          setShowOverlay(false);
        }
      });

      tl.to(labels, {
        y: 16,
        autoAlpha: 0,
        duration: 0.18,
        ease: 'power3.in',
        stagger: 0.02
      }).to(bubbles, {
        scale: 0,
        rotation: 0,
        duration: 0.2,
        ease: 'power3.in',
        stagger: 0.02
      }, 0);
    }
  }, [isMenuOpen, showOverlay, animationEase, animationDuration, staggerDelay, menuItems]);

  useEffect(() => {
    const handleResize = () => {
      if (isMenuOpen) {
        const bubbles = bubblesRef.current.filter((b): b is HTMLAnchorElement => b !== null);
        const isDesktop = window.innerWidth >= 900;

        bubbles.forEach((bubble, i) => {
          const item = menuItems[i];
          if (bubble && item) {
            const rotation = isDesktop ? (item.rotation ?? 0) : 0;
            gsap.set(bubble, { rotation });
          }
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen, menuItems]);

  return (
    <>
      <nav className={containerClassName} style={style} aria-label="Navegação móvel">
        {logo && (
          <div className="bubble logo-bubble" aria-label="Logo" style={{ background: menuBg }}>
            <span className="logo-content">
              {typeof logo === 'string' ? <img src={logo} alt="Logo" className="bubble-logo" /> : logo}
            </span>
          </div>
        )}

        <button
          type="button"
          className={`bubble toggle-bubble menu-btn ${isMenuOpen ? 'open' : ''}`}
          onClick={handleToggle}
          aria-label={menuAriaLabel}
          aria-pressed={isMenuOpen}
          style={{ background: menuBg }}
        >
          <span className="menu-line" style={{ background: menuContentColor }} />
          <span className="menu-line short" style={{ background: menuContentColor }} />
        </button>
      </nav>

      {showOverlay && (
        <div
          ref={overlayRef}
          className={`bubble-menu-items ${useFixedPosition ? 'fixed' : 'absolute'}`}
          aria-hidden={!isMenuOpen}
          onClick={handleLinkClick} // Tap backdrop to close
        >
          <ul className="pill-list" role="menu" aria-label="Menu links" onClick={(e) => e.stopPropagation()}>
            {menuItems.map((item, idx) => (
              <li key={idx} role="none" className="pill-col">
                <a
                  role="menuitem"
                  href={item.href}
                  target={item.href.startsWith('http') && !item.onClick ? '_blank' : undefined}
                  rel={item.href.startsWith('http') && !item.onClick ? 'noopener noreferrer' : undefined}
                  onClick={(e) => {
                    handleLinkClick();
                    if (item.onClick) {
                      e.preventDefault();
                      item.onClick();
                    }
                  }}
                  aria-label={item.ariaLabel || item.label}
                  className="pill-link"
                  style={{
                    '--item-rot': `${item.rotation ?? 0}deg`,
                    '--pill-bg': 'rgba(15, 23, 42, 0.9)',
                    '--pill-color': '#ffffff',
                    '--hover-bg': item.hoverStyles?.bgColor || '#C9971E',
                    '--hover-color': item.hoverStyles?.textColor || '#020617'
                  } as React.CSSProperties}
                  ref={el => {
                    bubblesRef.current[idx] = el;
                  }}
                >
                  <span
                    className="pill-label"
                    ref={el => {
                      labelRefs.current[idx] = el;
                    }}
                  >
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
