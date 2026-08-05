import { useEffect, useRef, useState, ReactNode } from "react";

type Direction = "up" | "left" | "right" | "scale";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;        // ms
  direction?: Direction;
  className?: string;
  style?: React.CSSProperties;
  threshold?: number;    // 0–1
}

const transforms: Record<Direction, string> = {
  up:    "translateY(40px)",
  left:  "translateX(-40px)",
  right: "translateX(40px)",
  scale: "scale(0.92)",
};

export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  className,
  style,
  threshold = 0.15,
}: ScrollRevealProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : transforms[direction],
        transition: `opacity 0.75s ease ${delay}ms, transform 0.75s cubic-bezier(0.2,0.8,0.2,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
