import { motion, useInView, animate, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { useTheme, themeVars } from "./theme.jsx"
import { TYPED_WORDS } from "./data.js"

/* distinct entrance per section — keyed by name, falls back to fade-up */
const ENTRANCES = {
  up: { hidden: { opacity: 0, y: 48 }, show: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -60 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 60 }, show: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.92 }, show: { opacity: 1, scale: 1 } },
  blur: { hidden: { opacity: 0, filter: "blur(14px)", y: 30 }, show: { opacity: 1, filter: "blur(0px)", y: 0 } },
  rotate: { hidden: { opacity: 0, rotate: -3, y: 40, transformOrigin: "left" }, show: { opacity: 1, rotate: 0, y: 0 } },
}

/* the numbered header animates on its own so titles feel deliberate */
const headVar = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

/* section wrapper: scroll-reveal + numbered header in one place */
export function Section({ id, num, label, title, children, center, variant = "up" }) {
  const entrance = ENTRANCES[variant] || ENTRANCES.up
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      variants={entrance}
      className={`mx-auto max-w-[1120px] px-[6vw] py-16 md:py-24 ${center ? "text-center" : ""}`}
    >
      <motion.p variants={headVar} className="font-mono text-sm uppercase tracking-widest text-a2text">{num} — {label}</motion.p>
      <motion.h2 variants={headVar} className="mt-2 mb-10 text-3xl md:text-4xl font-bold">{title}</motion.h2>
      {children}
    </motion.section>
  )
}

/* springy custom cursor: exact dot + trailing ring that reacts to interactive elements */
export function Cursor() {
  const [on, setOn] = useState(false)
  const [active, setActive] = useState(false)
  const [down, setDown] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.6 })

  useEffect(() => {
    if (matchMedia("(hover: none)").matches || matchMedia("(pointer: coarse)").matches) return
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return
    setOn(true)
    const move = e => {
      x.set(e.clientX)
      y.set(e.clientY)
      const el = e.target.closest?.("a, button, input, [data-cursor]")
      setActive(!!el)
    }
    const dn = () => setDown(true)
    const up = () => setDown(false)
    addEventListener("pointermove", move, { passive: true })
    addEventListener("pointerdown", dn)
    addEventListener("pointerup", up)
    return () => {
      removeEventListener("pointermove", move)
      removeEventListener("pointerdown", dn)
      removeEventListener("pointerup", up)
    }
  }, [x, y])

  if (!on) return null
  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[300] h-2 w-2 rounded-full bg-accent"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: down ? 0.6 : 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[300] h-[30px] w-[30px] rounded-full border border-accent-2"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          scale: active ? 1.75 : 1,
          opacity: active ? 1 : 0.55,
          backgroundColor: active ? "color-mix(in srgb, var(--accent-2) 12%, transparent)" : "rgba(0,0,0,0)",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      />
    </>
  )
}

/* stagger helpers */
export const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
export const staggerChild = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

/* count-up number that starts when scrolled into view */
export function Counter({ to, suffix = "" }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, {
      duration: 1.4, ease: "easeOut",
      onUpdate: v => { if (ref.current) ref.current.textContent = Math.round(v).toLocaleString() + suffix },
    })
    return () => controls.stop()
  }, [inView, to, suffix])
  return <span ref={ref}>0</span>
}

/* hero typing effect */
export function Typed() {
  const [text, setText] = useState("")
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setText(TYPED_WORDS[0]); return }
    let wi = 0, ci = 0, del = false, timer
    const tick = () => {
      const word = TYPED_WORDS[wi]
      setText(word.slice(0, ci))
      let wait = del ? 35 : 65
      if (!del && ci === word.length) { del = true; wait = 1700 }
      else if (del && ci === 0) { del = false; wi = (wi + 1) % TYPED_WORDS.length; wait = 350 }
      else ci += del ? -1 : 1
      timer = setTimeout(tick, wait)
    }
    tick()
    return () => clearTimeout(timer)
  }, [])
  return <>{text}<span className="caret" /></>
}

export function Tags({ items }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map(t => (
        <span key={t} className="rounded-md px-2 py-0.5 font-mono text-[0.7rem] text-a2text bg-accent-2/12">{t}</span>
      ))}
    </div>
  )
}

export function Stat({ children, label, alt }) {
  return (
    <motion.div variants={staggerChild} className="rounded-2xl border border-line bg-card p-5 text-center transition hover:-translate-y-1 hover:border-accent">
      <b className={`block font-mono text-3xl font-bold ${alt ? "text-a2text" : "text-accent"}`}>{children}</b>
      <span className="text-xs text-muted">{label}</span>
    </motion.div>
  )
}

