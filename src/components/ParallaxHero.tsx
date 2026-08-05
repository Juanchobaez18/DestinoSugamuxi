import { useEffect, useState } from "react";

interface ParallaxHeroProps {
  src: string;
  alt?: string;
  height?: number | string;
  className?: string;
  children?: React.ReactNode;
}

export default function ParallaxHero({
  src,
  alt = "Hero Image",
  height = 420,
  className = "",
  children,
}: ParallaxHeroProps) {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Usamos requestAnimationFrame implícito al leer window.scrollY
      setOffsetY(window.scrollY * 0.4);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className={`page-header-md ${className}`}
      style={{
        position: "relative",
        height: height,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: -50, // Margen extra para que al mover no se vea el fondo
          transform: `translate3d(0, ${offsetY}px, 0)`,
          willChange: "transform", // Optimizacion premium
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
        />
      </div>
      <div className="hero-overlay" />
      {children}
    </section>
  );
}
