import React, { useState, useEffect, useMemo } from 'react';

const customStyles = `
  /* Hide scrollbar across all elements and browsers while keeping scrolling active */
  html::-webkit-scrollbar,
  body::-webkit-scrollbar,
  *::-webkit-scrollbar {
    display: none !important;
    width: 0px !important;
    background: transparent !important;
  }
  html, body, * {
    -ms-overflow-style: none !important;
    scrollbar-width: none !important;
  }
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

class SafeErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 bg-red-500/20 text-red-400 border border-red-500/30 rounded-2xl flex items-center justify-center text-3xl mb-4">
            ⚠️
          </div>
          <h2 className="text-2xl font-black text-white mb-2">Display Reset Required</h2>
          <p className="text-slate-400 max-w-md text-sm mb-6">
            A temporary component error occurred. Click below to refresh your view state cleanly.
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
            }}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all text-sm cursor-pointer"
          >
            Reset View
          </button>
        </div>
      );
    }
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}

const CAPS_TOPICS = [
  // PAPER 1: PHYSICS
  {
    id: 'p1_newton',
    paper: 1,
    code: 'P1-01',
    title: "Newton's Laws & Applications",
    weight: '30-36 Marks',
    mastery: 84,
    icon: '⚖️',
    color: 'from-blue-600 to-indigo-700',
    verbatimDefinition: "Newton's Second Law of Motion: When a resultant/net force acts on an object, the object will accelerate in the direction of the force at an acceleration directly proportional to the force and inversely proportional to the mass of the object (F_net = ma).",
    laymanExplanation: "If you push something harder, it speeds up faster. But if it is heavier, you have to push much harder to get that exact same speed-up.",
    examinerWarning: "CRITICAL: When drawing Free-Body Diagrams (FBDs), label arrows with full words or official symbols (e.g., F_g or w, F_N or N). Arrows MUST touch the central dot. Never include components (like F_gx or F_gy) on an official FBD!",
    formulas: ['F_net = ma', 'f_s(max) = \\mu_s N', 'f_k = \\mu_k N', 'F_g = G(m_1 m_2)/r^2']
  },
  {
    id: 'p1_vpm',
    paper: 1,
    code: 'P1-02',
    title: "Vertical Projectile Motion (1D)",
    weight: '20-25 Marks',
    mastery: 78,
    icon: '🚀',
    color: 'from-cyan-600 to-blue-700',
    verbatimDefinition: "Free Fall: Motion during which the only force acting on an object is gravitational force (air resistance is completely ignored).",
    laymanExplanation: "Once an object leaves your hand in the air, only Earth's gravity pulls it downwards with a constant acceleration of 9.8 m/s²—regardless of whether it is rising, at the peak, or dropping.",
    examinerWarning: "Always state your chosen direction at the very start (e.g., 'Take UPWARDS as POSITIVE'). At the maximum height, velocity is momentarily 0 m/s, but acceleration is STILL 9.8 m/s² downwards!",
    formulas: ['v_f = v_i + g\\Delta t', 'v_f^2 = v_i^2 + 2g\\Delta y', '\\Delta y = v_i \\Delta t + \\frac{1}{2}g\\Delta t^2']
  },
  {
    id: 'p1_momentum',
    paper: 1,
    code: 'P1-03',
    title: "Momentum & Impulse",
    weight: '15-20 Marks',
    mastery: 82,
    icon: '💥',
    color: 'from-sky-600 to-indigo-800',
    verbatimDefinition: "Principle of Conservation of Linear Momentum: The total linear momentum in an isolated (closed) system remains constant (is conserved) in both magnitude and direction.",
    laymanExplanation: "In a closed crash where no outside forces interfere, the sum of all 'mass times velocity' before the hit equals the total 'mass times velocity' after the hit.",
    examinerWarning: "Remember momentum is a vector! Assign a positive direction. If an object bounces backwards, its final velocity MUST be entered as a negative number, or you will lose all calculation marks.",
    formulas: ['p = mv', 'F_{net}\\Delta t = \\Delta p', '\\sum p_i = \\sum p_f', '\\Delta p = m(v_f - v_i)']
  },
  {
    id: 'p1_work_energy',
    paper: 1,
    code: 'P1-04',
    title: "Work, Energy & Power",
    weight: '15-20 Marks',
    mastery: 71,
    icon: '⚡',
    color: 'from-amber-600 to-orange-700',
    verbatimDefinition: "Work-Energy Theorem: The net work done on an object is equal to the change in the object's kinetic energy (W_net = \\Delta K).",
    laymanExplanation: "The total energy added or removed by all forces combined equals how much the object's speed energy increases or decreases.",
    examinerWarning: "When using W = F \\Delta x \\cos\\theta, \\theta is strictly the angle BETWEEN the direction of the force vector and the direction of displacement—NOT automatically the incline angle!",
    formulas: ['W = F\\Delta x\\cos\\theta', 'W_{net} = \\Delta K', 'W_{nc} = \\Delta K + \\Delta U', 'P = \\frac{W}{\\Delta t} = Fv_{avg}']
  },
  {
    id: 'p1_doppler',
    paper: 1,
    code: 'P1-05',
    title: "Doppler Effect (Sound & Light)",
    weight: '10-15 Marks',
    mastery: 90,
    icon: '📡',
    color: 'from-violet-600 to-purple-800',
    verbatimDefinition: "Doppler Effect: The apparent change in observed frequency (or pitch) of a wave when there is relative motion between the source and the observer.",
    laymanExplanation: "When an ambulance speeds toward you, each sound wave is bunched together, making the siren sound higher pitched. When it drives away, waves stretch out, lowering the pitch.",
    examinerWarning: "When the source moves towards a stationary listener, the wave velocity 'v' DOES NOT change. The observed frequency increases solely because the apparent wavelength decreases!",
    formulas: ['f_L = \\frac{v \\pm v_L}{v \\mp v_S} f_S', 'v = f\\lambda', '\\text{Red shift = Universe Expanding}']
  },
  {
    id: 'p1_electrostatics',
    paper: 1,
    code: 'P1-06',
    title: "Electrostatics & Coulomb's Law",
    weight: '15-20 Marks',
    mastery: 74,
    icon: '🔮',
    color: 'from-emerald-600 to-teal-800',
    verbatimDefinition: "Coulomb's Law: The magnitude of the electrostatic force exerted by one point charge on another is directly proportional to the product of the charges and inversely proportional to the square of the distance between them.",
    laymanExplanation: "Charged particles push or pull each other much more fiercely when close together, dropping off four times as weak whenever you double the separation distance.",
    examinerWarning: "NEVER substitute negative signs for charges into Coulomb's equation (F = k q1 q2 / r²). Use the charges' positive magnitudes, then deduce the direction (attraction vs. repulsion) separately using vector logic.",
    formulas: ['F = \\frac{k Q_1 Q_2}{r^2}', 'E = \\frac{F}{q} = \\frac{k Q}{r^2}', 'Q = \\frac{Q_1 + Q_2}{2}', 'n = \\frac{Q}{e}']
  },
  {
    id: 'p1_circuits',
    paper: 1,
    code: 'P1-07',
    title: "Electric Circuits & Lost Volts",
    weight: '15-20 Marks',
    mastery: 65,
    icon: '💡',
    color: 'from-yellow-600 to-amber-800',
    verbatimDefinition: "Electromotive Force (emf): The maximum energy provided by a battery per unit charge passing through it (or open-circuit potential difference).",
    laymanExplanation: "The total theoretical push of the battery. Once electricity actually flows, friction inside the chemicals steals a few volts ('lost volts'), so less voltage reaches your appliances.",
    examinerWarning: "When an extra resistor is added in parallel, the total external resistance R_ext DECREASES. This makes total current I INCREASE, causing lost volts (Ir) to INCREASE, and external voltmeter V to DROP!",
    formulas: ['\\mathcal{E} = V_{ext} + V_{lost} = I(R_{ext} + r)', 'R_p^{-1} = R_1^{-1} + R_2^{-1}', 'P = VI = I^2 R = \\frac{V^2}{R}']
  },

  // PAPER 2: CHEMISTRY
  {
    id: 'p2_organic_nomen',
    paper: 2,
    code: 'P2-01',
    title: "Organic Nomenclature & Structures",
    weight: '15-20 Marks',
    mastery: 88,
    icon: '🧪',
    color: 'from-rose-600 to-pink-800',
    verbatimDefinition: "Functional Group: A bond or an atom or a group of atoms that determine(s) the physical and chemical properties of a group of organic compounds.",
    laymanExplanation: "The active chemical centerpiece on a carbon chain (like an -OH alcohol group or -COOH acid group) that decides how the molecule smells, boils, and reacts.",
    examinerWarning: "In IUPAC naming, hyphens belong strictly between numbers and words (e.g., '2-methylpropane'), and commas separate numbers ('2,2-dimethylbutane'). One misplaced hyphen or comma forfeits the entire mark!",
    formulas: ['C_n H_{2n+2} (Alkanes)', 'C_n H_{2n} (Alkenes)', 'C_n H_{2n-2} (Alkynes)', 'C_n H_{2n+1}OH (Alcohols)']
  },
  {
    id: 'p2_intermolecular',
    paper: 2,
    code: 'P2-02',
    title: "Intermolecular Forces & Physical Properties",
    weight: '12-16 Marks',
    mastery: 85,
    icon: '💧',
    color: 'from-blue-600 to-teal-700',
    verbatimDefinition: "Boiling Point: The temperature at which the vapor pressure of a substance equals atmospheric pressure.",
    laymanExplanation: "The heat needed to shake molecules so hard that they break free from each other's sticky attractions and turn into vapor bubbles.",
    examinerWarning: "Never write 'bonds break' when boiling organic liquids! Covalent bonds stay untouched; only weak intermolecular forces (London, dipole-dipole, or hydrogen bonds) are overcome.",
    formulas: ['Carboxylic Acids: 2 Hydrogen Bonds (Dimer)', 'Alcohols: 1 Hydrogen Bond', 'Esters/Ketones: Dipole-Dipole', 'Alkanes: London Dispersion']
  },
  {
    id: 'p2_organic_reactions',
    paper: 2,
    code: 'P2-03',
    title: "Organic Reactions & Flow Diagrams",
    weight: '15-20 Marks',
    mastery: 79,
    icon: '⚗️',
    color: 'from-purple-600 to-indigo-900',
    verbatimDefinition: "Hydrolysis: The chemical reaction of a compound with water where water molecules split into H and OH ions and break covalent bonds.",
    laymanExplanation: "Using water (often with mild heat and a dilute base) to convert a haloalkane into an alcohol while kicking out the halogen.",
    examinerWarning: "Learn the reaction conditions precisely! Elimination (dehydrohalogenation) demands concentrated strong base (NaOH/KOH) in ethanol with HIGH heat; Substitution (hydrolysis) demands dilute base in water with MILD heat.",
    formulas: ['Esterification: Alcohol + Carboxylic Acid -> Ester + H2O (conc. H2SO4)', 'Addition: Alkene + HX -> Haloalkane', 'Markovnikov Rule applies!']
  },
  {
    id: 'p2_reaction_rates',
    paper: 2,
    code: 'P2-04',
    title: "Reaction Rates & Collision Theory",
    weight: '18-22 Marks',
    mastery: 83,
    icon: '⏱️',
    color: 'from-amber-600 to-red-700',
    verbatimDefinition: "Activation Energy: The minimum energy needed for a reaction to take place (or minimum energy colliding molecules must possess for an effective collision).",
    laymanExplanation: "The initial energy hurdle or push that molecules must smash together with before their old bonds can snap open and form new products.",
    examinerWarning: "A positive catalyst increases the reaction rate by providing an alternative route of LOWER activation energy. It DOES NOT shift equilibrium position or change the heat of reaction (\\Delta H)!",
    formulas: ['Rate = \\frac{\\Delta [product]}{\\Delta t} = \\frac{-\\Delta [reactant]}{\\Delta t}', '\\Delta H = E_{forward} - E_{reverse}', 'Effective collisions/sec']
  },
  {
    id: 'p2_equilibrium',
    paper: 2,
    code: 'P2-05',
    title: "Chemical Equilibrium & Kc Calculations",
    weight: '20-25 Marks',
    mastery: 62,
    icon: '⚖️',
    color: 'from-emerald-600 to-green-800',
    verbatimDefinition: "Le Chatelier's Principle: When the equilibrium in a closed system is disturbed, the system will reinstate a new equilibrium by favouring the reaction that opposes the disturbance.",
    laymanExplanation: "A chemical seesaw. If you dump more heat or pressure onto one side, the system shifts automatically in the opposite direction to relieve that exact strain.",
    examinerWarning: "TEMPERATURE is the ONLY factor that changes the numerical equilibrium constant Kc! Pressure and concentration shifts will change equilibrium concentrations, but Kc remains constant.",
    formulas: ['K_c = \\frac{[C]^c [D]^d}{[A]^a [B]^b}', '\\text{R.I.C.E. Table Format strictly required}', '\\text{Pure solids (s) & liquids (l) excluded}']
  },
  {
    id: 'p2_acids_bases',
    paper: 2,
    code: 'P2-06',
    title: "Acids, Bases & Titrations",
    weight: '18-22 Marks',
    mastery: 73,
    icon: '🧪',
    color: 'from-rose-600 to-orange-700',
    verbatimDefinition: "Arrhenius Base: A substance that produces hydroxide ions (OH-) in aqueous solution. Lowry-Brønsted Base: A proton (H+) acceptor.",
    laymanExplanation: "Arrhenius looks at what comes out in water; Lowry-Brønsted looks at who catches the hydrogen proton pass.",
    examinerWarning: "Do not confuse 'concentration' with 'strength'! A dilute solution of hydrochloric acid is still a STRONG acid because it ionises completely. A concentrated ethanoic acid is still a WEAK acid because it ionises only partially.",
    formulas: ['pH = -\\log[H_3O^+]', 'K_w = [H_3O^+][OH^-] = 1.0 \\times 10^{-14}', '\\frac{c_a V_a}{c_b V_b} = \\frac{n_a}{n_b}']
  },
  {
    id: 'p2_electrochemical',
    paper: 2,
    code: 'P2-07',
    title: "Electrochemical Cells (Galvanic & Electrolytic)",
    weight: '20-25 Marks',
    mastery: 77,
    icon: '🔋',
    color: 'from-blue-700 to-indigo-950',
    verbatimDefinition: "Oxidation: A loss of electrons. Anode: The electrode where oxidation takes place. (AN OX and RED CAT rule).",
    laymanExplanation: "Oxidation is losing electrons (OIL RIG). Oxidation always happens at the Anode; Reduction always happens at the Cathode in both cell types.",
    examinerWarning: "On the DBE Standard Reduction Table 4B, strongest reducing agents sit at the top right, and strongest oxidising agents sit at bottom left. Never forget salt bridge functions: completing the circuit and maintaining electrical neutrality!",
    formulas: ['E^\\circ_{cell} = E^\\circ_{cathode} - E^\\circ_{anode}', 'Q = I\\Delta t', '\\text{Spontaneous if } E^\\circ_{cell} > 0']
  }
];

const TABLE_1_CONSTANTS = [
  { name: 'Acceleration due to gravity', symbol: 'g', value: '9,8 m·s⁻²', paper: 'Paper 1 (Physics)' },
  { name: 'Speed of light in a vacuum', symbol: 'c', value: '3,0 × 10⁸ m·s⁻¹', paper: 'Paper 1 (Physics)' },
  { name: 'Planck constant', symbol: 'h', value: '6,63 × 10⁻³⁴ J·s', paper: 'Paper 1 (Physics)' },
  { name: 'Coulomb constant', symbol: 'k', value: '9,0 × 10⁹ N·m²·C⁻²', paper: 'Paper 1 (Physics)' },
  { name: 'Charge on electron', symbol: 'e', value: '-1,6 × 10⁻¹⁹ C', paper: 'Paper 1 (Physics)' },
  { name: 'Electron mass', symbol: 'm_e', value: '9,11 × 10⁻³¹ kg', paper: 'Paper 1 (Physics)' },
  { name: 'Universal gravitational constant', symbol: 'G', value: '6,67 × 10⁻¹¹ N·m²·kg⁻²', paper: 'Paper 1 (Physics)' },
  { name: 'Avogadro constant', symbol: 'N_A', value: '6,02 × 10²³ mol⁻¹', paper: 'Paper 2 (Chemistry)' },
  { name: 'Molar gas volume at STP', symbol: 'V_m', value: '22,4 dm³·mol⁻¹', paper: 'Paper 2 (Chemistry)' },
  { name: 'Standard pressure', symbol: 'p^\\circ', value: '1,013 × 10⁵ Pa', paper: 'Paper 2 (Chemistry)' },
  { name: 'Standard temperature', symbol: 'T^\\circ', value: '273 K (0 °C)', paper: 'Paper 2 (Chemistry)' },
  { name: 'Auto-ionisation of water (298 K)', symbol: 'K_w', value: '1,0 × 10⁻¹⁴', paper: 'Paper 2 (Chemistry)' }
];

const TABLE_4B_CELLS = [
  { halfReaction: 'Li⁺ + e⁻ ⇌ Li(s)', potential: -3.05, type: 'Very Strong Reducing Agent' },
  { halfReaction: 'K⁺ + e⁻ ⇌ K(s)', potential: -2.93, type: 'Strong Reducing Agent' },
  { halfReaction: 'Mg²⁺ + 2e⁻ ⇌ Mg(s)', potential: -2.36, type: 'Active Metal' },
  { halfReaction: 'Al³⁺ + 3e⁻ ⇌ Al(s)', potential: -1.66, type: 'Active Metal' },
  { halfReaction: 'Zn²⁺ + 2e⁻ ⇌ Zn(s)', potential: -0.76, type: 'Common Galvanic Anode' },
  { halfReaction: 'Fe²⁺ + 2e⁻ ⇌ Fe(s)', potential: -0.44, type: 'Active Metal' },
  { halfReaction: 'Pb²⁺ + 2e⁻ ⇌ Pb(s)', potential: -0.13, type: 'Moderate Reducing Agent' },
  { halfReaction: '2H⁺ + 2e⁻ ⇌ H₂(g)', potential: 0.00, type: 'Standard Hydrogen Electrode' },
  { halfReaction: 'Cu²⁺ + 2e⁻ ⇌ Cu(s)', potential: 0.34, type: 'Common Galvanic Cathode' },
  { halfReaction: 'I₂(s) + 2e⁻ ⇌ 2I⁻', potential: 0.54, type: 'Moderate Oxidising Agent' },
  { halfReaction: 'Ag⁺ + e⁻ ⇌ Ag(s)', potential: 0.80, type: 'Strong Cathode' },
  { halfReaction: 'Cl₂(g) + 2e⁻ ⇌ 2Cl⁻', potential: 1.36, type: 'Strong Oxidising Agent' },
  { halfReaction: 'F₂(g) + 2e⁻ ⇌ 2F⁻', potential: 2.87, type: 'Strongest Oxidising Agent' }
];

const PERIODIC_TABLE_DATA = [
  { z: 1, sym: 'H', name: 'Hydrogen', mass: 1.01, en: 2.1, cat: 'nonmetal' },
  { z: 2, sym: 'He', name: 'Helium', mass: 4.00, en: 0.0, cat: 'noble' },
  { z: 3, sym: 'Li', name: 'Lithium', mass: 6.94, en: 1.0, cat: 'alkali' },
  { z: 4, sym: 'Be', name: 'Beryllium', mass: 9.01, en: 1.5, cat: 'alkaline' },
  { z: 5, sym: 'B', name: 'Boron', mass: 10.81, en: 2.0, cat: 'metalloid' },
  { z: 6, sym: 'C', name: 'Carbon', mass: 12.01, en: 2.5, cat: 'nonmetal' },
  { z: 7, sym: 'N', name: 'Nitrogen', mass: 14.01, en: 3.0, cat: 'nonmetal' },
  { z: 8, sym: 'O', name: 'Oxygen', mass: 16.00, en: 3.5, cat: 'nonmetal' },
  { z: 9, sym: 'F', name: 'Fluorine', mass: 19.00, en: 4.0, cat: 'halogen' },
  { z: 10, sym: 'Ne', name: 'Neon', mass: 20.18, en: 0.0, cat: 'noble' },
  { z: 11, sym: 'Na', name: 'Sodium', mass: 22.99, en: 0.9, cat: 'alkali' },
  { z: 12, sym: 'Mg', name: 'Magnesium', mass: 24.31, en: 1.2, cat: 'alkaline' },
  { z: 13, sym: 'Al', name: 'Aluminium', mass: 26.98, en: 1.5, cat: 'metal' },
  { z: 14, sym: 'Si', name: 'Silicon', mass: 28.09, en: 1.8, cat: 'metalloid' },
  { z: 15, sym: 'P', name: 'Phosphorus', mass: 30.97, en: 2.1, cat: 'nonmetal' },
  { z: 16, sym: 'S', name: 'Sulphur', mass: 32.07, en: 2.5, cat: 'nonmetal' },
  { z: 17, sym: 'Cl', name: 'Chlorine', mass: 35.45, en: 3.0, cat: 'halogen' },
  { z: 18, sym: 'Ar', name: 'Argon', mass: 39.95, en: 0.0, cat: 'noble' },
  { z: 19, sym: 'K', name: 'Potassium', mass: 39.10, en: 0.8, cat: 'alkali' },
  { z: 20, sym: 'Ca', name: 'Calcium', mass: 40.08, en: 1.0, cat: 'alkaline' },
  { z: 26, sym: 'Fe', name: 'Iron', mass: 55.85, en: 1.8, cat: 'transition' },
  { z: 29, sym: 'Cu', name: 'Copper', mass: 63.55, en: 1.9, cat: 'transition' },
  { z: 30, sym: 'Zn', name: 'Zinc', mass: 65.38, en: 1.6, cat: 'transition' },
  { z: 35, sym: 'Br', name: 'Bromine', mass: 79.90, en: 2.8, cat: 'halogen' },
  { z: 47, sym: 'Ag', name: 'Silver', mass: 107.87, en: 1.9, cat: 'transition' },
  { z: 82, sym: 'Pb', name: 'Lead', mass: 207.20, en: 1.8, cat: 'metal' }
];

const FLASHCARDS = [
  {
    topic: "Newton's Laws",
    q: "Define Newton's First Law of Motion verbatim as required by the DBE.",
    a: "A body will remain in its state of rest or motion at constant velocity unless a non-zero resultant/net force acts on it.",
    tip: "Marks are lost if you write 'speed' instead of 'constant velocity'."
  },
  {
    topic: "Vertical Projectile",
    q: "What is the acceleration of a stone at the exact peak of its projectile trajectory?",
    a: "9,8 m·s⁻² downwards (due solely to the gravitational force of Earth).",
    tip: "Velocity is momentarily zero at the apex, but acceleration is ALWAYS 9.8 m/s² down."
  },
  {
    topic: "Work-Energy",
    q: "State the Principle of Conservation of Mechanical Energy.",
    a: "The total mechanical energy (sum of gravitational potential and kinetic energy) in an isolated (closed) system remains constant.",
    tip: "Remember that this holds only in the absence of non-conservative forces like friction."
  },
  {
    topic: "Chemical Equilibrium",
    q: "Explain why a catalyst does NOT change the numerical value of Kc.",
    a: "A catalyst increases the rate of both forward and reverse reactions by the EXACT same proportion by lowering activation energy equally.",
    tip: "Only a change in TEMPERATURE can change the value of the equilibrium constant Kc."
  },
  {
    topic: "Electrochemical Cells",
    q: "State the two primary functions of a salt bridge in a Galvanic cell.",
    a: "1. Completes the electrical circuit.\n2. Maintains electrical neutrality in both half-cell electrolytes.",
    tip: "Anions migrate toward the anode, and cations migrate toward the cathode."
  }
];

const SCIENTIFIC_QUOTES = [
  { quote: "If I have seen further, it is by standing on the shoulders of giants.", author: "Sir Isaac Newton" },
  { quote: "Nothing in life is to be feared, it is only to be understood. Now is the time to understand more.", author: "Marie Curie" },
  { quote: "Energy cannot be created or destroyed; it can only be changed from one form to another.", author: "Albert Einstein" },
  { quote: "In questions of science, the authority of a thousand is not worth the humble reasoning of a single individual.", author: "Galileo Galilei" }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('topics');
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [paperFilter, setPaperFilter] = useState('all');

  const [toastMessage, setToastMessage] = useState(null);
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionProgress, setTransitionProgress] = useState(0);
  const [currentQuoteIdx, setCurrentQuoteIdx] = useState(0);

  const triggerTopicTransition = (topicId) => {
    setIsTransitioning(true);
    setTransitionProgress(0);
    setCurrentQuoteIdx(Math.floor(Math.random() * SCIENTIFIC_QUOTES.length));

    const startTime = Date.now();
    const duration = 1200;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setTransitionProgress(progress);

      if (elapsed >= duration) {
        clearInterval(interval);
        setSelectedTopicId(topicId);
        setIsTransitioning(false);
        setActiveTab('topics');
      }
    }, 30);
  };

  const [countdown, setCountdown] = useState({ p1: { d: 0, h: 0, m: 0, s: 0 }, p2: { d: 0, h: 0, m: 0, s: 0 } });
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const currentYear = new Date().getFullYear();
      
      const p1Date = new Date(`November 04, ${currentYear} 09:00:00`).getTime();
      const p2Date = new Date(`November 11, ${currentYear} 09:00:00`).getTime();

      const calcDiff = (target) => {
        let diff = target - now;
        if (diff < 0) diff = 0;
        return {
          d: Math.floor(diff / (1000 * 60 * 60 * 24)),
          h: Math.floor((diff / (1000 * 60 * 60)) % 24),
          m: Math.floor((diff / 1000 / 60) % 60),
          s: Math.floor((diff / 1000) % 60)
        };
      };

      setCountdown({
        p1: calcDiff(p1Date),
        p2: calcDiff(p2Date)
      });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const downloadCheatSheet = () => {
    try {
      const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>NSC Physical Sciences Grade 12 Distinction Cheat Sheet</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.5; color: #0f172a; padding: 25px; max-width: 900px; margin: 0 auto; }
    h1 { font-size: 24px; color: #1e3a8a; border-bottom: 2px solid #2563eb; padding-bottom: 8px; margin-bottom: 12px; }
    h2 { font-size: 18px; color: #1e40af; margin-top: 20px; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; }
    .box { background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #2563eb; padding: 12px; margin-bottom: 15px; border-radius: 4px; }
    .constants-table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 13px; }
    .constants-table th, .constants-table td { border: 1px solid #cbd5e1; padding: 6px 10px; text-align: left; }
    .constants-table th { background: #e2e8f0; }
    .print-btn { background: #2563eb; color: white; border: none; padding: 10px 18px; border-radius: 6px; font-weight: bold; cursor: pointer; margin-bottom: 20px; }
    @media print { .print-btn { display: none; } body { padding: 0; } }
  </style>
</head>
<body>
  <button class="print-btn" onclick="window.print()">🖨️ Print or Save as PDF</button>
  <h1>🇿🇦 NSC Grade 12 Physical Sciences Distinction Cheat Sheet</h1>
  <p><strong>DBE CAPS Final Revision Guide</strong> • Prepared by Atandile Monezi Ngxabani</p>

  <h2>Table 1: Physical Constants</h2>
  <table class="constants-table">
    <tr><th>Constant Name</th><th>Symbol</th><th>Standard Value</th></tr>
    ${TABLE_1_CONSTANTS.map(c => `<tr><td>${c.name}</td><td><strong>${c.symbol}</strong></td><td>${c.value}</td></tr>`).join('')}
  </table>

  <h2>Core 14 CAPS Topics & Verbatim 2-Mark Definitions</h2>
  ${CAPS_TOPICS.map(t => `
    <div class="box">
      <h3>${t.code}: ${t.title} (${t.weight})</h3>
      <p><strong>Verbatim Definition:</strong> ${t.verbatimDefinition}</p>
      <p><strong>Examiner Warning:</strong> ${t.examinerWarning}</p>
      <p><strong>Key Formulas:</strong> ${t.formulas.join(' &nbsp;•&nbsp; ')}</p>
    </div>
  `).join('')}
</body>
</html>`;

      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'NSC_Physical_Sciences_Grade12_Distinction_Cheat_Sheet.html');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast('📥 Distinction Cheat Sheet downloaded successfully!');
    } catch (err) {
      showToast('⚠️ Download error: ' + err.message);
    }
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
      showToast('🔊 Audio pronunciation playing...');
    } else {
      showToast('⚠️ Speech synthesis not supported in this browser.');
    }
  };

  const [vpmInitialV, setVpmInitialV] = useState(20);
  const [vpmHeight, setVpmHeight] = useState(0);
  const [vpmGraphMode, setVpmGraphMode] = useState('position');

  const vpmCalculations = useMemo(() => {
    const g = 9.8;
    const v_i = Number(vpmInitialV) || 0;
    const y_0 = Number(vpmHeight) || 0;

    const discriminant = v_i * v_i + 2 * g * y_0;
    const totalFlightTime = discriminant >= 0 ? (v_i + Math.sqrt(discriminant)) / g : 0;
    const safeTotalTime = Math.max(0.5, totalFlightTime);

    const timeToApex = v_i > 0 ? v_i / g : 0;
    const maxHeight = y_0 + (v_i > 0 ? (v_i * v_i) / (2 * g) : 0);
    const finalVelocity = -Math.sqrt(Math.max(0, v_i * v_i + 2 * g * y_0));

    const pointsCount = 40;
    const points = [];
    for (let i = 0; i <= pointsCount; i++) {
      const t = (safeTotalTime / pointsCount) * i;
      let val = 0;
      if (vpmGraphMode === 'position') {
        val = Math.max(0, y_0 + v_i * t - 0.5 * g * t * t);
      } else if (vpmGraphMode === 'velocity') {
        val = v_i - g * t;
      } else {
        val = -g;
      }
      points.push({ t, val });
    }

    return {
      safeTotalTime,
      timeToApex,
      maxHeight,
      finalVelocity,
      points
    };
  }, [vpmInitialV, vpmHeight, vpmGraphMode]);

  const [emf, setEmf] = useState(12);
  const [internalR, setInternalR] = useState(1.5);
  const [loadR, setLoadR] = useState(6.0);
  const [switchClosed, setSwitchClosed] = useState(true);
  const [parallelActive, setParallelActive] = useState(false);
  const [parallelR, setParallelR] = useState(6.0);

  const circuitCalculations = useMemo(() => {
    const vEmf = Number(emf) || 0;
    const rInt = Number(internalR) || 0;
    const rLoad = Number(loadR) || 0;
    const rPar = Number(parallelR) || 0;

    if (!switchClosed) {
      return {
        rExt: 0,
        current: 0,
        vLost: 0,
        vExt: vEmf,
        power: 0
      };
    }

    let rExt = rLoad;
    if (parallelActive && rPar > 0) {
      rExt = (rLoad * rPar) / (rLoad + rPar);
    }

    const totalR = rExt + rInt;
    const current = totalR > 0 ? vEmf / totalR : 0;
    const vLost = current * rInt;
    const vExt = Math.max(0, vEmf - vLost);
    const power = current * vExt;

    return {
      rExt,
      current,
      vLost,
      vExt,
      power
    };
  }, [emf, internalR, loadR, switchClosed, parallelActive, parallelR]);

  const [fbdMass, setFbdMass] = useState(5);
  const [fbdAngle, setFbdAngle] = useState(25);
  const [fbdMu, setFbdMu] = useState(0.2);
  const [fbdAppliedF, setFbdAppliedF] = useState(35);

  const fbdCalculations = useMemo(() => {
    const g = 9.8;
    const m = Number(fbdMass) || 1;
    const angle = Number(fbdAngle) || 0;
    const mu = Number(fbdMu) || 0;
    const fApp = Number(fbdAppliedF) || 0;

    const rad = (angle * Math.PI) / 180;
    const fg = m * g;
    const fgParallel = fg * Math.sin(rad);
    const fgPerp = fg * Math.cos(rad);
    const normalForce = fgPerp;
    const maxFriction = mu * normalForce;
    
    const fNetParallel = fApp - fgParallel - maxFriction;
    const acceleration = m > 0 ? fNetParallel / m : 0;

    return {
      fg,
      fgParallel,
      fgPerp,
      normalForce,
      maxFriction,
      fNetParallel,
      acceleration
    };
  }, [fbdMass, fbdAngle, fbdMu, fbdAppliedF]);

  const [riceInitA, setRiceInitA] = useState(2.0);
  const [riceInitB, setRiceInitB] = useState(2.0);
  const [riceEqC, setRiceEqC] = useState(0.8);
  const [riceVol, setRiceVol] = useState(1.0);

  const riceCalculations = useMemo(() => {
    const vol = Math.max(0.1, Number(riceVol) || 1.0);
    const initA = Math.max(0, Number(riceInitA) || 0);
    const initB = Math.max(0, Number(riceInitB) || 0);
    const eqC = Math.max(0, Number(riceEqC) || 0);
    const changeX = eqC / 2;

    const eqA = Math.max(0, initA - changeX);
    const eqB = Math.max(0, initB - changeX);

    const concA = eqA / vol;
    const concB = eqB / vol;
    const concC = eqC / vol;

    const denom = concA * concB;
    const kc = denom > 0 ? (concC * concC) / denom : 0;

    return {
      vol,
      changeX,
      eqA,
      eqB,
      eqC,
      concA,
      concB,
      concC,
      kc
    };
  }, [riceInitA, riceInitB, riceEqC, riceVol]);

  const [selectedAnodeIdx, setSelectedAnodeIdx] = useState(4);
  const [selectedCathodeIdx, setSelectedCathodeIdx] = useState(8);

  const cellPotential = useMemo(() => {
    const anode = TABLE_4B_CELLS[selectedAnodeIdx] || TABLE_4B_CELLS[0];
    const cathode = TABLE_4B_CELLS[selectedCathodeIdx] || TABLE_4B_CELLS[1];
    const eAnode = typeof anode?.potential === 'number' ? anode.potential : 0;
    const eCathode = typeof cathode?.potential === 'number' ? cathode.potential : 0;
    const eCell = eCathode - eAnode;
    const isSpontaneous = eCell > 0;
    return {
      anode,
      cathode,
      eAnode,
      eCathode,
      eCell: (eCell || 0).toFixed(2),
      isSpontaneous
    };
  }, [selectedAnodeIdx, selectedCathodeIdx]);

  const [calcSBA, setCalcSBA] = useState(70);
  const [calcP1, setCalcP1] = useState(105);
  const [calcP2, setCalcP2] = useState(112);

  const matricResults = useMemo(() => {
    const sbaPercent = Math.min(100, Math.max(0, Number(calcSBA) || 0));
    const p1 = Math.min(150, Math.max(0, Number(calcP1) || 0));
    const p2 = Math.min(150, Math.max(0, Number(calcP2) || 0));
    const examPercent = ((p1 + p2) / 300) * 100;
    const finalComposite = sbaPercent * 0.25 + examPercent * 0.75;

    let level = 1;
    let desc = 'Not Achieved (0 - 29%)';
    let aps = 0;
    let badgeColor = 'bg-red-500/20 text-red-400 border-red-500/40';

    if (finalComposite >= 80) {
      level = 7;
      desc = 'Outstanding Achievement (Distinction)';
      aps = 7;
      badgeColor = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
    } else if (finalComposite >= 70) {
      level = 6;
      desc = 'Meritorious Achievement';
      aps = 6;
      badgeColor = 'bg-blue-500/20 text-blue-400 border-blue-500/40';
    } else if (finalComposite >= 60) {
      level = 5;
      desc = 'Substantial Achievement';
      aps = 5;
      badgeColor = 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40';
    } else if (finalComposite >= 50) {
      level = 4;
      desc = 'Adequate Achievement';
      aps = 4;
      badgeColor = 'bg-amber-500/20 text-amber-400 border-amber-500/40';
    } else if (finalComposite >= 40) {
      level = 3;
      desc = 'Moderate Achievement';
      aps = 3;
      badgeColor = 'bg-orange-500/20 text-orange-400 border-orange-500/40';
    } else if (finalComposite >= 30) {
      level = 2;
      desc = 'Elementary Achievement';
      aps = 2;
      badgeColor = 'bg-rose-500/20 text-rose-400 border-rose-500/40';
    }

    const requiredTotalExam = 320 - sbaPercent;
    const requiredP2 = Math.ceil(requiredTotalExam - p1);

    return {
      finalComposite: (finalComposite || 0).toFixed(1),
      level,
      desc,
      aps,
      badgeColor,
      requiredP2: Math.min(150, Math.max(0, requiredP2))
    };
  }, [calcSBA, calcP1, calcP2]);

  const [squads, setSquads] = useState([
    {
      id: 'sq_1',
      name: 'Cape Town Distinction League',
      focus: 'Newton & VPM Problem Solving',
      members: 5,
      capacity: 8,
      code: 'CPT-772',
      tags: ['#Distinction80', '#NightOwls', '#WesternCape'],
      hasPin: true,
      pin: '2026'
    },
    {
      id: 'sq_2',
      name: 'Gauteng Chemical Equilibrium Drill',
      focus: 'Paper 2 RICE Tables & Acids/Bases',
      members: 7,
      capacity: 10,
      code: 'JHB-409',
      tags: ['#ExamDrill', '#Gauteng', '#Paper2Focus'],
      hasPin: false,
      pin: ''
    }
  ]);

  const [showCreateSquadModal, setShowCreateSquadModal] = useState(false);
  const [newSquadName, setNewSquadName] = useState('');
  const [newSquadFocus, setNewSquadFocus] = useState("Newton's Laws & Applications");
  const [newSquadCapacity, setNewSquadCapacity] = useState(8);
  const [newSquadPinEnabled, setNewSquadPinEnabled] = useState(false);
  const [newSquadPin, setNewSquadPin] = useState('');
  const [newSquadCode] = useState('NSC-' + Math.floor(100 + Math.random() * 900));

  const handleCreateSquad = () => {
    if (!newSquadName.trim()) {
      showToast('⚠️ Please enter a squad name.');
      return;
    }
    const created = {
      id: 'sq_' + Date.now(),
      name: newSquadName,
      focus: newSquadFocus,
      members: 1,
      capacity: newSquadCapacity,
      code: newSquadCode,
      tags: ['#Distinction80', '#ZeroDataFriendly'],
      hasPin: newSquadPinEnabled,
      pin: newSquadPinEnabled ? newSquadPin : ''
    };
    setSquads([created, ...squads]);
    setShowCreateSquadModal(false);
    setNewSquadName('');
    showToast(`🎉 Squad "${created.name}" created! Code: ${created.code}`);
  };

  const [showJoinModal, setShowJoinModal] = useState(false);
  const [joinCodeInput, setJoinCodeInput] = useState('');
  const [joinPinInput, setJoinPinInput] = useState('');

  const handleJoinSquad = () => {
    const squad = squads.find(s => s.code.toLowerCase() === joinCodeInput.trim().toLowerCase());
    if (!squad) {
      showToast('❌ Invalid Room Code. Please check and try again.');
      return;
    }
    if (squad.hasPin && squad.pin !== joinPinInput.trim()) {
      showToast('🔒 Incorrect Passcode PIN.');
      return;
    }
    if (squad.members >= squad.capacity) {
      showToast('⚠️ This study squad has reached full capacity.');
      return;
    }
    setSquads(squads.map(s => s.id === squad.id ? { ...s, members: s.members + 1 } : s));
    setShowJoinModal(false);
    setJoinCodeInput('');
    setJoinPinInput('');
    showToast(`✅ Successfully joined "${squad.name}"!`);
  };

  const [cardIdx, setCardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const nextCard = () => {
    setIsFlipped(false);
    setCardIdx((prev) => (prev + 1) % FLASHCARDS.length);
  };
  const prevCard = () => {
    setIsFlipped(false);
    setCardIdx((prev) => (prev - 1 + FLASHCARDS.length) % FLASHCARDS.length);
  };

  const filteredTopics = useMemo(() => {
    return CAPS_TOPICS.filter((t) => {
      const matchesSearch =
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.verbatimDefinition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.code.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPaper = paperFilter === 'all' || t.paper.toString() === paperFilter;
      return matchesSearch && matchesPaper;
    });
  }, [searchQuery, paperFilter]);

  const activeTopic = useMemo(() => {
    return CAPS_TOPICS.find((t) => t.id === selectedTopicId) || null;
  }, [selectedTopicId]);

  return (
    <SafeErrorBoundary>
      <style>{customStyles}</style>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
        
        {/* TOAST POPUP NOTIFICATION */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900/95 backdrop-blur-md border border-blue-500/50 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
            <span className="text-xl">⚡</span>
            <span className="text-sm font-semibold tracking-wide">{toastMessage}</span>
          </div>
        )}

        {/* 1.2-SECOND TOPIC TRANSITION MODAL */}
        {isTransitioning && (
          <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center">
            <div className="relative w-28 h-28 mb-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin" />
              <div className="absolute inset-3 rounded-full border-4 border-cyan-500/20 border-b-cyan-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
              <div className="text-3xl animate-pulse">⚛️</div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Loading CAPS Diagnostic Engine...</h3>
            <p className="text-slate-400 text-xs italic max-w-md mb-6">
              "{SCIENTIFIC_QUOTES[currentQuoteIdx]?.quote}" — <span className="text-blue-400 font-semibold">{SCIENTIFIC_QUOTES[currentQuoteIdx]?.author}</span>
            </p>
            <div className="w-64 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
              <div
                className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-500 transition-all duration-75"
                style={{ width: `${transitionProgress}%` }}
              />
            </div>
            <span className="text-xs font-mono text-slate-400 mt-2">{transitionProgress}%</span>
          </div>
        )}

        {/* TOP LIVE EXAM COUNTDOWN TICKER STRIP */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border-b border-blue-500/20 px-4 py-2 flex flex-wrap items-center justify-between text-xs gap-3">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-bold text-slate-200">DBE Final Examination Ticker:</span>
            <span className="bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded border border-blue-500/30">
              Paper 1 (Physics): <strong className="text-white">{countdown.p1.d}d {countdown.p1.h}h {countdown.p1.m}m {countdown.p1.s}s</strong>
            </span>
            <span className="bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded border border-purple-500/30">
              Paper 2 (Chemistry): <strong className="text-white">{countdown.p2.d}d {countdown.p2.h}h {countdown.p2.m}m {countdown.p2.s}s</strong>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden md:inline-flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-medium">
              <span>🔋</span> Zero-Data Offline Ready
            </span>
            <button
              onClick={downloadCheatSheet}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-3 py-1 rounded-lg text-xs flex items-center gap-1.5 shadow-md shadow-blue-600/30 transition-all cursor-pointer"
            >
              <span>📥</span> Download Cheat Sheet
            </button>
          </div>
        </div>

        {/* HEADER BAR */}
        <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-xl shadow-lg shadow-blue-500/30 font-black">
              NSC
            </div>
            <div>
              <h1 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
                Physical Sciences Matric Master
                <span className="text-[10px] bg-blue-500/20 text-blue-400 border border-blue-500/40 px-2 py-0.5 rounded-full font-mono">
                  CAPS GRADE 12
                </span>
              </h1>
              <p className="text-xs text-slate-400">Department of Basic Education Examination Preparation Platform</p>
            </div>
          </div>

          {/* MAIN NAVIGATION TABS */}
          <nav className="flex items-center gap-1 bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs">
            <button
              onClick={() => { setActiveTab('topics'); setSelectedTopicId(null); }}
              className={`px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer ${
                activeTab === 'topics' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              📚 14 Topics Matrix
            </button>
            <button
              onClick={() => setActiveTab('simulators')}
              className={`px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer ${
                activeTab === 'simulators' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              🔬 Physics Simulators
            </button>
            <button
              onClick={() => setActiveTab('chemistry')}
              className={`px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer ${
                activeTab === 'chemistry' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              ⚗️ Chemistry Suite
            </button>
            <button
              onClick={() => setActiveTab('flashcards')}
              className={`px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer ${
                activeTab === 'flashcards' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              🧠 Active Recall
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer ${
                activeTab === 'calculator' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              🧮 Matric Mark Calculator
            </button>
            <button
              onClick={() => setActiveTab('squads')}
              className={`px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer ${
                activeTab === 'squads' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              👥 Study Squads
            </button>
          </nav>
        </header>

        {/* MAIN APPLICATION BODY */}
        <main className="flex-1 p-6 max-w-7xl mx-auto w-full">

          {/* VIEW 1: 14 TOPICS MATRIX */}
          {activeTab === 'topics' && (
            <div>
              {activeTopic ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setSelectedTopicId(null)}
                      className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-blue-400 rounded-xl font-bold border border-slate-800 text-sm flex items-center gap-2 transition-all cursor-pointer"
                    >
                      ← Back to 14 Topics Matrix
                    </button>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">Quick Switcher:</span>
                      <select
                        value={selectedTopicId}
                        onChange={(e) => triggerTopicTransition(e.target.value)}
                        className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white"
                      >
                        {CAPS_TOPICS.map(t => (
                          <option key={t.id} value={t.id}>{t.code}: {t.title}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className={`p-6 rounded-3xl bg-gradient-to-br ${activeTopic.color} shadow-2xl relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 p-8 text-7xl opacity-20 pointer-events-none">
                      {activeTopic.icon}
                    </div>
                    <div className="relative z-10 space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="bg-black/30 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono font-bold text-white border border-white/20">
                          {activeTopic.code} • Paper {activeTopic.paper}
                        </span>
                        <span className="bg-black/30 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white/90">
                          {activeTopic.weight}
                        </span>
                        <span className="bg-emerald-500/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-emerald-300 border border-emerald-500/30">
                          Mastery: {activeTopic.mastery}%
                        </span>
                      </div>
                      <h2 className="text-3xl font-black text-white">{activeTopic.title}</h2>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-2">
                          <span>🎯</span> Verbatim 2-Mark CAPS Definition
                        </h4>
                        <button
                          onClick={() => speakText(activeTopic.verbatimDefinition)}
                          className="px-2.5 py-1 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded-lg text-blue-300 text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
                        >
                          🔊 Pronounce
                        </button>
                      </div>
                      <p className="text-base text-slate-100 font-serif leading-relaxed border-l-4 border-blue-500 pl-4 py-1 italic bg-blue-950/20 rounded-r-xl">
                        "{activeTopic.verbatimDefinition}"
                      </p>
                      <div className="pt-2 border-t border-slate-800">
                        <h5 className="text-xs font-bold text-slate-400 mb-1">Plain English Layman's Terms:</h5>
                        <p className="text-xs text-slate-300 leading-normal">{activeTopic.laymanExplanation}</p>
                      </div>
                    </div>

                    <div className="bg-slate-900/90 border border-red-500/20 rounded-2xl p-6 shadow-xl space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-2">
                        <span>⚠️</span> Senior Examiner Pitfall & Trap Alert
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed bg-red-950/20 border-l-4 border-red-500 pl-4 py-2 rounded-r-xl">
                        {activeTopic.examinerWarning}
                      </p>
                      <div>
                        <h5 className="text-xs font-bold text-slate-400 mb-2">Core CAPS Formulas:</h5>
                        <div className="flex flex-wrap gap-2">
                          {activeTopic.formulas.map((f, i) => (
                            <span key={i} className="px-3 py-1 bg-slate-950 font-mono text-xs rounded-lg border border-slate-800 text-blue-300">
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-black text-white">The 14-Topic CAPS Examination Matrix</h2>
                      <p className="text-xs text-slate-400">Click any topic to trigger the diagnostic view and verbatim definitions</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search definitions, topics..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 w-56 focus:outline-none focus:border-blue-500"
                        />
                        {searchQuery && (
                          <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-2.5 text-xs text-slate-500 hover:text-white cursor-pointer">✕</button>
                        )}
                      </div>

                      <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
                        <button
                          onClick={() => setPaperFilter('all')}
                          className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer ${paperFilter === 'all' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
                        >
                          All 14 Topics
                        </button>
                        <button
                          onClick={() => setPaperFilter('1')}
                          className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer ${paperFilter === '1' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
                        >
                          Paper 1 (Physics)
                        </button>
                        <button
                          onClick={() => setPaperFilter('2')}
                          className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer ${paperFilter === '2' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
                        >
                          Paper 2 (Chemistry)
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredTopics.map((topic) => (
                      <div
                        key={topic.id}
                        onClick={() => triggerTopicTransition(topic.id)}
                        className="group bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-blue-500/50 rounded-2xl p-5 cursor-pointer transition-all duration-200 hover:-translate-y-1 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-2xl p-2 rounded-xl bg-slate-950 border border-slate-800 group-hover:scale-110 transition-transform">
                              {topic.icon}
                            </span>
                            <div className="text-right">
                              <span className="text-[10px] font-mono font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                                {topic.code}
                              </span>
                              <div className="text-[10px] text-slate-500 mt-0.5">{topic.weight}</div>
                            </div>
                          </div>
                          <div>
                            <h3 className="font-bold text-white text-base group-hover:text-blue-400 transition-colors">
                              {topic.title}
                            </h3>
                            <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                              {topic.verbatimDefinition}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-800/80">
                          <div className="flex justify-between text-[11px] mb-1">
                            <span className="text-slate-400">Class Diagnostic Mastery</span>
                            <span className="font-bold text-blue-400">{topic.mastery}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                              style={{ width: `${topic.mastery}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* VIEW 2: PHYSICS SIMULATORS */}
          {activeTab === 'simulators' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-black text-white">Interactive Physics Simulators</h2>
                <p className="text-xs text-slate-400">Real-time dynamic calculations for Vertical Projectiles, Electric Circuits, and Newton's Laws</p>
              </div>

              {/* SIMULATOR 1: VERTICAL PROJECTILE MOTION */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl p-2 bg-blue-500/20 border border-blue-500/30 rounded-xl">🚀</span>
                    <div>
                      <h3 className="text-lg font-black text-white">Vertical Projectile Motion (1D) Simulator</h3>
                      <p className="text-xs text-slate-400">Calculates apex, flight duration, impact velocity, and dynamic SVG curves</p>
                    </div>
                  </div>

                  <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                    <button
                      onClick={() => setVpmGraphMode('position')}
                      className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer ${vpmGraphMode === 'position' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
                    >
                      Displacement (y vs t)
                    </button>
                    <button
                      onClick={() => setVpmGraphMode('velocity')}
                      className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer ${vpmGraphMode === 'velocity' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
                    >
                      Velocity (v vs t)
                    </button>
                    <button
                      onClick={() => setVpmGraphMode('acceleration')}
                      className={`px-3 py-1.5 rounded-lg font-bold cursor-pointer ${vpmGraphMode === 'acceleration' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
                    >
                      Acceleration (a vs t)
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">Launch Velocity (v_i):</span>
                        <span className="font-bold text-blue-400">{vpmInitialV} m·s⁻¹</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="50"
                        step="1"
                        value={vpmInitialV}
                        onChange={(e) => setVpmInitialV(Number(e.target.value))}
                        className="w-full accent-blue-600 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">Initial Height (y_0):</span>
                        <span className="font-bold text-cyan-400">{vpmHeight} m</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="60"
                        step="2"
                        value={vpmHeight}
                        onChange={(e) => setVpmHeight(Number(e.target.value))}
                        className="w-full accent-cyan-500 cursor-pointer"
                      />
                    </div>

                    <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Time to Apex:</span>
                        <span className="font-mono text-white font-bold">{(vpmCalculations.timeToApex ?? 0).toFixed(2)} s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Max Height Reached:</span>
                        <span className="font-mono text-emerald-400 font-bold">{(vpmCalculations.maxHeight ?? 0).toFixed(2)} m</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Total Flight Time:</span>
                        <span className="font-mono text-blue-400 font-bold">{(vpmCalculations.safeTotalTime ?? 0).toFixed(2)} s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Impact Velocity:</span>
                        <span className="font-mono text-rose-400 font-bold">{(vpmCalculations.finalVelocity ?? 0).toFixed(2)} m·s⁻¹</span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-2 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
                    <div className="text-xs text-slate-400 mb-2 flex justify-between items-center">
                      <span>Live Graph View: <strong className="text-white capitalize">{vpmGraphMode} Curve</strong></span>
                      <span className="text-[10px] text-blue-400 font-mono">g = -9.8 m·s⁻²</span>
                    </div>

                    <div className="h-44 w-full relative flex items-center justify-center border-b border-l border-slate-800">
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 300 120" preserveAspectRatio="none">
                        <line x1="0" y1="60" x2="300" y2="60" stroke="#334155" strokeDasharray="3 3" />
                        <polyline
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="2.5"
                          points={vpmCalculations.points.map((p, idx) => {
                            const x = (idx / (vpmCalculations.points.length - 1)) * 300;
                            let y = 60;
                            if (vpmGraphMode === 'position') {
                              y = 110 - (p.val / Math.max(1, vpmCalculations.maxHeight)) * 100;
                            } else if (vpmGraphMode === 'velocity') {
                              y = 60 - (p.val / Math.max(1, Math.abs(vpmCalculations.finalVelocity))) * 50;
                            } else {
                              y = 90;
                            }
                            return `${x},${isNaN(y) ? 60 : y}`;
                          }).join(' ')}
                        />
                      </svg>
                    </div>

                    <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-mono">
                      <span>t = 0 s</span>
                      <span>Apex = {(vpmCalculations.timeToApex ?? 0).toFixed(1)} s</span>
                      <span>Landing = {(vpmCalculations.safeTotalTime ?? 0).toFixed(1)} s</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* SIMULATOR 2: ELECTRIC CIRCUITS & LOST VOLTS */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl p-2 bg-yellow-500/20 border border-yellow-500/30 rounded-xl">💡</span>
                  <div>
                    <h3 className="text-lg font-black text-white">Internal Resistance & Lost Volts Simulator</h3>
                    <p className="text-xs text-slate-400">Model terminal voltage, lost volts (Ir), and parallel branch resistance drops</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">Battery EMF (ℰ):</span>
                        <span className="font-bold text-yellow-400">{emf} V</span>
                      </div>
                      <input
                        type="range"
                        min="3"
                        max="24"
                        step="0.5"
                        value={emf}
                        onChange={(e) => setEmf(Number(e.target.value))}
                        className="w-full accent-yellow-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">Internal Resistance (r):</span>
                        <span className="font-bold text-rose-400">{internalR} Ω</span>
                      </div>
                      <input
                        type="range"
                        min="0.1"
                        max="5.0"
                        step="0.1"
                        value={internalR}
                        onChange={(e) => setInternalR(Number(e.target.value))}
                        className="w-full accent-rose-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">Primary External Resistor (R₁):</span>
                        <span className="font-bold text-blue-400">{loadR} Ω</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="20"
                        step="0.5"
                        value={loadR}
                        onChange={(e) => setLoadR(Number(e.target.value))}
                        className="w-full accent-blue-500 cursor-pointer"
                      />
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                      <span className="text-xs text-slate-300">Parallel Resistor (R₂):</span>
                      <button
                        onClick={() => setParallelActive(!parallelActive)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          parallelActive ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {parallelActive ? 'Parallel ON (6 Ω)' : 'Parallel OFF'}
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-300">Circuit Switch:</span>
                      <button
                        onClick={() => setSwitchClosed(!switchClosed)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          switchClosed ? 'bg-blue-600 text-white' : 'bg-red-600 text-white'
                        }`}
                      >
                        {switchClosed ? 'Switch CLOSED' : 'Switch OPEN'}
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-2 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 uppercase font-mono">External R (R_ext)</span>
                        <p className="text-lg font-black text-white">{(circuitCalculations.rExt ?? 0).toFixed(2)} Ω</p>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 uppercase font-mono">Total Current (I)</span>
                        <p className="text-lg font-black text-cyan-400">{(circuitCalculations.current ?? 0).toFixed(2)} A</p>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 uppercase font-mono">Lost Volts (Ir)</span>
                        <p className="text-lg font-black text-rose-400">{(circuitCalculations.vLost ?? 0).toFixed(2)} V</p>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 uppercase font-mono">Voltmeter (V_ext)</span>
                        <p className="text-lg font-black text-emerald-400">{(circuitCalculations.vExt ?? 0).toFixed(2)} V</p>
                      </div>
                    </div>

                    <div className="mt-4 p-4 rounded-xl bg-blue-950/20 border border-blue-500/20 text-xs text-slate-300 space-y-1">
                      <p className="font-bold text-blue-300">💡 Senior Examiner Insight:</p>
                      <p>
                        {parallelActive
                          ? "Adding a parallel resistor lowered total external resistance R_ext. This increased circuit current, causing lost volts (Ir) to rise from internal battery friction. Hence, the terminal voltmeter reading dropped!"
                          : "In open circuit (switch open), current I = 0 A, so lost volts = 0 V. The voltmeter across the battery measures true EMF directly!"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* SIMULATOR 3: NEWTON'S LAWS FREE-BODY DIAGRAM */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl p-2 bg-emerald-500/20 border border-emerald-500/30 rounded-xl">⚖️</span>
                  <div>
                    <h3 className="text-lg font-black text-white">Newton's Laws Free-Body Diagram (FBD) Visualizer</h3>
                    <p className="text-xs text-slate-400">Explore inclined plane components: gravity (w, w_parallel, w_perp), normal force, and friction</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">Object Mass (m):</span>
                        <span className="font-bold text-emerald-400">{fbdMass} kg</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="20"
                        step="1"
                        value={fbdMass}
                        onChange={(e) => setFbdMass(Number(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">Incline Angle (θ):</span>
                        <span className="font-bold text-cyan-400">{fbdAngle}°</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="60"
                        step="5"
                        value={fbdAngle}
                        onChange={(e) => setFbdAngle(Number(e.target.value))}
                        className="w-full accent-cyan-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">Applied Force (F_app):</span>
                        <span className="font-bold text-blue-400">{fbdAppliedF} N</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={fbdAppliedF}
                        onChange={(e) => setFbdAppliedF(Number(e.target.value))}
                        className="w-full accent-blue-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="lg:col-span-2 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 font-mono">Weight (w = mg)</span>
                        <p className="text-base font-bold text-white">{(fbdCalculations.fg ?? 0).toFixed(1)} N</p>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 font-mono">Normal Force (N)</span>
                        <p className="text-base font-bold text-cyan-400">{(fbdCalculations.normalForce ?? 0).toFixed(1)} N</p>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 font-mono">w_parallel (mg sin θ)</span>
                        <p className="text-base font-bold text-amber-400">{(fbdCalculations.fgParallel ?? 0).toFixed(1)} N</p>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 font-mono">Kinetic Friction (f_k)</span>
                        <p className="text-base font-bold text-rose-400">{(fbdCalculations.maxFriction ?? 0).toFixed(1)} N</p>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 font-mono">Net Force (F_net)</span>
                        <p className="text-base font-bold text-emerald-400">{(fbdCalculations.fNetParallel ?? 0).toFixed(1)} N</p>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 font-mono">Acceleration (a)</span>
                        <p className="text-base font-bold text-blue-400">{(fbdCalculations.acceleration ?? 0).toFixed(2)} m·s⁻²</p>
                      </div>
                    </div>

                    <div className="mt-4 p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs text-slate-300">
                      <strong>DBE Marking Standard:</strong> Never draw components (w_parallel or w_perp) on an official Free-Body Diagram! Only draw full force vectors starting from the object dot.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 3: CHEMISTRY SUITE */}
          {activeTab === 'chemistry' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-black text-white">Interactive Chemistry Suite</h2>
                <p className="text-xs text-slate-400">Table 3 Periodic Table, Dynamic RICE Equilibrium Solver, and Table 4B Cell Potential</p>
              </div>

              {/* TOOL 1: DYNAMIC RICE TABLE & KC SOLVER */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl p-2 bg-emerald-500/20 border border-emerald-500/30 rounded-xl">⚖️</span>
                  <div>
                    <h3 className="text-lg font-black text-white">Dynamic RICE Table & Equilibrium Constant (Kc) Solver</h3>
                    <p className="text-xs text-slate-400">Reaction Model: A(g) + B(g) ⇌ 2 C(g)</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                    <label className="text-xs text-slate-400 block">Initial Moles of A (mol):</label>
                    <input
                      type="number"
                      step="0.1"
                      value={riceInitA}
                      onChange={(e) => setRiceInitA(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white font-mono text-sm"
                    />

                    <label className="text-xs text-slate-400 block">Initial Moles of B (mol):</label>
                    <input
                      type="number"
                      step="0.1"
                      value={riceInitB}
                      onChange={(e) => setRiceInitB(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white font-mono text-sm"
                    />

                    <label className="text-xs text-slate-400 block">Equilibrium Moles of C (mol):</label>
                    <input
                      type="number"
                      step="0.1"
                      value={riceEqC}
                      onChange={(e) => setRiceEqC(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white font-mono text-sm"
                    />

                    <label className="text-xs text-slate-400 block">Container Volume (dm³):</label>
                    <input
                      type="number"
                      step="0.5"
                      min="0.1"
                      value={riceVol}
                      onChange={(e) => setRiceVol(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-white font-mono text-sm"
                    />
                  </div>

                  {/* Official RICE Table Layout */}
                  <div className="lg:col-span-3 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-400">
                            <th className="pb-2">R.I.C.E. Stage</th>
                            <th className="pb-2 text-blue-400">A (g)</th>
                            <th className="pb-2 text-blue-400">B (g)</th>
                            <th className="pb-2 text-cyan-400">2 C (g)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 font-mono">
                          <tr>
                            <td className="py-2 text-slate-400">Ratio (Coefficients)</td>
                            <td>1</td>
                            <td>1</td>
                            <td>2</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-slate-400">Initial Moles (n)</td>
                            <td>{Number(riceInitA || 0).toFixed(2)} mol</td>
                            <td>{Number(riceInitB || 0).toFixed(2)} mol</td>
                            <td>0.00 mol</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-slate-400">Change in Moles (Δn)</td>
                            <td className="text-rose-400">-{(riceCalculations.changeX ?? 0).toFixed(2)} mol</td>
                            <td className="text-rose-400">-{(riceCalculations.changeX ?? 0).toFixed(2)} mol</td>
                            <td className="text-emerald-400">+{(riceCalculations.eqC ?? 0).toFixed(2)} mol</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-slate-400">Equilibrium Moles</td>
                            <td className="text-white font-bold">{(riceCalculations.eqA ?? 0).toFixed(2)} mol</td>
                            <td className="text-white font-bold">{(riceCalculations.eqB ?? 0).toFixed(2)} mol</td>
                            <td className="text-white font-bold">{(riceCalculations.eqC ?? 0).toFixed(2)} mol</td>
                          </tr>
                          <tr className="bg-blue-950/20">
                            <td className="py-2 text-blue-300 font-bold">Equilibrium Conc. [C]</td>
                            <td className="text-blue-300">{(riceCalculations.concA ?? 0).toFixed(2)} mol·dm⁻³</td>
                            <td className="text-blue-300">{(riceCalculations.concB ?? 0).toFixed(2)} mol·dm⁻³</td>
                            <td className="text-cyan-300 font-bold">{(riceCalculations.concC ?? 0).toFixed(2)} mol·dm⁻³</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-xs text-slate-400">Equilibrium Constant Expression: <strong className="text-white font-mono">K_c = [C]² / ([A][B])</strong></span>
                      <div className="bg-emerald-500/20 border border-emerald-500/30 px-4 py-1.5 rounded-xl text-emerald-400 font-mono font-black text-sm">
                        K_c = {(riceCalculations.kc ?? 0).toFixed(3)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* TOOL 2: TABLE 4B CELL POTENTIAL & SPONTANEITY */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl p-2 bg-blue-500/20 border border-blue-500/30 rounded-xl">🔋</span>
                  <div>
                    <h3 className="text-lg font-black text-white">Table 4B Standard Reduction & Cell Potential Calculator</h3>
                    <p className="text-xs text-slate-400">E°cell = E°cathode - E°anode</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-slate-400 font-bold block mb-1">Select Anode Half-Cell (Oxidation):</label>
                      <select
                        value={selectedAnodeIdx}
                        onChange={(e) => setSelectedAnodeIdx(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white"
                      >
                        {TABLE_4B_CELLS.map((cell, idx) => (
                          <option key={idx} value={idx}>
                            {cell.halfReaction} ({cell.potential > 0 ? `+${cell.potential}` : cell.potential} V)
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs text-slate-400 font-bold block mb-1">Select Cathode Half-Cell (Reduction):</label>
                      <select
                        value={selectedCathodeIdx}
                        onChange={(e) => setSelectedCathodeIdx(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white"
                      >
                        {TABLE_4B_CELLS.map((cell, idx) => (
                          <option key={idx} value={idx}>
                            {cell.halfReaction} ({cell.potential > 0 ? `+${cell.potential}` : cell.potential} V)
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">E° Cathode:</span>
                        <span className="font-mono text-white font-bold">{(cellPotential.cathode?.potential ?? 0).toFixed(2)} V</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">E° Anode:</span>
                        <span className="font-mono text-white font-bold">{(cellPotential.anode?.potential ?? 0).toFixed(2)} V</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-slate-800">
                        <span className="text-slate-300 font-bold">Standard Cell Potential (E°_cell):</span>
                        <span className={`font-mono font-black text-base ${cellPotential.isSpontaneous ? 'text-emerald-400' : 'text-red-400'}`}>
                          {cellPotential.eCell} V
                        </span>
                      </div>
                    </div>

                    <div className={`mt-4 p-3 rounded-xl border text-xs flex items-center gap-2 ${
                      cellPotential.isSpontaneous
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                        : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                    }`}>
                      <span className="text-lg">{cellPotential.isSpontaneous ? '✅' : '⚠️'}</span>
                      <span>
                        {cellPotential.isSpontaneous
                          ? 'Spontaneous Galvanic Cell (Generates Electrical Energy)'
                          : 'Non-Spontaneous (Requires External Power Supply / Electrolytic Cell)'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* TOOL 3: TABLE 3 PERIODIC TABLE */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    <span>🔬</span> Table 3 Periodic Table Excerpt
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">Atomic Number, Mass & Electronegativity</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                  {PERIODIC_TABLE_DATA.map((elem) => (
                    <div
                      key={elem.z}
                      className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center hover:border-blue-500 transition-colors"
                    >
                      <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                        <span>{elem.z}</span>
                        <span>{elem.en > 0 ? elem.en : '-'}</span>
                      </div>
                      <div className="text-xl font-black text-white my-0.5">{elem.sym}</div>
                      <div className="text-[10px] text-slate-300 truncate">{elem.name}</div>
                      <div className="text-[9px] text-blue-400 font-mono mt-0.5">{elem.mass}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* VIEW 4: ACTIVE RECALL FLASHCARDS */}
          {activeTab === 'flashcards' && (
            <div className="max-w-2xl mx-auto space-y-6 text-center">
              <div>
                <h2 className="text-2xl font-black text-white">Active Recall & Verbatim Flashcards</h2>
                <p className="text-xs text-slate-400">Master word-for-word DBE definitions to secure all 2-mark recall questions</p>
              </div>

              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="bg-slate-900/90 border border-blue-500/30 rounded-3xl p-8 min-h-[260px] flex flex-col justify-between cursor-pointer hover:border-blue-500 transition-all shadow-2xl relative overflow-hidden"
              >
                <div className="flex justify-between items-center text-xs">
                  <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full font-mono font-bold">
                    {FLASHCARDS[cardIdx].topic}
                  </span>
                  <span className="text-slate-500 font-mono">
                    Card {cardIdx + 1} of {FLASHCARDS.length}
                  </span>
                </div>

                <div className="py-6">
                  {!isFlipped ? (
                    <div>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Question (Click to Flip)</span>
                      <p className="text-lg font-bold text-white leading-relaxed">
                        {FLASHCARDS[cardIdx].q}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-2">Official Verbatim Answer</span>
                      <p className="text-base text-emerald-300 font-serif leading-relaxed italic">
                        "{FLASHCARDS[cardIdx].a}"
                      </p>
                      {FLASHCARDS[cardIdx].tip && (
                        <p className="text-xs text-slate-400 mt-4 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                          💡 <strong>Examiner Tip:</strong> {FLASHCARDS[cardIdx].tip}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex justify-center items-center gap-3">
                  <button
                    onClick={(e) => { e.stopPropagation(); speakText(isFlipped ? FLASHCARDS[cardIdx].a : FLASHCARDS[cardIdx].q); }}
                    className="p-2 bg-slate-950 hover:bg-slate-800 rounded-xl text-blue-400 border border-slate-800 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    🔊 Listen
                  </button>
                  <span className="text-[11px] text-slate-500">Tap anywhere on the card to flip</span>
                </div>
              </div>

              <div className="flex justify-center items-center gap-4">
                <button
                  onClick={prevCard}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-white font-bold text-xs cursor-pointer"
                >
                  ← Previous Card
                </button>
                <button
                  onClick={nextCard}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl text-white font-bold text-xs shadow-lg shadow-blue-600/30 cursor-pointer"
                >
                  Next Card →
                </button>
              </div>
            </div>
          )}

          {/* VIEW 5: MATRIC MARK & NSC LEVEL CALCULATOR */}
          {activeTab === 'calculator' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white">Matric Composite Mark & NSC Level Calculator</h2>
                <p className="text-xs text-slate-400">Official 25% SBA + 75% Final Examination Weighted Algorithm</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-blue-400">Enter Your Examination Scores</h3>
                  
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">School-Based Assessment (SBA 25%):</span>
                      <span className="font-bold text-white font-mono">{calcSBA}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={calcSBA}
                      onChange={(e) => setCalcSBA(Number(e.target.value))}
                      className="w-full accent-blue-600 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Paper 1 Trial/Target (Physics /150):</span>
                      <span className="font-bold text-cyan-400 font-mono">{calcP1} / 150</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="150"
                      value={calcP1}
                      onChange={(e) => setCalcP1(Number(e.target.value))}
                      className="w-full accent-cyan-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Paper 2 Trial/Target (Chemistry /150):</span>
                      <span className="font-bold text-purple-400 font-mono">{calcP2} / 150</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="150"
                      value={calcP2}
                      onChange={(e) => setCalcP2(Number(e.target.value))}
                      className="w-full accent-purple-500 cursor-pointer"
                    />
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-1">
                    <span className="text-slate-400">Target Deficit for Level 7 (80%+ Distinction):</span>
                    <p className="text-slate-200">
                      With your current SBA ({calcSBA}%) and P1 mark ({calcP1}/150), you need <strong className="text-emerald-400 font-mono text-sm">{matricResults.requiredP2} / 150</strong> in Paper 2 to guarantee a distinction.
                    </p>
                  </div>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between">
                  <div className="text-center space-y-3">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Composite Matric Percentage</span>
                    <div className="text-6xl font-black text-white font-mono">
                      {matricResults.finalComposite}%
                    </div>
                    <div className={`inline-block px-4 py-1.5 rounded-full border text-xs font-bold ${matricResults.badgeColor}`}>
                      Level {matricResults.level} • {matricResults.desc}
                    </div>
                  </div>

                  <div className="space-y-3 pt-6 border-t border-slate-800 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">University APS Contribution:</span>
                      <span className="font-bold text-white font-mono">{matricResults.aps} Points</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">SBA Weighting (25%):</span>
                      <span className="font-mono text-slate-300 font-semibold">{(Number(calcSBA || 0) * 0.25).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Final Exam Weighting (75%):</span>
                      <span className="font-mono text-slate-300 font-semibold">{(((Number(calcP1 || 0) + Number(calcP2 || 0)) / 300) * 75).toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 6: COLLABORATIVE STUDY SQUADS */}
          {activeTab === 'squads' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-white">Collaborative Study Squads</h2>
                  <p className="text-xs text-slate-400">Join or host live peer revision rooms across South Africa</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowJoinModal(true)}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-white font-bold text-xs cursor-pointer"
                  >
                    🔑 Join with Code
                  </button>
                  <button
                    onClick={() => setShowCreateSquadModal(true)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-white font-bold text-xs shadow-lg shadow-blue-600/30 cursor-pointer"
                  >
                    + Create Study Squad
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {squads.map((squad) => (
                  <div
                    key={squad.id}
                    className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-white text-base">{squad.name}</h3>
                        <p className="text-xs text-slate-400 mt-0.5">{squad.focus}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-mono font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                          {squad.code}
                        </span>
                        <div className="text-[10px] text-slate-500 mt-1">
                          {squad.hasPin ? '🔒 Passcode Protected' : '🔓 Open Room'}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {squad.tags.map((tag, i) => (
                        <span key={i} className="text-[10px] font-mono bg-slate-950 text-slate-400 px-2.5 py-0.5 rounded-full border border-slate-800">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                      <div className="text-xs text-slate-400">
                        Capacity: <strong className="text-white">{squad.members}</strong> / {squad.capacity} Members
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(`Join my NSC study squad: ${squad.name}! Code: ${squad.code}`);
                            showToast(`📋 Copied invite link for "${squad.name}"`);
                          }}
                          className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs text-slate-300 font-semibold cursor-pointer"
                        >
                          Copy Link
                        </button>
                        <a
                          href={`https://wa.me/?text=${encodeURIComponent(`Hey! Join my NSC Physical Sciences study squad "${squad.name}" using Room Code: ${squad.code}`)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-xs text-white font-semibold flex items-center gap-1"
                        >
                          <span>💬</span> WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CREATE SQUAD POPUP MODAL */}
              {showCreateSquadModal && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-bold text-white">Create Peer Study Squad</h3>
                      <button onClick={() => setShowCreateSquadModal(false)} className="text-slate-400 hover:text-white cursor-pointer">✕</button>
                    </div>

                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Squad Name:</label>
                      <input
                        type="text"
                        placeholder="e.g. Pretoria Science Achievers"
                        value={newSquadName}
                        onChange={(e) => setNewSquadName(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Primary Focus Topic:</label>
                      <select
                        value={newSquadFocus}
                        onChange={(e) => setNewSquadFocus(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
                      >
                        {CAPS_TOPICS.map(t => (
                          <option key={t.id} value={t.title}>{t.code}: {t.title}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400">Max Member Capacity:</span>
                        <span className="font-bold text-blue-400">{newSquadCapacity} Peers</span>
                      </div>
                      <input
                        type="range"
                        min="2"
                        max="16"
                        value={newSquadCapacity}
                        onChange={(e) => setNewSquadCapacity(Number(e.target.value))}
                        className="w-full accent-blue-600 cursor-pointer"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                      <span className="text-xs text-slate-300">Require 4-Digit Passcode:</span>
                      <input
                        type="checkbox"
                        checked={newSquadPinEnabled}
                        onChange={(e) => setNewSquadPinEnabled(e.target.checked)}
                        className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                      />
                    </div>

                    {newSquadPinEnabled && (
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Set 4-Digit PIN:</label>
                        <input
                          type="password"
                          maxLength={4}
                          placeholder="e.g. 1234"
                          value={newSquadPin}
                          onChange={(e) => setNewSquadPin(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-mono"
                        />
                      </div>
                    )}

                    <div className="pt-3 border-t border-slate-800 flex gap-3">
                      <button
                        onClick={() => setShowCreateSquadModal(false)}
                        className="flex-1 py-2.5 bg-slate-950 hover:bg-slate-800 text-slate-400 rounded-xl text-xs font-bold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleCreateSquad}
                        className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-600/30 cursor-pointer"
                      >
                        Create Room
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* JOIN SQUAD POPUP MODAL */}
              {showJoinModal && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-bold text-white">Join Squad with Code</h3>
                      <button onClick={() => setShowJoinModal(false)} className="text-slate-400 hover:text-white cursor-pointer">✕</button>
                    </div>

                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Room Code:</label>
                      <input
                        type="text"
                        placeholder="e.g. CPT-772"
                        value={joinCodeInput}
                        onChange={(e) => setJoinCodeInput(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-mono uppercase"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Passcode PIN (if required):</label>
                      <input
                        type="password"
                        placeholder="Leave blank if open"
                        value={joinPinInput}
                        onChange={(e) => setJoinPinInput(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white font-mono"
                      />
                    </div>

                    <div className="pt-2 flex gap-3">
                      <button
                        onClick={() => setShowJoinModal(false)}
                        className="flex-1 py-2.5 bg-slate-950 hover:bg-slate-800 text-slate-400 rounded-xl text-xs font-bold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleJoinSquad}
                        className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-600/30 cursor-pointer"
                      >
                        Enter Room
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </main>

        {/* COMPREHENSIVE LEGAL & CREATOR ATTRIBUTION FOOTER */}
        <footer className="mt-auto border-t border-slate-800/80 bg-slate-950/90 py-10 px-6 text-xs text-slate-400">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-6 border-b border-slate-800/80 pb-6">
              <div>
                <h4 className="font-bold text-white text-sm">NSC Physical Sciences Matric Master</h4>
                <p className="text-slate-400 text-xs mt-0.5">
                  Platform Creator & Lead Developer: <strong className="text-blue-400">Atandile Monezi Ngxabani</strong>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="https://wa.me/27673447372"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-semibold rounded-xl flex items-center gap-1.5 transition-all"
                >
                  <span>💬</span> WhatsApp Business: 067 344 7372
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-semibold rounded-xl flex items-center gap-1.5 transition-all"
                >
                  <span>🔗</span> LinkedIn Profile
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-semibold rounded-xl flex items-center gap-1.5 transition-all"
                >
                  <span>💻</span> GitHub Repository
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[11px] leading-relaxed text-slate-400">
              <div className="space-y-2">
                <p className="font-bold text-slate-300 uppercase tracking-wider">Independent Educational Platform Notice</p>
                <p>
                  This web application is an independently engineered educational platform developed by <strong>Atandile Monezi Ngxabani</strong>. It is not owned by, officially affiliated with, endorsed by, or in partnership with the South African Department of Basic Education (DBE) or the Umalusi Council for Quality Assurance in General and Further Education and Training.
                </p>
              </div>

              <div className="space-y-2">
                <p className="font-bold text-slate-300 uppercase tracking-wider">CAPS Syllabus Alignment & Fair Use Notice</p>
                <p>
                  All curriculum references, topic definitions, subject weightings, and physical constants are curated strictly in accordance with South Africa's publicly available Curriculum and Assessment Policy Statement (CAPS) for Grade 12 Physical Sciences. Content is utilized under fair-use educational revision guidelines to empower matriculants nationwide.
                </p>
              </div>
            </div>

            <div className="text-center pt-4 border-t border-slate-900 text-[10px] text-slate-400">
              © {new Date().getFullYear()} NSC Physical Sciences Matric Master • Engineered by Atandile Monezi Ngxabani. All rights reserved.
            </div>
          </div>
        </footer>

      </div>
    </SafeErrorBoundary>
  );
}
