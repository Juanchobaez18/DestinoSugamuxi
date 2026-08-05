interface MountainDividerProps {
  /** Color del fondo que está ARRIBA del divisor */
  fromColor?: string;
  /** Color del fondo que está ABAJO del divisor */
  toColor?: string;
  /** Voltea la montaña verticalmente */
  flip?: boolean;
  /** Altura en px del SVG */
  height?: number;
}

export default function MountainDivider({
  fromColor = "transparent",
  toColor = "#F5F8FA",
  flip = false,
  height = 80,
}: MountainDividerProps) {
  return (
    <div style={{
      position: "relative",
      background: fromColor,
      lineHeight: 0,
      overflow: "hidden",
      transform: flip ? "scaleY(-1)" : "none",
    }}>
      <svg
        viewBox="0 0 1440 80"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ width: "100%", height, display: "block" }}
      >
        {/* Silhouette of Andes mountains — 3 layers for depth */}
        <path
          d="M0,80 L0,55 L80,30 L160,50 L240,20 L320,42 L400,15 L480,38 L560,10 L640,35 L720,8 L800,32 L880,12 L960,40 L1040,18 L1120,44 L1200,22 L1280,48 L1360,28 L1440,50 L1440,80 Z"
          fill={toColor}
          opacity="0.35"
        />
        <path
          d="M0,80 L0,62 L120,38 L200,55 L300,28 L400,48 L500,22 L580,45 L660,18 L760,42 L860,20 L960,46 L1060,25 L1160,50 L1260,32 L1360,55 L1440,38 L1440,80 Z"
          fill={toColor}
          opacity="0.6"
        />
        <path
          d="M0,80 L0,70 L160,48 L280,62 L400,40 L520,58 L640,35 L760,55 L880,38 L1000,60 L1120,42 L1240,64 L1360,46 L1440,60 L1440,80 Z"
          fill={toColor}
        />
      </svg>
    </div>
  );
}
