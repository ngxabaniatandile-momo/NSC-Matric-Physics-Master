import React, { useState, useEffect, useRef, useMemo } from 'react';

const customScrollbarStyles = `
  /* Slim glassmorphic scrollbars */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    background: rgba(15, 23, 42, 0.6);
    border-radius: 9999px;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(99, 102, 241, 0.35);
    border-radius: 9999px;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(99, 102, 241, 0.65);
  }
  /* Firefox */
  * {
    scrollbar-width: thin;
    scrollbar-color: rgba(99, 102, 241, 0.35) rgba(15, 23, 42, 0.6);
  }
  /* Hide scrollbar utility */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  /* Print Optimization for Load-Shedding Revision */
  @media print {
    body {
      background: #ffffff !important;
      color: #000000 !important;
    }
    .no-print {
      display: none !important;
    }
    .print-only {
      display: block !important;
    }
  }
  @media screen {
    .print-only {
      display: none !important;
    }
  }
`;

const Icon = ({ name, className = "w-5 h-5", ...props }) => {
  switch (name) {
    case 'atom':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <circle cx="12" cy="12" r="2" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      );
    case 'flame':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
        </svg>
      );
    case 'zap':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case 'book':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      );
    case 'calculator':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <line x1="8" y1="6" x2="16" y2="6" />
          <line x1="16" y1="14" x2="16" y2="18" />
          <path d="M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M8 18h.01M12 18h.01" />
        </svg>
      );
    case 'fileText':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      );
    case 'search':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      );
    case 'bot':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <rect x="3" y="11" width="18" height="10" rx="2" />
          <circle cx="12" cy="5" r="2" />
          <path d="M12 7v4" />
          <line x1="8" y1="16" x2="8" y2="16.01" />
          <line x1="16" y1="16" x2="16" y2="16.01" />
        </svg>
      );
    case 'users':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case 'card':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M7 15h10M7 9h4" />
        </svg>
      );
    case 'activity':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      );
    case 'check':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <polyline points="20 6 9 17 4 12" />
        </svg>
      );
    case 'alert':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      );
    case 'volume':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
      );
    case 'download':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      );
    case 'print':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <polyline points="6 9 6 2 18 2 18 9" />
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
          <rect x="6" y="14" width="12" height="8" />
        </svg>
      );
    case 'lock':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      );
    case 'unlock':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 9.9-1" />
        </svg>
      );
    case 'wifiOff':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <line x1="1" y1="1" x2="23" y2="23" />
          <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
          <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
          <path d="M10.71 5.05A16 16 0 0 1 22.58 9" />
          <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
          <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
          <line x1="12" y1="20" x2="12.01" y2="20" />
        </svg>
      );
    default:
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
};

const CAPS_TOPICS = [
  // PAPER 1: PHYSICS
  {
    id: 'p1_newton',
    paper: 'Paper 1 (Physics)',
    title: "Newton's Laws & Application",
    weight: '32 ± 3 Marks',
    mastery: 84,
    pioneer: 'Sir Isaac Newton (1687)',
    quote: 'To every action there is always opposed an equal reaction; or the mutual actions of two bodies upon each other are always equal.',
    definition: "Newton's Second Law: When a resultant/net force acts on an object, the object will accelerate in the direction of the force at an acceleration directly proportional to the force and inversely proportional to the mass of the object (Fnet = ma).",
    layman: "Push harder, things speed up faster; make it heavier, and it speeds up slower.",
    examinerTrap: "ALWAYS draw a labeled Free-Body Diagram before writing equations. Never resolve components on the free-body diagram itself; show only actual forces.",
    coreFormulas: ['Fnet = ma', 'fs(max) = μs·N', 'fk = μk·N', 'w = mg']
  },
  {
    id: 'p1_vpm',
    paper: 'Paper 1 (Physics)',
    title: 'Vertical Projectile Motion (1D)',
    weight: '24 ± 3 Marks',
    mastery: 78,
    pioneer: 'Galileo Galilei (1638)',
    quote: 'All bodies, regardless of their weight, accelerate downwards at the exact same constant gravitational rate in free fall.',
    definition: "A projectile is an object which has been given an initial velocity and then moves under the influence of the gravitational force alone.",
    layman: "Anything thrown up or dropped in the air where only Earth's gravity pulls it downwards.",
    examinerTrap: "STATE YOUR SIGN CONVENTION! Choose either UP or DOWN as positive at the start of your calculation and stick to it strictly.",
    coreFormulas: ['vf = vi + a·Δt', 'vf² = vi² + 2a·Δy', 'Δy = vi·Δt + 0.5a·Δt²', 'g = 9.8 m·s⁻² downward']
  },
  {
    id: 'p1_momentum',
    paper: 'Paper 1 (Physics)',
    title: 'Momentum & Impulse',
    weight: '16 ± 2 Marks',
    mastery: 82,
    pioneer: 'René Descartes & John Wallis (1668)',
    quote: 'The total quantity of motion in the universe is conserved in an isolated system.',
    definition: "The total linear momentum of an isolated system remains constant in magnitude and direction. Impulse is the product of the net force acting on an object and the time the net force acts on the object (J = Fnet·Δt = Δp).",
    layman: "Bigger mass moving faster is harder to stop. Cushions increase impact time, lowering the smashing force.",
    examinerTrap: "Do NOT confuse elastic collisions (kinetic energy conserved) with inelastic collisions (kinetic energy converted to heat/sound).",
    coreFormulas: ['p = mv', 'Fnet·Δt = Δp', 'Σp_before = Σp_after', 'Δp = m(vf - vi)']
  },
  {
    id: 'p1_work_energy',
    paper: 'Paper 1 (Physics)',
    title: 'Work, Energy & Power',
    weight: '20 ± 2 Marks',
    mastery: 76,
    pioneer: 'James Prescott Joule (1847)',
    quote: 'Work is the measure of energy transfer when a force displaces an object.',
    definition: "The Work-Energy Theorem states that the net work done on an object is equal to the change in the object's kinetic energy: Wnet = ΔK = Kf - Ki.",
    layman: "Total work done by all pushing and friction forces equals how much kinetic energy the object gains or loses.",
    examinerTrap: "W = F·Δx·cosθ. The angle θ is between the force vector and the direction of displacement!",
    coreFormulas: ['W = F·Δx·cosθ', 'Wnet = ΔEk', 'Wnc = ΔEp + ΔEk', 'P = W/Δt = F·v_avg']
  },
  {
    id: 'p1_doppler',
    paper: 'Paper 1 (Physics)',
    title: 'Doppler Effect',
    weight: '12 ± 2 Marks',
    mastery: 90,
    pioneer: 'Christian Doppler (1842)',
    quote: 'The pitch of a sound changes when the distance between the source and listener is changing.',
    definition: "The change in frequency (or pitch) of the sound detected by a listener because the sound source and the listener have different velocities relative to the medium of sound propagation.",
    layman: "An ambulance siren sounds higher pitched as it rushes towards you and lower pitched as it races away.",
    examinerTrap: "Approaching = observed frequency HIGHER (fL > fs). Receding = observed frequency LOWER (fL < fs).",
    coreFormulas: ['fL = ((v ± vL) / (v ∓ vs)) · fs', 'v_sound = 340 m·s⁻¹ (typical)']
  },
  {
    id: 'p1_circuits',
    paper: 'Paper 1 (Physics)',
    title: 'Electric Circuits & Lost Volts',
    weight: '20 ± 2 Marks',
    mastery: 65,
    pioneer: 'Georg Simon Ohm (1827)',
    quote: 'The current through a conductor between two points is directly proportional to the voltage across the two points.',
    definition: "Emf (electromotive force) is the maximum energy provided by a battery per unit charge passing through it. Internal resistance is the opposition to the flow of charge within the battery itself.",
    layman: "Batteries get warm inside because they have internal resistance, which 'steals' volts before current reaches your bulb.",
    examinerTrap: "Lost volts = I·r. Terminal potential difference V_load = ε - I·r. When the switch is open, I = 0, so Voltmeter reads Emf (ε).",
    coreFormulas: ['ε = I(R_ext + r)', 'V_load = ε - I·r', 'P = VI = I²R = V²/R', '1/R_p = 1/R1 + 1/R2']
  },
  {
    id: 'p1_electrodynamics',
    paper: 'Paper 1 (Physics)',
    title: 'Electrodynamics (Generators/Motors)',
    weight: '16 ± 2 Marks',
    mastery: 72,
    pioneer: 'Michael Faraday (1831)',
    quote: 'An electromotive force is induced when a magnetic flux changes through a circuit.',
    definition: "Faraday's Law of Electromagnetic Induction: The magnitude of the induced emf across a conductor is directly proportional to the rate of change of magnetic flux linkage.",
    layman: "Moving magnets near copper wire generates electricity. AC generators use slip rings; DC motors use split-ring commutators.",
    examinerTrap: "Slip rings = AC (Alternating Current). Split-ring commutator = DC (Direct Current). Motors convert electrical to mechanical; generators do the opposite.",
    coreFormulas: ['ε = -N(ΔΦ/Δt)', 'I_rms = I_max / √2', 'V_rms = V_max / √2', 'P_avg = V_rms · I_rms']
  },
  {
    id: 'p1_photoelectric',
    paper: 'Paper 1 (Physics)',
    title: 'Photoelectric Effect',
    weight: '12 ± 2 Marks',
    mastery: 86,
    pioneer: 'Albert Einstein (1905)',
    quote: 'Light consists of localized packets of energy called photons: E = hf.',
    definition: "The process whereby electrons are ejected from a metal surface when light of suitable frequency is incident on that surface.",
    layman: "Photons of light hit a metal plate and knock out electrons like billiard balls if the light has high enough frequency.",
    examinerTrap: "Increasing light INTENSITY increases the NUMBER of photoelectrons emitted per second, but does NOT increase their kinetic energy.",
    coreFormulas: ['E = hf = W0 + Ek(max)', 'W0 = hf0', 'c = f·λ', 'Ek(max) = 0.5·m·v_max²']
  },

  // PAPER 2: CHEMISTRY
  {
    id: 'p2_organic_nom',
    paper: 'Paper 2 (Chemistry)',
    title: 'Organic Nomenclature & Structures',
    weight: '24 ± 2 Marks',
    mastery: 88,
    pioneer: 'August Kekulé (1858)',
    quote: 'Carbon atoms can bind to one another to form chains of arbitrary length and rings.',
    definition: "A homologous series is a series of organic compounds that can be described by the same general formula OR in which one member differs from the next by a -CH2- group.",
    layman: "Chemical family tree of carbon chains, like alcohols, carboxylic acids, and esters, each with their own suffix and chemical traits.",
    examinerTrap: "Count the longest carbon chain containing the functional group! Always number from the side closest to the functional group.",
    coreFormulas: ['Alkanes: CnH2n+2', 'Alkenes: CnH2n', 'Alcohols: CnH2n+1OH', 'Carboxylic Acids: CnH2n+1COOH']
  },
  {
    id: 'p2_organic_reactions',
    paper: 'Paper 2 (Chemistry)',
    title: 'Organic Reactions & Intermolecular Forces',
    weight: '24 ± 2 Marks',
    mastery: 79,
    pioneer: 'Johannes Diderik van der Waals (1873)',
    quote: 'Molecules interact with forces of attraction dependent on size, polarity, and hydrogen bonding.',
    definition: "Boiling point is the temperature at which the vapour pressure of a substance equals atmospheric pressure.",
    layman: "Carboxylic acids have the highest boiling points because they form TWO hydrogen bonds per molecule.",
    examinerTrap: "Distinguish between addition, elimination, and substitution. Esterification is a condensation reaction requiring concentrated H2SO4 catalyst.",
    coreFormulas: ['Substitution: Alkane → Haloalkane', 'Elimination (Dehydrohalogenation): Haloalkane → Alkene', 'Ester: Alcohol + Acid']
  },
  {
    id: 'p2_reaction_rates',
    paper: 'Paper 2 (Chemistry)',
    title: 'Reaction Rates & Energy Profiles',
    weight: '18 ± 2 Marks',
    mastery: 81,
    pioneer: 'Svante Arrhenius (1889)',
    quote: 'Molecules must possess a minimum activation energy to collide effectively and react.',
    definition: "Collision Theory: For a reaction to occur, particles must collide with correct orientation and with energy equal to or greater than the activation energy (Ea).",
    layman: "To react, molecules must smash together hard enough and at the right angle. Catalysts lower the energy barrier.",
    examinerTrap: "A positive catalyst provides an alternative pathway with LOWER activation energy. It does NOT shift equilibrium or increase yield!",
    coreFormulas: ['Rate = Δ[product] / Δt', 'Maxwell-Boltzmann Distribution', 'ΔH = E_products - E_reactants']
  },
  {
    id: 'p2_equilibrium',
    paper: 'Paper 2 (Chemistry)',
    title: 'Chemical Equilibrium & Kc',
    weight: '22 ± 2 Marks',
    mastery: 62,
    pioneer: 'Henri Le Chatelier (1884)',
    quote: 'When an external stress is applied to a dynamic equilibrium, the system will adjust itself to minimize that stress.',
    definition: "Open vs Closed System: A closed system is isolated from its surroundings such that matter cannot enter or escape, allowing dynamic equilibrium where rate of forward reaction equals rate of reverse reaction.",
    layman: "Balancing act in a sealed jar: push on one side (pressure, temperature, concentration), and the reaction shifts to push back.",
    examinerTrap: "ONLY TEMPERATURE changes the numerical value of Kc! Pressure and concentration shifts change yields, but NOT Kc.",
    coreFormulas: ['Kc = [products]^p / [reactants]^r', 'RICE Table: Ratio, Initial, Change, Equilibrium']
  },
  {
    id: 'p2_acids_bases',
    paper: 'Paper 2 (Chemistry)',
    title: 'Acids, Bases & Volumetric Titrations',
    weight: '20 ± 2 Marks',
    mastery: 70,
    pioneer: 'Johannes Brønsted & Thomas Lowry (1923)',
    quote: 'An acid is a proton (H+) donor; a base is a proton acceptor.',
    definition: "An ampholyte (amphiprotic substance) is a substance that can act as either an acid or a base (e.g. water H2O or hydrogen carbonate HCO3-).",
    layman: "Acids give away protons; bases catch them. In titrations, you drop base into acid until the indicator flips colour.",
    examinerTrap: "Watch out for diprotic acids like H2SO4! Ratio is 1:2 when reacting with NaOH. (ca·Va)/(cb·Vb) = na/nb.",
    coreFormulas: ['pH = -log[H3O+]', 'Kw = [H3O+][OH-] = 1.0 × 10⁻¹⁴', '(ca·Va)/(cb·Vb) = na/nb']
  },
  {
    id: 'p2_electrochem',
    paper: 'Paper 2 (Chemistry)',
    title: 'Electrochemical Cells (Galvanic vs Electrolytic)',
    weight: '20 ± 2 Marks',
    mastery: 74,
    pioneer: 'Alessandro Volta (1800)',
    quote: 'Chemical energy can be converted spontaneously into electric current via redox half-reactions.',
    definition: "Oxidation is the loss of electrons (Anode). Reduction is the gain of electrons (Cathode). An Ox and Red Cat.",
    layman: "Galvanic cells produce electricity from chemical reactions. Electrolytic cells consume electricity to split compounds.",
    examinerTrap: "In Galvanic cells, the Anode is negative and Cathode is positive. In Electrolytic cells, the Anode is POSITIVE and Cathode is NEGATIVE!",
    coreFormulas: ['E°cell = E°cathode - E°anode', 'Salt bridge: maintains electrical neutrality']
  },
  {
    id: 'p2_fertilizers',
    paper: 'Paper 2 (Chemistry)',
    title: 'Chemical Industry & Fertilizers',
    weight: '12 ± 2 Marks',
    mastery: 85,
    pioneer: 'Fritz Haber & Carl Bosch (1909)',
    quote: 'Fixing atmospheric nitrogen into ammonia enabled the modern global fertilizer industry.',
    definition: "Eutrophication is the process where an aquatic ecosystem becomes enriched with excess plant nutrients (nitrates and phosphates), causing an algal bloom that depletes dissolved oxygen when decomposing.",
    layman: "Making plant food (NPK: Nitrogen, Phosphorus, Potassium). Runoff into rivers causes green scum and suffocates fish.",
    examinerTrap: "Haber process = Ammonia (N2 + 3H2 ⇌ 2NH3). Contact process = Sulfuric acid (V2O5 catalyst). Ostwald process = Nitric acid (Pt catalyst).",
    coreFormulas: ['NPK Ratio: %N = (N_val / Total_NPK) × %Fertilizer', 'Haber: Fe catalyst, 450°C, 200 atm']
  }
];

