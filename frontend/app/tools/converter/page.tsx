"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight } from "lucide-react";
import { PageHero } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UNITS: Record<string, Record<string, number>> = {
  length: { m: 1, cm: 0.01, mm: 0.001, in: 0.0254, ft: 0.3048 },
  force: { N: 1, kN: 1000, lbf: 4.44822, kgf: 9.80665 },
  pressure: { Pa: 1, kPa: 1000, MPa: 1e6, psi: 6894.76, bar: 1e5 },
  temperature: { C: 1, K: 1, F: 1 },
  energy: { J: 1, kJ: 1000, cal: 4.184, kWh: 3.6e6 },
};

const CATEGORIES = Object.keys(UNITS);

export default function ConverterPage() {
  const [category, setCategory] = useState("length");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("mm");
  const [value, setValue] = useState("1");
  const [result, setResult] = useState<string | null>(null);

  const convert = () => {
    const val = parseFloat(value);
    if (isNaN(val)) return;

    if (category === "temperature") {
      let celsius = val;
      if (fromUnit === "K") celsius = val - 273.15;
      if (fromUnit === "F") celsius = ((val - 32) * 5) / 9;

      let converted = celsius;
      if (toUnit === "K") converted = celsius + 273.15;
      if (toUnit === "F") converted = (celsius * 9) / 5 + 32;

      setResult(`${converted.toFixed(4)} °${toUnit}`);
      return;
    }

    const baseValue = val * UNITS[category][fromUnit];
    const converted = baseValue / UNITS[category][toUnit];
    setResult(`${converted.toFixed(6)} ${toUnit}`);
  };

  const swap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setResult(null);
  };

  return (
    <>
      <PageHero badge="Tools" title="Unit Converter" subtitle="Convert between engineering units instantly." />

      <section className="section-padding pt-0">
        <div className="container-custom max-w-2xl">
          <div className="mb-6 flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => { setCategory(cat); setResult(null); }}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-all ${
                  category === cat ? "bg-asme-cyan/20 text-asme-cyan" : "text-muted-foreground hover:bg-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="capitalize">{category} Converter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label>From</Label>
                  <select
                    value={fromUnit}
                    onChange={(e) => setFromUnit(e.target.value)}
                    className="mt-1.5 flex h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm"
                  >
                    {Object.keys(UNITS[category]).map((u) => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                  <Input type="number" value={value} onChange={(e) => setValue(e.target.value)} className="mt-2" />
                </div>
                <div>
                  <Label>To</Label>
                  <select
                    value={toUnit}
                    onChange={(e) => setToUnit(e.target.value)}
                    className="mt-1.5 flex h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm"
                  >
                    {Object.keys(UNITS[category]).map((u) => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                  {result && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 rounded-xl bg-asme-blue/10 p-3 text-center font-mono text-asme-cyan">
                      {result}
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="glow" onClick={convert} className="flex-1">Convert</Button>
                <Button variant="secondary" onClick={swap}><ArrowLeftRight className="h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
