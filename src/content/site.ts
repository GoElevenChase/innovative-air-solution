/**
 * The shared business content for both visual directions.
 * Every fact here comes from innovativeairsolutions.com (reviewed 2026-10-29).
 * Keep genuine business information here so changing a design never changes the offer.
 */
export interface ServiceLine {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly details: readonly string[];
  readonly image: string;
  readonly alt: string;
}

export interface SiteContent {
  readonly business: {
    readonly name: string;
    readonly legalName: string;
    readonly email: string;
    readonly phone: string;
    readonly phoneHref: string;
    readonly url: string;
    readonly tagline: string;
    readonly slogan: string;
    readonly description: string;
    readonly address: { readonly street: string; readonly city: string; readonly region: string; readonly postalCode: string };
    readonly hours: string;
    readonly emergency: string;
    readonly region: string;
    readonly licenses: readonly string[];
  };
  readonly logo: { readonly src: string; readonly width: number; readonly height: number; readonly alt: string };
  readonly services: readonly ServiceLine[];
  readonly alsoOffered: readonly string[];
  readonly principles: readonly { readonly title: string; readonly description: string }[];
  readonly process: readonly { readonly id: string; readonly title: string; readonly description: string }[];
  readonly membership: {
    readonly title: string;
    readonly summary: string;
    readonly benefits: readonly { readonly title: string; readonly description: string }[];
  };
  readonly guarantees: readonly { readonly title: string; readonly description: string }[];
  readonly stats: readonly { readonly value: string; readonly label: string }[];
  readonly rating: { readonly score: string; readonly label: string };
  readonly serviceAreas: readonly string[];
  readonly faqs: readonly { readonly question: string; readonly answer: string }[];
  readonly nav: readonly { readonly label: string; readonly href: string }[];
}

