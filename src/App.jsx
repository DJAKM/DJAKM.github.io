import { motion, useScroll, useSpring, MotionConfig } from "framer-motion"
import { useEffect, useState } from "react"
import { ThemeProvider, ThemePicker } from "./theme.jsx"
import { Section, Counter, Typed, Tags, Stat, Spotlight, Particles, Cursor, useSpot, useParallax, staggerParent, staggerChild } from "./bits.jsx"
import { NAV, MARQUEE, STATS, SERVICES, JOBS, FEATURED, PROJECTS, AI_PROJECTS, DSA_STATS, EDUCATION, LINKS } from "./data.js"

const card = "rounded-2xl border border-line bg-card transition duration-300 hover:-translate-y-1"

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 })
  useEffect(() => {
    const fn = () => setScrolled(scrollY > 40)
    addEventListener("scroll", fn, { passive: true })
    return () => removeEventListener("scroll", fn)
  }, [])
  return (
    <>
      <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-[200] h-[3px] origin-left bg-gradient-to-r from-accent to-accent-2" />
      <nav className={`fixed inset-x-0 top-0 z-[100] flex items-center justify-between px-[6vw] transition-all ${scrolled ? "bg-glass py-3 shadow-[0_1px_0_var(--border)] backdrop-blur-xl" : "py-4"}`}>
        <a href="#" className="text-lg font-bold">aditya<span className="text-accent">.</span>dev</a>
        <ul className="hidden items-center gap-7 md:flex">
          {NAV.slice(0, -1).map(([id, label]) => (
            <li key={id}><a href={`#${id}`} className="text-sm font-medium text-muted transition-colors hover:text-ink">{label}</a></li>
          ))}
          <li><a href="#contact" className="rounded-full border border-accent px-4 py-1.5 text-sm font-medium text-atext transition-colors hover:bg-accent hover:text-on-accent">Contact</a></li>
        </ul>
        <div className="flex items-center gap-3">
          <ThemePicker />
          <button aria-label="Menu" onClick={() => setMenu(m => !m)} className="relative z-[130] h-10 w-10 md:hidden">
            {[0, 1, 2].map(i => (
              <span key={i} className={`mx-auto my-[5px] block h-0.5 w-[22px] rounded bg-ink transition-transform ${menu && i === 0 ? "translate-y-[7px] rotate-45" : ""} ${menu && i === 1 ? "opacity-0" : ""} ${menu && i === 2 ? "-translate-y-[7px] -rotate-45" : ""}`} />
            ))}
          </button>
        </div>
      </nav>
      <div className={`fixed inset-0 z-[120] flex flex-col items-center justify-center gap-8 bg-glass backdrop-blur-2xl transition-opacity md:hidden ${menu ? "opacity-100" : "pointer-events-none opacity-0"}`}>
        {NAV.map(([id, label], i) => (
          <a key={id} href={`#${id}`} onClick={() => setMenu(false)} className="text-2xl font-semibold">
            <span className="mr-3 font-mono text-base text-accent">0{i + 1}</span>{label}
          </a>
        ))}
      </div>
    </>
  )
}

