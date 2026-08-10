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

  // Detectar móvil para desactivar parallax (evita crash GPU al hacer zoom)
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || (window.innerWidth <= 1024);
  });

  useEffect(() => {
    // Sin parallax en móvil — reduce carga GPU significativamente
    if (isMobile) return;

    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setOffsetY(window.scrollY * 0.4);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

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
          // En móvil: sin parallax ni will-change para no saturar GPU
          transform: isMobile ? "none" : `translate3d(0, ${offsetY}px, 0)`,
          willChange: isMobile ? "auto" : "transform",
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
