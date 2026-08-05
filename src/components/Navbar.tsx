import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MapPin, Menu, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDarkBg, setIsDarkBg] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { pathname } = useLocation();
  const { lang, setLang } = useLanguage();
  const t = useTranslation();

  const navItems = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.destinations, href: "/destinos" },
    { label: t.nav.experiences, href: "/experiencias" },
    { label: t.nav.culture, href: "/cultura" },
  ];

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const handleProgress = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      setScrollProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleProgress, { passive: true });
    return () => window.removeEventListener("scroll", handleProgress);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const x = window.innerWidth / 2;
      const y = 56;
      const elements = document.elementsFromPoint(x, y);
      let detectedDark = false;
      let detectedSolidBg = false;

      for (const el of elements) {
        if (el.tagName === "HEADER" || el.closest("header")) continue;
        const style = window.getComputedStyle(el);
        const bgColor = style.backgroundColor;
        const bgImage = style.backgroundImage;

        if (bgColor && bgColor !== "rgba(0, 0, 0, 0)" && bgColor !== "transparent") {
          const match = bgColor.match(/\d+/g);
          if (match && match.length >= 3) {
            const [r, g, b] = match.map(Number);
            const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
            detectedDark = hsp < 140;
            detectedSolidBg = true;
            break;
          }
        }
        if (el.classList.contains("hero-overlay")) {
          detectedDark = true;
          detectedSolidBg = true;
          break;
        }
        if (bgImage && bgImage !== "none" && (bgImage.includes("linear-gradient") || bgImage.includes("radial-gradient"))) {
          detectedDark = true;
          detectedSolidBg = true;
          break;
        }
      }
      setIsDarkBg(detectedSolidBg ? detectedDark : false);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleNavClick = () => setMenuOpen(false);

  const textColor = isDarkBg ? "#fff" : "#000";
  const textMuted = isDarkBg ? "rgba(255,255,255,0.75)" : "rgba(0,0,0,0.65)";
  const bgActive = isDarkBg ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.04)";
  const bgHover = isDarkBg ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)";

  const langBtnBase: React.CSSProperties = {
    padding: "5px 10px",
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 700,
    border: "none",
    cursor: "pointer",
    transition: "all 0.2s ease",
    letterSpacing: "0.05em",
  };

  return (
    <>
      <header style={{
        position: "fixed",
        top: 20,
        left: "50%",
        transform: "translateX(-50%)",
        width: "92%",
        maxWidth: 1200,
        zIndex: 1000,
        height: 72,
        borderRadius: 24,
        display: "flex",
        alignItems: "center",
        padding: "0 32px",
        background: "transparent",
        backdropFilter: "blur(20px) saturate(150%)",
        WebkitBackdropFilter: "blur(20px) saturate(150%)",
        border: "none",
        boxShadow: "none",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, height: 3,
          width: `${scrollProgress}%`,
          background: "linear-gradient(90deg, #6B1A2A, #1E4D7B, #3A6B2A, #C4895A)",
          borderRadius: "0 3px 3px 0",
          transition: "width 0.1s linear",
          zIndex: 2,
        }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
          <Link to="/" style={{ display: "flex", alignItems: "center" }}>
            <img
              src="/assets/LogoSugamuxi.png"
              alt="Logo Sugamuxi"
              style={{ height: 56, objectFit: "contain", transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)", filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1) rotate(-1.5deg)";
                e.currentTarget.style.filter = "drop-shadow(0 8px 12px rgba(201,150,58,0.35))";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1) rotate(0deg)";
                e.currentTarget.style.filter = "drop-shadow(0 4px 6px rgba(0,0,0,0.1))";
              }}
            />
          </Link>

          <nav style={{ display: "flex", gap: 8, alignItems: "center" }} className="nav-desktop">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  style={{
                    color: active ? textColor : textMuted,
                    padding: "8px 16px",
                    fontSize: 14,
                    fontWeight: active ? 600 : 500,
                    transition: "all 0.3s",
                    background: active ? bgActive : "transparent",
                    borderRadius: 12,
                    textDecoration: "none",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => { if (!active) { e.currentTarget.style.color = textColor; e.currentTarget.style.background = bgHover; } }}
                  onMouseLeave={(e) => { if (!active) { e.currentTarget.style.color = textMuted; e.currentTarget.style.background = "transparent"; } }}
                >
                  {item.label}
                  {active && (
                    <span style={{ position: "absolute", bottom: 4, left: "50%", transform: "translateX(-50%)", width: 4, height: 4, borderRadius: "50%", background: "var(--color-gold)" }} />
                  )}
                </Link>
              );
            })}

            {/* Language switcher */}
            <div style={{
              display: "flex", gap: 2,
              background: isDarkBg ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
              borderRadius: 10, padding: 3, marginLeft: 8,
            }}>
              <button onClick={() => setLang("es")} style={{ ...langBtnBase, background: lang === "es" ? "var(--color-gold)" : "transparent", color: lang === "es" ? "#000" : textMuted }}>ES</button>
              <button onClick={() => setLang("en")} style={{ ...langBtnBase, background: lang === "en" ? "var(--color-gold)" : "transparent", color: lang === "en" ? "#000" : textMuted }}>EN</button>
            </div>

            <Link to="/contacto" style={{
              background: "var(--color-gold)", color: "#000", padding: "10px 22px", borderRadius: 50,
              fontSize: 14, fontWeight: 600, marginLeft: 16, textDecoration: "none", transition: "all 0.3s ease",
              boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.3)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "var(--color-gold)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,0.2)"; }}
            >
              {t.nav.planTrip}
            </Link>
          </nav>

          <button onClick={() => setMenuOpen(true)} style={{ background: "transparent", border: "none", color: textColor, cursor: "pointer", padding: 8, transition: "color 0.3s ease" }} className="nav-mobile-btn" aria-label={t.nav.openMenu}>
            <Menu size={28} />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)",
          backdropFilter: "blur(30px) saturate(150%)", WebkitBackdropFilter: "blur(30px) saturate(150%)",
          zIndex: 1001, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: 8, animation: "fadeIn 0.3s ease",
        }}>
          <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: 24, right: 24, background: "transparent", border: "none", color: "#fff", cursor: "pointer", padding: 8 }} aria-label={t.nav.closeMenu}>
            <X size={32} />
          </button>

          <div style={{ position: "absolute", top: 24, left: 24, display: "flex", alignItems: "center", gap: 10 }}>
            <MapPin size={22} color="var(--color-gold)" strokeWidth={2.5} />
            <span style={{ fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px", fontFamily: "var(--font-serif)" }}>Sugamuxi</span>
          </div>

          {/* Mobile language switcher */}
          <div style={{ display: "flex", gap: 8, marginBottom: 16, background: "rgba(255,255,255,0.08)", borderRadius: 12, padding: 4 }}>
            <button onClick={() => setLang("es")} style={{ padding: "8px 20px", borderRadius: 8, fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer", background: lang === "es" ? "var(--color-gold)" : "transparent", color: lang === "es" ? "#000" : "rgba(255,255,255,0.7)", transition: "all 0.2s ease" }}>
              🇨🇴 Español
            </button>
            <button onClick={() => setLang("en")} style={{ padding: "8px 20px", borderRadius: 8, fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer", background: lang === "en" ? "var(--color-gold)" : "transparent", color: lang === "en" ? "#000" : "rgba(255,255,255,0.7)", transition: "all 0.2s ease" }}>
              🇺🇸 English
            </button>
          </div>

          {navItems.map((item, i) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} to={item.href} onClick={handleNavClick} style={{
                color: active ? "var(--color-gold)" : "#fff",
                fontSize: 32, fontWeight: 700, textDecoration: "none",
                fontFamily: "var(--font-serif)", padding: "12px 24px",
                opacity: 0, animation: `slideUp 0.4s ease ${i * 0.08}s forwards`, position: "relative",
              }}>
                {item.label}
                {active && <span style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", width: 40, height: 2, background: "var(--color-gold)", borderRadius: 1 }} />}
              </Link>
            );
          })}

          <Link to="/contacto" onClick={handleNavClick} style={{
            marginTop: 24, background: "var(--color-gold)", color: "#000",
            padding: "14px 32px", borderRadius: 50, fontSize: 16, fontWeight: 700,
            textDecoration: "none", opacity: 0, animation: "slideUp 0.4s ease 0.4s forwards",
            boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
          }}>
            {t.nav.planTrip}
          </Link>
        </div>
      )}
    </>
  );
}