/* fixed cursor spotlight */
export function Spotlight() {
  const ref = useRef(null)
  useEffect(() => {
    if (matchMedia("(hover: none)").matches) return
    let queued = false, x = 0, y = 0
    const move = e => {
      x = e.clientX; y = e.clientY
      if (queued) return
      queued = true
      requestAnimationFrame(() => {
        ref.current?.style.setProperty("--sx", x + "px")
        ref.current?.style.setProperty("--sy", y + "px")
        queued = false
      })
    }
    addEventListener("pointermove", move, { passive: true })
    return () => removeEventListener("pointermove", move)
  }, [])
  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{ background: "radial-gradient(560px circle at var(--sx,50%) var(--sy,30%), color-mix(in srgb, var(--accent) 6%, transparent), transparent 70%)" }}
    />
  )
}

/* mouse-parallax: returns springy x/y offsets that track the pointer across the viewport.
   strength is the max px drift; pass negative to move opposite the cursor. */
export function useParallax(strength = 20) {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 60, damping: 18 })
  const y = useSpring(my, { stiffness: 60, damping: 18 })
  useEffect(() => {
    if (matchMedia("(hover: none)").matches) return
    const move = e => {
      mx.set(((e.clientX / innerWidth) - 0.5) * 2 * strength)
      my.set(((e.clientY / innerHeight) - 0.5) * 2 * strength)
    }
    addEventListener("pointermove", move, { passive: true })
    return () => removeEventListener("pointermove", move)
  }, [mx, my, strength])
  return { x, y }
}

/* per-card mouse-follow glow (pairs with .spot in index.css) */
export function useSpot() {
  return e => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty("--mx", e.clientX - r.left + "px")
    e.currentTarget.style.setProperty("--my", e.clientY - r.top + "px")
  }
}

/* interactive particle network — pauses whenever the hero is off screen */
export function Particles() {
  const canvasRef = useRef(null)
  const { theme } = useTheme()
  const colors = useRef(null)
  useEffect(() => {
    const vars = themeVars(theme)
    const toRgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)).join(",")
    colors.current = {
      dot: theme.mode === "light" ? `rgba(${toRgb(theme.c1)},.45)` : `rgba(${toRgb(vars["--accent-soft"])},.5)`,
      line: toRgb(vars["--accent-2"]),
      mouse: toRgb(theme.c1),
    }
  }, [theme])

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const host = canvas.parentElement
    /* start visible — the hero is on screen at load; IO only pauses when scrolled away */
    let W, H, running = false, visible = true, raf, resizeTimer
    const parts = []
    const mouse = { x: -9999, y: -9999 }

    const resize = () => {
      const r = host.getBoundingClientRect()
      W = canvas.width = r.width
      H = canvas.height = r.height
      const target = Math.min(90, Math.floor((W * H) / 16000))
      while (parts.length < target) parts.push({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.7,
      })
      parts.length = target
    }
    const tick = () => {
      if (!visible) { running = false; return }
      const c = colors.current
      ctx.clearRect(0, 0, W, H)
      for (const p of parts) {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1
        const dm = Math.hypot(mouse.x - p.x, mouse.y - p.y)
        if (dm < 180 && dm > 30) { p.x += ((mouse.x - p.x) / dm) * 0.35; p.y += ((mouse.y - p.y) / dm) * 0.35 }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = c.dot; ctx.fill()
      }
      for (let i = 0; i < parts.length; i++) {
        for (let j = i + 1; j < parts.length; j++) {
          const d = Math.hypot(parts[i].x - parts[j].x, parts[i].y - parts[j].y)
          if (d < 110) {
            ctx.strokeStyle = `rgba(${c.line},${(1 - d / 110) * 0.16})`
            ctx.beginPath(); ctx.moveTo(parts[i].x, parts[i].y); ctx.lineTo(parts[j].x, parts[j].y); ctx.stroke()
          }
        }
        const dm = Math.hypot(mouse.x - parts[i].x, mouse.y - parts[i].y)
        if (dm < 180) {
          ctx.strokeStyle = `rgba(${c.mouse},${(1 - dm / 180) * 0.35})`
          ctx.beginPath(); ctx.moveTo(parts[i].x, parts[i].y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke()
        }
      }
      raf = requestAnimationFrame(tick)
    }
    const start = () => { if (!running && visible) { running = true; raf = requestAnimationFrame(tick) } }

    resize()
    start()
    const io = new IntersectionObserver(en => { visible = en[en.length - 1].isIntersecting; start() })
    io.observe(host)
    const onResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resize, 150) }
    addEventListener("resize", onResize, { passive: true })
    const onMove = e => {
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top
    }
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999 }
    host.addEventListener("pointermove", onMove, { passive: true })
    host.addEventListener("pointerleave", onLeave)
    return () => {
      cancelAnimationFrame(raf); io.disconnect()
      removeEventListener("resize", onResize)
      host.removeEventListener("pointermove", onMove)
      host.removeEventListener("pointerleave", onLeave)
    }
  }, [])
  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden />
}
