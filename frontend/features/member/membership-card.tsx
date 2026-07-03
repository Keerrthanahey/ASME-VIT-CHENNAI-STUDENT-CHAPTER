"use client";

import { useEffect, useRef } from "react";
import type { Member } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getInitials } from "@/lib/utils";

interface MembershipCardProps {
  member: Member;
}

export function MembershipCard({ member }: MembershipCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const generateQR = async () => {
      try {
        const QRCode = (await import("qrcode")).default;
        const canvas = canvasRef.current;
        if (canvas) {
          await QRCode.toCanvas(canvas, `ASME-VIT-${member.rollNumber}`, {
            width: 120,
            margin: 1,
            color: { dark: "#0066cc", light: "#ffffff" },
          });
        }
      } catch {
        // QR generation optional
      }
    };
    generateQR();
  }, [member.rollNumber]);

  return (
    <Card className="overflow-hidden border-asme-blue/30 bg-gradient-to-br from-asme-navy to-asme-blue/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-asme-cyan">
          Digital Membership Card
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-xl bg-gradient-to-br from-asme-blue to-asme-cyan p-[1px]">
          <div className="rounded-xl bg-asme-navy p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                <span className="text-sm font-bold text-white">A</span>
              </div>
              <span className="text-xs font-medium text-asme-cyan">ASME VIT Chennai</span>
            </div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-asme-blue to-asme-cyan text-sm font-bold text-white">
                {getInitials(member.name)}
              </div>
              <div>
                <p className="font-semibold text-white">{member.name}</p>
                <p className="text-xs text-white/70">{member.rollNumber}</p>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs text-white/50">Department</p>
                <p className="text-xs text-white/80">{member.department}</p>
                <p className="mt-2 text-xs text-white/50">Member Since</p>
                <p className="text-xs text-white/80">{member.joinedAt}</p>
              </div>
              <canvas ref={canvasRef} className="rounded-lg" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
