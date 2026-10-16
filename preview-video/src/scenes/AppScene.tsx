import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";
import { Entrance } from "../components/Entrance";

const ROWS = [
  { rs: "Rossi Costruzioni S.r.l.", nome: "Marco", cognome: "Rossi", stato: "attivo" },
  { rs: "Bianchi Logistica S.p.A.", nome: "Elena", cognome: "Bianchi", stato: "attivo" },
  { rs: "Verdi Alimentari S.r.l.", nome: "Luca", cognome: "Verdi", stato: "in attesa" },
  { rs: "Ferrari Impianti Industriali", nome: "Giulia", cognome: "Ferrari", stato: "attivo" },
  { rs: "Esposito Arredamenti S.n.c.", nome: "Davide", cognome: "Esposito", stato: "attivo" },
] as const;

const STATO_COLOR: Record<string, { bg: string; fg: string }> = {
  attivo: { bg: "#ECFDF3", fg: theme.colors.success },
  "in attesa": { bg: "#FFFBEB", fg: theme.colors.amber },
};

const NAV = ["Dashboard", "Clienti", "Ordini", "Magazzino"];

export const AppScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const exitO = interpolate(frame, [durationInFrames - 13, durationInFrames - 1], [1, 0], {
    easing: theme.ease.in,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const clickFrame = 100;
  const pressP = interpolate(frame, [clickFrame, clickFrame + 5, clickFrame + 12], [1, 0.93, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ringP = interpolate(frame, [clickFrame, clickFrame + 22], [0, 1], {
    easing: theme.ease.out,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", opacity: exitO }}>
      <Entrance delay={0} rise={44} config="smooth">
        <div
          style={{
            width: 1500,
            height: 840,
            borderRadius: 24,
            background: theme.colors.surface,
            boxShadow: "0 50px 100px -24px rgba(15,27,61,0.28), 0 1px 0 rgba(255,255,255,0.6) inset",
            border: `1px solid ${theme.colors.border}`,
            overflow: "hidden",
            display: "flex",
          }}
        >
          {/* sidebar */}
          <div
            style={{
              width: 240,
              background: theme.colors.surface,
              borderRight: `1px solid ${theme.colors.border}`,
              padding: "28px 18px",
              display: "flex",
              flexDirection: "column",
              gap: 6,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 6px 24px" }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 9,
                  background: theme.colors.primary,
                }}
              />
              <span
                style={{
                  fontFamily: theme.fonts.mono,
                  fontWeight: 700,
                  fontSize: 17,
                  color: theme.colors.ink,
                }}
              >
                Nimbus
              </span>
            </div>
            {NAV.map((label, i) => {
              const active = label === "Clienti";
              return (
                <div
                  key={label}
                  style={{
                    padding: "11px 14px",
                    borderRadius: 10,
                    fontFamily: theme.fonts.body,
                    fontSize: 15,
                    fontWeight: 600,
                    color: active ? "#FFFFFF" : i < 2 ? theme.colors.ink : "#CBD5E1",
                    background: active ? theme.colors.primary : "transparent",
                  }}
                >
                  {label}
                </div>
              );
            })}
          </div>

          {/* main */}
          <div style={{ flex: 1, padding: "30px 36px", display: "flex", flexDirection: "column", gap: 20 }}>
            <Entrance delay={6} rise={16}>
              <div>
                <h2
                  style={{
                    margin: 0,
                    fontFamily: theme.fonts.display,
                    fontSize: 26,
                    fontWeight: 700,
                    color: theme.colors.ink,
                  }}
                >
                  Clienti
                </h2>
                <p style={{ margin: "4px 0 0", fontFamily: theme.fonts.body, fontSize: 14, color: theme.colors.textDim }}>
                  Anagrafica e attività dei clienti
                </p>
              </div>
            </Entrance>

            <Entrance delay={10} rise={20}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "18px 22px",
                  borderRadius: 16,
                  border: `1px solid ${theme.colors.border}`,
                  background: theme.colors.bgAlt,
                }}
              >
                <div>
                  <p style={{ margin: 0, fontFamily: theme.fonts.display, fontSize: 16.5, fontWeight: 700, color: theme.colors.ink }}>
                    Demo notifiche nuovi ordini
                  </p>
                  <p style={{ margin: "3px 0 0", fontFamily: theme.fonts.body, fontSize: 13, color: theme.colors.textDim }}>
                    3 notifiche in tempo reale, una ogni 1,5 secondi
                  </p>
                </div>
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      position: "absolute",
                      inset: -6,
                      borderRadius: 999,
                      border: `2px solid ${theme.colors.primary}`,
                      opacity: (1 - ringP) * 0.6,
                      transform: `scale(${1 + ringP * 0.6})`,
                    }}
                  />
                  <div
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "11px 22px",
                      borderRadius: 10,
                      background: theme.colors.primary,
                      color: "#FFFFFF",
                      fontFamily: theme.fonts.body,
                      fontWeight: 700,
                      fontSize: 15,
                      transform: `scale(${pressP})`,
                      boxShadow: "0 10px 22px -8px rgba(30,64,175,0.55)",
                    }}
                  >
                    <svg width={16} height={16} viewBox="0 0 24 24" fill="none">
                      <path d="M8 5v14l11-7L8 5Z" fill="#FFFFFF" />
                    </svg>
                    Avvia Demo
                  </div>
                </div>
              </div>
            </Entrance>

            <Entrance delay={14} rise={24}>
              <div
                style={{
                  borderRadius: 16,
                  border: `1px solid ${theme.colors.border}`,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2.2fr 1fr 1fr 1fr",
                    padding: "12px 22px",
                    background: theme.colors.bgAlt,
                    fontFamily: theme.fonts.body,
                    fontSize: 11.5,
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    color: theme.colors.textDim,
                  }}
                >
                  <span>Ragione sociale</span>
                  <span>Nome</span>
                  <span>Cognome</span>
                  <span>Stato</span>
                </div>
                {ROWS.map((row, i) => {
                  const rowP = spring({
                    frame: frame - (20 + i * 5),
                    fps,
                    config: theme.spring.snappy,
                  });
                  const highlight = row.rs.includes("Esposito") && frame > clickFrame + 60;
                  return (
                    <div
                      key={row.rs}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "2.2fr 1fr 1fr 1fr",
                        alignItems: "center",
                        padding: "13px 22px",
                        borderTop: `1px solid ${theme.colors.border}`,
                        fontFamily: theme.fonts.body,
                        fontSize: 14,
                        color: theme.colors.ink,
                        opacity: rowP,
                        transform: `translateX(${interpolate(rowP, [0, 1], [-14, 0])}px)`,
                        background: highlight ? "#EFF6FF" : "transparent",
                        transition: "background 200ms",
                      }}
                    >
                      <span style={{ fontWeight: 600 }}>{row.rs}</span>
                      <span style={{ color: theme.colors.textDim }}>{row.nome}</span>
                      <span style={{ color: theme.colors.textDim }}>{row.cognome}</span>
                      <span>
                        {STATO_COLOR[row.stato] && (
                          <span
                            style={{
                              padding: "3px 10px",
                              borderRadius: 999,
                              fontSize: 11,
                              fontWeight: 700,
                              textTransform: "capitalize",
                              background: STATO_COLOR[row.stato].bg,
                              color: STATO_COLOR[row.stato].fg,
                            }}
                          >
                            {row.stato}
                          </span>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Entrance>
          </div>
        </div>
      </Entrance>
    </AbsoluteFill>
  );
};
