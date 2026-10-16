import { AbsoluteFill } from "remotion";
import { theme } from "../theme";
import { ToastCard } from "../components/ToastCard";
import { Entrance } from "../components/Entrance";

const TOASTS = [
  {
    delay: 0,
    exitAt: 165,
    title: "Nuovi ordini ricevuti",
    message: "Il cliente Esposito Arredamenti S.n.c. ha inserito 11 ordini per il giorno 20 ottobre.",
  },
  {
    delay: 45,
    exitAt: 175,
    title: "Nuovi ordini ricevuti",
    message: "Il cliente Russo Trasporti S.r.l. ha inserito 5 ordini per il giorno 25 ottobre.",
  },
  {
    delay: 90,
    exitAt: 185,
    title: "Nuovi ordini ricevuti",
    message: "Il cliente Bianchi Logistica S.p.A. ha inserito 7 ordini per i giorni 21 e 23 ottobre.",
  },
];

export const ToastsScene: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: theme.colors.bg }}>
      <div
        style={{
          position: "absolute",
          top: 70,
          right: 90,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {TOASTS.map((t, i) => (
          <ToastCard key={i} delay={t.delay} exitAt={t.exitAt} title={t.title} message={t.message} />
        ))}
      </div>

      <div style={{ position: "absolute", left: 110, bottom: 110, maxWidth: 760 }}>
        <Entrance delay={8} rise={22}>
          <p
            style={{
              margin: 0,
              fontFamily: theme.fonts.mono,
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: theme.colors.primary,
            }}
          >
            In tempo reale
          </p>
        </Entrance>
        <Entrance delay={14} rise={28}>
          <h3
            style={{
              margin: "10px 0 0",
              fontFamily: theme.fonts.display,
              fontSize: 44,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: theme.colors.ink,
            }}
          >
            Una notifica ogni 1,5 secondi,
            <br />
            zero ordini persi.
          </h3>
        </Entrance>
      </div>
    </AbsoluteFill>
  );
};
