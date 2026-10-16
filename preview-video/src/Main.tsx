import { AbsoluteFill, Sequence } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { BgMesh, Grade, Grain, Vignette } from "./components/Layers";
import { HookScene } from "./scenes/HookScene";
import { AppScene } from "./scenes/AppScene";
import { ToastsScene } from "./scenes/ToastsScene";
import { OutroScene } from "./scenes/OutroScene";

const { fontFamily } = loadFont();

export const HOOK_DURATION = 80;
export const APP_DURATION = 150;
export const TOASTS_DURATION = 210;
export const OUTRO_DURATION = 90;
export const TOTAL_DURATION = HOOK_DURATION + APP_DURATION + TOASTS_DURATION + OUTRO_DURATION;

export const Main: React.FC = () => {
  return (
    <AbsoluteFill style={{ fontFamily }}>
      <BgMesh />

      <Sequence from={0} durationInFrames={HOOK_DURATION}>
        <HookScene />
      </Sequence>
      <Sequence from={HOOK_DURATION} durationInFrames={APP_DURATION}>
        <AppScene />
      </Sequence>
      <Sequence from={HOOK_DURATION + APP_DURATION} durationInFrames={TOASTS_DURATION}>
        <ToastsScene />
      </Sequence>
      <Sequence
        from={HOOK_DURATION + APP_DURATION + TOASTS_DURATION}
        durationInFrames={OUTRO_DURATION}
       
      >
        <OutroScene />
      </Sequence>

      <Grade />
      <Grain />
      <Vignette />
    </AbsoluteFill>
  );
};
