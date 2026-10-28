import { fullAddress, siteContent } from "@/content/site";
import { Arrow, ContactSection, FAQ, SiteFooter, SiteHeader } from "@/components/shared";
import { ServiceSelector } from "@/components/service-selector";
import { CountUp } from "@/components/count-up";
import { L, Marquee, Reveal, at } from "@/components/motion";
import "@/app/design-one.css";

/** Design 1 — Editorial: light, typography-led, asymmetric service showcase. */
export function DesignOne() {
  const { business, services, principles, membership, stats, rating, serviceAreas, alsoOffered } = siteContent;
  const [heating, cooling, plumbing, ...efficiency] = services;
  return <div className="design-one" id="top">
    <SiteHeader theme="light" />
    <main id="main-content">
      <section className="one-hero" aria-labelledby="one-hero-title">
        <div className="one-hero-copy">
          <p className="one-label" data-intro style={at(0)}><span className="one-spark" aria-hidden="true">✳</span> Heating · Cooling · Plumbing · Home services</p>
          <h1 id="one-hero-title" className="intro" data-anim="lines"><L>Done once.</L><L><span className="a">Done right.</span></L></h1>
          <p className="one-hero-lead" data-intro style={at(4)}>{business.description}</p>
          <div className="one-hero-actions" data-intro style={at(5)}><a className="one-button" href="#contact">Request service <Arrow direction="up" /></a><a className="one-text-link" href={business.phoneHref}>Call {business.phone}</a></div>
          <dl className="one-hero-meta" data-intro style={at(6)}>
            <div><dt>Based in {business.address.city}</dt><dd>{fullAddress}.<br />Serving {business.region}.</dd></div>
            <div><dt>Here when it counts</dt><dd>{business.emergency}.<br />Office hours {business.hours}.</dd></div>
          </dl>
        </div>
        <div className="one-hero-art">
          <div className="one-hero-frame" data-intro="mask"><img className="one-hero-photo" src="/images/tech-with-van.webp" width={1600} height={1068} alt="An Innovative Air technician carrying hose beside a branded service van" fetchPriority="high" /></div>
          <span className="one-corner" aria-hidden="true" />
          <p className="one-rating" data-intro style={at(6)}><strong>{rating.score}</strong><span><span className="one-stars" aria-hidden="true">★★★★★</span>{rating.label}</span></p>
          <a className="one-float" href="#services" data-intro style={at(7)}><img src="/images/duct-cleaning.webp" width={1600} height={1068} alt="" loading="lazy" /><span>Indoor air quality <Arrow direction="up" /></span></a>
          <p className="one-caption" data-intro style={at(8)}>Heating / Cooling / Plumbing / Insulation / Air quality</p>
        </div>
      </section>

      <Marquee className="one-marquee" label="Our services" items={["Heating", "Cooling", "Plumbing", "Insulation", "Indoor air quality", "Electrical"]} />

      <section id="services" className="one-section one-showcase" aria-labelledby="one-services-title">
        <Reveal variant="fade" className="one-section-head"><div><p className="one-label">01 / One team for the whole home</p><h2 id="one-services-title" data-anim="lines"><L>Every system in your home.</L><L><span className="a">The same attention.</span></L></h2></div><p data-anim="up" data-d="200">Heating, cooling, plumbing, insulation, indoor air quality, and electrical. Find the service your home needs.</p></Reveal>
        <div className="one-show-grid">
          <Reveal className="one-card one-card-large" variant="up"><img src={heating.image} width={2400} height={1600} alt={heating.alt} loading="lazy" /><span className="one-num">01</span><div className="one-card-body"><h3>{heating.title}</h3><p>Furnace and boiler repair, heater maintenance, and new furnace and boiler installation — so your home stays warm all winter.</p><a href="#contact">Explore heating services <Arrow direction="up" /></a></div></Reveal>
          <div className="one-show-stack">
            <div className="one-show-pair">
              {[cooling, plumbing].map((service, index) => <Reveal key={service.id} className="one-card" delay={140 + index * 140}><img src={service.image} width={service.id === "plumbing" ? 2400 : 1600} height={service.id === "plumbing" ? 1600 : 1068} alt={service.alt} loading="lazy" /><span className="one-num">0{index + 2}</span><div className="one-card-body"><h3>{service.title}</h3><p>{service.id === "cooling" ? "AC repair, maintenance, and installation. We help you beat the heat." : "Precision repair, maintenance, and installation."}</p><a href="#contact">Explore {service.title.toLowerCase()} <Arrow direction="up" /></a></div></Reveal>)}
            </div>
            <Reveal className="one-card one-card-dark" delay={280}><img src="/images/attic-insulation.webp" width={1600} height={1068} alt={efficiency[0].alt} loading="lazy" /><div className="one-card-body"><p className="one-label">04 — 06 / Home efficiency</p><h3>A healthier, more<br />efficient home.</h3><ul>{efficiency.map(service => <li key={service.id}><a href="#contact">{service.title === "Electrical" ? "Electrical services" : service.title === "Insulation" ? "Insulation & air sealing" : service.title}<Arrow direction="up" /></a></li>)}</ul></div></Reveal>
          </div>
        </div>
        <ul className="one-also" aria-label="Also here for" data-stagger="up"><li>Also here for</li>{alsoOffered.map(item => <li key={item}><a href="#contact">{item}<Arrow direction="up" /></a></li>)}</ul>
      </section>

      <section className="one-selector-section" aria-label="Find the right service"><Reveal variant="zoom"><ServiceSelector /></Reveal></section>

      <section id="about" className="one-section one-difference" aria-labelledby="one-about-title"><div className="one-difference-inner">
        <Reveal variant="fade" className="one-section-head"><div><p className="one-label">02 / The Innovative Air difference</p><h2 id="one-about-title" className="one-h2-large" data-anim="lines"><L>Honest work starts</L><L><span className="a">with listening.</span></L></h2></div><p data-anim="up" data-d="200">Let’s face it — finding an HVAC contractor you can trust can be tough. We keep you in the loop every step of the way, and we know how to listen.</p></Reveal>
        <div className="one-difference-grid">
          <Reveal variant="mask" className="one-difference-photo"><img src="/images/office-consultation.webp" width={1600} height={1068} alt="An Innovative Air team member on a phone call at his office desk" loading="lazy" data-parallax="0.07" /></Reveal>
          <div>
            <blockquote data-anim="up">“Providing a top-notch experience and results is no accident. It’s the result of <span>strictly following</span> our set of customer-first Core Values.”</blockquote>
            <a className="one-text-link" href="#contact" data-anim="up" data-d="150">Talk to the team <Arrow direction="up" /></a>
            <ol className="one-principles" data-stagger="up">{principles.map((principle, index) => <li key={principle.title}><span>0{index + 1}</span><div><h3>{principle.title}</h3><p>{principle.description}</p></div></li>)}</ol>
          </div>
        </div>
      </div></section>

      <section id="maintenance" className="one-section one-feature-wrap" aria-labelledby="one-feature-title"><div className="one-feature" data-anim="zoom">
        <div className="one-feature-photo"><img src="/images/tech-with-gauges.webp" width={1068} height={1600} alt="An Innovative Air technician holding refrigerant gauges beside an outdoor AC unit" loading="lazy" data-parallax="0.08" /><span className="one-corner one-corner-left" aria-hidden="true" /><p><small>{membership.title}</small>Year-round care for heating and cooling.</p></div>
        <div className="one-feature-copy">
          <p className="one-label">03 / {membership.title} membership</p>
          <h2 id="one-feature-title" data-anim="lines"><L>Comfort,</L><L>on a schedule.</L></h2>
          <p data-anim="up" data-d="150">{membership.summary}</p>
          <ul data-stagger="up">{membership.benefits.map(benefit => <li key={benefit.title}><span aria-hidden="true">+</span><div><strong>{benefit.title}</strong>{benefit.description}</div></li>)}</ul>
          <a className="one-button one-button-accent" href="#contact">Join the {membership.title} <Arrow direction="up" /></a>
        </div>
      </div></section>

      <section className="one-section one-trust" aria-labelledby="one-trust-title">
        <div><p className="one-label" data-anim="fade">04 / Rooted in Westchester</p><h2 id="one-trust-title" data-anim="lines"><L>{business.address.city} based.</L><L><span className="a">Westchester trusted.</span></L></h2><p className="one-trust-lead" data-anim="up" data-d="150">A proven track record of reliability, honesty, and uncompromising quality — for 24 years. We thrive on repeats and referrals.</p>
          <dl className="one-stats" data-stagger="up">{stats.map(stat => <div key={stat.label}><dt>{stat.label}</dt><dd><CountUp value={stat.value} /></dd></div>)}</dl></div>
        <div className="one-trust-photo"><Reveal variant="mask" className="px"><img src="/images/team-and-vans.webp" width={2400} height={1600} alt="The Innovative Air team posing in front of their branded service vans" loading="lazy" data-parallax="0.06" /></Reveal><p className="one-areas" data-anim="up" data-d="200"><strong>Serving</strong> {serviceAreas.join(" · ")}</p></div>
      </section>

      <FAQ theme="light" intro="Common questions Westchester County homeowners ask about HVAC services." />
      <ContactSection theme="light" title={<><L>Let’s make your</L><L>home feel right.</L></>} lead={`Tell us what needs attention. Get a free quote, or call — ${business.emergency} is available.`} />
    </main>
    <SiteFooter theme="light" closing={<><L>Comfort starts</L><L><span className="a">with a conversation.</span></L></>} />
  </div>;
}
