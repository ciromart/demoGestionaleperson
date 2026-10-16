import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";
import { Entrance } from "../components/Entrance";
import { LogoMark } from "../components/LogoMark";

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const exitO = interpolate(frame, [durationInFrames - 14, durationInFrames - 2], [1, 0], {
    easing: theme.ease.in,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitY = interpolate(frame, [durationInFrames - 14, durationInFrames - 2], [0, -26], {
    easing: theme.ease.in,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        opacity: exitO,
        transform: `translateY(${exitY}px)`,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
        <LogoMark delay={4} size={176} />
        <Entrance delay={22} rise={26} config="smooth">
          <h1
            style={{
              margin: 0,
              fontFamily: theme.fonts.display,
              fontSize: 96,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: theme.colors.ink,
              textAlign: "center",
            }}
          >
            Nimbus <span style={{ color: theme.colors.primary }}>Gestionale</span>
          </h1>
        </Entrance>
        <Entrance delay={34} rise={18} config="smooth">
          <p
            style={{
              margin: 0,
              fontFamily: theme.fonts.body,
              fontSize: 28,
              fontWeight: 500,
              color: theme.colors.textDim,
              textAlign: "center",
            }}
          >
            Clienti, ordini e notifiche — sempre sotto controllo
          </p>
        </Entrance>
      </div>
    </AbsoluteFill>
  );
};
