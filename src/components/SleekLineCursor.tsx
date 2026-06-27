import React, { useEffect, useRef, useState } from "react";

interface Point {
  x: number;
  y: number;
  age: number;
}

export const SleekLineCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Track history of mouse coordinates
  const pointsRef = useRef<Point[]>([]);
  // Store target position for the trailing ring (smooth interpolation)
  const ringRef = useRef({ x: 0, y: 0 });
  const currentRingRef = useRef({ x: 0, y: 0 });

  // Only run on client-side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Apply cursor-none class to the body
    document.body.classList.add("cursor-none");
    
    // Inject a style tag to force cursor: none on all elements including interactive ones
    const style = document.createElement("style");
    style.id = "sleek-cursor-style";
    style.innerHTML = `
      *, *::before, *::after {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    const updateCoordinates = (x: number, y: number) => {
      setCoords({ x, y });
      setIsVisible(true);

      // Add a new point to the trailing history
      pointsRef.current.push({ x, y, age: 0 });

      // Keep the history at a reasonable length
      if (pointsRef.current.length > 35) {
        pointsRef.current.shift();
      }

      ringRef.current = { x, y };
    };

    const handleMouseMove = (e: MouseEvent) => {
      updateCoordinates(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        updateCoordinates(touch.clientX, touch.clientY);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Set initial position
    currentRingRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    ringRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    return () => {
      document.body.classList.remove("cursor-none");
      const existingStyle = document.getElementById("sleek-cursor-style");
      if (existingStyle) {
        existingStyle.remove();
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isMounted]);

  // Handle Canvas Resizing with Retina/High-DPI Support
  useEffect(() => {
    if (!isMounted) return;

    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.scale(dpr, dpr);
        }
      }
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isMounted]);

  // Animation Frame Loop
  useEffect(() => {
    if (!isMounted) return;

    let animationFrameId: number;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Clear the canvas on every frame
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (isVisible && pointsRef.current.length > 0) {
        const points = pointsRef.current;

        // 1. Update points age and filter out expired points
        const maxAge = 25;
        points.forEach((p) => p.age++);
        pointsRef.current = points.filter((p) => p.age < maxAge);

        if (points.length > 1) {
          // 2. Draw the continuous sleek ribbon trail
          ctx.beginPath();
          ctx.moveTo(points[0].x, points[0].y);

          // Render curve through tracking points
          for (let i = 1; i < points.length - 1; i++) {
            const xc = (points[i].x + points[i + 1].x) / 2;
            const yc = (points[i].y + points[i + 1].y) / 2;
            ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
          }
          ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);

          // Create a golden gradient trailing fade effect
          const gradient = ctx.createRadialGradient(
            coords.x, coords.y, 2,
            coords.x, coords.y, 100
          );
          gradient.addColorStop(0, "rgba(224, 175, 38, 0.95)"); // Premium SwapHome Gold
          gradient.addColorStop(0.3, "rgba(224, 175, 38, 0.45)");
          gradient.addColorStop(1, "rgba(224, 175, 38, 0)");

          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2.5;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          
          // Add a subtle golden neon glow
          ctx.shadowBlur = 6;
          ctx.shadowColor = "rgba(224, 175, 38, 0.6)";

          ctx.stroke();

          // 3. Draw segmented taper ribbon effect
          ctx.shadowBlur = 0; // Reset shadow for segments
          for (let i = 0; i < points.length - 1; i++) {
            const ratio = i / points.length;
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[i + 1].x, points[i + 1].y);

            ctx.strokeStyle = `rgba(224, 175, 38, ${ratio * 0.35})`;
            ctx.lineWidth = ratio * 4.5;
            ctx.stroke();
          }
        }

        // 4. Interpolate smooth trailing outer ring (Spring action)
        const springSpeed = 0.16; // Adjusts trailing ring lag speed
        currentRingRef.current.x += (ringRef.current.x - currentRingRef.current.x) * springSpeed;
        currentRingRef.current.y += (ringRef.current.y - currentRingRef.current.y) * springSpeed;

        // Reset shadow completely for precise crisp indicators
        ctx.shadowBlur = 0;

        // Draw elegant outer trailing gold ring
        ctx.beginPath();
        ctx.arc(currentRingRef.current.x, currentRingRef.current.y, 11, 0, 2 * Math.PI);
        ctx.strokeStyle = "rgba(224, 175, 38, 0.75)";
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Draw very fine subtle outer orbit circle
        ctx.beginPath();
        ctx.arc(currentRingRef.current.x, currentRingRef.current.y, 15, 0, 2 * Math.PI);
        ctx.strokeStyle = "rgba(224, 175, 38, 0.15)";
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // 5. Draw the solid leading precise gold dot exactly at mouse position
        ctx.beginPath();
        ctx.arc(coords.x, coords.y, 3, 0, 2 * Math.PI);
        ctx.fillStyle = "#E0AF26";
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMounted, isVisible, coords]);

  if (!isMounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[9999]"
      style={{ mixBlendMode: "screen" }}
    />
  );
};

export default SleekLineCursor;
