import { LucideIcon } from "lucide-react";

export interface Destination {
  name: string;
  tag: string;
  desc: string;
  img: string;
  rating: number;
  time: string;
  highlights: string[];
  color: string;
}

export interface Highlight {
  name: string;
  slug: string;
  tag: string;
  img: string;
  color: string;
  desc: string;
}

export interface Category {
  id: string;
  label: string;
}

export interface Experience {
  cat: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  img: string;
  duration: string;
  difficulty: string;
  price: string;
  color: string;
}

export interface HomeExperience {
  icon: LucideIcon;
  title: string;
  desc: string;
  color: string;
  img: string;
}

export interface CultureSection {
  title: string;
  subtitle: string;
  desc: string;
  img: string;
  color: string;
  side: "left" | "right";
}

export interface TimelineEvent {
  year: string;
  title: string;
  desc: string;
  color: string;
}

export interface HeroSlide {
  img: string;
  tag: string;
  title: string;
  subtitle: string;
}

export interface Stat {
  icon: LucideIcon;
  value: string;
  label: string;
}
