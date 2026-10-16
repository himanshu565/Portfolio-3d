"use client";

import { Activity, ShieldCheck, Cpu, Zap } from "lucide-react";

const specs = [
  {
    icon: Activity,
    index: "01",
    tag: "3D WEBGL GRAPHICS",
    val: "60 FPS",
    label: "Hardware-Accelerated",
    desc: "Real-time PBR optic glass shaders and fluid OrbitControls.",
  },
  {
    icon: ShieldCheck,
    index: "02",
    tag: "DATA INTEGRITY",
    val: "100% ACID",
    label: "Transactional Guarantees",
    desc: "Row-level locking, idempotent webhooks, and zero race conditions.",
  },
  {
    icon: Cpu,
    index: "03",
    tag: "CODEBASE RIGOR",
    val: "0 ERRORS",
    label: "Strict TypeScript",
    desc: "End-to-end type safety, automated linting, and compile-time guarantees.",
  },
  {
    icon: Zap,
    index: "04",
    tag: "EDGE LATENCY",
    val: "< 50ms",
    label: "Optimized Throughput",
    desc: "Minimal hydration overhead, stream telemetry, and instant response.",
  },
];

export function SpecsStrip() {
  return (
    <section className="specs-section" aria-label="System Specifications">
      <div className="container">
        <div className="specs-grid">
          {specs.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.index} className="spec-card">
                <div className="spec-header">
                  <span className="spec-index">SPEC // {item.index}</span>
                  <Icon size={14} className="spec-icon" />
                </div>
                <div className="spec-val-wrap">
                  <span className="spec-val">{item.val}</span>
                  <span className="spec-label">{item.label}</span>
                </div>
                <p className="spec-desc">{item.desc}</p>
                <div className="spec-tag-strip">
                  <span className="spec-dot" />
                  <span>{item.tag}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

