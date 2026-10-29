/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, 
  Shapes, 
  Binary, 
  Hash, 
  ChevronRight, 
  Play, 
  RotateCcw,
  CheckCircle2,
  Info,
  TrendingUp
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

// --- Constants & Types ---

const NAVIGATION = [
  { name: 'Labs', href: '#labs' },
  { name: 'Modules', href: '#modules' },
  { name: 'Resources', href: '#resources' },
  { name: 'About', href: '#about' },
];

const CATEGORIES = [
  {
    id: 'algebra',
    title: 'Algebra',
    description: 'Master equations, functions, and variables through interactive visualization.',
    image: '/src/assets/images/category_algebra_1793248391231.jpg',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    tags: ['Quadratic', 'Linear', 'Functions']
  },
  {
    id: 'geometry',
    title: 'Geometry',
    description: 'Explore shapes, angles, and spatial relationships in a dynamic sandbox.',
    image: '/src/assets/images/category_geometry_1793248392139.jpg',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    tags: ['Shapes', 'Area', 'Theorems']
  },
  {
    id: 'arithmetic',
    title: 'Arithmetic',
    description: 'Build speed and accuracy with fundamental operations and mental math.',
    image: '/src/assets/images/category_arithmetic_1793248392427.jpg',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    tags: ['BODMAS', 'Percentages', 'Ratios']
  },
  {
    id: 'numbers',
    title: 'Number Theory',
    description: 'Dive into the properties of integers, primes, and mathematical patterns.',
    image: '/src/assets/images/category_number_theory_1793248393215.jpg',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    tags: ['Primes', 'GCD/LCM', 'Factors']
  }
];

// --- Components ---

const Header = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-6">
        <a href="/" className="text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 font-display">
          Zellact <span className="text-blue-600">Math Lab</span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          {NAVIGATION.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(link.href.replace('#', ''));
              }}
              className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={() => scrollTo('labs')}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 rounded-full hover:bg-slate-800 transition-all shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};

