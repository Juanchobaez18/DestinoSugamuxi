import { MapPin, Users, Star, Clock, Compass, Camera, Wind, Zap } from "lucide-react";
import { HeroSlide, Highlight, Stat, HomeExperience } from "./types";

export const heroSlides: Record<string, HeroSlide[]> = {
  es: [
    {
      img: "/assets/sogamoso/PanoramicaSogamoso.jpg",
      tag: "Naturaleza pura",
      title: "Provincia de\nSugamuxi",
      subtitle: "Donde los Andes guardan los secretos más hermosos de Colombia",
    },
    {
      img: "/assets/mongua/PanoramicaMongua.jpg",
      tag: "Patrimonio histórico",
      title: "Monguí\nSagrado",
      subtitle: "Pueblos de piedra y cal que cuentan siglos de historia colonial",
    },
    {
      img: "/assets/tota/PanoramicaTota.jpg",
      tag: "Lago de Tota",
      title: "Agua y\nCielo",
      subtitle: "El lago más alto de Colombia, un espejo de nubes y montañas",
    },
  ],
  en: [
    {
      img: "/assets/sogamoso/PanoramicaSogamoso.jpg",
      tag: "Pure nature",
      title: "Province of\nSugamuxi",
      subtitle: "Where the Andes keep Colombia's most beautiful secrets",
    },
    {
      img: "/assets/mongua/PanoramicaMongua.jpg",
      tag: "Historical Heritage",
      title: "Sacred\nMonguí",
      subtitle: "Towns of stone and lime that tell centuries of colonial history",
    },
    {
      img: "/assets/tota/PanoramicaTota.jpg",
      tag: "Lake Tota",
      title: "Water and\nSky",
      subtitle: "The highest lake in Colombia, a mirror of clouds and mountains",
    },
  ]
};

export const highlights: Record<string, Highlight[]> = {
  es: [
    {
      name: "Sogamoso",
      slug: "sogamoso",
      tag: "Ciudad del Sol",
      img: "/assets/sogamoso/ImagenDestacadaSogamoso.jpg",
      color: "#1B5E3B",
      desc: "Capital de la provincia, centro cultural, arqueológico y hogar del mágico Templo del Sol y el legado muisca."
    },
    {
      name: "Nobsa",
      slug: "nobsa",
      tag: "Ruanas y Acero",
      img: "/assets/nobsa/ImagenDestacadaNobsa.jpg",
      color: "#5D3A1A",
      desc: "Famosa por sus tejidos en lana de oveja, artesanías, y su pujante producción industrial y viñedos."
    },
    {
      name: "Tota",
      slug: "tota",
      tag: "Raíz Andina",
      img: "/assets/tota/ImagenDestacadaTota.jpg",
      color: "#4C6B8B",
      desc: "Pueblo agrícola y artesanal con telares centenarios, vecino directo del mágico cuerpo de agua."
    },
    {
      name: "Iza",
      slug: "iza",
      tag: "Aguas termales",
      img: "/assets/iza/ImagenDestacadaIza.jpg",
      color: "#E8B55A",
      desc: "Naturaleza, postres tradicionales y aguas termales curativas para el descanso total."
    },
  ],
  en: [
    {
      name: "Sogamoso",
      slug: "sogamoso",
      tag: "City of the Sun",
      img: "/assets/sogamoso/ImagenDestacadaSogamoso.jpg",
      color: "#1B5E3B",
      desc: "Capital of the province, cultural and archaeological center, home to the magical Temple of the Sun and the Muisca legacy."
    },
    {
      name: "Nobsa",
      slug: "nobsa",
      tag: "Ruanas & Steel",
      img: "/assets/nobsa/ImagenDestacadaNobsa.jpg",
      color: "#5D3A1A",
      desc: "Famous for its sheep wool weaving, handicrafts, and its booming industrial production and vineyards."
    },
    {
      name: "Tota",
      slug: "tota",
      tag: "Andean Root",
      img: "/assets/tota/ImagenDestacadaTota.jpg",
      color: "#4C6B8B",
      desc: "Agricultural and artisanal town with centuries-old looms, direct neighbor of the magical body of water."
    },
    {
      name: "Iza",
      slug: "iza",
      tag: "Hot Springs",
      img: "/assets/iza/ImagenDestacadaIza.jpg",
      color: "#E8B55A",
      desc: "Nature, traditional desserts, and healing hot springs for total relaxation."
    },
  ]
};

export const stats: Record<string, Stat[]> = {
  es: [
    { icon: MapPin, value: "13", label: "Municipios" },
    { icon: Users, value: "400K+", label: "Visitantes al año" },
    { icon: Star, value: "4.9", label: "Calificación promedio" },
    { icon: Clock, value: "365", label: "Días al año para visitar" },
  ],
  en: [
    { icon: MapPin, value: "13", label: "Municipalities" },
    { icon: Users, value: "400K+", label: "Visitors per year" },
    { icon: Star, value: "4.9", label: "Average rating" },
    { icon: Clock, value: "365", label: "Days a year to visit" },
  ]
};

export const homeExperiences: Record<string, HomeExperience[]> = {
  es: [
    { icon: Compass, title: "Senderismo Andino", desc: "Rutas entre páramos y lagunas glaciares con guías locales certificados.", color: "#1B5E3B", img: "/assets/mongua/ActividadMongua.jpg" },
    { icon: Camera, title: "Turismo Cultural", desc: "Museos, mercados artesanales y festivales tradicionales boyacenses.", color: "#C9963A", img: "/assets/sogamoso/TradicionSogamoso.jpg" },
    { icon: Wind, title: "Deportes de Aventura", desc: "Parapente, trekking y caminata ecológica en el corazón de los Andes.", color: "#2E8B57", img: "/assets/topaga/ActividadTopaga.jpg" },
    { icon: Zap, title: "Gastronomía Local", desc: "Piquete boyacense, chicha de maíz y cocina de tradición centenaria.", color: "#8B4513", img: "/assets/iza/GastronomiaIza.jpg" },
  ],
  en: [
    { icon: Compass, title: "Andean Hiking", desc: "Trails between paramos and glacial lagoons with certified local guides.", color: "#1B5E3B", img: "/assets/mongua/ActividadMongua.jpg" },
    { icon: Camera, title: "Cultural Tourism", desc: "Museums, artisan markets, and traditional Boyacá festivals.", color: "#C9963A", img: "/assets/sogamoso/TradicionSogamoso.jpg" },
    { icon: Wind, title: "Adventure Sports", desc: "Paragliding, trekking, and ecological walks in the heart of the Andes.", color: "#2E8B57", img: "/assets/topaga/ActividadTopaga.jpg" },
    { icon: Zap, title: "Local Gastronomy", desc: "Boyacá piquete, corn chicha, and centuries-old traditional cooking.", color: "#8B4513", img: "/assets/iza/GastronomiaIza.jpg" },
  ]
};