export const siteContent: SiteContent = {
  business: {
    name: "Innovative Air",
    legalName: "Innovative Air Solutions Inc.",
    email: "info@innovativeairsolutions.com",
    phone: "(914) 801-8002",
    phoneHref: "tel:+19148018002",
    url: "https://innovativeairsolutions.com",
    tagline: "Heating, Cooling & Home Services for Westchester County",
    slogan: "Done once. Done right.",
    description:
      "Heating, cooling, plumbing, insulation, indoor air quality, and electrical services for Westchester County homes. Honest solutions, clear communication, certified techs, and up-front pricing.",
    address: { street: "11 Kimball Place", city: "Mount Vernon", region: "NY", postalCode: "10550" },
    hours: "Mon–Fri, 9am–5pm",
    emergency: "24/7 emergency service",
    region: "Westchester County",
    licenses: ["WC-19145-H07", "NYC-1332987-DCA", "CT-HTG.0397794-S1", "PC-120"],
  },
  logo: {
    src: "/brand/innovative-air-logo.png",
    width: 1235,
    height: 399,
    alt: "Innovative Air — Heating, Cooling, Plumbing, Insulation, Electrical, Duct Cleaning",
  },
  services: [
    {
      id: "heating",
      title: "Heating",
      summary:
        "We’ll make sure your home stays warm with top-notch heating services for furnaces, heat pumps, and boilers. “Done Once, Done Right” is the Innovative Air way.",
      details: ["Furnace & boiler repair", "Heater maintenance", "Furnace & boiler installation"],
      image: "/images/techs-exterior-wall.webp",
      alt: "Two Innovative Air technicians measuring along the exterior wall of a home",
    },
    {
      id: "cooling",
      title: "Cooling",
      summary:
        "Our attention to the smallest details ensures you premium-quality AC repair, maintenance, or replacement. At Innovative Air, we help you beat the heat.",
      details: ["AC repair", "AC maintenance", "AC installation"],
      image: "/images/ac-condenser-repair.webp",
      alt: "An Innovative Air technician servicing an outdoor air conditioning condenser",
    },
    {
      id: "plumbing",
      title: "Plumbing",
      summary:
        "Need plumbing maintenance, repair, or installation? Our expert technicians provide precision workmanship and a low-stress experience.",
      details: ["Plumbing repair", "Plumbing maintenance", "Plumbing installation"],
      image: "/images/boiler-pipework.webp",
      alt: "An Innovative Air technician working on boiler pipework and valves",
    },
    {
      id: "insulation",
      title: "Insulation",
      summary:
        "Make your home more efficient and comfortable with services such as air sealing, crawl space encapsulation, and attic insulation.",
      details: ["Attic insulation & makeover", "Air sealing", "Crawl space encapsulation"],
      image: "/images/attic-insulation.webp",
      alt: "A technician wearing a headlamp working on insulation in an attic",
    },
    {
      id: "air-quality",
      title: "Indoor air quality",
      summary:
        "Make your home’s air cleaner and safer with IAQ services like duct cleaning, duct sealing, air filtration, and humidification and dehumidification.",
      details: ["Duct cleaning & sanitizing", "Aeroseal duct sealing", "Air filtration & purification", "Humidification & dehumidification"],
      image: "/images/duct-cleaning.webp",
      alt: "An Innovative Air technician cleaning and sanitizing a wall-mounted air handler",
    },
    {
      id: "electrical",
      title: "Electrical",
      summary: "Licensed electrical services for your home, from the same team that handles your heating, cooling, and plumbing.",
      details: ["Electrical services"],
      image: "/images/tech-with-van.webp",
      alt: "An Innovative Air technician standing beside a branded service van",
    },
  ],
  alsoOffered: ["Duct cleaning & sanitizing", "Aeroseal duct sealing", "Crawl space encapsulation"],
  principles: [
    {
      title: "Superior products.",
      description: "Every product we use is vetted first. We install proven, industry-leading HVAC brands like Trane, Daikin, and Burnham.",
    },
    {
      title: "Attention to detail.",
      description: "Trained, certified, experienced technicians who refuse to cut a single corner — and are passionate about doing things right.",
    },
    {
      title: "Clear communication.",
      description: "Consistent, crystal-clear communication is our calling card. We keep you in the loop every step of the way, and we know how to listen.",
    },
  ],
  process: [
    {
      id: "reach-out",
      title: "Tell us what needs attention.",
      description: "Call (914) 801-8002, book online, or request a free quote. Emergency service is available 24/7.",
    },
    {
      id: "options",
      title: "Get honest options and up-front pricing.",
      description: "A certified technician evaluates your system, your comfort preferences, and your budget, then explains your options clearly.",
    },
    {
      id: "done-right",
      title: "Done once. Done right.",
      description: "The work is completed with proven brands and attention to detail, backed by our Worry-Free Guarantees.",
    },
  ],
  membership: {
    title: "Maintenance Club",
    summary: "When you join Innovative Air’s Maintenance Club, you never have to worry about your heating or AC system again.",
    benefits: [
      { title: "Annual maintenance", description: "One heating and one AC tune-up per year." },
      { title: "“Fast Pass” service", description: "Members receive priority service over non-members." },
      { title: "Exclusive discounts", description: "Members-only discounts and savings." },
      { title: "Free service charge", description: "No $99 service fee during business hours." },
    ],
  },
  guarantees: [
    { title: "“No Lemon” Heating", description: "If the heat exchanger in your furnace fails in the first ten years, we will install a new furnace." },
    { title: "“No Lemon” AC", description: "If your compressor fails twice in the first five years, we will install a complete new outside unit." },
    { title: "Performance", description: "Your new system will be accurately sized and maintain the proper temperature based on industry standards." },
    { title: "Satisfaction", description: "Our technicians will provide a pleasant experience, and you’ll be satisfied with the results." },
  ],
  stats: [
    { value: "16,173+", label: "Projects completed" },
    { value: "24", label: "Years in business" },
    { value: "1,000+", label: "5-star online reviews" },
    { value: "4,261", label: "Repeat customers" },
  ],
  rating: { score: "4.9", label: "Google rating · 1,000+ reviews" },
  serviceAreas: [
    "Mount Vernon", "New Rochelle", "Scarsdale", "Bronxville", "Eastchester", "Larchmont", "Mamaroneck", "Rye",
    "Harrison", "Port Chester", "Pelham", "Tuckahoe", "Hastings-on-Hudson", "Dobbs Ferry", "Armonk", "Bedford",
    "Katonah", "Greenwich, CT",
  ],
  faqs: [
    {
      question: "How often should I have my unit serviced?",
      answer:
        "We recommend getting your HVAC system inspected annually to avoid issues. Our tune-ups include inspection, lubrication of parts, and replacement or repair of any necessary components.",
    },
    {
      question: "How much will replacing my HVAC system cost?",
      answer:
        "There are no hard and fast rules. We consider your home size, the labor involved — including whether your ductwork needs to be redone — and the system you choose. Contact us for a free quote.",
    },
    {
      question: "Why should I replace my heating and cooling system?",
      answer:
        "Signs of an aging system include over-exerting to keep your home comfortable, utility bills that spike without more use, and constant repairs. If you notice these, a new, efficient system may be worth considering.",
    },
    {
      question: "How do I choose the right system for my needs?",
      answer:
        "Leave that to us. Our qualified HVAC professionals evaluate the size of your home, your comfort preferences, and your budget, and recommend a system that fits.",
    },
    {
      question: "What are the most common HVAC issues?",
      answer:
        "Poor airflow, uneven heating and cooling, leaky ducts, a constantly running system, and unusual noises during operation. If you notice any of these, call us — we’ll evaluate the issue and discuss your options.",
    },
  ],
  nav: [
    { label: "Services", href: "#services" },
    { label: "Maintenance Club", href: "#maintenance" },
    { label: "About", href: "#about" },
    { label: "Questions", href: "#questions" },
  ],
};

export const fullAddress = `${siteContent.business.address.street}, ${siteContent.business.address.city}, ${siteContent.business.address.region} ${siteContent.business.address.postalCode}`;
