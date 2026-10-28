"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { L } from "@/components/motion";
import { fullAddress, siteContent } from "@/content/site";
import { siteSettings } from "@/lib/site-settings";
import { buildEmailDraft, isAcceptedResponse, validateInquiry, type Inquiry } from "@/lib/contact";

type Theme = "light" | "dark";

export function Arrow({ className = "", direction = "right" }: { className?: string; direction?: string }) {
  return <svg className={`arrow-icon ${className}`} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={direction === "up" || direction === "diagonal" ? { transform: "rotate(-45deg)" } : direction === "down" ? { transform: "rotate(90deg)" } : undefined}><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

/** The client's original logo, unaltered. On dark surfaces it sits on a white plate. */
export function Logo({ plate = false, className = "" }: { plate?: boolean; className?: string }) {
  const { src, width, height, alt } = siteContent.logo;
  return <span className={`logo ${plate ? "logo-plate" : ""} ${className}`}><img src={src} width={width} height={height} alt={alt} /></span>;
}

export function SiteHeader({ theme }: { theme: Theme }) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    panel.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") { setOpen(false); trigger.current?.focus(); }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);
  const { phone, phoneHref } = siteContent.business;
  return <header className={`site-header theme-${theme}`}>
    <div className="header-inner">
      <a className="brand-link" href="#top" aria-label={`${siteContent.business.name} home`}><Logo plate={theme === "dark"} /></a>
      <nav className="desktop-nav" aria-label="Main navigation">{siteContent.nav.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}<a className="header-phone" href={phoneHref}>{phone}</a></nav>
      <a className="header-cta" href="#contact">Request service <Arrow /></a>
      <button ref={trigger} type="button" className="mobile-toggle" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}<span aria-hidden="true">{open ? "−" : "+"}</span></button>
    </div>
    {open && <div id="mobile-navigation" ref={panel} className="mobile-navigation"><nav aria-label="Mobile navigation">{siteContent.nav.map(item => <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}<Arrow /></a>)}<a href="#contact" onClick={() => setOpen(false)}>Request service<Arrow /></a><a href={phoneHref}>Call {phone}<Arrow /></a></nav></div>}
  </header>;
}

export function FAQ({ theme, intro }: { theme: Theme; intro: string }) {
  return <section className={`faq-section theme-${theme}`} id="questions" aria-labelledby="faq-heading"><div className="faq-layout">
    <div className="faq-heading"><div className="section-kicker" data-anim="fade">A little clarity</div><h2 id="faq-heading" data-anim="lines"><L>Good questions.</L><L><span className="a">Clear answers.</span></L></h2><p data-anim="up" data-d="200">{intro}</p></div>
    <div className="faq-list" data-stagger="up">{siteContent.faqs.map((faq, index) => <details key={faq.question} open={index === 0}><summary><span className="faq-number">0{index + 1}</span><span>{faq.question}</span><span className="faq-plus" aria-hidden="true" /></summary><p>{faq.answer}</p></details>)}</div>
  </div></section>;
}

