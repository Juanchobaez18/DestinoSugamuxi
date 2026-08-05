import { useEffect, useRef, useState } from "react";

interface CascadeTextProps {
  text?: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  duration?: number;
}

export default function CascadeText({
  text = "",
  as: Component = "h1",
  className = "",
  style = {},
  delay = 0,
  duration = 0.8,
}: CascadeTextProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(currentRef);
    return () => observer.disconnect();
  }, []);

  const words = (text || "").split(" ");

  const Comp: any = Component;

  return (
    <Comp ref={ref} className={className} style={{ ...style, display: "inline-block" }}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: "inline-block", overflow: "hidden", paddingBottom: "0.1em", marginRight: "0.25em" }}>
          <span
            style={{
              display: "inline-block",
              transform: isVisible ? "translateY(0)" : "translateY(110%)",
              opacity: isVisible ? 1 : 0,
              transition: `transform ${duration}s cubic-bezier(0.2, 0.8, 0.2, 1) ${delay + wordIndex * 0.1}s, opacity ${duration}s ease ${delay + wordIndex * 0.1}s`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </Comp>
  );
}
