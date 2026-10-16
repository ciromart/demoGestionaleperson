import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";
import type { CSSProperties, ReactNode } from "react";

export const Entrance: React.FC<{
  delay?: number;
  rise?: number;
  config?: keyof typeof theme.spring;
  style?: CSSProperties;
  children: ReactNode;
}> = ({ delay = 0, rise = 36, config = "smooth", style, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - delay, fps, config: theme.spring[config] });
  return (
    <div
      style={{
        opacity: p,
        transform: `translateY(${interpolate(p, [0, 1], [rise, 0])}px) scale(${interpolate(
          p,
          [0, 1],
          [0.94, 1],
        )})`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
