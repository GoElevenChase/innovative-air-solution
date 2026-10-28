import { siteContent } from "@/content/site";
import { Arrow, ContactSection, FAQ, SiteFooter, SiteHeader } from "@/components/shared";
import { CountUp } from "@/components/count-up";
import { L, Marquee, Reveal, at } from "@/components/motion";
import "@/app/design-two.css";

const features = [
  { id: "heating", meta: "Furnaces · Boilers · Heat pumps", title: ["Heat that holds", "all winter long."], image: "/images/water-heater-service.webp", width: 1600, height: 1068, alt: "An Innovative Air technician servicing a water heater and copper piping" },
  { id: "cooling", meta: "AC repair · Maintenance · Installation", title: ["We help you", "beat the heat."], image: "/images/ac-condenser-repair.webp", width: 1600, height: 1068, alt: "An Innovative Air technician servicing an outdoor air conditioning condenser" },
  { id: "plumbing", meta: "Repair · Maintenance · Installation", title: ["Precision work.", "Low-stress service."], image: "/images/boiler-pipework.webp", width: 2400, height: 1600, alt: "An Innovative Air technician working on boiler pipework and valves" },
] as const;

const indexOrder = ["air-quality", "insulation", "electrical", "heating", "cooling", "plumbing"];

/** Design 2 — Immersive: dark, photographic, numbered and architecturally structured. */
export function DesignTwo() {
  const { business, services, process, guarantees, stats, rating } = siteContent;
  const byId = (id: string) => services.find(service => service.id === id)!;
  const indexed = indexOrder.map(byId);
  return <div className="design-two" id="top">
    <SiteHeader theme="dark" />
    <main id="main-content">
      <section className="two-hero" aria-labelledby="two-hero-title" data-spotlight>
        <img className="two-hero-photo" src="/images/tech-at-boiler.webp" width={2400} height={1600} alt="" fetchPriority="high" data-parallax="0.12" />
        <div className="two-hero-inner">
          <p className="two-eyeline" data-intro style={at(0)}>{business.name} / {business.region}, NY</p>
          <h1 id="two-hero-title" className="intro" data-anim="lines"><L>Heating &amp;</L><L>cooling.</L><L><span className="a">Done right.</span></L></h1>
          <p className="two-hero-lead" data-intro style={at(5)}>Heating, cooling, plumbing, insulation, indoor air quality, and electrical services for {business.region} homes — from certified techs with up-front pricing.</p>
          <div className="two-hero-actions" data-intro style={at(6)}><a className="two-button" href="#services">Explore services <Arrow direction="down" /></a><a className="two-button two-button-ghost" href={business.phoneHref}>Call {business.phone} <Arrow /></a></div>
          <div className="two-tagbox" data-intro="side" style={at(7)}><ul><li>Heating</li><li>Cooling</li><li>Plumbing</li><li>Home efficiency</li></ul><p><strong>{rating.score} ★</strong>{rating.label} · {business.emergency}</p></div>
        </div>
        <nav className="two-index" aria-label="Service categories"><a href="#heating" data-intro style={at(8)}><small>01</small>Heating<Arrow /></a><a href="#cooling" data-intro style={at(9)}><small>02</small>Cooling<Arrow /></a><a href="#plumbing" data-intro style={at(10)}><small>03</small>Plumbing<Arrow /></a><a href="#capabilities" data-intro style={at(11)}><small>04</small>Insulation &amp; air quality<Arrow /></a></nav>
      </section>

      <section id="services" className="two-section two-features" aria-labelledby="two-services-title">
        <Reveal variant="fade" className="two-head"><p className="two-label">01 / Your home. Every system.</p><h2 id="two-services-title" data-anim="lines"><L>Warm winters. Cool summers.</L><L><span className="a">Every system, covered.</span></L></h2></Reveal>
        {features.map((feature, index) => {
          const service = byId(feature.id);
          return <article key={feature.id} id={feature.id} aria-labelledby={`two-${feature.id}-title`} className={`two-feature ${index % 2 ? "is-reversed" : ""}`}>
            <Reveal variant="mask" className="two-feature-photo"><img src={feature.image} width={feature.width} height={feature.height} alt={feature.alt} loading="lazy" data-parallax="0.07" /><span className="two-photo-tag"><b>0{index + 1}</b>{service.title}</span></Reveal>
            <div className="two-feature-copy" data-stagger="up">
              <p className="two-feature-num">0{index + 1}</p>
              <p className="two-label">{feature.meta}</p>
              <h3 id={`two-${feature.id}-title`} data-anim="lines"><L>{feature.title[0]}</L><L>{feature.title[1]}</L></h3>
              <p>{service.summary}</p>
              <ul>{service.details.map(detail => <li key={detail}>{detail}<Arrow direction="up" /></li>)}</ul>
              <a className="two-button two-button-navy" href="#contact">Discuss {service.title.toLowerCase()} service <Arrow /></a>
            </div>
          </article>;
        })}
      </section>

      <section id="capabilities" className="two-section two-capabilities" aria-labelledby="two-cap-title"><div className="two-inner">
        <Reveal variant="fade" className="two-cap-head"><div><p className="two-label">02 / The service index</p><h2 id="two-cap-title" data-anim="lines"><L>The right service.</L><L><span className="a">A clear next step.</span></L></h2></div><p data-anim="up" data-d="200">Find what your home needs. Explore a service, then share the details with the {business.name} team.</p></Reveal>
        <div className="two-cap-grid">
          <div className="two-accordion" data-stagger="up">{indexed.map((service, index) => <details key={service.id} open={index === 0} name="two-capability"><summary><small>0{index + 1}</small><span>{service.title}</span><i aria-hidden="true" /></summary><div className="two-acc-body"><p>{service.summary}</p><ul>{service.details.map(detail => <li key={detail}>{detail}</li>)}</ul><a href="#contact">Request this service <Arrow /></a></div></details>)}</div>
          <Reveal variant="mask" className="two-cap-photo" delay={120}><img src="/images/duct-cleaning.webp" width={1600} height={1068} alt={byId("air-quality").alt} loading="lazy" data-parallax="0.07" /><span className="two-corner" aria-hidden="true" /><span className="two-photo-tag"><b>01</b>Indoor air quality</span></Reveal>
        </div>
      </div></section>

      <section id="about" className="two-section two-process" aria-labelledby="two-process-title"><div className="two-inner">
        <Reveal variant="fade" className="two-process-head"><p className="two-label">03 / How it works</p><h2 id="two-process-title" data-anim="lines"><L>Your home. Your options.</L><L><span className="a">Your next step.</span></L></h2></Reveal>
        <ol className="two-steps" data-stagger="up">{process.map((step, index) => <li key={step.id}><span>0{index + 1}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></li>)}</ol>
        <p className="two-process-note" data-anim="up"><span>Financing is available for new heating and AC systems. Pricing and scheduling are confirmed directly with the team.</span><a href="#contact">Ask about financing <Arrow /></a></p>
      </div></section>

      <Marquee className="two-marquee" label="Our promise" items={["Done once", "Done right", "Honest solutions", "Clear communication", "Certified techs", "Up-front pricing"]} />

      <section id="maintenance" className="two-section two-guarantees" aria-labelledby="two-guarantee-title"><div className="two-inner">
        <div><p className="two-label" data-anim="fade">04 / Worry-free guarantees</p><h2 id="two-guarantee-title" data-anim="lines"><L>Peace of mind,</L><L>in writing.</L></h2><p data-anim="up" data-d="200">Our ironclad Worry-Free Guarantees are one reason {business.region} trusts {business.name} for heating and cooling. Ask about the {siteContent.membership.title} for year-round care.</p></div>
        <ul className="two-guarantee-grid" data-stagger="up">{guarantees.map(guarantee => <li key={guarantee.title}><h3>{guarantee.title}</h3><p>{guarantee.description}</p></li>)}</ul>
      </div></section>

      <FAQ theme="light" intro="Common questions Westchester County homeowners ask before their first call." />
      <ContactSection theme="dark" title={<><L>Tell us what</L><L><span className="a">needs&nbsp;attention.</span></L></>} lead="Get a free quote, or call the team. If you need HVAC services from a company you can truly rely on, we would be honored to speak with you."
        aside={<dl className="two-mini-stats" data-stagger="up">{stats.map(stat => <div key={stat.label}><dt>{stat.label}</dt><dd><CountUp value={stat.value} /></dd></div>)}</dl>} />
    </main>
    <SiteFooter theme="dark" closing={<><L>Comfort starts</L><L><span className="a">with a conversation.</span></L></>} wordmark />
  </div>;
}
