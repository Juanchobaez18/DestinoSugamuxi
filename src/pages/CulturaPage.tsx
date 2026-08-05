import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ParallaxHero from "@/components/ParallaxHero";
import CascadeText from "@/components/CascadeText";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";

import { cultureSections } from "@/data/culture";

export default function CulturaPage() {
  const t = useTranslation();
  const { lang } = useLanguage();

  const localCultureSections = cultureSections[lang] || cultureSections["es"];

  return (
    <div className="page-enter">

      <ParallaxHero src="/assets/mongua/GastronomiaMongua.jpg" alt="Cultura Sugamuxi" height={480}>
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          textAlign: "center",
          paddingTop: "var(--nav-height)",
          zIndex: 2,
        }}>
          <div className="section-label" style={{ justifyContent: "center" }}>
            {t.culture.heroTitle}
          </div>
          <CascadeText text={t.culture.heroTitle} style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(40px, 6vw, 80px)",
            fontWeight: 900,
            color: "#fff",
            lineHeight: 1.1,
            marginBottom: 16,
          }} />
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.8)", maxWidth: 560, margin: "0 auto" }}>
            {t.culture.heroSubtitle}
          </p>
        </div>
      </ParallaxHero>

      {/* Alternating sections */}
      {localCultureSections.map((sec, i) => (
        <section
          key={sec.title}
          style={{
            padding: "80px 0",
            background: i % 2 === 0 ? "var(--color-white)" : "var(--color-gray-50)",
          }}
        >
          <div className="container-wide culture-grid" style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "center",
            direction: sec.side === "right" ? "rtl" : "ltr",
          }}>
            {/* Image */}
            <div style={{ direction: "ltr", borderRadius: "var(--radius-xl)", overflow: "hidden", boxShadow: "var(--shadow-lg)" }}>
              <img
                src={`${sec.img}?v=3`}
                alt={sec.title}
                className="culture-img"
                style={{ 
                  width: "100%", height: 380, objectFit: "cover",
                  objectPosition: sec.img.includes('Sogamoso') ? 'center 80%' : 'center'
                }}
              />
            </div>

            {/* Text */}
            <div style={{ direction: "ltr" }}>
              <div className="section-label" style={{ color: sec.color }}>
                <span style={{ width: 32, height: 2, background: sec.color, display: "inline-block", borderRadius: 2, marginRight: 10 }} />
                {sec.subtitle}
              </div>
              <h2 style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(28px, 3vw, 44px)",
                fontWeight: 700,
                color: "var(--color-dark)",
                lineHeight: 1.2,
                marginBottom: 20,
              }}>
                {sec.title}
              </h2>
              <p style={{ fontSize: 16, color: "var(--color-text-light)", lineHeight: 1.8, marginBottom: 28 }}>
                {sec.desc}
              </p>
            </div>
          </div>
        </section>
      ))}



      {/* CTA */}
      <section style={{ padding: "64px 0", background: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-lago) 100%)", textAlign: "center" }}>
        <div className="container">
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 36, fontWeight: 700, color: "#fff", marginBottom: 16 }}>
            {t.culture.ctaTitle}
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", marginBottom: 32 }}>
            {t.culture.ctaSubtitle}
          </p>
          <Link to="/contacto" className="btn btn-gold">
            {t.culture.ctaBtn}
          </Link>
        </div>
      </section>
    </div>
  );
}
