import { useState, useRef } from "react";
import { Clock, Star } from "lucide-react";
import ParallaxHero from "@/components/ParallaxHero";
import CascadeText from "@/components/CascadeText";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";

import { destinations } from "@/data/destinations";

function DestinationCard({ dest, index }: { dest: any, index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const t = useTranslation();

  return (
    <article
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animationDelay: `${index * 0.08}s`,
        borderRadius: "24px",
        background: "#fff",
        overflow: "hidden",
        position: "relative",
        boxShadow: isHovered
          ? `0 24px 50px -12px ${dest.color}40, 0 0 0 1px ${dest.color}20`
          : "0 10px 30px -10px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.03)",
        transform: isHovered ? "translateY(-8px)" : "translateY(0)",
        transition: "all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
      }}
      className="card-2010"
    >
      <div style={{ position: "relative", height: 280, overflow: "hidden" }}>
        <img
          src={dest.img}
          alt={dest.name}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transform: isHovered ? "scale(1.12)" : "scale(1.02)",
            transition: "transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)",
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: isHovered
            ? "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)"
            : "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)",
          transition: "background 0.5s ease"
        }} />

        <div style={{ position: "absolute", top: 20, left: 20, right: 20, display: "flex", justifyContent: "space-between", alignItems: "flex-start", zIndex: 2 }}>
          <span style={{
            background: "rgba(255,255,255,0.15)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.3)", color: "#fff", padding: "6px 14px",
            borderRadius: "999px", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em",
            textTransform: "uppercase", boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}>
            {dest.tag}
          </span>
          <div style={{
            display: "flex", alignItems: "center", gap: 4, background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(8px)", padding: "6px 12px", borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.1)",
          }}>
            <Star size={12} fill="#FBBF24" color="#FBBF24" />
            <span style={{ fontSize: 13, fontWeight: 800, color: "#fff" }}>{dest.rating}</span>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 20, left: 20, right: 20, zIndex: 2, transform: isHovered ? "translateY(-4px)" : "translateY(0)", transition: "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)" }}>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 32, fontWeight: 800, color: "#fff", lineHeight: 1.1, textShadow: "0 4px 12px rgba(0,0,0,0.3)" }}>
            {dest.name}
          </h2>
        </div>
      </div>

      <div style={{ padding: "24px", background: "#fff", flex: 1, display: "flex", flexDirection: "column" }}>
        <p style={{ fontSize: 15, color: "#4B5563", lineHeight: 1.6, marginBottom: 24, flex: 1 }}>
          {dest.desc}
        </p>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
          {dest.highlights.map((h: string) => (
            <span key={h} style={{
              padding: "6px 12px",
              background: isHovered ? `${dest.color}15` : "#F3F4F6",
              color: isHovered ? dest.color : "#4B5563",
              borderRadius: "8px", fontSize: 12, fontWeight: 600,
              border: `1px solid ${isHovered ? `${dest.color}30` : "transparent"}`,
              transition: "all 0.3s ease",
            }}>
              {h}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 20, borderTop: "1px solid #E5E7EB" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Clock size={14} color="#9CA3AF" />
            <span style={{ fontSize: 13, fontWeight: 500, color: "#6B7280" }}>
              {t.destinations.bestSeason}: {dest.time}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function DestinosPage() {
  const t = useTranslation();
  const { lang } = useLanguage();
  const localDestinations = destinations[lang] || destinations["es"];

  return (
    <div className="page-enter">
      <ParallaxHero src="/assets/nobsa/PanoramicaNobsa.jpg" alt="Destinos de Sugamuxi">
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          textAlign: "center", paddingTop: "var(--nav-height)", zIndex: 2,
        }}>
          <div className="section-label" style={{ justifyContent: "center", color: "var(--color-gold)" }}>
            {t.destinations.filterAll}
          </div>
          <CascadeText text={t.destinations.heroTitle} style={{
            fontFamily: "var(--font-serif)", fontSize: "clamp(40px, 6vw, 80px)",
            fontWeight: 900, color: "#fff", lineHeight: 1.1,
          }} />
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.75)", maxWidth: 480, marginTop: 16 }}>
            {t.destinations.heroSubtitle}
          </p>
        </div>
      </ParallaxHero>

      <section style={{ padding: "80px 0", background: "var(--color-gray-50)" }}>
        <div className="container-wide">
          <div className="exp-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 32 }}>
            {localDestinations.map((dest, i) => (
              <DestinationCard key={dest.name} dest={dest} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
