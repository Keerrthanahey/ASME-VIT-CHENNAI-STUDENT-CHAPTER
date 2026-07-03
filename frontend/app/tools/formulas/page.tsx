"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Search } from "lucide-react";
import { PageHero } from "@/components/shared/section-header";
import { Input } from "@/components/ui/input";

const FORMULAS = [
  { category: "Mechanics", name: "Stress", formula: "σ = F / A", description: "Normal stress equals force divided by cross-sectional area" },
  { category: "Mechanics", name: "Strain", formula: "ε = ΔL / L₀", description: "Engineering strain equals change in length over original length" },
  { category: "Mechanics", name: "Hooke's Law", formula: "σ = E × ε", description: "Stress is proportional to strain within elastic limit" },
  { category: "Mechanics", name: "Poisson's Ratio", formula: "ν = -ε_lateral / ε_axial", description: "Ratio of lateral to axial strain" },
  { category: "Mechanics", name: "Shear Stress", formula: "τ = F / A", description: "Shear stress on a surface" },
  { category: "Mechanics", name: "Torsion", formula: "τ = T·r / J", description: "Shear stress in torsion" },
  { category: "Mechanics", name: "Bending Stress", formula: "σ = M·y / I", description: "Flexural stress in beams" },
  { category: "Mechanics", name: "Euler Buckling", formula: "P_cr = π²EI / (KL)²", description: "Critical buckling load for columns" },
  { category: "Thermodynamics", name: "First Law", formula: "ΔU = Q - W", description: "Change in internal energy equals heat minus work" },
  { category: "Thermodynamics", name: "Ideal Gas", formula: "PV = nRT", description: "Equation of state for ideal gases" },
  { category: "Thermodynamics", name: "Thermal Expansion", formula: "ΔL = α·L₀·ΔT", description: "Linear thermal expansion" },
  { category: "Thermodynamics", name: "Heat Transfer (Conduction)", formula: "Q = k·A·ΔT / L", description: "Fourier's law of conduction" },
  { category: "Fluid Mechanics", name: "Continuity", formula: "A₁V₁ = A₂V₂", description: "Conservation of mass in fluid flow" },
  { category: "Fluid Mechanics", name: "Bernoulli's Equation", formula: "P + ½ρV² + ρgh = constant", description: "Energy conservation in fluid flow" },
  { category: "Fluid Mechanics", name: "Reynolds Number", formula: "Re = ρVD / μ", description: "Ratio of inertial to viscous forces" },
  { category: "Dynamics", name: "Newton's Second Law", formula: "F = ma", description: "Force equals mass times acceleration" },
  { category: "Dynamics", name: "Kinetic Energy", formula: "KE = ½mv²", description: "Energy of motion" },
  { category: "Dynamics", name: "Potential Energy", formula: "PE = mgh", description: "Gravitational potential energy" },
  { category: "Dynamics", name: "Angular Momentum", formula: "L = Iω", description: "Rotational momentum" },
  { category: "Manufacturing", name: "Material Removal Rate", formula: "MRR = w·d·f", description: "Volume removed per unit time in machining" },
];

export default function FormulasPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const categories = ["all", ...new Set(FORMULAS.map((f) => f.category))];

  const filtered = FORMULAS.filter((f) => {
    const matchCat = category === "all" || f.category === category;
    const matchSearch =
      !search ||
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.formula.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <PageHero badge="Tools" title="Formula Library" subtitle="Essential mechanical engineering formulas at your fingertips." />

      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search formulas..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-all ${
                    category === cat ? "bg-asme-cyan/20 text-asme-cyan" : "text-muted-foreground hover:bg-white/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((formula, index) => (
              <motion.div
                key={formula.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="glass rounded-2xl p-6 transition-all hover:border-asme-blue/30"
              >
                <div className="mb-3 flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-asme-cyan" />
                  <span className="text-xs font-medium text-asme-cyan">{formula.category}</span>
                </div>
                <h3 className="mb-2 font-semibold">{formula.name}</h3>
                <p className="mb-3 font-mono text-lg text-asme-cyan">{formula.formula}</p>
                <p className="text-sm text-muted-foreground">{formula.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