function Hero() {
  const glow1 = useParallax(30)
  const glow2 = useParallax(-24)
  return (
    <header className="relative flex min-h-screen flex-col justify-center overflow-hidden px-[6vw] pt-24 pb-16">
      <Particles />
      <div className="hero-grid pointer-events-none absolute inset-0" />
      <motion.div style={{ x: glow1.x, y: glow1.y }} className="pointer-events-none absolute -right-[12%] top-[12%] h-[58vw] w-[58vw] max-h-[720px] max-w-[720px] rounded-full opacity-80">
        <div className="h-full w-full rounded-full" style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--accent) 14%, transparent) 0%, transparent 65%)" }} />
      </motion.div>
      <motion.div style={{ x: glow2.x, y: glow2.y }} className="pointer-events-none absolute -bottom-[18%] -left-[14%] h-[46vw] w-[46vw] max-h-[560px] max-w-[560px] rounded-full">
        <div className="h-full w-full rounded-full" style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--accent-2) 12%, transparent) 0%, transparent 65%)" }} />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className="relative">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-glass-card px-4 py-1.5 font-mono text-xs text-muted">
          <i className="ping-dot h-2 w-2 rounded-full bg-green-500" />Open to opportunities · Noida, India
        </span>
        <p className="mb-4 font-mono text-atext">Hi, my name is</p>
        <h1 className="text-[clamp(2.5rem,6.5vw,4.8rem)] font-extrabold leading-[1.06] tracking-tight">
          Aditya Kumar <span className="grad-name">Mishra</span>.
        </h1>
        <p className="mt-3 min-h-[1.3em] text-[clamp(1.35rem,3.4vw,2.2rem)] font-semibold text-muted">
          I build <span className="text-ink"><Typed /></span>
        </p>
        <p className="mt-6 max-w-[580px] text-muted">
          Frontend Developer at <strong className="font-medium text-ink">Makunai Global</strong>, where I designed and built{" "}
          <strong className="font-medium text-ink">UniversityLane.io</strong> — a study-abroad platform serving 1,000+ partners —
          from the first wireframe to production.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <a href="#work" className="rounded-xl bg-accent px-7 py-3 font-semibold text-on-accent shadow-lg shadow-accent/30 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/40">See my work</a>
          <a href={`mailto:${LINKS.email}`} className="rounded-xl border border-line px-7 py-3 font-semibold transition hover:-translate-y-0.5 hover:border-accent hover:text-atext">Get in touch</a>
        </div>
        <div className="mt-10 flex gap-6 font-mono text-sm text-faint">
          {[["GitHub", LINKS.github], ["LinkedIn", LINKS.linkedin], ["LeetCode", LINKS.leetcode]].map(([n, url]) => (
            <a key={n} href={url} target="_blank" rel="noopener" className="transition hover:-translate-y-0.5 hover:text-atext">{n} ↗</a>
          ))}
        </div>
      </motion.div>
      <span className="floaty absolute bottom-6 left-[6vw] font-mono text-xs text-faint">scroll ↓</span>
    </header>
  )
}

const Marquee = () => (
  <div className="marquee flex select-none overflow-hidden border-y border-line bg-bg-soft py-4" aria-hidden>
    {[0, 1].map(k => (
      <div key={k} className="marquee-track flex shrink-0 items-center gap-14 pr-14">
        {MARQUEE.map(t => (
          <span key={t} className="flex items-center gap-3 whitespace-nowrap font-mono text-sm text-faint">
            <i className="text-[0.6rem] not-italic text-accent-2">◆</i>{t}
          </span>
        ))}
      </div>
    ))}
  </div>
)

