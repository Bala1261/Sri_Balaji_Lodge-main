import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // Max rotation in degrees (e.g. 8 - 12)
  scale?: number; // Scale on hover (e.g. 1.02)
  glareOpacity?: number; // Opacity of dynamic light shimmer (e.g. 0.16)
  glareColor?: string; // Light shimmer color
  disabled?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
  id?: string;
}

export const Card3D: React.FC<Card3DProps> = ({
  children,
  className = '',
  maxTilt = 7,
  scale = 1.015,
  glareOpacity = 0.18,
  glareColor = 'rgba(255, 255, 255, 0.45)',
  disabled = false,
  style = {},
  onClick,
  id,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Detect touch devices to disable tilt and fallback to smooth scale elevation
  useEffect(() => {
    const checkTouch = () => {
      const hasTouch =
        window.matchMedia('(hover: none)').matches ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0;
      setIsTouchDevice(hasTouch);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch, { passive: true });
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  // Raw cursor position normalized (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Pixel coordinates for the dynamic radial glare reflection
  const glareX = useMotionValue(0);
  const glareY = useMotionValue(0);

  // Soft, damp spring physics strictly controlled for high-end Stripe/Apple corporate feel
  // transition: transform 0.4s cubic-bezier(0.03, 0.98, 0.52, 0.99)
  const springConfig = { damping: 28, stiffness: 180, mass: 0.8 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  // 3D Tilt transforms
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-maxTilt, maxTilt]);
  const cardScale = useSpring(isHovered ? scale : 1, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || isTouchDevice || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Local coordinates
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Normalized from -0.5 to 0.5
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);

    // Dynamic light reflection position
    glareX.set(mouseX);
    glareY.set(mouseY);
  };

  const handleMouseEnter = () => {
    if (!disabled && !isTouchDevice) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  // On touch devices: Fallback to simple, safe touch elevation without tilt jitter
  if (isTouchDevice || disabled) {
    return (
      <div
        id={id}
        onClick={onClick}
        style={style}
        className={`transform-gpu transition-transform duration-300 active:scale-[0.99] ${className}`}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      id={id}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
        rotateX: rotateX,
        rotateY: rotateY,
        scale: cardScale,
        ...style,
      }}
      className={`relative transform-gpu will-change-transform ${className}`}
    >
      {/* Dynamic Cursor-Following Light Reflection Shimmer */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-30 rounded-none overflow-hidden transition-opacity duration-300"
        style={{
          opacity: isHovered ? glareOpacity : 0,
        }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(circle 380px at ${gx}px ${gy}px, ${glareColor}, transparent 75%)`
            ),
          }}
        />
      </motion.div>

      {/* Card Content with 3D Parallax Preservation */}
      <div className="relative w-full h-full transform-style-3d">
        {children}
      </div>
    </motion.div>
  );
};

export default Card3D;