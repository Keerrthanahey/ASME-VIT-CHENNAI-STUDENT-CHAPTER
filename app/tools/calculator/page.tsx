"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, RotateCcw } from "lucide-react";
import { PageHero } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CalcType = "stress" | "beam" | "thermal";

export default function CalculatorPage() {
  const [calcType, setCalcType] = useState<CalcType>("stress");
  const [force, setForce] = useState("");
  const [area, setArea] = useState("");
  const [length, setLength] = useState("");
  const [load, setLoad] = useState("");
  const [moment, setMoment] = useState("");
  const [tempDiff, setTempDiff] = useState("");
  const [coeff, setCoeff] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    switch (calcType) {
      case "stress": {
        const F = parseFloat(force);
        const A = parseFloat(area);
        if (F && A) setResult(`Stress (σ) = ${(F / A).toFixed(2)} Pa (${((F / A) / 1e6).toFixed(4)} MPa)`);
        break;
      }
      case "beam": {
        const L = parseFloat(length);
        const P = parseFloat(load);
        const M = parseFloat(moment);
        if (L && P) setResult(`Max Deflection (δ) = ${((P * Math.pow(L, 3)) / (48 * 200e9 * 1e-6)).toFixed(6)} m`);
        else if (M) setResult(`Bending Stress = ${((M * 0.05) / (1e-6)).toFixed(2)} Pa`);
        break;
      }
      case "thermal": {
        const dT = parseFloat(tempDiff);
        const alpha = parseFloat(coeff);
        const L = parseFloat(length);
        if (dT && alpha && L) setResult(`Thermal Expansion (ΔL) = ${(alpha * L * dT).toFixed(6)} m`);
        break;
      }
    }
  };

  const reset = () => {
    setForce(""); setArea(""); setLength(""); setLoad("");
    setMoment(""); setTempDiff(""); setCoeff(""); setResult(null);
  };

  return (
    <>
      <PageHero badge="Tools" title="Engineering Calculator" subtitle="Quick calculations for stress, beam deflection, and thermal expansion." />

      <section className="section-padding pt-0">
        <div className="container-custom max-w-2xl">
          <div className="mb-6 flex gap-2">
            {(["stress", "beam", "thermal"] as CalcType[]).map((type) => (
              <button
                key={type}
                onClick={() => { setCalcType(type); reset(); }}
                className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition-all ${
                  calcType === type ? "bg-asme-blue text-white" : "bg-white/5 text-muted-foreground hover:bg-white/10"
                }`}
              >
                {type === "stress" ? "Stress" : type === "beam" ? "Beam" : "Thermal"}
              </button>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-asme-cyan" />
                {calcType === "stress" ? "Stress Calculator (σ = F/A)" : calcType === "beam" ? "Beam Deflection" : "Thermal Expansion"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {calcType === "stress" && (
                <>
                  <div><Label>Force (N)</Label><Input type="number" value={force} onChange={(e) => setForce(e.target.value)} className="mt-1.5" /></div>
                  <div><Label>Cross-sectional Area (m²)</Label><Input type="number" value={area} onChange={(e) => setArea(e.target.value)} className="mt-1.5" /></div>
                </>
              )}
              {calcType === "beam" && (
                <>
                  <div><Label>Length (m)</Label><Input type="number" value={length} onChange={(e) => setLength(e.target.value)} className="mt-1.5" /></div>
                  <div><Label>Point Load (N)</Label><Input type="number" value={load} onChange={(e) => setLoad(e.target.value)} className="mt-1.5" /></div>
                  <div><Label>Bending Moment (N·m) — optional</Label><Input type="number" value={moment} onChange={(e) => setMoment(e.target.value)} className="mt-1.5" /></div>
                </>
              )}
              {calcType === "thermal" && (
                <>
                  <div><Label>Temperature Difference (°C)</Label><Input type="number" value={tempDiff} onChange={(e) => setTempDiff(e.target.value)} className="mt-1.5" /></div>
                  <div><Label>Coefficient of Expansion (1/°C)</Label><Input type="number" value={coeff} onChange={(e) => setCoeff(e.target.value)} className="mt-1.5" placeholder="e.g. 12e-6 for steel" /></div>
                  <div><Label>Original Length (m)</Label><Input type="number" value={length} onChange={(e) => setLength(e.target.value)} className="mt-1.5" /></div>
                </>
              )}

              <div className="flex gap-3">
                <Button variant="glow" onClick={calculate} className="flex-1">Calculate</Button>
                <Button variant="secondary" onClick={reset}><RotateCcw className="h-4 w-4" /></Button>
              </div>

              {result && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl bg-asme-blue/10 p-4 text-center">
                  <p className="font-mono text-lg text-asme-cyan">{result}</p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
