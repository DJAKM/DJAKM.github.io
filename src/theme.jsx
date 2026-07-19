import { createContext, useContext, useEffect, useState } from "react"

/* the six combos the site started with — quick presets under the free inputs */
export const PRESETS = [
  { label: "Black · Red", mode: "dark", c1: "#ef4444", c2: "#fbbf24" },
  { label: "Green · White", mode: "light", c1: "#16a34a", c2: "#0d9488" },
  { label: "Blue · Red", mode: "dark", c1: "#3b82f6", c2: "#ef4444" },
  { label: "Black · Yellow", mode: "dark", c1: "#eab308", c2: "#60a5fa" },
  { label: "Pink · Green", mode: "light", c1: "#ec4899", c2: "#16a34a" },
  { label: "Orange · White", mode: "light", c1: "#f97316", c2: "#0d9488" },
]
const DEFAULT = { mode: "dark", c1: "#f97316", c2: "#a78bfa" }

/* tiny color math — everything else derives from the two picked colors */
const rgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16))
const hex = c => "#" + c.map(v => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, "0")).join("")
export const mix = (a, b, t) => hex(rgb(a).map((v, i) => v + (rgb(b)[i] - v) * t))
const lum = h => {
  const [r, g, b] = rgb(h).map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4 })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function themeVars({ mode, c1, c2 }) {
  const light = mode === "light"
  /* very dark picks still need to read on a dark background */
  const a2 = !light && lum(c2) < 0.12 ? mix(c2, "#ffffff", 0.35) : c2
  return {
    "--accent": c1,
    "--accent-soft": mix(c1, "#ffffff", 0.35),
    "--on-accent": lum(c1) > 0.5 ? mix(c1, "#000000", 0.78) : "#ffffff",
    "--accent-text": light ? mix(c1, "#000000", 0.3) : mix(c1, "#ffffff", 0.35),
    "--accent-2": a2,
    "--accent-2-text": light ? mix(c2, "#000000", 0.3) : a2,
  }
}

const Ctx = createContext(null)
export const useTheme = () => useContext(Ctx)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try { return { ...DEFAULT, ...JSON.parse(localStorage.getItem("themeV2")) } }
    catch { return DEFAULT }
  })
  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = theme.mode
    const vars = themeVars(theme)
    for (const k in vars) root.style.setProperty(k, vars[k])
    localStorage.setItem("themeV2", JSON.stringify(theme))
    /* cache for the pre-paint script in index.html */
    localStorage.setItem("themeVarsCache", JSON.stringify({ mode: theme.mode, vars }))
  }, [theme])
  return <Ctx.Provider value={{ theme, setTheme }}>{children}</Ctx.Provider>
}

export function ThemePicker() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const set = patch => setTheme(t => ({ ...t, ...patch }))
  return (
    <div className="relative">
      <button
        aria-label="Customize theme"
        onClick={() => setOpen(o => !o)}
        className="w-9.5 h-9.5 rounded-full border border-line text-ink hover:border-accent hover:bg-accent/10 transition-colors text-lg leading-none"
      >◐</button>
      {open && (
        <>
          <div className="fixed inset-0 z-[140]" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-[calc(100%+14px)] z-[150] w-64 rounded-2xl border border-line bg-card p-4 shadow-2xl shadow-black/35">
            <p className="font-mono text-[0.68rem] uppercase tracking-widest text-faint mb-3">Make it yours</p>
            <div className="flex rounded-lg border border-line overflow-hidden mb-3 font-mono text-xs">
              {["dark", "light"].map(m => (
                <button
                  key={m}
                  onClick={() => set({ mode: m })}
                  className={`flex-1 py-1.5 capitalize transition-colors ${theme.mode === m ? "bg-accent text-on-accent" : "text-muted hover:text-ink"}`}
                >{m}</button>
              ))}
            </div>
            {[["c1", "Primary color"], ["c2", "Secondary color"]].map(([key, label]) => (
              <label key={key} className="flex items-center justify-between gap-3 mb-2 text-sm text-muted">
                {label}
                <input
                  type="color"
                  value={theme[key]}
                  onChange={e => set({ [key]: e.target.value })}
                  className="h-8 w-14 cursor-pointer rounded border border-line bg-transparent"
                />
              </label>
            ))}
            <p className="font-mono text-[0.68rem] uppercase tracking-widest text-faint mt-3 mb-2">Presets</p>
            <div className="flex gap-2">
              {PRESETS.map(p => (
                <button
                  key={p.label}
                  title={p.label}
                  aria-label={p.label}
                  onClick={() => setTheme({ mode: p.mode, c1: p.c1, c2: p.c2 })}
                  className="h-7 w-7 rounded-full border-2 border-line hover:scale-115 transition-transform"
                  style={{ background: `linear-gradient(135deg, ${p.mode === "light" ? "#f6f7f9" : "#0a0d14"} 0 44%, ${p.c1} 44% 72%, ${p.c2} 72%)` }}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