export function ContactSection({ theme, title, lead, aside }: { theme: Theme; title: ReactNode; lead: string; aside?: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [status, setStatus] = useState<"idle" | "working" | "draft" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const { email, phone, phoneHref, hours, emergency, address } = siteContent.business;
  // An unhydrated form must not fall back to a native GET with inquiry text
  // in the URL. Phone and direct email remain available without client JavaScript.
  useEffect(() => { setHydrated(true); }, []);
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!hydrated || status === "working") return;
    const form = event.currentTarget;
    const values = new FormData(form);
    const inquiry: Inquiry = { name: String(values.get("name") || ""), email: String(values.get("email") || ""), phone: String(values.get("phone") || ""), service: String(values.get("service") || ""), message: String(values.get("message") || ""), website: String(values.get("website") || "") };
    const error = validateInquiry(inquiry);
    if (error) { setStatus("error"); setMessage(error); form.querySelector<HTMLElement>(":invalid")?.focus(); return; }
    if (siteSettings.contactMode === "email") {
      window.location.href = buildEmailDraft(email, inquiry);
      setStatus("draft"); setMessage(`Your email draft is ready. Send it from your email app to complete your request. If no app opened, call ${phone} or email ${email}.`);
      return;
    }
    setStatus("working"); setMessage("");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch(siteSettings.contactEndpoint!, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...inquiry, formId: "service-request", submissionId: crypto.randomUUID() }), signal: controller.signal, credentials: "omit" });
      const result: unknown = await response.json();
      if (!response.ok || !isAcceptedResponse(result)) throw new Error("The server did not confirm your request.");
      setStatus("success"); setMessage("Your request was received. The Innovative Air team will be in touch."); form.reset();
    } catch {
      setStatus("error"); setMessage(`We couldn’t confirm delivery. Please try again or call ${phone}. Your message is still here.`);
    } finally { window.clearTimeout(timeout); }
  }
  return <section className={`contact-section theme-${theme}`} id="contact" aria-labelledby="contact-heading"><div className="contact-inner">
    <div className="contact-copy">
      <div className="section-kicker" data-anim="fade">Let’s talk about your home</div>
      <h2 id="contact-heading" data-anim="lines">{title}</h2>
      <p className="contact-lead" data-anim="up" data-d="150">{lead}</p>
      <a className="contact-phone" href={phoneHref} data-anim="up" data-d="250">{phone}<Arrow direction="up" /></a>
      <dl className="contact-details" data-stagger="up">
        <div><dt>Hours</dt><dd>{hours} · {emergency}</dd></div>
        <div><dt>Email</dt><dd><a href={`mailto:${email}`}>{email}</a></dd></div>
        <div><dt>Find us in {address.city}</dt><dd>{fullAddress}</dd></div>
      </dl>
      {aside}
    </div>
    <form className="inquiry-form" onSubmit={onSubmit} aria-label="Service request" noValidate data-anim="left">
      <p className="form-title">Request a free quote</p>
      <div className="form-two"><label>Your name<input name="name" autoComplete="name" placeholder="Full name" required minLength={2} maxLength={120} /></label><label>What can we help with?<select name="service" defaultValue=""><option value="">Not sure yet</option>{siteContent.services.map(service => <option key={service.id} value={service.title}>{service.title}</option>)}</select></label></div>
      <div className="form-two"><label>Email address<input name="email" type="email" autoComplete="email" placeholder="you@email.com" required maxLength={254} /></label><label><span>Phone number <span className="optional">(optional)</span></span><input name="phone" type="tel" autoComplete="tel" placeholder="(914) 555-0123" maxLength={30} /></label></div>
      <label>What’s going on?<textarea name="message" rows={4} minLength={10} maxLength={4000} placeholder="Your town, your system, and what you’re noticing" required /></label>
      <div className="honey-field" aria-hidden="true"><label>Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <button type="submit" className="form-submit" disabled={!hydrated || status === "working"}>{status === "working" ? "Sending…" : siteSettings.contactMode === "email" ? "Open email draft" : "Request a free quote"}<Arrow /></button>
      <p className="form-helper">{siteSettings.contactMode === "email" ? "This opens your email app with your request. Nothing is sent until you press Send there. For emergencies, please call." : "Your details are sent to our configured request service when you submit. For emergencies, please call."}</p>
      <noscript><p className="form-helper">Call <a href={phoneHref}>{phone}</a> or email <a href={`mailto:${email}`}>{email}</a>.</p></noscript>
      <p className={`form-status status-${status}`} role="status" aria-live="polite">{message}</p>
    </form>
  </div></section>;
}

export function SiteFooter({ theme, closing, wordmark = false }: { theme: Theme; closing: ReactNode; wordmark?: boolean }) {
  const { legalName, phone, phoneHref, email, hours, emergency, address, licenses, description } = siteContent.business;
  return <footer className={`site-footer theme-${theme}`}><div className="footer-inner">
    <div className="footer-closing"><p className="footer-statement" data-anim="lines">{closing}</p><div className="footer-actions" data-anim="up" data-d="250"><a className="footer-cta" href="#contact">Request service <Arrow /></a><a className="footer-call" href={phoneHref}>Call {phone}</a></div></div>
    <div className="footer-grid" data-stagger="up">
      <div className="footer-brand"><a href="#top" aria-label="Back to top"><Logo plate /></a><p>{description.split(". ")[0]}. Based in {address.city}, {address.region}.</p></div>
      <div><h2>How we can help</h2><ul>{siteContent.services.map(service => <li key={service.id}><a href="#services">{service.title}</a></li>)}<li><a href="#maintenance">Maintenance Club</a></li></ul></div>
      <div><h2>Talk to {siteContent.business.name}</h2><a className="footer-phone" href={phoneHref}>{phone}</a><ul><li><a href={`mailto:${email}`}>{email}</a></li><li>{address.street}</li><li>{address.city}, {address.region} {address.postalCode}</li><li>{hours} · {emergency}</li></ul></div>
      <div><h2>A little more</h2><ul><li><a href="#about">About</a></li><li><a href="#questions">Common questions</a></li><li><a href={siteContent.business.url} rel="noopener">Current website ↗</a></li><li><a href="#contact">Request service</a></li></ul></div>
    </div>
    {wordmark && <p className="footer-wordmark" aria-hidden="true" data-anim="lines"><L>Innovative<span className="a">Air</span></L></p>}
    <div className="footer-bottom"><span>© {new Date().getFullYear()} {legalName}. All rights reserved. · Licenses {licenses.join(" · ")}</span><span>Prepared by ElevenChase</span><a href="#top">Back to top ↑</a></div>
  </div></footer>;
}

export function DesignSwitcher({ active }: { active: "design-1" | "design-2" }) {
  if (siteSettings.isProduction) return null;
  return <nav className="design-switcher" aria-label="Design review navigation"><Link className="switcher-back" href="/" aria-label="Back to both designs"><span aria-hidden="true">⊞</span><span>All designs</span></Link><span className="switcher-divider" /><Link href="/design-1/" aria-current={active === "design-1" ? "page" : undefined}>01 <span>Neighborhood</span></Link><Link href="/design-2/" aria-current={active === "design-2" ? "page" : undefined}>02 <span>Comfort, Handled</span></Link></nav>;
}
