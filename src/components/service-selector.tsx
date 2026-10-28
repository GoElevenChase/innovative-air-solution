"use client";

import { useState } from "react";
import { siteContent } from "@/content/site";
import { Arrow } from "@/components/shared";
import { L } from "@/components/motion";

/** Design 1's "find the right service" panel: a tab list of every service line. */
export function ServiceSelector() {
  const [active, setActive] = useState(0);
  const service = siteContent.services[active];
  const { phone, phoneHref, emergency } = siteContent.business;
  function onKey(event: React.KeyboardEvent<HTMLDivElement>) {
    const count = siteContent.services.length;
    const next = event.key === "ArrowDown" || event.key === "ArrowRight" ? (active + 1) % count : event.key === "ArrowUp" || event.key === "ArrowLeft" ? (active - 1 + count) % count : null;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    event.currentTarget.querySelectorAll<HTMLButtonElement>("[role=tab]")[next]?.focus();
  }
  return <div className="one-selector">
    <div className="one-selector-list">
      <p className="one-label">Heating, cooling, plumbing or more</p>
      <div role="tablist" aria-label="Services" aria-orientation="vertical" onKeyDown={onKey}>
        {siteContent.services.map((item, index) => <button key={item.id} type="button" role="tab" id={`one-tab-${item.id}`} aria-selected={index === active} aria-controls="one-service-panel" tabIndex={index === active ? 0 : -1} onClick={() => setActive(index)}><small>0{index + 1}</small>{item.title}<Arrow direction="up" /></button>)}
      </div>
    </div>
    <div className="one-selector-detail">
      <h2 className="one-selector-title" data-anim="lines"><L>Find the right service.</L></h2>
      <div id="one-service-panel" role="tabpanel" aria-labelledby={`one-tab-${service.id}`} key={service.id} className="one-panel-swap">
        <p className="one-label one-label-accent">0{active + 1} · {service.title}</p>
        <h3>{service.title} for Westchester County homes.</h3>
        <p>{service.summary}</p>
        <ul className="one-chips">{service.details.map(detail => <li key={detail}>{detail}</li>)}</ul>
        <div className="one-selector-actions"><a className="one-button" href="#contact">Request this service <Arrow /></a><a className="one-selector-call" href={phoneHref}><small>Prefer to talk? {emergency}</small>{phone}</a></div>
      </div>
    </div>
  </div>;
}
