import { motion } from 'motion/react';
import { useEffect, useRef, useState, useMemo } from 'react';

interface KeyframeValues {
  [key: string]: any;
}

const buildKeyframes = (from: KeyframeValues, steps: KeyframeValues[]) => {
  const keys = new Set([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]);

  const keyframes: { [key: string]: any[] } = {};
  keys.forEach(k => {
    keyframes[k] = [from[k], ...steps.map(s => s[k])];
  });
  return keyframes;
};

interface BlurTextProps {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  animationFrom?: KeyframeValues;
  animationTo?: KeyframeValues[];
  easing?: any;
  onAnimationComplete?: () => void;
  stepDuration?: number;
}

const BlurText = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = (t: number) => t,
  onAnimationComplete,
  stepDuration = 0.35
}: BlurTextProps) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  // Optimized lightweight GPU transitions: opacity and clean y translation without heavy blur filters
  const defaultFrom = useMemo(
    () =>
      direction === 'top' ? { opacity: 0, y: -15 } : { opacity: 0, y: 15 },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      {
        opacity: 0.7,
        y: direction === 'top' ? 2 : -2
      },
      { opacity: 1, y: 0 }
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));

  return (
    <p ref={ref} className={`${className}`} style={{ display: 'flex', flexWrap: 'wrap' }}>
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

        const spanTransition: any = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000
        };
        spanTransition.ease = easing;

        // Apply specific formatting to preserve the "sem burocracia" gradient text
        const segmentLower = segment.toLowerCase();
        const hasSem = segmentLower.includes('sem');
        const hasBurocracia = segmentLower.includes('burocracia');
        const isGradientWord = hasSem || hasBurocracia;
        
        const textStyleClass = isGradientWord 
          ? "accent-gradient-text font-extrabold" 
          : "text-white font-extrabold";

        return (
          <motion.span
            className={`inline-block will-change-[transform,opacity] ${textStyleClass}`}
            key={index}
            initial={fromSnapshot as any}
            animate={(inView ? animateKeyframes : fromSnapshot) as any}
            transition={spanTransition}
            onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
          >
            {segment === ' ' ? '\u00A0' : segment}
            {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
          </motion.span>
        );
      })}
    </p>
  );
};

export default BlurText;
