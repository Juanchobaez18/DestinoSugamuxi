import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { MapPin, Map } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { highlights as highlightsData, stats as statsData, homeExperiences as experiencesData } from "@/data/home";
import ScrollReveal from "@/components/ScrollReveal";
import MountainDivider from "@/components/MountainDivider";
import CascadeText from "@/components/CascadeText";
import { useTranslation } from "@/hooks/useTranslation";

import MapaInteractivo from '../components/Mapa_interactivo'

function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();

    const timer = setInterval(() => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * end);

      setCount(current);

      if (progress >= 1) {
        clearInterval(timer);
        setCount(end);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, end, duration]);

  return { count, ref };
}

function StatItem({ icon: Icon, value, label }: { icon: any; value: string; label: string }) {
  const numericValue = parseInt(value.replace(/\D/g, ""));
  const suffix = value.replace(/[0-9]/g, "");
  const { count, ref } = useCountUp(numericValue, 2500);

  return (
    <div ref={ref} style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{
        width: 48, height: 48,
        background: "rgba(255,255,255,0.12)",
        borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        <Icon size={20} color="#fff" />
      </div>
      <div>
        <div style={{ fontSize: 28, fontWeight: 800, color: "#fff", lineHeight: 1 }}>
          {count}{suffix}
        </div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", marginTop: 2 }}>{label}</div>
      </div>
    </div>
  );
}

function HighlightCard({ dest, index }: { dest: any, index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={{ textDecoration: "none", display: "block" }}>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          animationDelay: `${index * 0.1}s`,
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
        }}
        className="card-2010"
      >
        <div style={{ position: "relative", height: 280, overflow: "hidden" }}>
          <img
            src={dest.img}
            alt={dest.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: isHovered ? "scale(1.12)" : "scale(1.02)",
              transition: "transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)",
            }}
          />
          <div style={{
            position: "absolute",
            inset: 0,
            background: isHovered
              ? "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)"
              : "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)",
            transition: "background 0.5s ease"
          }} />

          {/* Badge */}
          <div style={{
            position: "absolute", top: 20, left: 20, zIndex: 2,
          }}>
            <span style={{
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "#fff",
              padding: "6px 14px",
              borderRadius: "999px",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}>
              {dest.tag}
            </span>
          </div>

          <div style={{
            position: "absolute",
            bottom: 20,
            left: 20,
            right: 20,
            zIndex: 2,
            transform: isHovered ? "translateY(-4px)" : "translateY(0)",
            transition: "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
          }}>
            <h3 style={{
              fontFamily: "var(--font-serif)",
              fontSize: 28,
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.1,
              textShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}>
              {dest.name}
            </h3>
          </div>
        </div>

        <div style={{ padding: "20px 24px", background: "#fff", display: "flex", flexDirection: "column", justifyContent: "center", minHeight: 90 }}>
          <p style={{
            fontSize: 14,
            lineHeight: 1.5,
            color: isHovered ? dest.color : "#4B5563",
            margin: 0,
            transition: "color 0.3s ease",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}>
            {dest.desc}
          </p>
        </div>
      </div>
    </div>
  );
}

const getTopLugares = (lang: string) => [
  { name: "Playa Blanca", loc: "Tota", img: "/assets/PlayaBlanca.jpg", color: "#1E4D7B" },
  { name: "Parque Guaitika", loc: "Tibasosa", img: "/assets/tibasosa/Guatika.jpg", color: "#C9963A" },
  { name: "Páramo de Ocetá", loc: "Monguí", img: "https://upload.wikimedia.org/wikipedia/commons/2/24/Paramo_de_Oceta.JPG", color: "#3A6B2A" },
  { name: lang === "en" ? "Siscunsí Paramo" : "Páramo de Siscunsí", loc: "Sogamoso", img: "/assets/sogamoso/ParamoSiscunsi.jpg", color: "#6B1A2A" },
];

function DestacadoCard({ lugar, index }: { lugar: any, index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "relative",
        height: 440,
        borderRadius: "var(--radius-xl)",
        overflow: "hidden",
        animationDelay: `${index * 0.15}s`,
        cursor: "pointer",
        boxShadow: isHovered ? `0 30px 60px -15px ${lugar.color}60` : "0 10px 30px rgba(0,0,0,0.1)",
        transform: isHovered ? "translateY(-12px)" : "translateY(0)",
        transition: "all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
      }}
      className="card-2010"
    >
      <img
        src={lugar.img}
        alt={lugar.name}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: isHovered ? "scale(1.15)" : "scale(1.05)",
          transition: "transform 1.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
      />
      <div style={{
        position: "absolute",
        inset: 0,
        background: isHovered
          ? `linear-gradient(to top, ${lugar.color}E6 0%, rgba(0,0,0,0.1) 60%, transparent 100%)`
          : "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.05) 50%, transparent 100%)",
        transition: "background 0.5s ease"
      }} />
      <div style={{
        position: "absolute",
        bottom: 32,
        left: 24,
        right: 24,
        transform: isHovered ? "translateY(-10px)" : "translateY(0)",
        transition: "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
          <MapPin size={14} color={isHovered ? "#fff" : "var(--color-gold)"} style={{ transition: "color 0.5s ease" }} />
          <span style={{ fontSize: 13, fontWeight: 700, color: isHovered ? "rgba(255,255,255,0.9)" : "var(--color-gold)", textTransform: "uppercase", letterSpacing: "0.1em", transition: "color 0.5s ease" }}>
            {lugar.loc}
          </span>
        </div>
        <h3 style={{
          fontFamily: "var(--font-serif)",
          fontSize: 32,
          fontWeight: 800,
          color: "#fff",
          lineHeight: 1.1,
          textShadow: "0 4px 12px rgba(0,0,0,0.4)"
        }}>
          {lugar.name}
        </h3>
      </div>
    </div>
  );
}

export default function HomePage() {
  const heroImg = "/assets/iza/PanoramicaIza.jpg";
  const t = useTranslation();
  const { lang } = useLanguage();

  // Detectar móvil para omitir animaciones pesadas (evita crash al zoom)
  const isMobile = typeof window !== 'undefined' &&
    (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth <= 768);

  const highlights = highlightsData[lang] || highlightsData["es"];
  const stats = statsData[lang] || statsData["es"];
  const experiences = experiencesData[lang] || experiencesData["es"];

  return (
    <div className="page-enter">

      {/* ══════════════════════════════════════════════════
          HERO — Estático: Provincia de Sugamuxi
      ══════════════════════════════════════════════════ */}
      <section className="noise-bg" style={{
        position: "relative",
        height: "100vh",
        minHeight: 700,
        overflow: "hidden",
        background: "linear-gradient(135deg, #4a000b 0%, #000b4a 100%)"
      }}>

        <div style={{
          position: "absolute", inset: 0,
          opacity: 0.25,
          filter: "blur(6px)",
          transform: "scale(1.05)",
        }}>
          <img
            src={heroImg}
            alt="Provincia de Sugamuxi"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
          />
        </div>

        <div className="container-wide" style={{
          position: "relative", zIndex: 2,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 24px",
          paddingTop: "var(--nav-height)",
        }}>

          <div style={{
            textAlign: "center",
            maxWidth: 1000,
            width: "100%",
            animation: "floatAmbient 8s ease-in-out infinite",
          }}>



            <div className="animate-fade-up" style={{ position: "relative", display: "inline-block", marginBottom: 24, animationDelay: "0.2s" }}>
              <h1 aria-hidden="true" style={{
                position: "absolute",
                inset: 0,
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(60px, 9vw, 120px)",
                fontWeight: 900,
                lineHeight: 0.95,
                textTransform: "uppercase",
                letterSpacing: "-0.01em",
                color: "transparent",
                WebkitTextStroke: "1px rgba(255,255,255,0.12)",
                userSelect: "none",
                pointerEvents: "none",
              }}>
                Provincia de<br />
                Sugamuxi
              </h1>
              <h1 style={{
                position: "relative",
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(60px, 9vw, 120px)",
                fontWeight: 900,
                lineHeight: 0.95,
                textTransform: "uppercase",
                letterSpacing: "-0.01em",
                backgroundImage: `url(${heroImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "shimmerBackground 25s linear infinite",
              }}>
                Provincia de<br />
                Sugamuxi
              </h1>
            </div>

            <p style={{
              fontSize: "clamp(18px, 2.2vw, 26px)",
              color: "rgba(255,255,255,0.85)",
              maxWidth: 700,
              margin: "0 auto 48px",
              lineHeight: 1.6,
            }}>
              {t.home.heroSubtitle}
            </p>

            <div className="hero-btn-group" style={{
              display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap",
            }}>
              <Link
                to="/destinos"
                className="btn btn-gold"
                style={{
                  fontSize: 16,
                  padding: "14px 32px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                {t.home.heroBtnExplore}
              </Link>
              <Link
                to="/experiencias"
                className="btn btn-outline"
                style={{
                  fontSize: 16,
                  padding: "14px 32px",
                  borderColor: "rgba(255,255,255,0.4)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                {t.home.heroBtnExp}
              </Link>
            </div>

          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════════════════ */}
      <section style={{ background: "linear-gradient(135deg, var(--color-lago) 0%, var(--color-primary) 60%, var(--color-tierra) 100%)", padding: "32px 0" }}>
        <div className="container-wide stats-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 24,
        }}>
          {stats.map(({ icon: Icon, value, label }) => (
            <StatItem key={label} icon={Icon} value={value} label={label} />
          ))}
        </div>
      </section>


      {/* ══════════════════════════════════════════════════
          DESTINOS HIGHLIGHTS
      ══════════════════════════════════════════════════ */}
      <section className="section-reduce-pad" style={{ padding: "100px 0", background: "var(--color-gray-50)", borderBottom: "1px solid var(--color-gray-200)" }}>
        <div className="container-wide">
          <ScrollReveal direction="up">
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div className="section-label" style={{ justifyContent: "center" }}>{t.home.destinationsLabel}</div>
              <h2 style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(36px, 4vw, 56px)",
                fontWeight: 700,
                color: "var(--color-dark)",
                lineHeight: 1.2,
              }}>
                {t.home.destinationsTitle1}
                <span style={{
                  background: "linear-gradient(90deg, var(--color-primary), var(--color-lago))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "block"
                }}>{t.home.destinationsTitle2}</span>
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="destinos-grid highlights-grid" style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 24,
            }}>
              {highlights.map((dest, i) => (
                <HighlightCard key={dest.name} dest={dest} index={i} />
              ))}
            </div>
          </ScrollReveal>


        </div>
      </section>


      {/* ══════════════════════════════════════════════════
          LUGARES DESTACADOS (MÁS VISITADOS)
      ══════════════════════════════════════════════════ */}
      <section className="section-reduce-pad" style={{ padding: "100px 0", background: "linear-gradient(180deg, var(--color-white) 0%, var(--color-gray-50) 100%)" }}>
        <div className="container-wide">
          <ScrollReveal direction="up">
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div className="section-label" style={{ justifyContent: "center" }}>{t.home.topLabel}</div>
              <h2 style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(36px, 4vw, 56px)",
                fontWeight: 700,
                color: "var(--color-dark)",
                lineHeight: 1.2,
              }}>
                {t.home.topTitle1}
                <span style={{
                  background: "linear-gradient(90deg, var(--color-gold-l), var(--color-tierra-l))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "block"
                }}>{t.home.topTitle2}</span>
              </h2>
              <p style={{
                fontSize: "clamp(16px, 2vw, 18px)",
                color: "var(--color-text-light)",
                maxWidth: 600,
                margin: "24px auto 0",
                lineHeight: 1.6,
              }}>
                {t.home.topSubtitle}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="destacado-grid" style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 32,
            }}>
              {getTopLugares(lang).map((lugar, i) => (
                <DestacadoCard key={lugar.name} lugar={lugar} index={i} />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          DIVIDER
      ══════════════════════════════════════════════════ */}
      <MountainDivider fromColor="var(--color-gray-50)" toColor="var(--color-dark)" height={80} />


      {/* ══════════════════════════════════════════════════
          MAPA INTERACTIVO
      ══════════════════════════════════════════════════ */}
      <section style={{
        position: "relative",
        padding: "120px 0",
        background: "linear-gradient(160deg, var(--color-dark) 0%, #0e1e35 50%, #12100e 100%)",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(30,77,123,0.20) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(196,137,90,0.12) 0%, transparent 50%),
            radial-gradient(circle at 50% 80%, rgba(58,107,42,0.10) 0%, transparent 50%)
          `,
        }} />

        {/* Floating dots decorativos — solo en desktop (en móvil saturan la GPU) */}
        {!isMobile && [...Array(4)].map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            width: 6, height: 6,
            borderRadius: "50%",
            background: ["var(--color-gold-xl)", "var(--color-primary-xl)", "var(--color-lago-xl)", "var(--color-tierra-l)"][i],
            top: `${15 + i * 22}%`,
            left: `${8 + i * 28}%`,
            opacity: 0.55,
            animation: `float ${3 + i * 0.8}s ease-in-out infinite`,
            animationDelay: `${i * 0.6}s`,
          }} />
        ))}

        <div className="container-wide" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>

          <ScrollReveal direction="up" delay={200}>
            <div style={{ position: "relative", display: "inline-block", marginBottom: 40 }}>
              <div style={{
                position: "absolute",
                inset: -20,
                borderRadius: "50%",
                border: "1px solid rgba(74,142,194,0.30)",
                animation: "pulse-ring 2.5s ease-out infinite",
              }} />
              <div style={{
                position: "absolute",
                inset: -8,
                borderRadius: "50%",
                border: "1px solid rgba(196,137,90,0.20)",
                animation: "pulse-ring 2.5s ease-out infinite",
                animationDelay: "0.8s",
              }} />
              <div style={{
                width: 100, height: 100,
                background: "linear-gradient(135deg, rgba(30,77,123,0.35), rgba(196,137,90,0.25))",
                border: "1px solid rgba(74,142,194,0.35)",
                borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                // Sin backdrop-filter en móvil — reduce carga GPU
                backdropFilter: isMobile ? "none" : "blur(10px)",
              }}>
                <Map size={44} color="var(--color-gold-xl)" />
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 24px",
                borderRadius: "var(--radius-full)",
                border: "1px solid rgba(74,142,194,0.45)",
                background: "rgba(30,77,123,0.15)",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--color-lago-xl)",
              }}>
                <span style={{
                  width: 7, height: 7,
                  borderRadius: "50%",
                  background: "var(--color-lago-xl)",
                  animation: "pulse 1.5s ease-in-out infinite",
                  display: "inline-block",
                }} />
                {t.home.mapLabel}
              </span>
            </div>

            <h2 style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(36px, 5vw, 72px)",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.15,
              marginBottom: 48,
            }}>
              {t.home.mapTitle1}
              <br />
              <span style={{
                background: "linear-gradient(90deg, var(--color-lago-xl), var(--color-gold-xl), var(--color-primary-xl), var(--color-lago-xl))",
                backgroundSize: "300% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "shimmer 4s linear infinite",
              }}>
                {t.home.mapTitle2}
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="scale" delay={400}>

            <div style={{
              position: "relative",
              maxWidth: 800,
              margin: "0 auto",
              borderRadius: "var(--radius-xl)",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 40px 100px rgba(0,0,0,0.5)",
            }}>
              <MapaInteractivo />
            </div>
          </ScrollReveal>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════
          EXPERIENCES PREVIEW
      ══════════════════════════════════════════════════ */}
      <section className="section-reduce-pad" style={{ padding: "100px 0", background: "var(--color-cream)" }}>
        <div className="container-wide">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64, flexWrap: "wrap", gap: 24 }}>
            <div>
              <div className="section-label">{t.home.expLabel}</div>
              <h2 style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(32px, 4vw, 48px)",
                fontWeight: 700,
                color: "var(--color-dark)",
                lineHeight: 1.2,
              }}>
                {t.home.expTitle1}
                <span style={{
                  background: "linear-gradient(90deg, var(--color-primary-l), var(--color-lago-l))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "block"
                }}>{t.home.expTitle2}</span>
              </h2>
            </div>

          </div>

          <ScrollReveal delay={100}>
            <div className="exp-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
              {experiences.map(({ icon: Icon, title, desc, color, img }, i) => (
                <div
                  key={title}
                  className="card"
                  style={{
                    borderRadius: "var(--radius-lg)",
                    overflow: "hidden",
                    position: "relative",
                    transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    cursor: "pointer",
                    animationDelay: `${i * 0.1}s`,
                    height: 380,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.transform = "translateY(-6px)";
                    el.style.boxShadow = `0 24px 40px -12px ${color}50`;
                    const imgEl = el.querySelector("img");
                    if (imgEl) imgEl.style.transform = "scale(1.12)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.transform = "translateY(0)";
                    el.style.boxShadow = "none";
                    const imgEl = el.querySelector("img");
                    if (imgEl) imgEl.style.transform = "scale(1.02)";
                  }}
                >
                  <img
                    src={img}
                    alt={title}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transform: "scale(1.02)",
                      transition: "transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)",
                      zIndex: 0,
                    }}
                  />
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)`,
                    zIndex: 1,
                  }} />

                  <div style={{ position: "relative", zIndex: 2, padding: "32px 24px" }}>
                    <div style={{
                      width: 48, height: 48,
                      borderRadius: "50%",
                      background: color,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      marginBottom: 16,
                      boxShadow: `0 8px 24px ${color}80`,
                    }}>
                      <Icon size={24} color="#fff" />
                    </div>
                    <h3 style={{ fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 8, fontFamily: "var(--font-serif)" }}>{title}</h3>
                    <p style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", lineHeight: 1.6 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════
          DIVIDER
      ══════════════════════════════════════════════════ */}
      <MountainDivider fromColor="var(--color-cream)" toColor="var(--color-dark)" height={80} />


      {/* ══════════════════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════════════════ */}
      <section className="section-reduce-pad" style={{
        position: "relative",
        overflow: "hidden",
        padding: "80px 0",
        background: "linear-gradient(135deg, var(--color-tierra) 0%, var(--color-dark) 50%, var(--color-lago) 100%)",
      }}>
        <img
          src="/assets/mongua/PanoramicaMongua.jpg"
          alt="CTA background"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(13,21,32,0.82)" }} />

        <div className="container-wide" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div className="section-label" style={{ justifyContent: "center" }}>{t.home.ctaLabel}</div>
          <h2 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(32px, 5vw, 64px)",
            fontWeight: 700,
            color: "#fff",
            marginBottom: 20,
            lineHeight: 1.2,
          }}>
            {t.home.ctaTitle.split("\n")[0]}<br />{t.home.ctaTitle.split("\n")[1]}
          </h2>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.85)", marginBottom: 40 }}>
            {t.home.ctaSubtitle}
          </p>
          <div className="hero-btn-group" style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              to="/contacto"
              className="btn btn-gold"
              style={{
                fontSize: 16,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              {t.home.ctaBtnPlan}
            </Link>
            <Link
              to="/destinos"
              className="btn btn-outline"
              style={{ fontSize: 16 }}
            >
              {t.home.ctaBtnDest}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
