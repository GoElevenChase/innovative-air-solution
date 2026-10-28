import Link from "next/link";
import { Arrow, Logo } from "@/components/shared";
import { L, Marquee, Reveal, at } from "@/components/motion";
import { siteContent } from "@/content/site";

const directions = [
  {
    href: "/design-1/", number: "01", name: "The Neighborhood Standard", mood: "Bright · Warm · Neighborly", image: "/previews/design-1-desktop.webp", className: "choice-light",
    copy: "Bright, warm, and editorial. A typography-led hero, an asymmetric service showcase, and a clear path from an everyday comfort problem to a conversation with Innovative Air.",
    traits: "Bright white · Clean display · Soft, welcoming motion",
  },
  {
    href: "/design-2/", number: "02", name: "Comfort, Handled", mood: "Bold · Cinematic · Precise", image: "/previews/design-2-desktop.webp", className: "choice-dark",
    copy: "Confident and cinematic. Full-bleed photography, bold display type, and a structured rhythm built for getting the right help fast.",
    traits: "Deep navy · Bold display · Cinematic motion",
  },
] as const;

export function DesignChooser() {
  const { name, legalName } = siteContent.business;
  return <main className="chooser" id="main-content">
    <header className="chooser-header"><div className="chooser-brand"><Logo /><span className="chooser-divider" aria-hidden="true" /><span>Prepared by ElevenChase</span></div><span className="chooser-tag">{name} · Website directions</span></header>

    <section className="chooser-intro" aria-labelledby="chooser-title">
      <p className="chooser-eyebrow" data-intro style={at(0)}><i aria-hidden="true" />A fresh perspective</p>
      <h1 id="chooser-title" className="intro" data-anim="lines"><L>Two fresh directions</L><L>for <span className="a">{name}.</span></L></h1>
      <div className="chooser-intro-row">
        <p data-intro style={at(4)}>The same local care, expressed two ways. Explore each complete homepage and choose the direction that feels right.</p>
        <p className="chooser-aside" data-intro style={at(5)}>One trusted team. Two possibilities. <Arrow /></p>
      </div>
    </section>

    <Marquee className="chooser-marquee" label="Services" items={["Heating", "Cooling", "Plumbing", "Insulation", "Indoor air quality", "Electrical"]} />

    <section className="chooser-grid" aria-label="Choose a homepage design">{directions.map((direction, index) => <Reveal key={direction.href} variant="up" delay={index * 160} className="choice-slot"><Link href={direction.href} className={`choice-card ${direction.className}`}>
      <div className="choice-frame" data-tilt>
        <div className="choice-chrome"><span className="choice-dots" aria-hidden="true"><i /><i /><i /></span><span>{name} — Design {direction.number.slice(1)}</span><span aria-hidden="true" /></div>
        <div className="choice-image"><img src={direction.image} width={1800} height={1125} alt={`The top of the ${name} Design ${direction.number.slice(1)} homepage`} loading={index === 0 ? "eager" : "lazy"} /><span className="chooser-arrow" aria-hidden="true"><Arrow direction="up" /></span></div>
      </div>
      <div className="choice-meta">
        <p className="choice-row"><span>Design {direction.number}</span><span>{direction.mood}</span></p>
        <h2>{direction.name}</h2>
        <p className="choice-copy">{direction.copy}</p>
        <p className="choice-traits">{direction.traits}</p>
        <p className="choice-explore">Explore Design {direction.number.slice(1)} <Arrow direction="up" /></p>
      </div>
    </Link></Reveal>)}</section>

    <section className="chooser-note"><h2 data-anim="lines"><L>Different first impressions.</L><L><span className="a">The same {name} care.</span></L></h2><p data-anim="up" data-d="200">Each direction is a complete, responsive homepage. Use the floating bar to switch designs or return here. Enquiry forms open an email draft; the phone number connects to the existing {name} line.</p></section>

    <footer className="chooser-footer"><span>Thoughtfully prepared for {legalName}.</span><span>Two homepage concepts · October 2026</span><span>Presentation only · Excluded from search</span></footer>
  </main>;
}