const Hero = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 mb-6">
              <span className="h-px w-8 bg-blue-600"></span>
              THE FUTURE OF MATH EDUCATION
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl mb-6 text-wrap-balance font-display">
              Visualize the <span className="text-blue-600">Invisible</span> in Mathematics.
            </h1>
            <p className="text-lg leading-relaxed text-slate-600 mb-8 max-w-xl">
              Experience math as an interactive playground. Our digital laboratory transforms abstract concepts into tangible experiments that you can manipulate, explore, and master.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => scrollTo('labs')}
                className="flex items-center gap-2 rounded-full bg-slate-900 px-8 py-4 text-sm font-semibold text-white hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 cursor-pointer"
              >
                Launch Lab <Play className="h-4 w-4 fill-current" />
              </button>
              <button 
                onClick={() => scrollTo('modules')}
                className="rounded-full border border-slate-200 bg-white px-8 py-4 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition-all cursor-pointer"
              >
                Browse Modules
              </button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative aspect-video overflow-hidden rounded-3xl border border-slate-200 shadow-2xl lg:aspect-square"
          >
            <img
              src="/src/assets/images/math_lab_hero_1793248390919.jpg"
              alt="Zellact Math Lab Environment"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const LabSection = () => {
  const [activeLab, setActiveLab] = useState<'algebra' | 'primes'>('algebra');
  const [algebraSub, setAlgebraSub] = useState<'quadratic' | 'linear'>('quadratic');
  
  // Quadratic State
  const [a, setA] = useState(1);
  const [b, setB] = useState(-5);
  const [c, setC] = useState(6);

  // Linear State
  const [la, setLa] = useState(2);
  const [lb, setLb] = useState(4);
  const [lc, setLc] = useState(10);

  const quadraticResult = useMemo(() => {
    const d = b * b - 4 * a * c;
    if (d < 0) return { roots: null, d, steps: [`D = b² - 4ac`, `D = (${b})² - 4(${a})(${c})`, `D = ${d}`, `No real roots.`] };
    const x1 = (-b + Math.sqrt(d)) / (2 * a);
    const x2 = (-b - Math.sqrt(d)) / (2 * a);
    return { 
      roots: [x1.toFixed(2), x2.toFixed(2)], 
      d,
      steps: [
        `1. Calculate Discriminant: D = b² - 4ac = ${d.toFixed(2)}`,
        `2. Apply Quadratic Formula: x = (-b ± √D) / 2a`,
        `3. x₁ = (-(${b}) + √${d.toFixed(2)}) / 2(${a}) = ${x1.toFixed(2)}`,
        `4. x₂ = (-(${b}) - √${d.toFixed(2)}) / 2(${a}) = ${x2.toFixed(2)}`
      ]
    };
  }, [a, b, c]);

  const linearResult = useMemo(() => {
    if (la === 0) return { root: null, steps: ['a = 0, equation is invalid or constant.'] };
    const x = (lc - lb) / la;
    return {
      root: x.toFixed(2),
      steps: [
        `1. Subtract constant b: ${la}x = ${lc} - ${lb}`,
        `2. Solve for x: x = ${lc - lb} / ${la}`,
        `3. x = ${x.toFixed(2)}`
      ]
    };
  }, [la, lb, lc]);

  const vertex = useMemo(() => {
    if (a === 0) return null;
    const h = -b / (2 * a);
    const k = a * h * h + b * h + c;
    return { h: h.toFixed(2), k: k.toFixed(2) };
  }, [a, b, c]);

  const plotData = useMemo(() => {
    const data = [];
    if (algebraSub === 'quadratic') {
      for (let x = -10; x <= 10; x += 0.5) {
        const y = a * x * x + b * x + c;
        data.push({ x, y: parseFloat(y.toFixed(2)) });
      }
    } else {
      for (let x = -10; x <= 10; x += 1) {
        const y = la * x + lb;
        data.push({ x, y: parseFloat(y.toFixed(2)) });
      }
    }
    return data;
  }, [a, b, c, la, lb, lc, algebraSub]);

  // Prime State
  const [primeInput, setPrimeInput] = useState('');
  const [primeResult, setPrimeResult] = useState<boolean | null>(null);

  const checkPrime = () => {
    const num = parseInt(primeInput);
    if (isNaN(num) || num <= 1) {
      setPrimeResult(false);
      return;
    }
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        setPrimeResult(false);
        return;
      }
    }
    setPrimeResult(true);
  };

  return (
    <section id="labs" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4 font-display">Interactive Laboratory</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Select a module below to start experimenting with mathematical parameters in real-time.</p>
        </div>

        <div className="flex justify-center gap-1 p-1 bg-slate-100 rounded-xl mb-12 w-fit mx-auto">
          <button
            onClick={() => setActiveLab('algebra')}
            className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-all cursor-pointer ${
              activeLab === 'algebra' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Algebra Solver
          </button>
          <button
            onClick={() => setActiveLab('primes')}
            className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-all cursor-pointer ${
              activeLab === 'primes' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Number Explorer
          </button>
        </div>

        {activeLab === 'algebra' && (
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setAlgebraSub('quadratic')}
              className={`text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border transition-all ${
                algebraSub === 'quadratic' ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-200 text-slate-400 hover:text-slate-600'
              }`}
            >
              Quadratic
            </button>
            <button
              onClick={() => setAlgebraSub('linear')}
              className={`text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border transition-all ${
                algebraSub === 'linear' ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-200 text-slate-400 hover:text-slate-600'
              }`}
            >
              Linear
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Interactive Stage */}
          <div className="lg:col-span-8 bg-slate-900 rounded-3xl overflow-hidden shadow-2xl relative min-h-[500px] flex items-center justify-center p-8">
            <AnimatePresence mode="wait">
              {activeLab === 'algebra' ? (
                <motion.div
                  key={algebraSub}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="w-full h-full flex flex-col"
                >
                  <div className="text-3xl md:text-5xl font-mono text-white mb-8 flex items-baseline justify-center gap-2">
                    {algebraSub === 'quadratic' ? (
                      <>
                        <span className="text-blue-400">{a !== 1 ? (a === -1 ? '-' : a) : ''}x²</span>
                        <span className="text-emerald-400">{b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`}x</span>
                        <span className="text-amber-400">{c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`}</span>
                        <span className="text-slate-500">= 0</span>
                      </>
                    ) : (
                      <>
                        <span className="text-blue-400">{la}x</span>
                        <span className="text-emerald-400">{lb >= 0 ? `+ ${lb}` : `- ${Math.abs(lb)}`}</span>
                        <span className="text-slate-500">=</span>
                        <span className="text-amber-400">{lc}</span>
                      </>
                    )}
                  </div>

                  <div className="flex-1 w-full min-h-[300px] mb-8">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={plotData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis 
                          dataKey="x" 
                          stroke="#94a3b8" 
                          fontSize={12} 
                          tick={{ fill: '#94a3b8' }} 
                          domain={[-10, 10]}
                          type="number"
                        />
                        <YAxis 
                          stroke="#94a3b8" 
                          fontSize={12} 
                          tick={{ fill: '#94a3b8' }} 
                        />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#f8fafc' }}
                          itemStyle={{ color: '#60a5fa' }}
                        />
                        <ReferenceLine x={0} stroke="#475569" />
                        <ReferenceLine y={0} stroke="#475569" />
                        <Line 
                          type="monotone" 
                          dataKey="y" 
                          stroke="#3b82f6" 
                          strokeWidth={3} 
                          dot={false}
                          animationDuration={500}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="flex flex-wrap justify-center gap-4 text-center">
                    {algebraSub === 'quadratic' ? (
                      <>
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm min-w-[140px]">
                          <div className="text-[10px] font-medium text-slate-500 mb-1 uppercase tracking-wider">Discriminant (D)</div>
                          <div className="text-2xl font-mono text-white tabular-nums">{quadraticResult.d.toFixed(2)}</div>
                        </div>
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm min-w-[140px]">
                          <div className="text-[10px] font-medium text-slate-500 mb-1 uppercase tracking-wider">Vertex (h, k)</div>
                          <div className="text-2xl font-mono text-emerald-400 tabular-nums">
                            {vertex ? `(${vertex.h}, ${vertex.k})` : 'N/A'}
                          </div>
                        </div>
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm min-w-[140px]">
                          <div className="text-[10px] font-medium text-slate-500 mb-1 uppercase tracking-wider">Roots (x)</div>
                          <div className="text-2xl font-mono text-blue-400 tabular-nums">
                            {quadraticResult.roots ? `${quadraticResult.roots[0]}, ${quadraticResult.roots[1]}` : 'Complex'}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm min-w-[200px]">
                        <div className="text-[10px] font-medium text-slate-500 mb-1 uppercase tracking-wider">Root (x)</div>
                        <div className="text-3xl font-mono text-blue-400 tabular-nums">
                          {linearResult.root ?? 'N/A'}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Step by Step Breakdown */}
                  <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/5">
                    <h4 className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-widest flex items-center gap-2">
                      <TrendingUp className="h-3 w-3" /> Solution Breakdown
                    </h4>
                    <div className="space-y-2">
                      {(algebraSub === 'quadratic' ? quadraticResult.steps : linearResult.steps).map((step, i) => (
                        <div key={i} className="text-sm font-mono text-slate-300">
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="primes"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="w-full flex flex-col items-center justify-center"
                >
                  <div className="text-2xl text-slate-400 mb-8 font-display">Prime Number Verification</div>
                  <div className="flex gap-4 mb-8">
                    <input
                      type="number"
                      value={primeInput}
                      onChange={(e) => setPrimeInput(e.target.value)}
                      placeholder="Enter a number..."
                      className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white text-2xl font-mono focus:ring-2 focus:ring-blue-500 outline-none w-48 text-center tabular-nums"
                    />
                    <button
                      onClick={checkPrime}
                      className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-bold transition-all cursor-pointer active:scale-95"
                    >
                      Verify
                    </button>
                  </div>
                  
                  {primeResult !== null && (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={`flex items-center gap-3 px-6 py-3 rounded-full border ${
                        primeResult 
                          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                          : 'bg-red-500/10 border-red-500/20 text-red-400'
                      }`}
                    >
                      {primeResult ? <CheckCircle2 className="h-5 w-5" /> : <Info className="h-5 w-5" />}
                      <span className="font-semibold tracking-wide uppercase text-sm">
                        {primeResult ? 'Is Prime Number' : 'Not a Prime Number'}
                      </span>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Control Deck */}
          <div className="lg:col-span-4 bg-slate-50 rounded-3xl p-8 border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6 font-display">Control Parameters</h3>
            
            {activeLab === 'algebra' ? (
              <div className="space-y-8">
                {algebraSub === 'quadratic' ? (
                  <>
                    <div>
                      <div className="flex justify-between text-sm font-medium text-slate-600 mb-3">
                        <label>Coefficient a</label>
                        <span className="font-mono tabular-nums text-blue-600">{a}</span>
                      </div>
                      <input
                        type="range"
                        min="-10"
                        max="10"
                        step="0.5"
                        value={a}
                        onChange={(e) => setA(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm font-medium text-slate-600 mb-3">
                        <label>Coefficient b</label>
                        <span className="font-mono tabular-nums text-emerald-600">{b}</span>
                      </div>
                      <input
                        type="range"
                        min="-20"
                        max="20"
                        step="1"
                        value={b}
                        onChange={(e) => setB(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm font-medium text-slate-600 mb-3">
                        <label>Constant c</label>
                        <span className="font-mono tabular-nums text-amber-600">{c}</span>
                      </div>
                      <input
                        type="range"
                        min="-50"
                        max="50"
                        step="1"
                        value={c}
                        onChange={(e) => setC(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                      />
                    </div>
                    <button
                      onClick={() => { setA(1); setB(-5); setC(6); }}
                      className="flex items-center justify-center gap-2 w-full py-3 border border-slate-300 rounded-xl text-slate-600 hover:bg-white transition-all text-sm font-semibold mt-4 cursor-pointer"
                    >
                      <RotateCcw className="h-4 w-4" /> Reset Quadratic
                    </button>
                  </>
                ) : (
                  <>
                    <div>
                      <div className="flex justify-between text-sm font-medium text-slate-600 mb-3">
                        <label>Coefficient a</label>
                        <span className="font-mono tabular-nums text-blue-600">{la}</span>
                      </div>
                      <input
                        type="range"
                        min="-20"
                        max="20"
                        step="1"
                        value={la}
                        onChange={(e) => setLa(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm font-medium text-slate-600 mb-3">
                        <label>Constant b</label>
                        <span className="font-mono tabular-nums text-emerald-600">{lb}</span>
                      </div>
                      <input
                        type="range"
                        min="-50"
                        max="50"
                        step="1"
                        value={lb}
                        onChange={(e) => setLb(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm font-medium text-slate-600 mb-3">
                        <label>Result c</label>
                        <span className="font-mono tabular-nums text-amber-600">{lc}</span>
                      </div>
                      <input
                        type="range"
                        min="-100"
                        max="100"
                        step="1"
                        value={lc}
                        onChange={(e) => setLc(parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                      />
                    </div>
                    <button
                      onClick={() => { setLa(2); setLb(4); setLc(10); }}
                      className="flex items-center justify-center gap-2 w-full py-3 border border-slate-300 rounded-xl text-slate-600 hover:bg-white transition-all text-sm font-semibold mt-4 cursor-pointer"
                    >
                      <RotateCcw className="h-4 w-4" /> Reset Linear
                    </button>
                  </>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                  <p className="text-sm text-blue-800 leading-relaxed">
                    Prime numbers are natural numbers greater than 1 that have no positive divisors other than 1 and itself.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-semibold text-slate-900">Try these:</div>
                  {['13', '97', '101', '1023'].map(num => (
                    <button
                      key={num}
                      onClick={() => { setPrimeInput(num); setPrimeResult(null); }}
                      className="block w-full text-left px-4 py-3 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-white transition-all text-sm font-mono tabular-nums text-slate-600 cursor-pointer"
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Categories = () => {
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <section id="modules" className="py-24 bg-slate-50 relative">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4 font-display">Learning Modules</h2>
            <p className="text-slate-600 leading-relaxed">Structured pathways designed to take you from foundational logic to advanced mathematical mastery.</p>
          </div>
          <button 
            onClick={() => showToast("Exploring all 50+ modules... Access restricted in demo.")}
            className="flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all cursor-pointer"
          >
            Explore All Modules <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => showToast(`Launching ${cat.title} module...`)}
              className="group flex flex-col bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-white/90 backdrop-blur-sm ${cat.color}`}>
                    {cat.id}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-slate-900 mb-2 font-display">{cat.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-6 flex-1">
                  {cat.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 text-[11px] text-slate-400">
                  {cat.tags.map((tag, i) => (
                    <React.Fragment key={tag}>
                      <span>{tag}</span>
                      {i < cat.tags.length - 1 && <span className="opacity-30">·</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl z-50 text-sm font-medium"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Footer = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-white py-12 border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="text-lg font-bold tracking-tight text-slate-900 font-display cursor-pointer" onClick={() => scrollTo('top')}>
            Zellact <span className="text-blue-600">Math Lab</span>
          </div>
          <nav className="flex gap-8 text-sm font-medium text-slate-500">
            {['Labs', 'Modules', 'Resources', 'About'].map(link => (
              <a 
                key={link}
                href={`#${link.toLowerCase()}`} 
                onClick={(e) => { e.preventDefault(); scrollTo(link.toLowerCase()); }}
                className="hover:text-slate-900 transition-colors cursor-pointer"
              >
                {link}
              </a>
            ))}
          </nav>
        </div>
        <div className="text-center text-xs text-slate-400 border-t border-slate-100 pt-8">
          &copy; {new Date().getFullYear()} Zellact Math Lab. All rights reserved. Precision in education.
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <Header />
      <main>
        <Hero />
        <LabSection />
        <Categories />
        
        {/* Call to Action */}
        <section className="py-24">
          <div className="mx-auto max-w-5xl px-6">
            <div className="bg-blue-600 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-blue-200">
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white sm:text-5xl mb-6 font-display">Ready to master mathematics?</h2>
                <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
                  Join thousands of students and educators exploring the boundaries of mathematical logic with Zellact Math Lab.
                </p>
                <button 
                  onClick={() => scrollTo('labs')}
                  className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold hover:bg-blue-50 transition-all shadow-lg cursor-pointer active:scale-95"
                >
                  Start Your Journey
                </button>
              </div>
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
