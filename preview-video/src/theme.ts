// theme.ts — single source of truth. Never inline colors/easings in components.
import { Easing } from "remotion";

export const theme = {
  colors: {
    bg: "#EFF4FC",
    bgAlt: "#F8FAFC",
    surface: "#FFFFFF",
    primary: "#1E40AF", // hero color — at most one glowing element per frame
    primaryDark: "#15337E",
    accent: "#3B82F6",
    amber: "#D97706",
    ink: "#0F1B3D",
    textDim: "#64748B",
    border: "#DBEAFE",
    success: "#15803D",
    glow: "rgba(30, 64, 175, 0.35)",
  },
  fonts: {
    display: "Inter",
    body: "Inter",
    mono: "Fira Code",
  },
  ease: {
    out: Easing.bezier(0.16, 1, 0.3, 1),
    inOut: Easing.bezier(0.83, 0, 0.17, 1),
    in: Easing.bezier(0.7, 0, 0.84, 0),
  },
  spring: {
    snappy: { damping: 14, stiffness: 160, mass: 0.6 },
    smooth: { damping: 20, stiffness: 90, mass: 1 },
    bouncy: { damping: 11, stiffness: 170, mass: 0.7 },
  },
} as const;
