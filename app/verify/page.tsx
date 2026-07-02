"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Search, CheckCircle2, XCircle } from "lucide-react";
import { PageHero } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const VALID_CERTIFICATES = [
  { id: "CERT-2025-SW-001", name: "SolidWorks Certification", holder: "Demo Member", issuedAt: "2025-09-20", event: "SolidWorks Masterclass" },
  { id: "CERT-2025-ANSYS-002", name: "ANSYS FEA Workshop", holder: "Demo Member", issuedAt: "2025-10-15", event: "ANSYS FEA Workshop" },
  { id: "CERT-2025-AERO-003", name: "Aerospace Summit 2025", holder: "Demo Member", issuedAt: "2025-10-15", event: "Aerospace Engineering Summit" },
];

export default function VerifyPage() {
  const [certId, setCertId] = useState("");
  const [result, setResult] = useState<(typeof VALID_CERTIFICATES)[0] | "invalid" | null>(null);
  const [searched, setSearched] = useState(false);

  const verify = () => {
    setSearched(true);
    const cert = VALID_CERTIFICATES.find((c) => c.id.toLowerCase() === certId.trim().toLowerCase());
    setResult(cert || "invalid");
  };

  return (
    <>
      <PageHero badge="Verification" title="Certificate Verification" subtitle="Verify the authenticity of ASME VIT Chennai certificates." />

      <section className="section-padding pt-0">
        <div className="container-custom max-w-xl">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-asme-cyan" />
                Verify Certificate
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="certId">Certificate ID</Label>
                <div className="relative mt-1.5">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="certId"
                    placeholder="e.g. CERT-2025-SW-001"
                    value={certId}
                    onChange={(e) => { setCertId(e.target.value); setSearched(false); }}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button variant="glow" onClick={verify} className="w-full" disabled={!certId.trim()}>
                Verify Certificate
              </Button>

              {searched && result && result !== "invalid" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-green-500/30 bg-green-500/10 p-5">
                  <div className="mb-3 flex items-center gap-2 text-green-400">
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="font-semibold">Valid Certificate</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p><span className="text-muted-foreground">Certificate:</span> {result.name}</p>
                    <p><span className="text-muted-foreground">Holder:</span> {result.holder}</p>
                    <p><span className="text-muted-foreground">Event:</span> {result.event}</p>
                    <p><span className="text-muted-foreground">Issued:</span> {result.issuedAt}</p>
                    <p><span className="text-muted-foreground">ID:</span> {result.id}</p>
                  </div>
                </motion.div>
              )}

              {searched && result === "invalid" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-red-500/30 bg-red-500/10 p-5">
                  <div className="flex items-center gap-2 text-red-400">
                    <XCircle className="h-5 w-5" />
                    <span className="font-semibold">Certificate Not Found</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    The certificate ID you entered could not be verified. Please check and try again.
                  </p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
