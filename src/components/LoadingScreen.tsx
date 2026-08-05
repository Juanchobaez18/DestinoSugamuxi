import { useState, useEffect } from "react";

export default function LoadingScreen() {
  const [phase, setPhase] = useState<"in" | "visible" | "out" | "done">("in");

  useEffect(() => {
    // Fade in → hold → fade out
    const t1 = setTimeout(() => setPhase("visible"), 100);
    const t2 = setTimeout(() => setPhase("out"), 1800);
    const t3 = setTimeout(() => setPhase("done"), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  if (phase === "done") return null;

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 99999,
      background: "linear-gradient(135deg, #4a000b 0%, #0D1520 50%, #000b4a 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 24,
      transition: "opacity 0.7s ease",
      opacity: phase === "in" ? 0 : phase === "out" ? 0 : 1,
      pointerEvents: phase === "out" ? "none" : "all",
    }}>

      {/* Logo */}
      <div style={{
        transform: phase === "visible" ? "translateY(0) scale(1)" : "translateY(20px) scale(0.9)",
        opacity: phase === "visible" ? 1 : 0,
        transition: "all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.1s",
      }}>
        <img
          src="/assets/LogoSugamuxi.png"
          alt="Sugamuxi"
          style={{ height: 90, objectFit: "contain", filter: "drop-shadow(0 8px 24px rgba(255,255,255,0.2))" }}
        />
      </div>

      {/* Province name */}
      <div style={{
        textAlign: "center",
        transform: phase === "visible" ? "translateY(0)" : "translateY(16px)",
        opacity: phase === "visible" ? 1 : 0,
        transition: "all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s",
      }}>
        <p style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          color: "rgba(196,137,90,0.9)",
          marginBottom: 6,
          fontFamily: "Montserrat, sans-serif",
        }}>
          Provincia de
        </p>
        <h1 style={{
          fontSize: "clamp(32px, 6vw, 56px)",
          fontWeight: 900,
          color: "#fff",
          letterSpacing: "-0.02em",
          fontFamily: "Montserrat, sans-serif",
          lineHeight: 1,
        }}>
          Sugamuxi
        </h1>
      </div>

      {/* Loading bar */}
      <div style={{
        width: 160,
        height: 2,
        background: "rgba(255,255,255,0.12)",
        borderRadius: 999,
        overflow: "hidden",
        opacity: phase === "visible" ? 1 : 0,
        transition: "opacity 0.5s ease 0.5s",
      }}>
        <div style={{
          height: "100%",
          borderRadius: 999,
          background: "linear-gradient(90deg, #C4895A, #4A8EC2, #6BAF4A)",
          animation: "loading-bar 1.5s ease forwards",
        }} />
      </div>

      <style>{`
        @keyframes loading-bar {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