const DBE_CONSTANTS_TABLE = [
  { name: 'Acceleration due to gravity', sym: 'g', val: '9.8 m·s⁻²' },
  { name: 'Speed of light in a vacuum', sym: 'c', val: '3.0 × 10⁸ m·s⁻¹' },
  { name: "Planck's constant", sym: 'h', val: '6.63 × 10⁻³⁴ J·s' },
  { name: 'Gravitational constant', sym: 'G', val: '6.67 × 10⁻¹¹ N·m²·kg⁻²' },
  { name: "Coulomb's constant", sym: 'k', val: '9.0 × 10⁹ N·m²·C⁻²' },
  { name: 'Charge on electron', sym: 'e', val: '-1.6 × 10⁻¹⁹ C' },
  { name: 'Electron mass', sym: 'm_e', val: '9.11 × 10⁻³¹ kg' },
  { name: 'Universal gas constant', sym: 'R', val: '8.31 J·K⁻¹·mol⁻¹' },
  { name: "Avogadro's constant", sym: 'N_A', val: '6.02 × 10²³ mol⁻¹' },
  { name: 'Standard molar volume of gas at STP', sym: 'V_m', val: '22.4 dm³·mol⁻¹' },
  { name: 'Ion product of water at 298 K', sym: 'K_w', val: '1.0 × 10⁻¹⁴' }
];

const DBE_FORMULAS_CATALOG = [
  {
    category: 'Motion & Mechanics (Paper 1)',
    formulas: [
      'vf = vi + a·Δt',
      'Δx = vi·Δt + 0.5a·Δt²',
      'vf² = vi² + 2a·Δx',
      'Δx = ((vi + vf) / 2) · Δt',
      'Fnet = ma',
      'p = mv',
      'Fnet·Δt = Δp = m·vf - m·vi',
      'w = mg',
      'fs(max) = μs·N',
      'fk = μk·N'
    ]
  },
  {
    category: 'Work, Energy & Power (Paper 1)',
    formulas: [
      'W = F·Δx·cosθ',
      'Wnet = ΔEk = 0.5m·vf² - 0.5m·vi²',
      'Wnc = ΔEp + ΔEk',
      'P = W / Δt',
      'Pave = F·v_ave'
    ]
  },
  {
    category: 'Waves, Sound & Light (Paper 1)',
    formulas: [
      'v = f·λ',
      'fL = ((v ± vL) / (v ∓ vs)) · fs',
      'E = hf',
      'E = hc / λ',
      'E = W0 + Ek(max)',
      'W0 = hf0',
      'Ek(max) = 0.5m·v_max²'
    ]
  },
  {
    category: 'Electricity & Magnetism (Paper 1)',
    formulas: [
      'F = k·Q1·Q2 / r²',
      'E = F / q = k·Q / r²',
      'V = W / q',
      'I = Q / Δt',
      'R = V / I',
      'ε = I(R_ext + r) = V_load + V_lost',
      'P = V·I = I²R = V² / R',
      'W = V·I·Δt = I²R·Δt = (V² / R)·Δt',
      'I_rms = I_max / √2',
      'V_rms = V_max / √2',
      'Pave = V_rms · I_rms'
    ]
  },
  {
    category: 'Chemical Stoichiometry & Equilibrium (Paper 2)',
    formulas: [
      'n = m / M',
      'c = n / V = m / (M·V)',
      'n = V / V_m (at STP)',
      'n = N / N_A',
      '(ca · Va) / (cb · Vb) = na / nb',
      'pH = -log[H3O+]',
      'Kw = [H3O+][OH-] = 1.0 × 10⁻¹⁴ (at 298 K)',
      'Kc = [products]^p / [reactants]^r'
    ]
  }
];

const PAST_PAPERS_ARCHIVE = [
  {
    id: 'nsc_2025_nov',
    year: '2025 November Final',
    session: 'November Examination',
    p1Overview: 'Challenging Newton Law inclined plane with connected masses (Q2: 18m) & Doppler blood flow calculation (Q5: 12m).',
    p2Overview: 'Focus on diprotic H2SO4 back-titration (Q7: 15m) and dynamic RICE Kc calculation for Haber Process (Q6: 19m).',
    p1AvgDifficulty: 'Medium-Hard',
    p2AvgDifficulty: 'Challenging',
    p1TopicsFocus: ['Newton Incline', 'VPM Bouncing Ball', 'Lost Volts Circuit'],
    p2TopicsFocus: ['RICE Haber', 'Diprotic Titration', 'Table 4B Daniell']
  },
  {
    id: 'nsc_2024_nov',
    year: '2024 November Final',
    session: 'November Examination',
    p1Overview: 'Vertical projectile motion from moving hot air balloon (Q3: 14m) and AC generator RMS power graph (Q8: 15m).',
    p2Overview: 'Organic boiling point comparisons using branched isomers (Q2: 16m) and membrane electrolytic chlor-alkali (Q9: 13m).',
    p1AvgDifficulty: 'Fair / Standard',
    p2AvgDifficulty: 'Moderate',
    p1TopicsFocus: ['VPM Hot Air Balloon', 'Work-Energy Incline', 'Photoelectric'],
    p2TopicsFocus: ['Organic Isomers', 'Rate Catalysts', 'Fertilizer NPK']
  },
  {
    id: 'nsc_2024_june',
    year: '2024 June Mid-Year',
    session: 'Senior Certificate Examination',
    p1Overview: 'High-emphasis on Work-Energy theorem with non-conservative friction (Q4: 17m) and internal resistance graph (Q6: 18m).',
    p2Overview: 'Contact process V2O5 catalyst energy profile (Q5: 14m) and standard hydrogen electrode SHE comparison (Q8: 16m).',
    p1AvgDifficulty: 'Standard',
    p2AvgDifficulty: 'Fair',
    p1TopicsFocus: ['Work-Energy Theorem', 'Lost Volts Slopes', 'Impulse Collision'],
    p2TopicsFocus: ['Contact Process', 'SHE Potential', 'Esterification']
  },
  {
    id: 'nsc_2023_nov',
    year: '2023 November Final',
    session: 'November Examination',
    p1Overview: 'Complex momentum collision of coupled rail carts with energy loss (Q4: 15m) and Doppler approaching detector (Q5: 11m).',
    p2Overview: 'Extensive RICE table with initial moles unknown (Q6: 21m) and multi-step ester condensation mechanisms (Q3: 18m).',
    p1AvgDifficulty: 'Challenging',
    p2AvgDifficulty: 'High Distinction',
    p1TopicsFocus: ['Momentum Impulse', 'Doppler Siren', 'Electric Circuits'],
    p2TopicsFocus: ['RICE Unknowns', 'Organic Reactions', 'Electrochemistry']
  }
];

const PERIODIC_TABLE_ELEMENTS = [
  { z: 1, sym: 'H', name: 'Hydrogen', mass: 1.01, en: 2.1, cat: 'Nonmetal', group: 1, period: 1 },
  { z: 2, sym: 'He', name: 'Helium', mass: 4.00, en: null, cat: 'Noble Gas', group: 18, period: 1 },
  { z: 3, sym: 'Li', name: 'Lithium', mass: 6.94, en: 1.0, cat: 'Alkali Metal', group: 1, period: 2 },
  { z: 4, sym: 'Be', name: 'Beryllium', mass: 9.01, en: 1.5, cat: 'Alkaline Earth', group: 2, period: 2 },
  { z: 5, sym: 'B', name: 'Boron', mass: 10.81, en: 2.0, cat: 'Metalloid', group: 13, period: 2 },
  { z: 6, sym: 'C', name: 'Carbon', mass: 12.01, en: 2.5, cat: 'Nonmetal', group: 14, period: 2 },
  { z: 7, sym: 'N', name: 'Nitrogen', mass: 14.01, en: 3.0, cat: 'Nonmetal', group: 15, period: 2 },
  { z: 8, sym: 'O', name: 'Oxygen', mass: 16.00, en: 3.5, cat: 'Nonmetal', group: 16, period: 2 },
  { z: 9, sym: 'F', name: 'Fluorine', mass: 19.00, en: 4.0, cat: 'Halogen', group: 17, period: 2 },
  { z: 10, sym: 'Ne', name: 'Neon', mass: 20.18, en: null, cat: 'Noble Gas', group: 18, period: 2 },
  { z: 11, sym: 'Na', name: 'Sodium', mass: 22.99, en: 0.9, cat: 'Alkali Metal', group: 1, period: 3 },
  { z: 12, sym: 'Mg', name: 'Magnesium', mass: 24.31, en: 1.2, cat: 'Alkaline Earth', group: 2, period: 3 },
  { z: 13, sym: 'Al', name: 'Aluminium', mass: 26.98, en: 1.5, cat: 'Post-Transition', group: 13, period: 3 },
  { z: 14, sym: 'Si', name: 'Silicon', mass: 28.09, en: 1.8, cat: 'Metalloid', group: 14, period: 3 },
  { z: 15, sym: 'P', name: 'Phosphorus', mass: 30.97, en: 2.1, cat: 'Nonmetal', group: 15, period: 3 },
  { z: 16, sym: 'S', name: 'Sulfur', mass: 32.07, en: 2.5, cat: 'Nonmetal', group: 16, period: 3 },
  { z: 17, sym: 'Cl', name: 'Chlorine', mass: 35.45, en: 3.0, cat: 'Halogen', group: 17, period: 3 },
  { z: 18, sym: 'Ar', name: 'Argon', mass: 39.95, en: null, cat: 'Noble Gas', group: 18, period: 3 },
  { z: 19, sym: 'K', name: 'Potassium', mass: 39.10, en: 0.8, cat: 'Alkali Metal', group: 1, period: 4 },
  { z: 20, sym: 'Ca', name: 'Calcium', mass: 40.08, en: 1.0, cat: 'Alkaline Earth', group: 2, period: 4 },
  { z: 26, sym: 'Fe', name: 'Iron', mass: 55.85, en: 1.8, cat: 'Transition Metal', group: 8, period: 4 },
  { z: 29, sym: 'Cu', name: 'Copper', mass: 63.55, en: 1.9, cat: 'Transition Metal', group: 11, period: 4 },
  { z: 30, sym: 'Zn', name: 'Zinc', mass: 65.38, en: 1.6, cat: 'Transition Metal', group: 12, period: 4 },
  { z: 35, sym: 'Br', name: 'Bromine', mass: 79.90, en: 2.8, cat: 'Halogen', group: 17, period: 4 },
  { z: 47, sym: 'Ag', name: 'Silver', mass: 107.87, en: 1.9, cat: 'Transition Metal', group: 11, period: 5 },
  { z: 53, sym: 'I', name: 'Iodine', mass: 126.90, en: 2.5, cat: 'Halogen', group: 17, period: 5 },
  { z: 79, sym: 'Au', name: 'Gold', mass: 196.97, en: 2.4, cat: 'Transition Metal', group: 11, period: 6 },
  { z: 82, sym: 'Pb', name: 'Lead', mass: 207.20, en: 1.8, cat: 'Post-Transition', group: 14, period: 6 }
];

const TABLE_4B_REDOX = [
  { halfReaction: 'F2(g) + 2e⁻ ⇌ 2F⁻', e0: 2.87, agent: 'Strongest Oxidising Agent' },
  { halfReaction: 'MnO4⁻ + 8H⁺ + 5e⁻ ⇌ Mn²⁺ + 4H2O', e0: 1.51, agent: 'Strong Oxidising Agent' },
  { halfReaction: 'Cl2(g) + 2e⁻ ⇌ 2Cl⁻', e0: 1.36, agent: 'Strong Oxidising Agent' },
  { halfReaction: 'O2(g) + 4H⁺ + 4e⁻ ⇌ 2H2O', e0: 1.23, agent: 'Oxidising Agent' },
  { halfReaction: 'Ag⁺ + e⁻ ⇌ Ag(s)', e0: 0.80, agent: 'Common Cathode' },
  { halfReaction: 'Fe³⁺ + e⁻ ⇌ Fe²⁺', e0: 0.77, agent: 'Redox Pair' },
  { halfReaction: 'I2(s) + 2e⁻ ⇌ 2I⁻', e0: 0.54, agent: 'Moderate' },
  { halfReaction: 'Cu²⁺ + 2e⁻ ⇌ Cu(s)', e0: 0.34, agent: 'Standard Daniell Cathode' },
  { halfReaction: '2H⁺ + 2e⁻ ⇌ H2(g)', e0: 0.00, agent: 'Standard Hydrogen Electrode (SHE Reference)' },
  { halfReaction: 'Pb²⁺ + 2e⁻ ⇌ Pb(s)', e0: -0.13, agent: 'Moderate Reducing' },
  { halfReaction: 'Sn²⁺ + 2e⁻ ⇌ Sn(s)', e0: -0.14, agent: 'Moderate Reducing' },
  { halfReaction: 'Ni²⁺ + 2e⁻ ⇌ Ni(s)', e0: -0.27, agent: 'Moderate Reducing' },
  { halfReaction: 'Fe²⁺ + 2e⁻ ⇌ Fe(s)', e0: -0.44, agent: 'Corrosion Target' },
  { halfReaction: 'Zn²⁺ + 2e⁻ ⇌ Zn(s)', e0: -0.76, agent: 'Standard Daniell Anode' },
  { halfReaction: 'Al³⁺ + 3e⁻ ⇌ Al(s)', e0: -1.66, agent: 'Strong Reducing Agent' },
  { halfReaction: 'Mg²⁺ + 2e⁻ ⇌ Mg(s)', e0: -2.36, agent: 'Strong Reducing Agent' },
  { halfReaction: 'Na⁺ + e⁻ ⇌ Na(s)', e0: -2.71, agent: 'Very Strong Reducing Agent' },
  { halfReaction: 'K⁺ + e⁻ ⇌ K(s)', e0: -2.92, agent: 'Very Strong Reducing Agent' },
  { halfReaction: 'Li⁺ + e⁻ ⇌ Li(s)', e0: -3.05, agent: 'Strongest Reducing Agent' }
];

