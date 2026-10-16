import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

export const ToastCard: React.FC<{
  delay: number;
  exitAt?: number;
  title: string;
  message: string;
}> = ({ delay, exitAt, title, message }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const enter = spring({ frame: frame - delay, fps, config: theme.spring.smooth });
  const exitStart = exitAt ?? durationInFrames - 8;
  const exitP = interpolate(frame, [exitStart, exitStart + 10], [0, 1], {
    easing: theme.ease.in,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = enter * (1 - exitP);
  const translateY = interpolate(enter, [0, 1], [-22, 0]) + interpolate(exitP, [0, 1], [0, -16]);
  const scale = interpolate(enter, [0, 1], [0.95, 1]);

  const breathe = 1 + Math.sin((frame - delay) / 26) * 0.006;
  const progress = interpolate(frame, [delay, exitStart], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px) scale(${scale * breathe})`,
        width: 460,
        borderRadius: 16,
        background: theme.colors.surface,
        border: `1px solid ${theme.colors.border}`,
        boxShadow: "0 22px 46px -12px rgba(15,27,61,0.22), 0 6px 16px -6px rgba(30,64,175,0.14)",
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 16, padding: "20px 44px 20px 20px" }}>
        <span
          style={{
            display: "flex",
            width: 44,
            height: 44,
            flexShrink: 0,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            background: "#EFF6FF",
            color: theme.colors.primary,
          }}
        >
          <svg width={22} height={22} viewBox="0 0 24 24" fill="none">
            <path
              d="M21 8.5 12 3 3 8.5V16a1 1 0 0 0 .5.87L12 21l8.5-4.13A1 1 0 0 0 21 16V8.5Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <path d="M3 8.5 12 13l9-4.5M12 13v8" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          </svg>
        </span>
        <div style={{ minWidth: 0, paddingTop: 2 }}>
          <p style={{ margin: 0, fontSize: 17, fontWeight: 700, color: theme.colors.ink, fontFamily: theme.fonts.display }}>
            {title}
          </p>
          <p
            style={{
              margin: "4px 0 0",
              fontSize: 14.5,
              lineHeight: 1.4,
              color: theme.colors.textDim,
              fontFamily: theme.fonts.body,
            }}
          >
            {message}
          </p>
        </div>
      </div>
      <div style={{ height: 4, width: "100%", background: theme.colors.border }}>
        <div
          style={{
            height: "100%",
            width: `${progress * 100}%`,
            background: theme.colors.primary,
          }}
        />
      </div>
    </div>
  );
};
