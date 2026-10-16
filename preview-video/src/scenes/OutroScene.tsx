import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";
import { Entrance } from "../components/Entrance";
import { LogoMark } from "../components/LogoMark";

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const exitO = interpolate(frame, [durationInFrames - 12, durationInFrames - 1], [1, 0], {
    easing: theme.ease.in,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ctaGlow = 0.5 + Math.sin(frame / 14) * 0.18;

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: exitO }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
        <LogoMark delay={0} size={96} />
        <Entrance delay={8} rise={22}>
          <h2
            style={{
              margin: 0,
              fontFamily: theme.fonts.display,
              fontSize: 56,
              fontWeight: 800,
              letterSpacing: "-0.025em",
              color: theme.colors.ink,
              textAlign: "center",
            }}
          >
            Nimbus Gestionale
          </h2>
        </Entrance>
        <Entrance delay={14} rise={16}>
          <p
            style={{
              margin: 0,
              fontFamily: theme.fonts.body,
              fontSize: 22,
              color: theme.colors.textDim,
              textAlign: "center",
            }}
          >
            Clienti, ordini e notifiche in tempo reale.
          </p>
        </Entrance>
        <Entrance delay={22} rise={14} config="bouncy">
          <div
            style={{
              marginTop: 8,
              padding: "14px 32px",
              borderRadius: 999,
              background: theme.colors.primary,
              color: "#FFFFFF",
              fontFamily: theme.fonts.body,
              fontWeight: 700,
              fontSize: 17,
              boxShadow: `0 0 ${34 + ctaGlow * 26}px ${theme.colors.glow}`,
            }}
          >
            Prova la demo nella sezione Clienti
          </div>
        </Entrance>
      </div>
    </AbsoluteFill>
  );
};