const FLASHCARDS_DECK = [
  {
    id: 1,
    paper: 'Paper 1 (Physics)',
    term: "Newton's Second Law of Motion",
    definition: "When a net force acts on an object, the object will accelerate in the direction of the force at an acceleration directly proportional to the force and inversely proportional to the mass of the object.",
    formula: "Fnet = ma",
    mastered: false
  },
  {
    id: 2,
    paper: 'Paper 1 (Physics)',
    term: "Free Fall",
    definition: "Motion during which the only force acting on an object is the gravitational force.",
    formula: "a = g = 9.8 m·s⁻² downward",
    mastered: false
  },
  {
    id: 3,
    paper: 'Paper 1 (Physics)',
    term: "Work-Energy Theorem",
    definition: "The net work done on an object is equal to the change in the object's kinetic energy.",
    formula: "Wnet = ΔEk = 0.5m·vf² - 0.5m·vi²",
    mastered: false
  },
  {
    id: 4,
    paper: 'Paper 1 (Physics)',
    term: "Internal Resistance & Lost Volts",
    definition: "Internal resistance is the resistance within a battery that causes lost volts (Ir) when current flows.",
    formula: "ε = V_load + V_lost = I(R_ext + r)",
    mastered: false
  },
  {
    id: 5,
    paper: 'Paper 2 (Chemistry)',
    term: "Le Chatelier's Principle",
    definition: "When the equilibrium in a closed system is disturbed, the system will reinstate a new equilibrium by favouring the reaction that opposes the disturbance.",
    formula: "Kc = [products]^p / [reactants]^r",
    mastered: false
  },
  {
    id: 6,
    paper: 'Paper 2 (Chemistry)',
    term: "Functional Group of an Ester",
    definition: "An organic compound containing the ester functional group (-COO-) formed from a carboxylic acid and alcohol via condensation.",
    formula: "R-COO-R' + H2O",
    mastered: false
  },
  {
    id: 7,
    paper: 'Paper 2 (Chemistry)',
    term: "Activation Energy (Ea)",
    definition: "The minimum energy required to initiate a chemical reaction (or the energy needed to form an activated complex).",
    formula: "Ea = E_activated_complex - E_reactants",
    mastered: false
  },
  {
    id: 8,
    paper: 'Paper 2 (Chemistry)',
    term: "Galvanic vs Electrolytic Cell",
    definition: "A galvanic cell converts chemical energy into electrical energy spontaneously. An electrolytic cell uses electrical energy to drive a non-spontaneous chemical reaction.",
    formula: "E°cell = E°cathode - E°anode > 0 (Galvanic)",
    mastered: false
  }
];

const MINI_TEST_QUESTIONS = [
  {
    id: 'q1',
    paper: 'Paper 1',
    topic: "Newton's Laws",
    tier: 'Intermediate',
    question: "A crate of mass 20 kg rests on a rough horizontal surface (μk = 0.25). A horizontal pulling force of 80 N is applied. What is the net acceleration?",
    options: [
      { id: 'A', text: '1.55 m·s⁻²', correct: true },
      { id: 'B', text: '4.00 m·s⁻²', correct: false },
      { id: 'C', text: '2.45 m·s⁻²', correct: false },
      { id: 'D', text: '0.80 m·s⁻²', correct: false }
    ],
    explanation: "Frictional force fk = μk·N = 0.25 × (20 × 9.8) = 49 N. Fnet = 80 - 49 = 31 N. a = Fnet/m = 31 / 20 = 1.55 m·s⁻²."
  },
  {
    id: 'q2',
    paper: 'Paper 1',
    topic: "Vertical Projectile Motion",
    tier: 'Advanced',
    question: "A ball is projected vertically upwards with vi = 19.6 m·s⁻¹. Neglecting air resistance, what is its maximum height above the launch point?",
    options: [
      { id: 'A', text: '9.8 m', correct: false },
      { id: 'B', text: '19.6 m', correct: true },
      { id: 'C', text: '39.2 m', correct: false },
      { id: 'D', text: '14.7 m', correct: false }
    ],
    explanation: "Using vf² = vi² + 2a·Δy where vf = 0 and a = -9.8 m·s⁻²: 0 = (19.6)² + 2(-9.8)Δy => 384.16 = 19.6·Δy => Δy = 19.6 m."
  },
  {
    id: 'q3',
    paper: 'Paper 2',
    topic: "Chemical Equilibrium",
    tier: 'Intermediate',
    question: "For the exothermic reaction: 2SO2(g) + O2(g) ⇌ 2SO3(g) (ΔH < 0), which change will INCREASE the equilibrium yield of SO3?",
    options: [
      { id: 'A', text: 'Increasing the temperature', correct: false },
      { id: 'B', text: 'Decreasing the volume (increasing pressure)', correct: true },
      { id: 'C', text: 'Adding a catalyst', correct: false },
      { id: 'D', text: 'Removing O2 gas from the container', correct: false }
    ],
    explanation: "Reactants have 3 moles of gas; products have 2 moles. Increasing pressure shifts equilibrium towards the fewer moles of gas (forward), increasing SO3 yield."
  },
  {
    id: 'q4',
    paper: 'Paper 2',
    topic: "Organic Chemistry",
    tier: 'Beginner',
    question: "What is the IUPAC name for CH3-CH(CH3)-CH2-CH2-OH?",
    options: [
      { id: 'A', text: '3-methylbutan-1-ol', correct: true },
      { id: 'B', text: '2-methylbutan-4-ol', correct: false },
      { id: 'C', text: 'pentan-1-ol', correct: false },
      { id: 'D', text: 'iso-pentyl alcohol', correct: false }
    ],
    explanation: "Longest carbon chain with -OH is 4 carbons (butan-1-ol). The methyl substituent is on carbon-3: 3-methylbutan-1-ol."
  }
];

const SECTION_B_QUESTIONS = [
  {
    id: 'sb_1',
    paper: 'Paper 1 (Physics)',
    title: 'Question 3: Vertical Projectile Motion from a Hot Air Balloon',
    totalMarks: 14,
    context: "A hot air balloon ascends vertically at a constant speed of 5 m·s⁻¹. At a height of 50 m above the ground, a sandbag is released.",
    subQuestions: [
      {
        num: '3.1',
        text: 'Explain what is meant by a projectile. (2 Marks)',
        memo: "An object which has been given an initial velocity and then moves under the influence of the gravitational force alone. (2 marks: 2/2 or 0/2 verbatim rule)"
      },
      {
        num: '3.2',
        text: 'Calculate the maximum height above the ground reached by the sandbag. (4 Marks)',
        memo: "vi = +5 m·s⁻¹, vf = 0 m·s⁻¹, a = -9.8 m·s⁻². vf² = vi² + 2a·Δy => 0 = 5² + 2(-9.8)Δy => Δy = 1.28 m. Max height above ground = 50 + 1.28 = 51.28 m."
      },
      {
        num: '3.3',
        text: 'Calculate the time taken for the sandbag to strike the ground. (5 Marks)',
        memo: "Take UP as positive. Δy = -50 m, vi = +5 m·s⁻¹, a = -9.8 m·s⁻². Δy = vi·t + 0.5a·t² => -50 = 5t - 4.9t² => 4.9t² - 5t - 50 = 0. Solving quadratic: t = 3.75 s."
      }
    ]
  },
  {
    id: 'sb_2',
    paper: 'Paper 2 (Chemistry)',
    title: 'Question 6: Chemical Equilibrium & RICE Table Calculation',
    totalMarks: 12,
    context: "Initially, 4.0 moles of SO2 and 3.0 moles of O2 are sealed in a 2.0 dm³ rigid container at 600 K: 2SO2(g) + O2(g) ⇌ 2SO3(g). At equilibrium, 3.2 moles of SO3 are present.",
    subQuestions: [
      {
        num: '6.1',
        text: 'State Le Chatelier’s Principle. (2 Marks)',
        memo: "When the equilibrium in a closed system is disturbed, the system will reinstate a new equilibrium by favouring the reaction that opposes the disturbance."
      },
      {
        num: '6.2',
        text: 'Calculate the equilibrium constant (Kc) for this reaction at 600 K. (7 Marks)',
        memo: "Mole Ratio 2 : 1 : 2. Since 3.2 mol SO3 formed: Δn(SO3) = +3.2, Δn(O2) = -1.6, Δn(SO2) = -3.2. Equilibrium moles: n(SO2) = 4.0 - 3.2 = 0.8 mol; n(O2) = 3.0 - 1.6 = 1.4 mol; n(SO3) = 3.2 mol. Equilibrium Concentrations (V = 2.0 dm³): [SO2] = 0.4 mol·dm⁻³, [O2] = 0.7 mol·dm⁻³, [SO3] = 1.6 mol·dm⁻³. Kc = [SO3]² / ([SO2]² · [O2]) = (1.6)² / ((0.4)² × 0.7) = 2.56 / (0.16 × 0.7) = 2.56 / 0.112 = 22.86."
      }
    ]
  }
];

const INITIAL_SQUADS = [
  {
    id: 'sq_1',
    name: 'Gauteng Distinction Achievers',
    topicFocus: 'Paper 1 (Newton & VPM)',
    code: 'GP-DIST-80',
    passcode: '8080',
    capacity: 8,
    members: ['Sipho M. (Admin)', 'Amina K.', 'Liam B.', 'Thabo N.'],
    platform: 'Google Meet',
    tags: ['#Distinction (80%+)', '#SectionBFocus', '#NightOwls'],
    motto: 'Drilling past papers until 80%+ is guaranteed.'
  },
  {
    id: 'sq_2',
    name: 'KZN Chemistry Equilibrium Squad',
    topicFocus: 'Paper 2 (Kc & Acids)',
    code: 'KZN-RICE-24',
    passcode: '',
    capacity: 6,
    members: ['Zanele D. (Admin)', 'Brandon P.', 'Karabo M.'],
    platform: 'WhatsApp Study Call',
    tags: ['#ZeroDataFriendly', '#Table4BRedox', '#KZNMatric'],
    motto: 'Mastering RICE tables and Table 4B redox without stress.'
  }
];

class SafeErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error("Matric Master Error caught:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-slate-900 border border-indigo-500/30 p-8 rounded-2xl max-w-lg shadow-2xl">
            <h2 className="text-2xl font-bold text-indigo-400 mb-2">Matric Master Recovered</h2>
            <p className="text-slate-300 text-sm mb-6">
              A temporary display anomaly was contained. Click below to continue your revision session.
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold rounded-xl transition shadow-lg shadow-indigo-500/20"
            >
              Resume Revision
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <SafeErrorBoundary>
      <MatricMasterCore />
    </SafeErrorBoundary>
  );
}