function About() {
  return (
    <Section id="about" num="01" label="About" title="A frontend developer who owns the whole picture" variant="left">
      <div className="grid items-start gap-12 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-4 text-muted [&_strong]:font-medium [&_strong]:text-ink">
          <p>I'm an Electronics &amp; Communication graduate from <strong>IIIT Bhagalpur (2025)</strong> who found home in frontend engineering. I joined Makunai Global as an intern in January 2025 and was promoted to a full-time Frontend Developer within six months.</p>
          <p>My biggest professional milestone so far: designing <strong>UniversityLane.io end-to-end</strong> — every screen, flow, and interaction, from the destinations mega-menu covering 20+ countries to the multi-step budget calculator that helps students plan their entire study-abroad cost.</p>
          <p>Beyond work, I keep my problem-solving sharp with daily DSA practice.</p>
          <blockquote className="rounded-r-xl border-l-[3px] border-accent bg-accent/8 px-5 py-4 italic text-ink">
            "Design is not just what it looks like — I care about how it loads, how it flows, and how it feels on every screen."
          </blockquote>
        </div>
        <motion.div variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-2 gap-4">
          {STATS.map((s, i) => (
            <Stat key={s.label} label={s.label} alt={i % 2 === 1}><Counter to={s.to} suffix={s.suffix} /></Stat>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}

function Services() {
  const spot = useSpot()
  return (
    <Section id="services" num="02" label="What I do" title="Where I add value" variant="scale">
      <motion.div variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-6 md:grid-cols-3">
        {SERVICES.map((s, i) => (
          <motion.div key={s.title} variants={staggerChild} onPointerMove={spot} className={`spot ${card} p-7 hover:border-line-hi`}>
            <span className="mb-4 block font-mono text-4xl font-semibold text-transparent" style={{ WebkitTextStroke: "1px var(--border-hi)" }}>0{i + 1}</span>
            <h3 className="mb-2 text-lg font-semibold">{s.title}</h3>
            <p className="text-sm text-muted">{s.body}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}

function Experience() {
  return (
    <Section id="experience" num="03" label="Experience" title="Where I've worked" variant="right">
      <div className="relative pl-8 before:absolute before:bottom-1.5 before:left-1.5 before:top-1.5 before:w-0.5 before:bg-gradient-to-b before:from-accent before:to-accent-2">
        {JOBS.map(j => (
          <div key={j.title} className="group relative pb-11 last:pb-0">
            <span className="absolute -left-8 top-1.5 h-3.5 w-3.5 rounded-full border-[3px] border-accent bg-bg transition-shadow group-hover:shadow-[0_0_0_5px] group-hover:shadow-accent/15" />
            <span className="font-mono text-sm text-atext">{j.when}</span>
            <h3 className="mt-1 text-lg font-semibold">
              {j.title}
              <span className="ml-2 rounded-md bg-accent/12 px-2 py-0.5 align-middle font-mono text-[0.68rem] text-atext">{j.badge}</span>
            </h3>
            <p className="mb-3 text-sm text-muted">
              {j.org}{j.link && <> · <a className="text-atext hover:underline" href={j.link[0]} target="_blank" rel="noopener">{j.link[1]}</a></>}
            </p>
            <ul className="space-y-1.5">
              {j.points.map(p => (
                <li key={p} className="relative pl-4 text-sm text-muted before:absolute before:left-0 before:text-accent before:content-['▸']">{p}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}

function ProjectCard({ p }) {
  const spot = useSpot()
  return (
    <motion.div variants={staggerChild} onPointerMove={spot} whileHover={{ rotateY: 4, rotateX: -3 }} style={{ transformPerspective: 1000 }}
      className={`spot ${card} flex flex-col p-7 hover:border-accent/50 hover:shadow-2xl hover:shadow-black/30`}>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{p.name}</h3>
        <span className="font-mono text-xs text-faint">{p.year}</span>
      </div>
      <p className="mb-4 flex-1 text-sm text-muted">{p.body}</p>
      <Tags items={p.tags} />
    </motion.div>
  )
}

function Work() {
  const spot = useSpot()
  return (
    <Section id="work" num="04" label="Work" title="Things I've built" variant="blur">
      <div onPointerMove={spot} className={`spot ${card} mb-6 bg-gradient-to-br from-card to-card-hi p-9 hover:border-accent/50`}>
        <span className="mb-4 inline-block rounded-full border border-accent/40 px-3 py-0.5 font-mono text-xs text-atext">FEATURED · PROFESSIONAL WORK</span>
        <h3 className="mb-2 text-2xl font-semibold"><a href={FEATURED.url} target="_blank" rel="noopener" className="transition-colors hover:text-atext">{FEATURED.name} ↗</a></h3>
        <p className="mb-5 max-w-[660px] text-sm text-muted">{FEATURED.blurb}</p>
        <div className="mb-6 flex flex-wrap gap-4">
          {FEATURED.metrics.map(([v, l]) => (
            <div key={l} className="rounded-xl border border-line bg-glass-card px-4 py-2.5 text-xs text-muted">
              <b className="block font-mono text-base text-accent">{v}</b>{l}
            </div>
          ))}
        </div>
        <ul className="mb-6 max-w-[660px] gap-x-8 sm:columns-2">
          {FEATURED.features.map(f => (
            <li key={f} className="relative mb-2 break-inside-avoid pl-5 text-sm text-muted before:absolute before:left-0 before:text-xs before:text-accent before:content-['✦']">{f}</li>
          ))}
        </ul>
        <Tags items={FEATURED.tags} />
      </div>
      <motion.div variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-6 md:grid-cols-2">
        {PROJECTS.map(p => <ProjectCard key={p.name} p={p} />)}
      </motion.div>

      <div className="mb-2 mt-12 flex flex-wrap items-baseline gap-4">
        <h3 className="text-xl font-semibold">AI-Assisted Builds</h3>
        <span className="rounded-full border border-violet-500/35 bg-violet-500/12 px-3 py-0.5 font-mono text-[0.68rem] tracking-wider text-violet-400">BUILT WITH AI PAIR-PROGRAMMING</span>
      </div>
      <p className="mb-6 max-w-[680px] text-sm text-muted">
        Larger products I've shipped by directing AI coding tools — I own the architecture, data models,
        and product decisions; AI accelerates the implementation. Labeled honestly, because that's how I work.
      </p>
      <motion.div variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-6 md:grid-cols-2">
        {AI_PROJECTS.map(p => <ProjectCard key={p.name} p={p} />)}
      </motion.div>
    </Section>
  )
}

function Dsa() {
  return (
    <Section id="dsa" num="05" label="Problem Solving" title="Sharp fundamentals, daily practice" variant="left">
      <div className={`relative grid items-center gap-10 overflow-hidden ${card} hover:translate-y-0 bg-gradient-to-br from-card to-card-hi p-9 md:grid-cols-[1.2fr_1fr]`}>
        <span className="pointer-events-none absolute -bottom-6 right-8 font-mono text-8xl font-semibold text-transparent" style={{ WebkitTextStroke: "1px var(--border)" }}>{"{ }"}</span>
        <div>
          <h3 className="mb-3 text-xl font-semibold">Data Structures &amp; Algorithms</h3>
          <p className="text-sm text-muted">
            Consistent competitive programming across LeetCode, GeeksforGeeks, and Coding Ninjas.
            Strong grounding in arrays, strings, trees, graphs, and dynamic programming — the fundamentals
            that make frontend code fast, not just pretty.
          </p>
        </div>
        <motion.div variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-2 gap-4">
          {DSA_STATS.map((s, i) => (
            <Stat key={s.label} label={s.label} alt={i % 2 === 1}>{s.to ? <Counter to={s.to} suffix={s.suffix} /> : s.text}</Stat>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}

function Education() {
  return (
    <Section id="education" num="06" label="Education" title="Where I studied" variant="rotate">
      <motion.div variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-6 md:grid-cols-2">
        {EDUCATION.map(e => (
          <motion.div key={e.school} variants={staggerChild} className={`${card} p-7 hover:border-line-hi`}>
            <span className="font-mono text-xs text-atext">{e.when}</span>
            <h3 className="mt-1.5 font-semibold">{e.school}</h3>
            <p className="mb-3 text-sm text-muted">{e.degree}</p>
            <span className="rounded-lg bg-accent/12 px-3 py-1 font-mono text-xs text-atext">{e.score}</span>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}

function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try { await navigator.clipboard.writeText(LINKS.email); setCopied(true) } catch { }
    setTimeout(() => setCopied(false), 1800)
  }
  return (
    <Section id="contact" num="07" label="Contact" title="Let's build something together" center variant="scale">
      <div className="mx-auto max-w-[640px]">
        <p className="mb-8 text-muted">Whether it's a role, a freelance project, or just a chat about frontend — my inbox is always open. I usually reply within a day.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href={`mailto:${LINKS.email}`} className="rounded-xl bg-accent px-7 py-3 font-semibold text-on-accent shadow-lg shadow-accent/30 transition hover:-translate-y-0.5">Say hello</a>
          <a href={LINKS.github} target="_blank" rel="noopener" className="rounded-xl border border-line px-7 py-3 font-semibold transition hover:-translate-y-0.5 hover:border-accent hover:text-atext">GitHub</a>
          <a href={LINKS.linkedin} target="_blank" rel="noopener" className="rounded-xl border border-line px-7 py-3 font-semibold transition hover:-translate-y-0.5 hover:border-accent hover:text-atext">LinkedIn</a>
        </div>
        <div className="mt-9 inline-flex items-center gap-3 rounded-xl border border-dashed border-line-hi px-5 py-3 font-mono text-sm text-muted">
          {LINKS.email}
          <button onClick={copy} className="rounded-md px-2 py-0.5 text-xs text-atext transition hover:bg-accent/12">{copied ? "COPIED ✓" : "COPY"}</button>
        </div>
      </div>
    </Section>
  )
}

function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-center gap-4 border-t border-line px-[6vw] py-7 font-mono text-xs text-faint md:justify-between">
      <span>Designed &amp; built by Aditya Kumar Mishra · © 2026</span>
      <div className="flex gap-6">
        {[["GitHub", LINKS.github], ["LinkedIn", LINKS.linkedin], ["Email", `mailto:${LINKS.email}`]].map(([n, url]) => (
          <a key={n} href={url} className="transition-colors hover:text-atext">{n}</a>
        ))}
      </div>
    </footer>
  )
}

function ToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const fn = () => setShow(scrollY > 600)
    addEventListener("scroll", fn, { passive: true })
    return () => removeEventListener("scroll", fn)
  }, [])
  return (
    <button
      aria-label="Back to top"
      onClick={() => scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-[90] h-11 w-11 rounded-xl border border-line bg-glass-card text-lg text-atext backdrop-blur transition hover:-translate-y-1 ${show ? "opacity-100" : "pointer-events-none opacity-0"}`}
    >↑</button>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <Cursor />
        <Spotlight />
        <Nav />
        <main className="relative z-[2]">
          <Hero />
          <Marquee />
          <About />
          <Services />
          <Experience />
          <Work />
          <Dsa />
          <Education />
          <Contact />
        </main>
        <Footer />
        <ToTop />
      </ThemeProvider>
    </MotionConfig>
  )
}
