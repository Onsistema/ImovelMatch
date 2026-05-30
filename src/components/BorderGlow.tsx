import React, { useRef, useCallback, useEffect } from 'react';
import './BorderGlow.css';

function parseHSL(hslStr: string) {
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!match) return { h: 40, s: 80, l: 80 };
  return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
}

function buildGlowVars(glowColor: string, intensity: number): Record<string, string> {
  const { h, s, l } = parseHSL(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  const opacities = [100, 60, 50, 40, 30, 20, 10];
  const keys = ['', '-60', '-50', '-40', '-30', '-20', '-10'];
  const vars: Record<string, string> = {};
  for (let i = 0; i < opacities.length; i++) {
    vars[`--glow-color${keys[i]}`] = `hsl(${base} / ${Math.min(opacities[i] * intensity, 100)}%)`;
  }
  return vars;
}

const GRADIENT_POSITIONS = ['80% 55%', '69% 34%', '8% 6%', '41% 38%', '86% 85%', '82% 18%', '51% 4%'];
const GRADIENT_KEYS = ['--gradient-one', '--gradient-two', '--gradient-three', '--gradient-four', '--gradient-five', '--gradient-six', '--gradient-seven'];
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

function buildGradientVars(colors: string[]): Record<string, string> {
  const vars: Record<string, string> = {};
  for (let i = 0; i < 7; i++) {
    const c = colors[Math.min(COLOR_MAP[i], colors.length - 1)];
    vars[GRADIENT_KEYS[i]] = `radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`;
  }
  vars['--gradient-base'] = `linear-gradient(${colors[0]} 0 100%)`;
  return vars;
}

function easeOutCubic(x: number): number { return 1 - Math.pow(1 - x, 3); }
function easeInCubic(x: number): number { return x * x * x; }

interface AnimateParams {
  start?: number;
  end?: number;
  duration?: number;
  delay?: number;
  ease?: (x: number) => number;
  onUpdate: (v: number) => void;
  onEnd?: () => void;
}

function animateValue({ start = 0, end = 100, duration = 1000, delay = 0, ease = easeOutCubic, onUpdate, onEnd }: AnimateParams) {
  const t0 = performance.now() + delay;
  function tick() {
    const elapsed = performance.now() - t0;
    const t = Math.min(elapsed / duration, 1);
    onUpdate(start + (end - start) * ease(t));
    if (t < 1) requestAnimationFrame(tick);
    else if (onEnd) onEnd();
  }
  setTimeout(() => requestAnimationFrame(tick), delay);
}

export interface BorderGlowProps {
  children?: React.ReactNode;
  className?: string;
  edgeSensitivity?: number;
  glowColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  coneSpread?: number;
  animated?: boolean;
  colors?: string[];
  fillOpacity?: number;
  borderWidth?: number;
}

const BorderGlow = ({
  children,
  className = '',
  edgeSensitivity = 30,
  glowColor = '40 80 80',
  backgroundColor = '#120F17',
  borderRadius = 28,
  glowRadius = 40,
  glowIntensity = 1.0,
  coneSpread = 25,
  animated = false,
  colors = ['#c084fc', '#f472b6', '#38bdf8'],
  fillOpacity = 0.5,
  borderWidth = 2.5,
}: BorderGlowProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);

  const getCenterOfElement = useCallback((el: HTMLElement) => {
    const { width, height } = el.getBoundingClientRect();
    return [width / 2, height / 2];
  }, []);

  const getEdgeProximity = useCallback((el: HTMLElement, x: number, y: number) => {
    const [cx, cy] = getCenterOfElement(el);
    const dx = x - cx;
    const dy = y - cy;
    let kx = Infinity;
    let ky = Infinity;
    if (dx !== 0) kx = cx / Math.abs(dx);
    if (dy !== 0) ky = cy / Math.abs(dy);
    return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
  }, [getCenterOfElement]);

  const getCursorAngle = useCallback((el: HTMLElement, x: number, y: number) => {
    const [cx, cy] = getCenterOfElement(el);
    const dx = x - cx;
    const dy = y - cy;
    if (dx === 0 && dy === 0) return 0;
    const radians = Math.atan2(dy, dx);
    let degrees = radians * (180 / Math.PI) + 90;
    if (degrees < 0) degrees += 360;
    return degrees;
  }, [getCenterOfElement]);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    // Disable continuous style updates on touch/mobile devices to prevent stutters
    const isMobile = window.matchMedia('(max-width: 1024px)').matches || 
                     window.matchMedia('(pointer: coarse)').matches || 
                     ('ontouchstart' in window);
    if (isMobile) return;

    isHovered.current = true;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const edge = getEdgeProximity(card, x, y);
    const angle = getCursorAngle(card, x, y);

    // Map proximity from 55 to 100 on hover so it never fades out completely and is highly visible
    const proximity = 55 + edge * 45;

    card.style.setProperty('--edge-proximity', `${proximity.toFixed(3)}`);
    card.style.setProperty('--cursor-angle', `${angle.toFixed(3)}deg`);
  }, [getEdgeProximity, getCursorAngle]);

  const handlePointerEnter = useCallback(() => {
    const isMobile = window.matchMedia('(max-width: 1024px)').matches || 
                     window.matchMedia('(pointer: coarse)').matches || 
                     ('ontouchstart' in window);
    if (isMobile) return;
    isHovered.current = true;
  }, []);

  const handlePointerLeave = useCallback(() => {
    const isMobile = window.matchMedia('(max-width: 1024px)').matches || 
                     window.matchMedia('(pointer: coarse)').matches || 
                     ('ontouchstart' in window);
    if (isMobile) return;
    isHovered.current = false;
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Detect mobile or touch devices
    const isMobile = window.matchMedia('(max-width: 1024px)').matches || 
                     window.matchMedia('(pointer: coarse)').matches || 
                     ('ontouchstart' in window);

    if (isMobile) {
      // Set static optimal values for mobile to guarantee ZERO continuous layout calculation or CPU usage
      card.style.setProperty('--cursor-angle', '135deg');
      card.style.setProperty('--edge-proximity', '70');
      return;
    }

    let animationFrameId: number;
    let angle = Math.random() * 360;
    let currentProximity = 0;
    let isSweeping = animated;
    const sweepDuration = 4000;
    const startTime = performance.now();
    let isVisible = true;

    // Use IntersectionObserver on desktops to completely pause loop when card is scrolled out of viewport
    let observer: IntersectionObserver | null = null;
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(([entry]) => {
        isVisible = entry.isIntersecting;
      }, { threshold: 0.05 });
      observer.observe(card);
    }

    const tick = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(tick);
        return;
      }

      const cardElement = cardRef.current;
      if (!cardElement) {
        animationFrameId = requestAnimationFrame(tick);
        return;
      }

      const now = performance.now();

      if (isSweeping) {
        const elapsed = now - startTime;
        if (elapsed < sweepDuration) {
          const progress = elapsed / sweepDuration;
          const currentAngle = 110 + progress * 355; 
          let proximity = 50;
          if (elapsed < 1000) {
            proximity = (elapsed / 1000) * 100;
          } else {
            const fadeProgress = Math.min((elapsed - 1000) / 3000, 1);
            proximity = 100 - fadeProgress * 30; // Settle back to 70% resting proximity
          }
          
          cardElement.style.setProperty('--cursor-angle', `${currentAngle.toFixed(2)}deg`);
          cardElement.style.setProperty('--edge-proximity', `${proximity.toFixed(2)}`);
          currentProximity = proximity;
          angle = currentAngle % 360;
        } else {
          isSweeping = false;
        }
      } else {
        if (!isHovered.current) {
          // Ambient rotation loop
          angle = (angle + 0.4) % 360;
          
          // Smooth interpolation to high-visibility idle proximity (70%)
          const targetProximity = 70;
          if (Math.abs(currentProximity - targetProximity) > 0.1) {
            currentProximity += (targetProximity - currentProximity) * 0.08;
          } else {
            currentProximity = targetProximity;
          }
          
          cardElement.style.setProperty('--cursor-angle', `${angle.toFixed(2)}deg`);
          cardElement.style.setProperty('--edge-proximity', `${currentProximity.toFixed(2)}`);
        } else {
          // Retain state from mouse coordinates to prevent visual snapping on leave
          const proxStr = cardElement.style.getPropertyValue('--edge-proximity');
          const angStr = cardElement.style.getPropertyValue('--cursor-angle');
          if (proxStr) currentProximity = parseFloat(proxStr);
          if (angStr) angle = parseFloat(angStr) || angle;
        }
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [animated]);

  const glowVars = buildGlowVars(glowColor, glowIntensity);

  const styleVars = {
    '--card-bg': backgroundColor,
    '--edge-sensitivity': `${edgeSensitivity}`,
    '--border-radius': `${borderRadius}px`,
    '--border-width': `${borderWidth}px`,
    '--glow-padding': `${glowRadius}px`,
    '--cone-spread': `${coneSpread}deg`,
    '--fill-opacity': `${fillOpacity}`,
    ...glowVars,
    ...buildGradientVars(colors),
  } as React.CSSProperties;

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={`border-glow-card ${className}`}
      style={styleVars}
    >
      <span className="edge-light" />
      <div className="border-glow-inner">
        {children}
      </div>
    </div>
  );
};

export default BorderGlow;