function MatricMasterCore() {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState('topics'); 
  // 'topics' | 'simulators' | 'chemistry' | 'flashcards' | 'tests' | 'sectionB' | 'calculator' | 'pastpapers' | 'squads' | 'planner' | 'notebook' | 'profile' | 'tutor'
  const [isDetailView, setIsDetailView] = useState(false);
  const [paperFilter, setPaperFilter] = useState('all');
  const [selectedTopic, setSelectedTopic] = useState(CAPS_TOPICS[0]);
  const [loadingTopic, setLoadingTopic] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(15);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDataSheetOpen, setIsDataSheetOpen] = useState(false);
  const [dataSheetTab, setDataSheetTab] = useState('constants'); // 'constants' | 'formulas'
  const [toastMessage, setToastMessage] = useState(null);

  // Physics Simulators Tab Mode
  const [physicsSimSubTab, setPhysicsSimSubTab] = useState('vpm'); // 'vpm' | 'circuits' | 'fbd'

  // VPM Simulator State
  const [vpmInitialV, setVpmInitialV] = useState(19.6);
  const [vpmInitialY, setVpmInitialY] = useState(0);
  const [vpmGraphMode, setVpmGraphMode] = useState('displacement');

  // Circuit Simulator State
  const [circEmf, setCircEmf] = useState(12.0);
  const [circInternalR, setCircInternalR] = useState(1.5);
  const [circExternalR, setCircExternalR] = useState(8.5);
  const [circSwitchClosed, setCircSwitchClosed] = useState(true);
  const [circParallelEnabled, setCircParallelEnabled] = useState(false);
  const [circParallelR, setCircParallelR] = useState(10.0);

  // Newton FBD Simulator State
  const [fbdSurfaceType, setFbdSurfaceType] = useState('incline'); // 'horizontal' | 'incline'
  const [fbdAngle, setFbdAngle] = useState(30); // degrees
  const [fbdMass, setFbdMass] = useState(10); // kg
  const [fbdAppliedForce, setFbdAppliedForce] = useState(120); // N (up incline/right)
  const [fbdMuK, setFbdMuK] = useState(0.25); // friction coeff

  // Chemistry Tools State
  const [chemToolTab, setChemToolTab] = useState('periodic');
  const [ptSearch, setPtSearch] = useState('');
  const [selectedElement, setSelectedElement] = useState(PERIODIC_TABLE_ELEMENTS[0]);

  // RICE Solver State
  const [riceInitA, setRiceInitA] = useState(4.0);
  const [riceInitB, setRiceInitB] = useState(3.0);
  const [riceEqC, setRiceEqC] = useState(3.2);
  const [riceVolume, setRiceVolume] = useState(2.0);

  // Titration Solver State
  const [titrCa, setTitrCa] = useState(0.1);
  const [titrVa, setTitrVa] = useState(25.0);
  const [titrVb, setTitrVb] = useState(20.0);
  const [titrNa, setTitrNa] = useState(1);
  const [titrNb, setTitrNb] = useState(1);

  // Redox Table 4B State
  const [selectedCathodeHalf, setSelectedCathodeHalf] = useState(TABLE_4B_REDOX[7]);
  const [selectedAnodeHalf, setSelectedAnodeHalf] = useState(TABLE_4B_REDOX[13]);

  // Matric Mark & Symbol Calculator State
  const [calcSbaMark, setCalcSbaMark] = useState(78); // SBA out of 100 (25%)
  const [calcP1Exam, setCalcP1Exam] = useState(115); // P1 out of 150
  const [calcP2Exam, setCalcP2Exam] = useState(108); // P2 out of 150

  // Flashcards State
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);
  const [flashcardsList, setFlashcardsList] = useState(FLASHCARDS_DECK);
  const [touchStartX, setTouchStartX] = useState(null);

  // Mini-Tests State
  const [testFilter, setTestFilter] = useState('All');
  const [selectedAnswers, setSelectedAnswers] = useState({});

  // Study Squads State
  const [squadsList, setSquadsList] = useState(INITIAL_SQUADS);
  const [isCreateSquadOpen, setIsCreateSquadOpen] = useState(false);
  const [isJoinSquadOpen, setIsJoinSquadOpen] = useState(false);
  const [newSquadName, setNewSquadName] = useState('');
  const [newSquadTopic, setNewSquadTopic] = useState('Paper 1 (Newton & VPM)');
  const [newSquadCode, setNewSquadCode] = useState('SQUAD-' + Math.floor(1000 + Math.random() * 9000));
  const [newSquadPasscode, setNewSquadPasscode] = useState('');
  const [newSquadCapacity, setNewSquadCapacity] = useState(8);
  const [newSquadPlatform, setNewSquadPlatform] = useState('Google Meet');
  const [newSquadMotto, setNewSquadMotto] = useState('');
  const [newSquadTags, setNewSquadTags] = useState(['#Distinction (80%+)']);
  const [joinCodeInput, setJoinCodeInput] = useState('');
  const [joinPinInput, setJoinPinInput] = useState('');

  // Timetable & Planner State
  const [plannerTasks, setPlannerTasks] = useState([
    { id: 1, title: 'Practice 5 VPM Exam Questions (Paper 1)', topic: 'Vertical Projectile Motion', done: true, day: 'Monday' },
    { id: 2, title: 'Solve 2 RICE Kc calculations (Paper 2)', topic: 'Chemical Equilibrium', done: false, day: 'Tuesday' },
    { id: 3, title: 'Memorize 8 Core CAPS definitions', topic: 'Active Recall Deck', done: false, day: 'Wednesday' },
    { id: 4, title: 'Electric Circuits Lost Volts graph derivation', topic: 'Electric Circuits', done: false, day: 'Thursday' }
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Notebook State
  const [notebookNotes, setNotebookNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('nsc_matric_notes');
      return saved ? JSON.parse(saved) : {
        'p1_vpm': 'Always choose UP as positive! Remember at max height v = 0 m/s.',
        'p2_equilibrium': 'Temperature is the ONLY factor that alters the numerical Kc value.'
      };
    } catch {
      return {};
    }
  });

  // Profile State
  const [candidateName, setCandidateName] = useState('Thabo Mokoena');
  const [candidateID, setCandidateID] = useState('0604125089084');
  const [isIdValid, setIsIdValid] = useState(true);
  const [targetSymbol, setTargetSymbol] = useState(85);

  // AI Tutor Chat State
  const [tutorInput, setTutorInput] = useState('');
  const [tutorMessages, setTutorMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Sawubona! I am your DBE CAPS Physical Sciences OmniTutor. Ask me about any Paper 1 or Paper 2 question, formula, or exam trap to secure your Level 7 distinction."
    }
  ]);
  const [isTutorLoading, setIsTutorLoading] = useState(false);

  // NSC Final Exam Live Countdown State
  const [countdown, setCountdown] = useState({
    p1: { days: 0, hours: 0, minutes: 0, seconds: 0, totalMs: 0 },
    p2: { days: 0, hours: 0, minutes: 0, seconds: 0, totalMs: 0 }
  });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      
      // DBE NSC Final Exam target dates (Paper 1: Early November, Paper 2: Follows 3 days later)
      let p1Target = new Date(`${currentYear}-11-06T09:00:00+02:00`);
      let p2Target = new Date(`${currentYear}-11-09T09:00:00+02:00`);

      // If exam date has already passed for the current year, target next year's November session
      if (now > p2Target) {
        p1Target = new Date(`${currentYear + 1}-11-06T09:00:00+02:00`);
        p2Target = new Date(`${currentYear + 1}-11-09T09:00:00+02:00`);
      }

      const formatDiff = (target) => {
        const diff = Math.max(0, target.getTime() - now.getTime());
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        return { days, hours, minutes, seconds, totalMs: diff };
      };

      setCountdown({
        p1: formatDiff(p1Target),
        p2: formatDiff(p2Target)
      });
    };

    calculateTimeRemaining();
    const timerId = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(timerId);
  }, []);

  const showToast = (text) => {
    setToastMessage(text);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSelectTopicWithAnimation = (topic) => {
    setLoadingTopic(topic);
    setLoadingProgress(20);
    const p1 = setTimeout(() => setLoadingProgress(65), 350);
    const p2 = setTimeout(() => setLoadingProgress(95), 800);
    const p3 = setTimeout(() => {
      setSelectedTopic(topic);
      setIsDetailView(true);
      setLoadingTopic(null);
      setActiveTab('topics');
    }, 1200);
    return () => {
      clearTimeout(p1);
      clearTimeout(p2);
      clearTimeout(p3);
    };
  };

  const validateSouthAfricanID = (idStr) => {
    if (!/^\d{13}$/.test(idStr)) return false;
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      let digit = parseInt(idStr.charAt(i), 10);
      if (i % 2 === 1) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
    }
    const checkDigit = (10 - (sum % 10)) % 10;
    return checkDigit === parseInt(idStr.charAt(12), 10);
  };

  const handleIdChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 13);
    setCandidateID(val);
    if (val.length === 13) {
      setIsIdValid(validateSouthAfricanID(val));
    } else {
      setIsIdValid(false);
    }
  };

  const speakDefinition = (textToSpeak) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      const voices = window.speechSynthesis.getVoices();
      const enVoice = voices.find(v => v.lang.includes('en-ZA') || v.lang.includes('en-GB') || v.lang.includes('en-US'));
      if (enVoice) utterance.voice = enVoice;
      window.speechSynthesis.speak(utterance);
      showToast('🔊 Playing definition audio pronunciation...');
    } else {
      showToast('Text-to-speech not supported on this browser.');
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeTab === 'flashcards') {
        if (e.key === 'ArrowRight') {
          setFlashcardIndex(prev => (prev + 1) % flashcardsList.length);
          setFlashcardFlipped(false);
        } else if (e.key === 'ArrowLeft') {
          setFlashcardIndex(prev => (prev - 1 + flashcardsList.length) % flashcardsList.length);
          setFlashcardFlipped(false);
        } else if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          setFlashcardFlipped(prev => !prev);
        }
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsDataSheetOpen(false);
        setIsCreateSquadOpen(false);
        setIsJoinSquadOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, flashcardsList.length]);

  const onTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };
  const onTouchEnd = (e) => {
    if (!touchStartX) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 50) {
      setFlashcardIndex(prev => (prev + 1) % flashcardsList.length);
      setFlashcardFlipped(false);
    } else if (diff < -50) {
      setFlashcardIndex(prev => (prev - 1 + flashcardsList.length) % flashcardsList.length);
      setFlashcardFlipped(false);
    }
    setTouchStartX(null);
  };

  const handleAskTutor = async (questionText = tutorInput) => {
    if (!questionText.trim()) return;
    const userMsg = { id: Date.now(), sender: 'user', text: questionText };
    setTutorMessages(prev => [...prev, userMsg]);
    setTutorInput('');
    setIsTutorLoading(true);

    try {
      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: questionText })
      });
      if (res.ok) {
        const data = await res.json();
        const reply = data.answer || data.reply || (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text);
        if (reply) {
          setTutorMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: reply }]);
          setIsTutorLoading(false);
          return;
        }
      }
    } catch {
      // Serverless backend not present in preview; trigger built-in CAPS fallback engine
    }

    setTimeout(() => {
      const qLower = questionText.toLowerCase();
      let matchedResponse = null;

      if (qLower.includes('newton') || qLower.includes('force')) {
        matchedResponse = "📋 **DBE CAPS Newton's Second Law:**\nWhen a net force acts on an object, the object will accelerate in the direction of the force at an acceleration directly proportional to the force and inversely proportional to the mass of the object (Fnet = ma).\n\n⚠️ **Senior Examiner Warning:** Always draw a labeled Free-Body Diagram before calculating. Do not resolve vectors directly on the diagram.";
      } else if (qLower.includes('vpm') || qLower.includes('projectile') || qLower.includes('free fall')) {
        matchedResponse = "📋 **Vertical Projectile Motion (DBE CAPS):**\nA projectile moves under the sole influence of gravity (g = 9.8 m·s⁻² downward).\n\n💡 **Exam Strategy:** At maximum height, instantaneous vertical velocity is 0 m·s⁻¹. State your sign convention (+ = UP or + = DOWN) at the start of Question 3!";
      } else if (qLower.includes('equilibrium') || qLower.includes('le chatelier') || qLower.includes('kc')) {
        matchedResponse = "📋 **Le Chatelier's Principle:**\nWhen the equilibrium in a closed system is disturbed, the system will reinstate a new equilibrium by favouring the reaction that opposes the disturbance.\n\n⚠️ **Crucial Matric Trap:** ONLY TEMPERATURE changes the numerical value of Kc. Pressure and concentration shifts alter yields, but Kc stays constant!";
      } else if (qLower.includes('lost volt') || qLower.includes('internal resistance') || qLower.includes('circuit')) {
        matchedResponse = "📋 **Electric Circuits (Lost Volts & Emf):**\nEmf (ε) is the total work done per unit charge by the battery. Lost volts (Ir) represents the potential drop across the internal resistance (r).\n\nFormula: ε = V_terminal + V_lost = I(R_ext + r).";
      } else {
        matchedResponse = `📋 **DBE Grade 12 Guidance on: "${questionText}":**\nFor top marks, always quote the verbatim 2-mark CAPS definition, write the formula as listed on the Data Sheet before substituting numbers, and include standard SI units in your final answer.`;
      }

      setTutorMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: matchedResponse }]);
      setIsTutorLoading(false);
    }, 600);
  };

  const vpmCalculations = useMemo(() => {
    const g = 9.8;
    const vi = parseFloat(vpmInitialV) || 0;
    const y0 = parseFloat(vpmInitialY) || 0;
    const tApex = Math.max(0, vi / g);
    const maxH = y0 + (vi * vi) / (2 * g);
    const discriminant = vi * vi + 4 * 4.9 * y0;
    const tFlight = Math.max(0.5, (vi + Math.sqrt(Math.max(0, discriminant))) / 9.8);
    const vImpact = Math.sqrt(Math.max(0, vi * vi + 2 * g * y0));

    const numPoints = 40;
    const points = [];
    for (let i = 0; i <= numPoints; i++) {
      const t = (tFlight / numPoints) * i;
      let val = 0;
      if (vpmGraphMode === 'displacement') {
        val = y0 + vi * t - 0.5 * g * t * t;
      } else if (vpmGraphMode === 'velocity') {
        val = vi - g * t;
      } else {
        val = -9.8;
      }
      points.push({ t, val });
    }

    return { tApex, maxH, tFlight, vImpact, points };
  }, [vpmInitialV, vpmInitialY, vpmGraphMode]);

  const circuitCalculations = useMemo(() => {
    const emf = parseFloat(circEmf) || 0;
    const r = parseFloat(circInternalR) || 0;
    const RextBase = parseFloat(circExternalR) || 0.1;
    let RtotalExt = RextBase;

    if (circParallelEnabled) {
      const Rp = parseFloat(circParallelR) || 1.0;
      RtotalExt = (RextBase * Rp) / (RextBase + Rp);
    }

    if (!circSwitchClosed) {
      return {
        current: 0,
        lostVolts: 0,
        terminalV: emf,
        totalR: RtotalExt + r,
        powerLost: 0,
        powerExt: 0
      };
    }

    const current = emf / (RtotalExt + r);
    const lostVolts = current * r;
    const terminalV = emf - lostVolts;
    const powerLost = current * current * r;
    const powerExt = current * current * RtotalExt;

    return {
      current,
      lostVolts,
      terminalV,
      totalR: RtotalExt + r,
      powerLost,
      powerExt
    };
  }, [circEmf, circInternalR, circExternalR, circSwitchClosed, circParallelEnabled, circParallelR]);

  const fbdCalculations = useMemo(() => {
    const g = 9.8;
    const m = parseFloat(fbdMass) || 1;
    const w = m * g;
    const thetaRad = fbdSurfaceType === 'incline' ? ((parseFloat(fbdAngle) || 0) * Math.PI) / 180 : 0;
    const wPerp = w * Math.cos(thetaRad);
    const wParallel = w * Math.sin(thetaRad);
    const normalForce = wPerp;
    const muK = parseFloat(fbdMuK) || 0;
    const frictionForce = muK * normalForce;
    const fApp = parseFloat(fbdAppliedForce) || 0;
    const fNet = fApp - wParallel - frictionForce;
    const accel = fNet / m;

    return {
      w,
      wPerp,
      wParallel,
      normalForce,
      frictionForce,
      fApp,
      fNet,
      accel
    };
  }, [fbdSurfaceType, fbdAngle, fbdMass, fbdAppliedForce, fbdMuK]);

  const riceCalculations = useMemo(() => {
    const nA = parseFloat(riceInitA) || 0;
    const nB = parseFloat(riceInitB) || 0;
    const eqC = parseFloat(riceEqC) || 0;
    const vol = Math.max(0.1, parseFloat(riceVolume) || 1.0);

    const deltaC = eqC;
    const deltaA = -deltaC;
    const deltaB = -deltaC / 2;

    const eqA = Math.max(0, nA + deltaA);
    const eqB = Math.max(0, nB + deltaB);

    const concA = eqA / vol;
    const concB = eqB / vol;
    const concC = eqC / vol;

    let kc = 0;
    if (concA > 0 && concB > 0) {
      kc = (concC * concC) / (concA * concA * concB);
    }

    return { eqA, eqB, eqC, concA, concB, concC, kc };
  }, [riceInitA, riceInitB, riceEqC, riceVolume]);

  const redoxCalculations = useMemo(() => {
    const eCathode = selectedCathodeHalf?.e0 ?? 0;
    const eAnode = selectedAnodeHalf?.e0 ?? 0;
    const eCell = eCathode - eAnode;
    const isSpontaneous = eCell > 0;
    return { eCathode, eAnode, eCell, isSpontaneous };
  }, [selectedCathodeHalf, selectedAnodeHalf]);

  const matricCalcResults = useMemo(() => {
    const sba = Math.min(100, Math.max(0, parseFloat(calcSbaMark) || 0));
    const p1 = Math.min(150, Math.max(0, parseFloat(calcP1Exam) || 0));
    const p2 = Math.min(150, Math.max(0, parseFloat(calcP2Exam) || 0));

    const p1Pct = (p1 / 150) * 100;
    const p2Pct = (p2 / 150) * 100;
    const examAvgPct = ((p1 + p2) / 300) * 100;

    // Official CAPS Formula: 25% SBA + 75% Final Examination
    const finalComposite = Math.round((sba * 0.25) + (examAvgPct * 0.75));

    let level = 1;
    let symbol = 'F';
    let aps = 1;
    let description = 'Not Achieved (0 - 29%)';
    let badgeColor = 'text-red-400 bg-red-500/10 border-red-500/30';

    if (finalComposite >= 80) {
      level = 7;
      symbol = 'A';
      aps = 7;
      description = 'Outstanding Achievement / Distinction (Bachelor Degree Admission)';
      badgeColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    } else if (finalComposite >= 70) {
      level = 6;
      symbol = 'B';
      aps = 6;
      description = 'Meritorious Achievement';
      badgeColor = 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30';
    } else if (finalComposite >= 60) {
      level = 5;
      symbol = 'C';
      aps = 5;
      description = 'Substantial Achievement';
      badgeColor = 'text-blue-400 bg-blue-500/10 border-blue-500/30';
    } else if (finalComposite >= 50) {
      level = 4;
      symbol = 'D';
      aps = 4;
      description = 'Adequate Achievement (Diploma Pass Level)';
      badgeColor = 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    } else if (finalComposite >= 40) {
      level = 3;
      symbol = 'E';
      aps = 3;
      description = 'Moderate Achievement';
      badgeColor = 'text-orange-400 bg-orange-500/10 border-orange-500/30';
    } else if (finalComposite >= 30) {
      level = 2;
      symbol = 'F';
      aps = 2;
      description = 'Elementary Achievement';
      badgeColor = 'text-red-300 bg-red-500/10 border-red-500/20';
    }

    // Required P2 mark to hit 80% Distinction
    const targetComp = 80;
    const neededExamAvg = (targetComp - (sba * 0.25)) / 0.75;
    const neededExamTotal = (neededExamAvg / 100) * 300;
    const neededP2 = Math.ceil(neededExamTotal - p1);

    return {
      sba,
      p1,
      p2,
      p1Pct,
      p2Pct,
      examAvgPct,
      finalComposite,
      level,
      symbol,
      aps,
      description,
      badgeColor,
      neededP2
    };
  }, [calcSbaMark, calcP1Exam, calcP2Exam]);

  const weakTopics = useMemo(() => {
    return CAPS_TOPICS.filter(t => t.mastery < 70);
  }, []);

  const handleAutoScheduleWeakTopics = () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const newTasks = weakTopics.map((wt, i) => ({
      id: Date.now() + i,
      title: `⚡ Priority Revision Drill: ${wt.title} (${wt.mastery}% mastery)`,
      topic: wt.title,
      done: false,
      day: days[i % days.length]
    }));
    setPlannerTasks(prev => [...newTasks, ...prev]);
    showToast(`⚡ Added ${newTasks.length} targeted catch-up sessions to your timetable!`);
  };

  const downloadCheatSheet = () => {
    try {
      const constantsRows = DBE_CONSTANTS_TABLE.map(function(c) {
        return '<tr><td>' + c.name + '</td><td><code>' + c.sym + '</code></td><td><strong>' + c.val + '</strong></td></tr>';
      }).join('');

      const topicsCards = CAPS_TOPICS.map(function(t) {
        const formulasHtml = t.coreFormulas.map(function(f) {
          return '<span class="formula-tag">' + f + '</span>';
        }).join('');
        return '<div class="card">' +
          '<div class="card-header">' +
            '<span class="card-title">' + t.title + '</span>' +
            '<span class="card-tag">' + t.paper + ' • ' + t.weight + '</span>' +
          '</div>' +
          '<div class="def">&ldquo;' + t.definition + '&rdquo;</div>' +
          '<div class="layman"><strong>Plain English:</strong> ' + t.layman + '</div>' +
          '<div class="trap">⚠️ <strong>Senior Examiner Warning:</strong> ' + t.examinerTrap + '</div>' +
          '<div class="formulas">' + formulasHtml + '</div>' +
        '</div>';
      }).join('');

      const formulaCards = DBE_FORMULAS_CATALOG.map(function(cat) {
        const catFormulasHtml = cat.formulas.map(function(f) {
          return '<span class="formula-tag">' + f + '</span>';
        }).join('');
        return '<div class="card">' +
          '<div class="card-title" style="margin-bottom: 6px; color: #4338ca;">' + cat.category + '</div>' +
          '<div class="formulas">' + catFormulasHtml + '</div>' +
        '</div>';
      }).join('');

      const htmlContent = '<!DOCTYPE html>\n' +
'<html lang="en">\n' +
'<head>\n' +
'  <meta charset="UTF-8">\n' +
'  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
'  <title>NSC Physical Sciences Grade 12 - Distinction Cheat Sheet</title>\n' +
'  <style>\n' +
'    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 24px; color: #0f172a; background: #fff; line-height: 1.5; }\n' +
'    header { border-bottom: 2px solid #4f46e5; padding-bottom: 12px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-end; }\n' +
'    h1 { margin: 0; font-size: 22px; color: #1e1b4b; }\n' +
'    .subtitle { color: #64748b; font-size: 13px; margin-top: 4px; }\n' +
'    .badge { background: #e0e7ff; color: #4338ca; padding: 4px 10px; border-radius: 9999px; font-size: 12px; font-weight: 700; }\n' +
'    .section-title { font-size: 15px; font-weight: 800; color: #4338ca; margin-top: 24px; margin-bottom: 12px; border-left: 4px solid #4f46e5; padding-left: 8px; text-transform: uppercase; letter-spacing: 0.05em; }\n' +
'    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 14px; }\n' +
'    .card { border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px; background: #f8fafc; page-break-inside: avoid; }\n' +
'    .card-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px; }\n' +
'    .card-title { font-weight: 800; font-size: 14px; color: #0f172a; }\n' +
'    .card-tag { font-size: 11px; font-weight: 700; color: #4f46e5; }\n' +
'    .def { font-size: 12px; color: #1e293b; margin: 6px 0; font-style: italic; }\n' +
'    .layman { font-size: 11px; color: #475569; margin: 4px 0; }\n' +
'    .trap { font-size: 11px; color: #b91c1c; font-weight: 600; background: #fef2f2; border: 1px solid #fecaca; padding: 6px 8px; border-radius: 6px; margin-top: 6px; }\n' +
'    .formulas { margin-top: 6px; display: flex; flex-wrap: wrap; gap: 4px; }\n' +
'    .formula-tag { background: #ede9fe; color: #5b21b6; font-family: monospace; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 4px; }\n' +
'    table { width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 11px; }\n' +
'    th, td { border: 1px solid #cbd5e1; padding: 6px 8px; text-align: left; }\n' +
'    th { background: #f1f5f9; font-weight: 700; color: #334155; }\n' +
'    @media print {\n' +
'      body { padding: 10px; }\n' +
'      .no-print-btn { display: none; }\n' +
'    }\n' +
'  </style>\n' +
'</head>\n' +
'<body>\n' +
'  <header>\n' +
'    <div>\n' +
'      <h1>NSC Physical Sciences Grade 12 — Distinction Cheat Sheet</h1>\n' +
'      <div class="subtitle">Verbatim DBE CAPS Definitions, Senior Examiner Warnings & Formulas</div>\n' +
'    </div>\n' +
'    <div>\n' +
'      <span class="badge">Official CAPS Syllabus Matrix</span>\n' +
'      <button class="no-print-btn" onclick="window.print()" style="margin-left: 8px; padding: 6px 12px; font-size: 12px; cursor: pointer; border-radius: 6px; border: 1px solid #cbd5e1; background: #4f46e5; color: #fff; font-weight: bold;">Print / Save as PDF</button>\n' +
'    </div>\n' +
'  </header>\n' +
'  <div class="section-title">Table 1: Official DBE Physical Constants</div>\n' +
'  <table>\n' +
'    <thead>\n' +
'      <tr><th>Physical Constant Quantity</th><th>Symbol</th><th>Standard Examination Value</th></tr>\n' +
'    </thead>\n' +
'    <tbody>\n' +
'      ' + constantsRows + '\n' +
'    </tbody>\n' +
'  </table>\n' +
'  <div class="section-title">All 14 CAPS Core Topics (Verbatim Definitions & Examiner Warnings)</div>\n' +
'  <div class="grid">\n' +
'    ' + topicsCards + '\n' +
'  </div>\n' +
'  <div class="section-title">Table 2: Official DBE Examination Formulae</div>\n' +
'  <div class="grid">\n' +
'    ' + formulaCards + '\n' +
'  </div>\n' +
'</body>\n' +
'</html>';

      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'NSC_Physical_Sciences_Grade12_Distinction_Cheat_Sheet.html';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast('📥 Distinction Cheat Sheet downloaded successfully!');
    } catch {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white pb-12">
      <style>{customScrollbarStyles}</style>

      {/* Printable Cheat Sheet Mode for Offline Revision */}
      <div className="print-only p-8 text-black bg-white">
        <h1 className="text-3xl font-bold mb-2">NSC Physical Sciences Grade 12 - Distinction Summary</h1>
        <p className="text-sm text-gray-600 mb-6">South African CAPS Examination Guidelines Syllabus Cheat Sheet</p>
        <div className="grid grid-cols-2 gap-4">
          {CAPS_TOPICS.map(t => (
            <div key={t.id} className="border border-gray-300 p-3 rounded">
              <h2 className="font-bold text-sm">{t.title} ({t.paper})</h2>
              <p className="text-xs text-gray-700 italic my-1">{t.definition}</p>
              <p className="text-xs text-red-700 font-medium">⚠️ {t.examinerTrap}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Top Banner Navigation */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3.5 no-print">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 ring-1 ring-white/20">
              <Icon name="atom" className="w-6 h-6 text-white animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base lg:text-lg tracking-tight bg-gradient-to-r from-white via-indigo-100 to-indigo-300 bg-clip-text text-transparent">
                  NSC Physical Sciences
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  CAPS Matrix
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">Grade 12 Matric Distinction & Exam Mastery Engine</p>
            </div>
          </div>

          {/* Zero Data Indicator & Quick Action Hub */}
          <div className="flex items-center gap-2.5">
            {/* Zero-Data Offline Badge */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-semibold text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Zero-Data Mode Active</span>
            </div>

            {/* Official Data Sheet Modal Button */}
            <button
              onClick={() => setIsDataSheetOpen(true)}
              className="flex items-center gap-1.5 bg-slate-800/80 hover:bg-slate-800 border border-indigo-500/30 text-indigo-300 hover:text-indigo-200 rounded-xl px-3 py-1.5 text-xs font-semibold transition shadow-inner"
            >
              <Icon name="fileText" className="w-3.5 h-3.5 text-indigo-400" />
              <span>Data Sheet</span>
            </button>

            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 bg-slate-800/70 hover:bg-slate-800 border border-slate-700/60 rounded-xl px-3 py-1.5 text-xs text-slate-300 transition shadow-inner"
            >
              <Icon name="search" className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden md:inline">Quick Jump</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] bg-slate-700 rounded text-slate-400">Ctrl+K</kbd>
            </button>

            {}
            <button
              onClick={downloadCheatSheet}
              title="Download Offline Distinction Cheat Sheet"
              className="flex items-center gap-1.5 p-2 px-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition"
            >
              <Icon name="download" className="w-4 h-4 text-indigo-400" />
              <span className="hidden sm:inline text-xs font-semibold">Cheat Sheet</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-900/40 to-slate-800 border border-indigo-500/20 text-xs font-medium text-slate-200 hover:border-indigo-500/50 transition"
            >
              <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-[11px] text-white">
                {candidateName.charAt(0)}
              </div>
              <span className="hidden sm:inline">{candidateName.split(' ')[0]}</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-indigo-500/20 text-indigo-300 font-semibold">
                {targetSymbol}%
              </span>
            </button>
          </div>
        </div>

        {/* Horizontal Navigation Strips */}
        <div className="max-w-7xl mx-auto mt-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
          {[
            { id: 'topics', label: '14 CAPS Topics', icon: 'book' },
            { id: 'simulators', label: 'Physics Simulators', icon: 'activity' },
            { id: 'chemistry', label: 'Chemistry Suite', icon: 'flame' },
            { id: 'flashcards', label: 'Active Recall Deck', icon: 'card' },
            { id: 'tests', label: 'Exam Mini-Tests', icon: 'check' },
            { id: 'sectionB', label: 'Section B (130m)', icon: 'zap' },
            { id: 'calculator', label: 'Matric Mark Calculator', icon: 'calculator' },
            { id: 'pastpapers', label: 'Past Papers Archive', icon: 'fileText' },
            { id: 'squads', label: 'Study Squads', icon: 'users' },
            { id: 'planner', label: 'Timetable Planner', icon: 'activity' },
            { id: 'notebook', label: 'Topic Notebook', icon: 'book' },
            { id: 'tutor', label: 'OmniTutor AI', icon: 'bot' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                if (tab.id === 'topics') setIsDetailView(false);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Icon name={tab.icon} className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Live DBE NSC Final Examinations Countdown Ticker */}
        <div className="max-w-7xl mx-auto mt-2.5 pt-2.5 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </span>
            <span className="font-extrabold uppercase tracking-wider text-slate-300 text-[11px]">
              NSC Final Countdown:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Paper 1 Physics Countdown */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-950/80 border border-blue-500/30 text-blue-300">
              <span className="font-bold text-[10px] uppercase text-blue-400">P1 (Physics):</span>
              <span className="font-mono font-black text-white text-xs">
                {String(countdown.p1.days).padStart(2, '0')}d : {String(countdown.p1.hours).padStart(2, '0')}h : {String(countdown.p1.minutes).padStart(2, '0')}m : {String(countdown.p1.seconds).padStart(2, '0')}s
              </span>
            </div>

            {/* Paper 2 Chemistry Countdown */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-950/80 border border-emerald-500/30 text-emerald-300">
              <span className="font-bold text-[10px] uppercase text-emerald-400">P2 (Chemistry):</span>
              <span className="font-mono font-black text-white text-xs">
                {String(countdown.p2.days).padStart(2, '0')}d : {String(countdown.p2.hours).padStart(2, '0')}h : {String(countdown.p2.minutes).padStart(2, '0')}m : {String(countdown.p2.seconds).padStart(2, '0')}s
              </span>
            </div>

            <span className="hidden xl:inline text-[11px] text-slate-500 font-medium">
              Target 80%+ Distinction
            </span>
          </div>
        </div>
      </header>

      {/* Main Content View Container */}
      <main className="max-w-7xl mx-auto w-full px-4 lg:px-8 mt-6 flex-1 no-print">
        {/* VIEW 1: 14 CAPS TOPICS MATRIX */}
        {activeTab === 'topics' && (
          <div className="space-y-6">
            {isDetailView && selectedTopic ? (
              /* DEDICATED TOPIC CONTENT VIEW */
              <div className="space-y-6 animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 border border-slate-800 p-4 rounded-2xl">
                  <button
                    onClick={() => setIsDetailView(false)}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-indigo-300 hover:text-white border border-slate-700 rounded-xl text-xs font-bold transition shadow-sm w-fit"
                  >
                    <span>← Back to 14 Topics Matrix</span>
                  </button>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">Switch Topic:</span>
                    <select
                      value={selectedTopic.id}
                      onChange={(e) => {
                        const nextTopic = CAPS_TOPICS.find(t => t.id === e.target.value);
                        if (nextTopic) handleSelectTopicWithAnimation(nextTopic);
                      }}
                      className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                    >
                      {CAPS_TOPICS.map(t => (
                        <option key={t.id} value={t.id}>{t.title} ({t.paper.split(' ')[0]})</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 space-y-6 shadow-2xl">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                    <div>
                      <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
                        {selectedTopic.paper} • {selectedTopic.weight}
                      </span>
                      <h2 className="text-2xl font-black text-white mt-1">{selectedTopic.title}</h2>
                      <p className="text-xs text-slate-400 italic mt-0.5">
                        Pioneer: {selectedTopic.pioneer} — &ldquo;{selectedTopic.quote}&rdquo;
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => speakDefinition(selectedTopic.definition)}
                        className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium transition"
                      >
                        <Icon name="volume" className="w-4 h-4 text-indigo-400" />
                        <span>Audio Pronounce</span>
                      </button>
                      <button
                        onClick={() => {
                          handleAskTutor(`Explain the DBE CAPS exam traps and common marking guidelines for ${selectedTopic.title}.`);
                          setActiveTab('tutor');
                        }}
                        className="flex items-center gap-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-medium transition shadow-md shadow-indigo-600/30"
                      >
                        <Icon name="bot" className="w-4 h-4" />
                        <span>Ask OmniTutor</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-950/70 border border-indigo-500/20 rounded-2xl p-5 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase text-indigo-400">Verbatim 2-Mark CAPS Definition</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 font-semibold">2/2 or 0/2 Rule</span>
                      </div>
                      <p className="text-sm font-medium text-slate-100 leading-relaxed">
                        &ldquo;{selectedTopic.definition}&rdquo;
                      </p>
                      <div className="pt-2 border-t border-slate-800 text-xs text-slate-400">
                        <span className="font-semibold text-slate-300">Plain English: </span>
                        {selectedTopic.layman}
                      </div>
                    </div>

                    <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-5 space-y-2">
                      <div className="flex items-center gap-2 text-amber-400">
                        <Icon name="alert" className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">Senior Examiner Warning</span>
                      </div>
                      <p className="text-xs text-amber-200/90 leading-relaxed">
                        {selectedTopic.examinerTrap}
                      </p>
                      <div className="pt-2 border-t border-amber-500/20">
                        <span className="text-xs font-semibold text-slate-300">Key Formulae:</span>
                        <div className="flex flex-wrap gap-2 mt-1.5">
                          {selectedTopic.coreFormulas.map((f, i) => (
                            <code key={i} className="px-2 py-1 bg-slate-950 rounded text-[11px] font-mono text-emerald-400 border border-slate-800">
                              {f}
                            </code>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* ALL 14 TOPICS GRID */
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 border border-slate-800 p-4 rounded-2xl">
                  <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <span>DBE CAPS Matric Syllabus Matrix</span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300">
                        150 Marks Per Paper
                      </span>
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">Click any topic card to trigger deep guideline extraction.</p>
                  </div>

                  <div className="flex items-center gap-2">
                    {['all', 'Paper 1', 'Paper 2'].map(filter => (
                      <button
                        key={filter}
                        onClick={() => setPaperFilter(filter)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition ${
                          paperFilter === filter
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {filter === 'all' ? 'All 14 Topics' : `${filter} only`}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {CAPS_TOPICS.filter(t => paperFilter === 'all' || t.paper.includes(paperFilter)).map(topic => (
                    <div
                      key={topic.id}
                      onClick={() => handleSelectTopicWithAnimation(topic)}
                      className={`group relative bg-slate-900/70 border rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                        selectedTopic.id === topic.id
                          ? 'border-indigo-500 shadow-lg shadow-indigo-500/10'
                          : 'border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                          topic.paper.includes('Paper 1')
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        }`}>
                          {topic.paper}
                        </span>
                        <span className="text-xs font-semibold text-slate-400">{topic.weight}</span>
                      </div>

                      <h3 className="font-bold text-base text-white group-hover:text-indigo-300 transition-colors">
                        {topic.title}
                      </h3>

                      <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                        {topic.definition}
                      </p>

                      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                        <span className="text-slate-400">Mastery Level</span>
                        <span className="font-bold text-indigo-400">{topic.mastery}%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1.5">
                        <div
                          className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full rounded-full transition-all"
                          style={{ width: `${topic.mastery}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: PHYSICS SIMULATORS (VPM, CIRCUITS & NEWTON FBD) */}
        {activeTab === 'simulators' && (
          <div className="space-y-6">
            {/* Simulator Subtab Selector */}
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2 rounded-2xl">
              {[
                { id: 'vpm', label: 'Vertical Projectile Motion (VPM)' },
                { id: 'circuits', label: 'Electric Circuits & Lost Volts' },
                { id: 'fbd', label: "Newton's Laws Free-Body Diagram (FBD)" }
              ].map(sub => (
                <button
                  key={sub.id}
                  onClick={() => setPhysicsSimSubTab(sub.id)}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition ${
                    physicsSimSubTab === sub.id
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>

            {/* SUB-SIM 2.1: VPM SIMULATOR */}
            {physicsSimSubTab === 'vpm' && (
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <Icon name="activity" className="w-5 h-5 text-indigo-400" />
                      <span>Vertical Projectile Motion (VPM) Interactive Lab</span>
                    </h2>
                    <p className="text-xs text-slate-400">Simulate free fall equations of motion with zero-division protection.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {['displacement', 'velocity', 'acceleration'].map(m => (
                      <button
                        key={m}
                        onClick={() => setVpmGraphMode(m)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium capitalize transition ${
                          vpmGraphMode === m
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {m} vs time
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="space-y-4 bg-slate-950/60 p-5 rounded-2xl border border-slate-800">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Launch Parameters</h4>
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Initial Velocity (vi):</span>
                        <span className="font-mono text-indigo-400">{vpmInitialV} m·s⁻¹</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="40"
                        step="0.5"
                        value={vpmInitialV}
                        onChange={e => setVpmInitialV(e.target.value)}
                        className="w-full accent-indigo-500"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Launch Height (y0):</span>
                        <span className="font-mono text-indigo-400">{vpmInitialY} m</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="50"
                        step="1"
                        value={vpmInitialY}
                        onChange={e => setVpmInitialY(e.target.value)}
                        className="w-full accent-indigo-500"
                      />
                    </div>

                    <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">Time to Apex:</span>
                        <span className="font-bold text-white text-sm">{vpmCalculations.tApex.toFixed(2)} s</span>
                      </div>
                      <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">Max Height:</span>
                        <span className="font-bold text-emerald-400 text-sm">{vpmCalculations.maxH.toFixed(2)} m</span>
                      </div>
                      <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">Total Flight Time:</span>
                        <span className="font-bold text-white text-sm">{vpmCalculations.tFlight.toFixed(2)} s</span>
                      </div>
                      <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">Impact Speed:</span>
                        <span className="font-bold text-amber-400 text-sm">{vpmCalculations.vImpact.toFixed(2)} m·s⁻¹</span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-2 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="font-mono">
                        {vpmGraphMode === 'displacement' ? 'Displacement y (m)' : vpmGraphMode === 'velocity' ? 'Velocity v (m·s⁻¹)' : 'Acceleration a (m·s⁻²)'}
                      </span>
                      <span className="font-mono">Time t (s)</span>
                    </div>

                    <div className="h-52 w-full my-2 flex items-center justify-center">
                      <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
                        <line x1="40" y1="180" x2="480" y2="180" stroke="#334155" strokeWidth="1" />
                        <line x1="40" y1="20" x2="40" y2="180" stroke="#334155" strokeWidth="1" />

                        <path
                          d={`M 40 ${
                            vpmGraphMode === 'displacement' ? 180 - (vpmInitialY / Math.max(1, vpmCalculations.maxH)) * 140 : 50
                          } ${vpmCalculations.points.map((p, idx) => {
                            const x = 40 + (p.t / Math.max(0.1, vpmCalculations.tFlight)) * 440;
                            let y = 180;
                            if (vpmGraphMode === 'displacement') {
                              y = 180 - (Math.max(0, p.val) / Math.max(1, vpmCalculations.maxH)) * 150;
                            } else if (vpmGraphMode === 'velocity') {
                              y = 100 - (p.val / Math.max(1, vpmCalculations.vImpact)) * 70;
                            } else {
                              y = 150;
                            }
                            return `L ${isNaN(x) ? 40 : x} ${isNaN(y) ? 180 : y}`;
                          }).join(' ')}`}
                          fill="none"
                          stroke="#6366f1"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>

                    <p className="text-[11px] text-slate-400 text-center">
                      Free fall acceleration constant: <span className="text-indigo-400 font-mono">g = 9.8 m·s⁻² downward</span>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* SUB-SIM 2.2: CIRCUITS SIMULATOR */}
            {physicsSimSubTab === 'circuits' && (
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <Icon name="zap" className="w-5 h-5 text-amber-400" />
                      <span>Electric Circuit & &ldquo;Lost Volts&rdquo; Lab</span>
                    </h2>
                    <p className="text-xs text-slate-400">Simulate internal resistance (r) and observe lost volts shifts.</p>
                  </div>

                  <button
                    onClick={() => setCircSwitchClosed(prev => !prev)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                      circSwitchClosed
                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                        : 'bg-red-600 text-white'
                    }`}
                  >
                    <Icon name={circSwitchClosed ? 'lock' : 'unlock'} className="w-4 h-4" />
                    <span>Switch: {circSwitchClosed ? 'CLOSED' : 'OPEN'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4 bg-slate-950/60 p-5 rounded-2xl border border-slate-800">
                    <h4 className="text-xs font-bold uppercase text-slate-400">Circuit Controls</h4>
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Battery Emf (ε):</span>
                        <span className="font-mono text-indigo-400">{circEmf} V</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="24"
                        step="0.5"
                        value={circEmf}
                        onChange={e => setCircEmf(e.target.value)}
                        className="w-full accent-indigo-500"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Internal Resistance (r):</span>
                        <span className="font-mono text-amber-400">{circInternalR} Ω</span>
                      </div>
                      <input
                        type="range"
                        min="0.1"
                        max="5"
                        step="0.1"
                        value={circInternalR}
                        onChange={e => setCircInternalR(e.target.value)}
                        className="w-full accent-amber-500"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>External Load (R_ext):</span>
                        <span className="font-mono text-emerald-400">{circExternalR} Ω</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="20"
                        step="0.5"
                        value={circExternalR}
                        onChange={e => setCircExternalR(e.target.value)}
                        className="w-full accent-emerald-500"
                      />
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-xs text-slate-300">Add Parallel Branch:</span>
                      <button
                        onClick={() => setCircParallelEnabled(prev => !prev)}
                        className={`px-2.5 py-1 rounded text-xs font-bold transition ${
                          circParallelEnabled ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {circParallelEnabled ? 'ENABLED' : 'OFF'}
                      </button>
                    </div>
                  </div>

                  <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
                      <span className="text-xs text-slate-400">Total Circuit Current (I)</span>
                      <span className="text-2xl font-black text-indigo-400 font-mono my-2">
                        {circuitCalculations.current.toFixed(2)} A
                      </span>
                      <span className="text-[10px] text-slate-500">I = ε / (R_ext + r)</span>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
                      <span className="text-xs text-slate-400">Lost Volts (V_lost)</span>
                      <span className="text-2xl font-black text-amber-400 font-mono my-2">
                        {circuitCalculations.lostVolts.toFixed(2)} V
                      </span>
                      <span className="text-[10px] text-slate-500">V_lost = I · r</span>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
                      <span className="text-xs text-slate-400">Terminal Voltmeter (V_load)</span>
                      <span className="text-2xl font-black text-emerald-400 font-mono my-2">
                        {circuitCalculations.terminalV.toFixed(2)} V
                      </span>
                      <span className="text-[10px] text-slate-500">V_load = ε - I · r</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SUB-SIM 2.3: NEWTON'S LAWS FBD SIMULATOR */}
            {physicsSimSubTab === 'fbd' && (
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <Icon name="atom" className="w-5 h-5 text-indigo-400" />
                      <span>Newton&apos;s Laws Free-Body Diagram (FBD) Visualizer</span>
                    </h2>
                    <p className="text-xs text-slate-400">
                      Visualise normal force, weight components, kinetic friction, and net acceleration in real time.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setFbdSurfaceType('horizontal')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                        fbdSurfaceType === 'horizontal' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      Flat Surface (0°)
                    </button>
                    <button
                      onClick={() => setFbdSurfaceType('incline')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                        fbdSurfaceType === 'incline' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      Inclined Plane (θ)
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Parameter Controls */}
                  <div className="space-y-4 bg-slate-950/60 p-5 rounded-2xl border border-slate-800">
                    <h4 className="text-xs font-bold uppercase text-slate-400">Parameters</h4>

                    {fbdSurfaceType === 'incline' && (
                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Incline Angle (θ):</span>
                          <span className="font-mono text-indigo-400">{fbdAngle}°</span>
                        </div>
                        <input
                          type="range"
                          min="5"
                          max="60"
                          step="1"
                          value={fbdAngle}
                          onChange={e => setFbdAngle(e.target.value)}
                          className="w-full accent-indigo-500"
                        />
                      </div>
                    )}

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Mass (m):</span>
                        <span className="font-mono text-indigo-400">{fbdMass} kg</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="50"
                        step="1"
                        value={fbdMass}
                        onChange={e => setFbdMass(e.target.value)}
                        className="w-full accent-indigo-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Applied Pull Force (F_app):</span>
                        <span className="font-mono text-emerald-400">{fbdAppliedForce} N</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="300"
                        step="5"
                        value={fbdAppliedForce}
                        onChange={e => setFbdAppliedForce(e.target.value)}
                        className="w-full accent-emerald-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>Friction Coeff (μk):</span>
                        <span className="font-mono text-amber-400">{fbdMuK}</span>
                      </div>
                      <input
                        type="range"
                        min="0.0"
                        max="0.6"
                        step="0.05"
                        value={fbdMuK}
                        onChange={e => setFbdMuK(e.target.value)}
                        className="w-full accent-amber-500"
                      />
                    </div>

                    <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-[11px] text-amber-300">
                      ⚠️ <strong>DBE Exam Rule:</strong> Never resolve weight into $w_\parallel$ and $w_\perp$ directly on your Free-Body Diagram! Only draw actual forces.
                    </div>
                  </div>

                  {/* Visual FBD Diagram & Result Values */}
                  <div className="lg:col-span-2 space-y-4">
                    <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex items-center justify-center min-h-[220px] relative overflow-hidden">
                      {/* SVG Canvas for Free-Body Diagram */}
                      <svg viewBox="0 0 400 200" className="w-full h-48">
                        {/* Inclined Surface Line */}
                        {fbdSurfaceType === 'incline' ? (
                          <line x1="50" y1="170" x2="350" y2="90" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
                        ) : (
                          <line x1="50" y1="160" x2="350" y2="160" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
                        )}

                        {/* Block Center Point */}
                        <rect
                          x="180"
                          y={fbdSurfaceType === 'incline' ? "105" : "120"}
                          width="40"
                          height="40"
                          rx="6"
                          fill="#4f46e5"
                          opacity="0.85"
                          transform={fbdSurfaceType === 'incline' ? `rotate(-15 200 125)` : ''}
                        />

                        {/* Force Arrows */}
                        {/* Weight (w = mg straight down) */}
                        <line x1="200" y1="125" x2="200" y2="195" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrow)" />
                        <text x="208" y="190" fill="#ef4444" fontSize="11" fontWeight="bold">w (mg)</text>

                        {/* Normal Force (N) */}
                        <line
                          x1="200"
                          y1="125"
                          x2={fbdSurfaceType === 'incline' ? "185" : "200"}
                          y2={fbdSurfaceType === 'incline' ? "60" : "55"}
                          stroke="#38bdf8"
                          strokeWidth="3"
                        />
                        <text x={fbdSurfaceType === 'incline' ? "170" : "208"} y="60" fill="#38bdf8" fontSize="11" fontWeight="bold">N</text>

                        {/* Applied Force (F_app up incline) */}
                        <line
                          x1="200"
                          y1="125"
                          x2={fbdSurfaceType === 'incline' ? "280" : "280"}
                          y2={fbdSurfaceType === 'incline' ? "100" : "125"}
                          stroke="#10b981"
                          strokeWidth="3"
                        />
                        <text x="285" y="115" fill="#10b981" fontSize="11" fontWeight="bold">F_app</text>

                        {/* Friction (f_k down incline) */}
                        <line
                          x1="200"
                          y1="125"
                          x2={fbdSurfaceType === 'incline' ? "120" : "120"}
                          y2={fbdSurfaceType === 'incline' ? "150" : "125"}
                          stroke="#f59e0b"
                          strokeWidth="3"
                        />
                        <text x="90" y="145" fill="#f59e0b" fontSize="11" fontWeight="bold">f_k</text>
                      </svg>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">Normal Force (N):</span>
                        <span className="font-bold text-sky-400 font-mono text-sm">{fbdCalculations.normalForce.toFixed(1)} N</span>
                      </div>
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">Friction (fk):</span>
                        <span className="font-bold text-amber-400 font-mono text-sm">{fbdCalculations.frictionForce.toFixed(1)} N</span>
                      </div>
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">Net Force (F_net):</span>
                        <span className={`font-bold font-mono text-sm ${fbdCalculations.fNet >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {fbdCalculations.fNet.toFixed(1)} N
                        </span>
                      </div>
                      <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">Net Accel (a):</span>
                        <span className="font-bold text-indigo-400 font-mono text-sm">{fbdCalculations.accel.toFixed(2)} m·s⁻²</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW 3: CHEMISTRY SUITE */}
        {activeTab === 'chemistry' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-2 rounded-2xl">
              {[
                { id: 'periodic', label: 'Periodic Table (Table 3)' },
                { id: 'rice', label: 'RICE Table & Kc Solver' },
                { id: 'titration', label: 'Titration Calculator' },
                { id: 'redox', label: 'Table 4B Cell Potential' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setChemToolTab(t.id)}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition ${
                    chemToolTab === t.id
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {chemToolTab === 'periodic' && (
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">DBE Official Table 3: Periodic Table</h3>
                    <p className="text-xs text-slate-400">Select any element to view atomic number, molar mass, and electronegativity.</p>
                  </div>
                  <input
                    type="text"
                    placeholder="Search element or symbol..."
                    value={ptSearch}
                    onChange={e => setPtSearch(e.target.value)}
                    className="bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3">
                  {PERIODIC_TABLE_ELEMENTS.filter(el =>
                    el.name.toLowerCase().includes(ptSearch.toLowerCase()) ||
                    el.sym.toLowerCase().includes(ptSearch.toLowerCase())
                  ).map(el => (
                    <button
                      key={el.z}
                      onClick={() => setSelectedElement(el)}
                      className={`p-3 rounded-xl border text-center transition flex flex-col justify-between ${
                        selectedElement.sym === el.sym
                          ? 'border-indigo-500 bg-indigo-600/20 text-white'
                          : 'border-slate-800 bg-slate-950 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>{el.z}</span>
                        <span>{el.en ?? '-'}</span>
                      </div>
                      <span className="text-xl font-black text-indigo-300 my-1">{el.sym}</span>
                      <span className="text-[10px] truncate text-slate-400">{el.name}</span>
                      <span className="text-[9px] font-mono text-emerald-400 mt-1">{el.mass}</span>
                    </button>
                  ))}
                </div>

                {selectedElement && (
                  <div className="bg-slate-950 p-5 rounded-2xl border border-indigo-500/30 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">{selectedElement.cat}</span>
                      <h4 className="text-2xl font-black text-white">{selectedElement.name} ({selectedElement.sym})</h4>
                    </div>
                    <div className="flex gap-6 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Atomic Number (Z):</span>
                        <span className="font-bold text-white text-base">{selectedElement.z}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Molar Mass (M):</span>
                        <span className="font-bold text-emerald-400 text-base">{selectedElement.mass} g·mol⁻¹</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Electronegativity:</span>
                        <span className="font-bold text-amber-400 text-base">{selectedElement.en ?? 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {chemToolTab === 'rice' && (
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white">Dynamic RICE Table Solver</h3>
                  <p className="text-xs text-slate-400">Equation: 2SO2(g) + O2(g) ⇌ 2SO3(g)</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Initial SO2 (mol):</label>
                    <input
                      type="number"
                      step="0.1"
                      value={riceInitA}
                      onChange={e => setRiceInitA(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Initial O2 (mol):</label>
                    <input
                      type="number"
                      step="0.1"
                      value={riceInitB}
                      onChange={e => setRiceInitB(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Equilibrium SO3 (mol):</label>
                    <input
                      type="number"
                      step="0.1"
                      value={riceEqC}
                      onChange={e => setRiceEqC(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Container Volume (dm³):</label>
                    <input
                      type="number"
                      step="0.1"
                      value={riceVolume}
                      onChange={e => setRiceVolume(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="p-3">RICE Stage</th>
                        <th className="p-3">2 SO2(g)</th>
                        <th className="p-3">1 O2(g)</th>
                        <th className="p-3">2 SO3(g)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      <tr>
                        <td className="p-3 font-bold text-slate-400">Ratio</td>
                        <td className="p-3 text-indigo-400">2</td>
                        <td className="p-3 text-indigo-400">1</td>
                        <td className="p-3 text-indigo-400">2</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-slate-400">Initial (mol)</td>
                        <td className="p-3">{riceInitA}</td>
                        <td className="p-3">{riceInitB}</td>
                        <td className="p-3">0.0</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-slate-400">Change (mol)</td>
                        <td className="p-3 text-red-400">-{(riceEqC).toFixed(2)}</td>
                        <td className="p-3 text-red-400">-{(riceEqC / 2).toFixed(2)}</td>
                        <td className="p-3 text-emerald-400">+{(parseFloat(riceEqC) || 0).toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-slate-400">Equilibrium (mol)</td>
                        <td className="p-3 font-mono font-bold text-white">{riceCalculations.eqA.toFixed(2)}</td>
                        <td className="p-3 font-mono font-bold text-white">{riceCalculations.eqB.toFixed(2)}</td>
                        <td className="p-3 font-mono font-bold text-white">{riceCalculations.eqC.toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-slate-400">Concentration (mol·dm⁻³)</td>
                        <td className="p-3 font-mono text-emerald-400">{riceCalculations.concA.toFixed(2)}</td>
                        <td className="p-3 font-mono text-emerald-400">{riceCalculations.concB.toFixed(2)}</td>
                        <td className="p-3 font-mono text-emerald-400">{riceCalculations.concC.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Calculated Equilibrium Constant (Kc):</span>
                  <span className="text-2xl font-black text-indigo-400 font-mono">
                    {riceCalculations.kc.toFixed(2)}
                  </span>
                </div>
              </div>
            )}

            {chemToolTab === 'titration' && (
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white">Volumetric Titration Stoichiometry Solver</h3>
                  <p className="text-xs text-slate-400">Formula: (ca · Va) / (cb · Vb) = na / nb</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Acid Concentration ca (mol·dm⁻³):</label>
                    <input
                      type="number"
                      step="0.01"
                      value={titrCa}
                      onChange={e => setTitrCa(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Acid Volume Va (cm³):</label>
                    <input
                      type="number"
                      step="1"
                      value={titrVa}
                      onChange={e => setTitrVa(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Base Volume Vb (cm³):</label>
                    <input
                      type="number"
                      step="1"
                      value={titrVb}
                      onChange={e => setTitrVb(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                    />
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Calculated Unknown Base Concentration (cb):</span>
                  <span className="text-2xl font-black text-emerald-400 font-mono">
                    {((parseFloat(titrCa) * parseFloat(titrVa) * titrNb) / (Math.max(0.1, parseFloat(titrVb)) * titrNa)).toFixed(3)} mol·dm⁻³
                  </span>
                </div>
              </div>
            )}

            {chemToolTab === 'redox' && (
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white">Table 4B Standard Reduction Potentials</h3>
                  <p className="text-xs text-slate-400">E°cell = E°cathode - E°anode</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Select Cathode (Reduction):</label>
                    <select
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                      value={selectedCathodeHalf.halfReaction}
                      onChange={e => {
                        const found = TABLE_4B_REDOX.find(r => r.halfReaction === e.target.value);
                        if (found) setSelectedCathodeHalf(found);
                      }}
                    >
                      {TABLE_4B_REDOX.map(r => (
                        <option key={r.halfReaction} value={r.halfReaction}>
                          {r.halfReaction} (E° = {r.e0 > 0 ? `+${r.e0}` : r.e0} V)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Select Anode (Oxidation):</label>
                    <select
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                      value={selectedAnodeHalf.halfReaction}
                      onChange={e => {
                        const found = TABLE_4B_REDOX.find(r => r.halfReaction === e.target.value);
                        if (found) setSelectedAnodeHalf(found);
                      }}
                    >
                      {TABLE_4B_REDOX.map(r => (
                        <option key={r.halfReaction} value={r.halfReaction}>
                          {r.halfReaction} (E° = {r.e0 > 0 ? `+${r.e0}` : r.e0} V)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-slate-400 block">Standard Cell Potential (E°cell):</span>
                    <span className="text-3xl font-black text-indigo-400 font-mono">
                      {redoxCalculations.eCell > 0 ? `+${redoxCalculations.eCell.toFixed(2)}` : redoxCalculations.eCell.toFixed(2)} V
                    </span>
                  </div>
                  <div>
                    <span className={`px-3 py-1.5 rounded-full text-xs font-bold border ${
                      redoxCalculations.isSpontaneous
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : 'bg-red-500/10 text-red-400 border-red-500/30'
                    }`}>
                      {redoxCalculations.isSpontaneous ? 'SPONTANEOUS (Galvanic Cell)' : 'NON-SPONTANEOUS (Requires External Power)'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW 4: ACTIVE RECALL FLASHCARDS DECK */}
        {activeTab === 'flashcards' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Card {flashcardIndex + 1} of {flashcardsList.length}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => speakDefinition(flashcardsList[flashcardIndex].definition)}
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-indigo-400 border border-slate-800"
                >
                  <Icon name="volume" className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              onClick={() => setFlashcardFlipped(prev => !prev)}
              className="min-h-[280px] bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-3xl p-8 flex flex-col justify-between cursor-pointer transition-all shadow-2xl relative select-none"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  {flashcardsList[flashcardIndex].paper}
                </span>
                <span className="text-xs text-slate-500 font-medium">Click / Tap to flip</span>
              </div>

              <div className="my-6 text-center">
                {!flashcardFlipped ? (
                  <div>
                    <span className="text-xs uppercase text-slate-400 tracking-wider font-semibold block mb-2">Define Verbatim:</span>
                    <h3 className="text-2xl font-black text-white">{flashcardsList[flashcardIndex].term}</h3>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-base text-slate-200 leading-relaxed font-medium">
                      &ldquo;{flashcardsList[flashcardIndex].definition}&rdquo;
                    </p>
                    <code className="inline-block px-3 py-1 bg-slate-950 rounded-lg text-emerald-400 text-xs font-mono border border-slate-800">
                      {flashcardsList[flashcardIndex].formula}
                    </code>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Swipe left/right or use ← / → arrows</span>
                <span className="text-indigo-400 font-bold">{flashcardFlipped ? 'Answer Revealed' : 'Prompt Front'}</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <button
                onClick={() => {
                  setFlashcardIndex(prev => (prev - 1 + flashcardsList.length) % flashcardsList.length);
                  setFlashcardFlipped(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-200 transition"
              >
                ← Previous
              </button>

              <button
                onClick={() => setFlashcardFlipped(prev => !prev)}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-lg shadow-indigo-600/20"
              >
                Flip Card
              </button>

              <button
                onClick={() => {
                  setFlashcardIndex(prev => (prev + 1) % flashcardsList.length);
                  setFlashcardFlipped(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-200 transition"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* VIEW 5: EXAM MINI-TESTS */}
        {activeTab === 'tests' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-slate-900 border border-slate-800 p-4 rounded-2xl">
              <div>
                <h3 className="font-bold text-white text-base">Paper 1 & 2 Examination Multiple Choice Drills</h3>
                <p className="text-xs text-slate-400">Instant marking with official DBE CAPS answer rationales.</p>
              </div>
              <div className="flex gap-2">
                {['All', 'Beginner', 'Intermediate', 'Advanced'].map(tier => (
                  <button
                    key={tier}
                    onClick={() => setTestFilter(tier)}
                    className={`px-3 py-1 rounded-xl text-xs font-medium transition ${
                      testFilter === tier ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {MINI_TEST_QUESTIONS.filter(q => testFilter === 'All' || q.tier === testFilter).map(q => {
                const isSelected = selectedAnswers[q.id];
                return (
                  <div key={q.id} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-indigo-400">{q.paper} • {q.topic}</span>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400">{q.tier}</span>
                    </div>

                    <p className="text-sm font-semibold text-white leading-relaxed">{q.question}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {q.options.map(opt => {
                        const isChosen = isSelected === opt.id;
                        return (
                          <button
                            key={opt.id}
                            onClick={() => setSelectedAnswers(prev => ({ ...prev, [q.id]: opt.id }))}
                            className={`p-3.5 rounded-xl border text-left text-xs font-medium transition flex items-center gap-3 ${
                              isChosen
                                ? opt.correct
                                  ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300'
                                  : 'bg-red-500/10 border-red-500 text-red-300'
                                : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                            }`}
                          >
                            <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center font-bold text-[10px]">
                              {opt.id}
                            </span>
                            <span>{opt.text}</span>
                          </button>
                        );
                      })}
                    </div>

                    {isSelected && (
                      <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-400">
                        <span className="font-bold text-indigo-300">Rationale: </span>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW 6: SECTION B STRUCTURED QUESTIONS (130 MARKS) */}
        {activeTab === 'sectionB' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
              <h2 className="text-xl font-bold text-white">Section B Long-Question Walkthroughs</h2>
              <p className="text-xs text-slate-400 mt-1">
                Step-by-step marking rubrics detailing where examiners award marks for formulas, substitutions, and SI units.
              </p>
            </div>

            <div className="space-y-6">
              {SECTION_B_QUESTIONS.map(q => (
                <div key={q.id} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-bold text-indigo-400 uppercase">{q.paper}</span>
                    <span className="text-xs font-bold text-emerald-400">{q.totalMarks} Marks Total</span>
                  </div>

                  <h3 className="text-lg font-bold text-white">{q.title}</h3>
                  <p className="text-xs text-slate-300 bg-slate-950 p-4 rounded-xl border border-slate-800 italic">
                    {q.context}
                  </p>

                  <div className="space-y-3 pt-2">
                    {q.subQuestions.map(sq => (
                      <div key={sq.num} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                        <span className="text-xs font-bold text-slate-200">{sq.num} {sq.text}</span>
                        <div className="pt-2 border-t border-slate-800/80 text-xs text-emerald-300">
                          <span className="font-bold text-slate-400">DBE Memo: </span>
                          {sq.memo}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 7: MATRIC FINAL MARK & NSC LEVEL CALCULATOR */}
        {activeTab === 'calculator' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Icon name="calculator" className="w-5 h-5 text-indigo-400" />
                <span>Matric Final Composite Mark & NSC Level Calculator</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Calculates the official 25% SBA (School-Based Assessment) + 75% Final Examination weighting and determines your university APS points.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Inputs */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider text-slate-300">Assessment Inputs</h3>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>SBA Portfolio Mark (25% Weight):</span>
                    <span className="font-mono text-indigo-400 font-bold">{calcSbaMark} / 100</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={calcSbaMark}
                    onChange={e => setCalcSbaMark(e.target.value)}
                    className="w-full accent-indigo-500"
                  />
                  <span className="text-[10px] text-slate-500">Includes Practical Experiments & Term Tests</span>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Paper 1 (Physics Exam):</span>
                    <span className="font-mono text-indigo-400 font-bold">{calcP1Exam} / 150</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="150"
                    value={calcP1Exam}
                    onChange={e => setCalcP1Exam(e.target.value)}
                    className="w-full accent-indigo-500"
                  />
                  <span className="text-[10px] text-slate-500">{matricCalcResults.p1Pct.toFixed(1)}% in Paper 1</span>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>Paper 2 (Chemistry Exam):</span>
                    <span className="font-mono text-indigo-400 font-bold">{calcP2Exam} / 150</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="150"
                    value={calcP2Exam}
                    onChange={e => setCalcP2Exam(e.target.value)}
                    className="w-full accent-indigo-500"
                  />
                  <span className="text-[10px] text-slate-500">{matricCalcResults.p2Pct.toFixed(1)}% in Paper 2</span>
                </div>
              </div>

              {/* Calculated Symbols & Outcomes */}
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col justify-between">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                    <div>
                      <span className="text-xs text-slate-400 block">Overall Composite Matric Result:</span>
                      <div className="flex items-baseline gap-3 mt-1">
                        <span className="text-4xl font-black text-white">{matricCalcResults.finalComposite}%</span>
                        <span className={`px-3 py-1 rounded-xl text-xs font-bold border ${matricCalcResults.badgeColor}`}>
                          Level {matricCalcResults.level} ({matricCalcResults.symbol})
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-400 block">University APS Contribution:</span>
                      <span className="text-3xl font-black text-indigo-400 font-mono">+{matricCalcResults.aps} Points</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 my-4 leading-relaxed">
                    <strong>DBE Rating:</strong> {matricCalcResults.description}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">SBA Contribution (25%):</span>
                      <span className="font-bold text-white">{(matricCalcResults.sba * 0.25).toFixed(1)}%</span>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">Exams Contribution (75%):</span>
                      <span className="font-bold text-white">{(matricCalcResults.examAvgPct * 0.75).toFixed(1)}%</span>
                    </div>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">Combined Exam Total:</span>
                      <span className="font-bold text-emerald-400 font-mono">{matricCalcResults.p1 + matricCalcResults.p2} / 300</span>
                    </div>
                  </div>

                  {/* Target Solver */}
                  <div className="mt-4 p-4 bg-indigo-950/30 border border-indigo-500/20 rounded-2xl flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-indigo-300 block">Level 7 Distinction Target (80%+):</span>
                      <span className="text-xs text-slate-400">
                        {matricCalcResults.neededP2 <= 150
                          ? `You need ${Math.max(0, matricCalcResults.neededP2)} / 150 in Paper 2 to guarantee a Level 7 Distinction.`
                          : `Increase your SBA mark or Paper 1 score to hit the Level 7 threshold.`}
                      </span>
                    </div>
                    <span className="text-xl font-black text-indigo-400 font-mono">
                      {Math.max(0, Math.min(150, matricCalcResults.neededP2))} / 150
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 8: PAST PAPERS & MEMORANDA ARCHIVE */}
        {activeTab === 'pastpapers' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Icon name="fileText" className="w-5 h-5 text-indigo-400" />
                <span>Official NSC Past Papers & Memoranda Archive</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Access official Department of Basic Education examination papers and question-by-question examiner breakdowns.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PAST_PAPERS_ARCHIVE.map(exam => (
                <div key={exam.id} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div>
                        <h3 className="text-base font-bold text-white">{exam.year}</h3>
                        <span className="text-xs text-slate-400">{exam.session}</span>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-semibold">
                        DBE Official
                      </span>
                    </div>

                    <div className="mt-4 space-y-3">
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                        <div className="flex justify-between text-xs font-bold text-blue-400 mb-1">
                          <span>Paper 1 (Physics - 150 Marks)</span>
                          <span className="text-slate-400 text-[10px]">Rating: {exam.p1AvgDifficulty}</span>
                        </div>
                        <p className="text-xs text-slate-300">{exam.p1Overview}</p>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {exam.p1TopicsFocus.map((tf, idx) => (
                            <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-300">
                              {tf}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                        <div className="flex justify-between text-xs font-bold text-emerald-400 mb-1">
                          <span>Paper 2 (Chemistry - 150 Marks)</span>
                          <span className="text-slate-400 text-[10px]">Rating: {exam.p2AvgDifficulty}</span>
                        </div>
                        <p className="text-xs text-slate-300">{exam.p2Overview}</p>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {exam.p2TopicsFocus.map((tf, idx) => (
                            <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300">
                              {tf}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-mono">150m • 3 Hours Per Paper</span>
                    <button
                      onClick={() => {
                        handleAskTutor(`Walk me through the high-frequency exam traps and marking rubrics from the ${exam.year} paper.`);
                        setActiveTab('tutor');
                      }}
                      className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition shadow-md shadow-indigo-600/20"
                    >
                      Analyze with OmniTutor →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 9: STUDY SQUADS & COLLABORATION */}
        {activeTab === 'squads' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
              <div>
                <h2 className="text-xl font-bold text-white">Matric Distinction Study Squads</h2>
                <p className="text-xs text-slate-400 mt-0.5">Revise collaboratively via Google Meet, Microsoft Teams, and WhatsApp.</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setIsJoinSquadOpen(true)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition"
                >
                  🔑 Join with Code
                </button>
                <button
                  onClick={() => setIsCreateSquadOpen(true)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition shadow-md shadow-indigo-600/30"
                >
                  + Create Study Squad
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {squadsList.map(sq => (
                <div key={sq.id} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                        {sq.topicFocus}
                      </span>
                      <span className="text-xs font-mono text-slate-400">Code: {sq.code}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white mt-2">{sq.name}</h3>
                    <p className="text-xs text-slate-400 mt-1 italic">&ldquo;{sq.motto}&rdquo;</p>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {sq.tags.map((t, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 bg-slate-950 text-slate-300 rounded border border-slate-800">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400">{sq.members.length} / {sq.capacity} Candidates</span>
                    <button
                      onClick={() => {
                        const shareText = `Join my Matric Physical Sciences study squad "${sq.name}" (Room Code: ${sq.code}) on ${sq.platform}!`;
                        if (navigator.share) {
                          navigator.share({ title: sq.name, text: shareText });
                        } else {
                          navigator.clipboard.writeText(shareText);
                          showToast('📋 Squad invite copied to clipboard!');
                        }
                      }}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-indigo-400 rounded-lg font-medium transition"
                    >
                      Invite Peers
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 10: TIMETABLE PLANNER WITH DYNAMIC WEAK-TOPIC INTEGRATION */}
        {activeTab === 'planner' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
              <h2 className="text-xl font-bold text-white">Adaptive Matric Study Routine</h2>
              <p className="text-xs text-slate-400 mt-1">Diagnostic schedule prioritizing topics under 70% mastery.</p>
            </div>

            {/* Weak-Topic Auto Detection Alert */}
            {weakTopics.length > 0 && (
              <div className="bg-amber-950/30 border border-amber-500/30 p-5 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                    <Icon name="alert" className="w-4 h-4" />
                    <span>Distinction Alert: {weakTopics.length} Topics Below 70% Mastery</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Topics requiring immediate intervention: {weakTopics.map(w => `${w.title} (${w.mastery}%)`).join(', ')}.
                  </p>
                </div>
                <button
                  onClick={handleAutoScheduleWeakTopics}
                  className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold transition whitespace-nowrap shadow-lg shadow-amber-600/20"
                >
                  ⚡ Auto-Generate Catch-Up Routine
                </button>
              </div>
            )}

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add target study task..."
                  value={newTaskTitle}
                  onChange={e => setNewTaskTitle(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white"
                />
                <button
                  onClick={() => {
                    if (newTaskTitle.trim()) {
                      setPlannerTasks(prev => [...prev, {
                        id: Date.now(),
                        title: newTaskTitle,
                        topic: 'Custom Revision',
                        done: false,
                        day: 'Custom'
                      }]);
                      setNewTaskTitle('');
                    }
                  }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                >
                  Add Task
                </button>
              </div>

              <div className="space-y-2 pt-2">
                {plannerTasks.map(task => (
                  <div key={task.id} className="flex items-center justify-between p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={task.done}
                        onChange={() => {
                          setPlannerTasks(prev => prev.map(t => t.id === task.id ? { ...t, done: !t.done } : t));
                        }}
                        className="w-4 h-4 accent-indigo-500 rounded"
                      />
                      <span className={`text-xs ${task.done ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                        {task.title}
                      </span>
                    </div>
                    <span className="text-[10px] text-indigo-400 px-2 py-0.5 bg-indigo-500/10 rounded">
                      {task.day}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 11: TOPIC NOTEBOOK */}
        {activeTab === 'notebook' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
              <h2 className="text-xl font-bold text-white">Personal Topic Notebook & Teacher Mnemonics</h2>
              <p className="text-xs text-slate-400 mt-1">Saved locally on your device for offline load-shedding revision.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CAPS_TOPICS.map(topic => (
                <div key={topic.id} className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white">{topic.title}</span>
                    <span className="text-slate-500 text-[10px]">{topic.paper}</span>
                  </div>
                  <textarea
                    rows={3}
                    placeholder={`Write your classroom notes and teacher mnemonics for ${topic.title}...`}
                    value={notebookNotes[topic.id] || ''}
                    onChange={e => {
                      const updated = { ...notebookNotes, [topic.id]: e.target.value };
                      setNotebookNotes(updated);
                      try {
                        localStorage.setItem('nsc_matric_notes', JSON.stringify(updated));
                      } catch {
                        // ignore localstorage quota errors
                      }
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 resize-none"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 12: OMNITUTOR AI CHAT */}
        {activeTab === 'tutor' && (
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Icon name="bot" className="w-5 h-5 text-indigo-400" />
                <span>DBE CAPS OmniTutor AI</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Trained on official South African Department of Basic Education guidelines and examination memoranda.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 min-h-[400px] flex flex-col justify-between space-y-4">
              <div className="space-y-4 overflow-y-auto max-h-[420px] pr-2">
                {tutorMessages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed whitespace-pre-line ${
                      msg.sender === 'user'
                        ? 'bg-indigo-600 text-white rounded-br-none shadow-md shadow-indigo-600/20'
                        : 'bg-slate-950 text-slate-200 border border-slate-800 rounded-bl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTutorLoading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs text-indigo-400 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
                      <span>Consulting DBE Examination Memoranda...</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-2 border-t border-slate-800">
                <input
                  type="text"
                  placeholder="Ask a matric physical sciences question (e.g. lost volts, Le Chatelier, VPM)..."
                  value={tutorInput}
                  onChange={e => setTutorInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAskTutor()}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
                <button
                  onClick={() => handleAskTutor()}
                  disabled={isTutorLoading}
                  className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-indigo-600/20"
                >
                  Ask
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 13: PROFILE & SA ID VERIFICATION */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6">
              <h2 className="text-xl font-bold text-white">Learner Profile & Security</h2>

              <div className="space-y-4">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Candidate Full Name:</label>
                  <input
                    type="text"
                    value={candidateName}
                    onChange={e => setCandidateName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs text-slate-400">South African ID (Luhn Validated):</label>
                    <span className={`text-[10px] font-bold ${isIdValid ? 'text-emerald-400' : 'text-red-400'}`}>
                      {isIdValid ? '✓ Valid SA ID Checksum' : '✗ Invalid ID Checksum'}
                    </span>
                  </div>
                  <input
                    type="text"
                    value={candidateID}
                    onChange={handleIdChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white font-mono"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Target Matric Distinction Symbol:</span>
                    <span className="font-bold text-indigo-400">{targetSymbol}% (Level 7)</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={targetSymbol}
                    onChange={e => setTargetSymbol(e.target.value)}
                    className="w-full accent-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODAL 1: 1.2-SECOND TOPIC LOADING TRANSITION MODAL */}
      {loadingTopic && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-indigo-500/30 p-8 rounded-3xl max-w-md w-full text-center space-y-5 shadow-2xl">
            <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20 border-dashed animate-spin" />
              <div className="w-14 h-14 rounded-full bg-indigo-600/20 border border-indigo-500/50 flex items-center justify-center">
                <Icon name="atom" className="w-7 h-7 text-indigo-400 animate-pulse" />
              </div>
            </div>

            <div>
              <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-widest">{loadingTopic.paper}</span>
              <h3 className="text-xl font-black text-white mt-1">{loadingTopic.title}</h3>
              <p className="text-xs text-slate-400 italic mt-2">&ldquo;{loadingTopic.quote}&rdquo;</p>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Retrieving DBE Examination Guidelines...</span>
                <span className="font-mono text-indigo-400">{loadingProgress}%</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-violet-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: OFFICIAL DBE EXAMINATION DATA SHEET MODAL (TABLES 1 & 2) */}
      {isDataSheetOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col justify-between shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Icon name="fileText" className="w-5 h-5 text-indigo-400" />
                  <span>Official DBE Physical Sciences Data Sheet</span>
                </h3>
                <p className="text-xs text-slate-400">Verbatim Department of Basic Education Examination Tables</p>
              </div>
              <button onClick={() => setIsDataSheetOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            {/* Table Switcher */}
            <div className="flex gap-2">
              <button
                onClick={() => setDataSheetTab('constants')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${
                  dataSheetTab === 'constants' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                Table 1: Physical Constants
              </button>
              <button
                onClick={() => setDataSheetTab('formulas')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${
                  dataSheetTab === 'formulas' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                Table 2: Official Formula Sheets
              </button>
            </div>

            {/* Scrollable Content Area */}
            <div className="overflow-y-auto max-h-[55vh] pr-2 space-y-4">
              {dataSheetTab === 'constants' ? (
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="p-3">Physical Constant Quantity</th>
                      <th className="p-3">Symbol</th>
                      <th className="p-3">Standard Examination Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {DBE_CONSTANTS_TABLE.map((c, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/40">
                        <td className="p-3 font-medium text-slate-200">{c.name}</td>
                        <td className="p-3 font-mono text-indigo-400">{c.sym}</td>
                        <td className="p-3 font-mono font-bold text-emerald-400">{c.val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="space-y-4">
                  {DBE_FORMULAS_CATALOG.map((cat, idx) => (
                    <div key={idx} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                      <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{cat.category}</h4>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {cat.formulas.map((f, fIdx) => (
                          <code key={fIdx} className="px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-emerald-300">
                            {f}
                          </code>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setIsDataSheetOpen(false)}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl"
              >
                Close Data Sheet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: CREATE STUDY SQUAD MODAL */}
      {isCreateSquadOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl max-w-lg w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white">Create New Study Squad</h3>
              <button onClick={() => setIsCreateSquadOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Squad Name & Title:</label>
                <input
                  type="text"
                  placeholder="e.g. Durban Distinction Champions"
                  value={newSquadName}
                  onChange={e => setNewSquadName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Syllabus Topic Focus:</label>
                <select
                  value={newSquadTopic}
                  onChange={e => setNewSquadTopic(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white"
                >
                  <option value="Paper 1 (Newton & VPM)">Paper 1 (Newton & VPM)</option>
                  <option value="Paper 1 (Circuits & Electrodynamics)">Paper 1 (Circuits & Electrodynamics)</option>
                  <option value="Paper 2 (Organic Chemistry)">Paper 2 (Organic Chemistry)</option>
                  <option value="Paper 2 (Equilibrium & Acids)">Paper 2 (Equilibrium & Acids)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Room Code:</label>
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      value={newSquadCode}
                      onChange={e => setNewSquadCode(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setNewSquadCode('SQUAD-' + Math.floor(1000 + Math.random() * 9000))}
                      className="px-2.5 bg-slate-800 rounded-xl text-xs"
                      title="Randomize Code"
                    >
                      🎲
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1">Passcode PIN (Optional):</label>
                  <input
                    type="password"
                    maxLength={4}
                    placeholder="None"
                    value={newSquadPasscode}
                    onChange={e => setNewSquadPasscode(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Meeting Platform:</label>
                <select
                  value={newSquadPlatform}
                  onChange={e => setNewSquadPlatform(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white"
                >
                  <option value="Google Meet">Google Meet</option>
                  <option value="Microsoft Teams">Microsoft Teams</option>
                  <option value="WhatsApp Study Call">WhatsApp Study Call</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setIsCreateSquadOpen(false)}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (newSquadName.trim()) {
                    setSquadsList(prev => [
                      {
                        id: 'sq_' + Date.now(),
                        name: newSquadName,
                        topicFocus: newSquadTopic,
                        code: newSquadCode,
                        passcode: newSquadPasscode,
                        capacity: newSquadCapacity,
                        members: [`${candidateName} (Admin)`],
                        platform: newSquadPlatform,
                        tags: newSquadTags,
                        motto: newSquadMotto || 'Drilling matric distinction questions together.'
                      },
                      ...prev
                    ]);
                    setIsCreateSquadOpen(false);
                    setNewSquadName('');
                    showToast('🎉 Study Squad created successfully!');
                  }
                }}
                className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/20"
              >
                Create Squad
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: JOIN SQUAD WITH CODE */}
      {isJoinSquadOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Join Study Squad</h3>
              <button onClick={() => setIsJoinSquadOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Enter Room Code:</label>
                <input
                  type="text"
                  placeholder="e.g. GP-DIST-80"
                  value={joinCodeInput}
                  onChange={e => setJoinCodeInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Passcode PIN (if required):</label>
                <input
                  type="password"
                  placeholder="PIN"
                  value={joinPinInput}
                  onChange={e => setJoinPinInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white font-mono"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-slate-800">
              <button
                onClick={() => setIsJoinSquadOpen(false)}
                className="flex-1 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const found = squadsList.find(s => s.code.toLowerCase() === joinCodeInput.trim().toLowerCase());
                  if (found) {
                    if (found.passcode && found.passcode !== joinPinInput.trim()) {
                      showToast('❌ Incorrect Passcode PIN.');
                      return;
                    }
                    showToast(`✓ Welcome to "${found.name}"!`);
                    setIsJoinSquadOpen(false);
                    setJoinCodeInput('');
                    setJoinPinInput('');
                  } else {
                    showToast('❌ Squad room code not found.');
                  }
                }}
                className="flex-1 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
              >
                Enter Squad
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: QUICK SEARCH (CTRL+K) */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-start justify-center pt-20 p-4">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Icon name="search" className="w-4 h-4 text-indigo-400" />
              <input
                type="text"
                autoFocus
                placeholder="Search any topic, formula, or exam trap..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-white focus:outline-none"
              />
              <button onClick={() => setIsSearchOpen(false)} className="text-xs text-slate-500">Esc</button>
            </div>

            <div className="max-h-60 overflow-y-auto space-y-2">
              {CAPS_TOPICS.filter(t =>
                t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                t.definition.toLowerCase().includes(searchQuery.toLowerCase())
              ).map(t => (
                <button
                  key={t.id}
                  onClick={() => {
                    setIsSearchOpen(false);
                    handleSelectTopicWithAnimation(t);
                  }}
                  className="w-full p-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-left transition flex items-center justify-between"
                >
                  <div>
                    <span className="text-xs font-bold text-white block">{t.title}</span>
                    <span className="text-[10px] text-slate-400">{t.paper}</span>
                  </div>
                  <span className="text-[10px] text-indigo-400 font-mono">{t.weight}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* IN-APP TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-indigo-500/40 text-white text-xs font-medium px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 animate-bounce-short">
          <Icon name="check" className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}