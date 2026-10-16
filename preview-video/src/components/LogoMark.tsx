import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

export const LogoMark: React.FC<{ delay?: number; size?: number }> = ({
  delay = 0,
  size = 160,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rays = 10;

  const container = spring({
    frame: frame - delay,
    fps,
    config: theme.spring.bouncy,
  });
  const rotate = spring({
    frame: frame - delay,
    fps,
    config: theme.spring.smooth,
  });
  const breathe = 1 + Math.sin(frame / 22) * 0.012;

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        transform: `scale(${container * breathe}) rotate(${(1 - rotate) * -70}deg)`,
        filter: `drop-shadow(0 18px 34px ${theme.colors.glow})`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: size * 0.28,
          background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent})`,
        }}
      />
      {Array.from({ length: rays }).map((_, i) => {
        const rayDelay = delay + 4 + i * 1.4;
        const p = spring({
          frame: frame - rayDelay,
          fps,
          config: theme.spring.snappy,
        });
        const fade = interpolate(frame - rayDelay, [16, 34], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const angle = (360 / rays) * i;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: size * 0.045,
              height: size * 0.16 * p,
              background: theme.colors.accent,
              opacity: p * fade,
              borderRadius: size,
              transformOrigin: "50% 0%",
              transform: `translateX(-50%) rotate(${angle}deg) translateY(${size * 0.52}px)`,
            }}
          />
        );
      })}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        style={{
          position: "absolute",
          inset: 0,
          margin: "auto",
          width: size * 0.5,
          height: size * 0.5,
        }}
      >
        <path
          d="M4 18V9.4a1 1 0 0 1 .9-1l6-.67a1 1 0 0 1 1.1 1V18"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 18h16M13 18v-5.3a1 1 0 0 1 .72-.96l3-.86a1 1 0 0 1 1.28.96V18"
          stroke="#BFDBFE"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
