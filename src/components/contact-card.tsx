"use client";

import { useState } from "react";
import { Copy, Check, ArrowUpRight, Mail, MoveUpRight, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { siteConfig } from "@/data/site";

export function ContactCard() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    const emailToCopy = siteConfig.email || "himanshusinghbisht71@gmail.com";
    navigator.clipboard.writeText(emailToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <div className="contact-box bg-[var(--bg-card)] border border-[var(--border-main)] rounded-3xl p-8 sm:p-12 lg:p-16 shadow-[var(--shadow-card)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Direct invitation & copy */}
        <div className="lg:col-span-7">
          <div className="badge-inexa mb-4">
            <span>Direct Inquiries</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] tracking-tight mb-4 leading-tight">
            Have a problem worth solving? <span className="text-[var(--accent-primary)]">Let&apos;s build.</span>
          </h2>

          <p className="text-base sm:text-lg text-[var(--text-secondary)] mb-8 max-w-xl leading-relaxed">
            I&apos;m interested in full-stack developer roles, backend engineering challenges, and ambitious product teams where robust software solves real domain problems.
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="btn-inexa-primary py-3 px-6 text-sm"
              onClick={handleCopyEmail}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span>{copied ? "Email Copied to Clipboard!" : "Copy Email Address"}</span>
            </button>

            {siteConfig.email && (
              <a
                className="btn-inexa-outline py-3 px-5 text-sm"
                href={`mailto:${siteConfig.email}`}
              >
                <Mail size={16} /> Send Email
              </a>
            )}

            {siteConfig.github && (
              <a
                className="btn-inexa-outline py-3 px-5 text-sm"
                href={siteConfig.github}
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub size={16} /> GitHub <ArrowUpRight size={14} />
              </a>
            )}

            {siteConfig.linkedin && (
              <a
                className="btn-inexa-outline py-3 px-5 text-sm"
                href={siteConfig.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin size={16} /> LinkedIn <ArrowUpRight size={14} />
              </a>
            )}

            {siteConfig.resumePath && (
              <a
                className="btn-inexa-outline py-3 px-5 text-sm"
                href={siteConfig.resumePath}
                target="_blank"
                rel="noreferrer"
              >
                Resume <MoveUpRight size={14} />
              </a>
            )}
          </div>
        </div>

        {/* Right Column: Status & Identity card */}
        <div className="lg:col-span-5 bg-[var(--bg-subtle)] border border-[var(--border-subtle)] rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)] mb-6">
              <span className="text-xs font-mono font-semibold uppercase text-[var(--text-muted)] tracking-wider">
                Availability Status
              </span>
              <span className="badge-inexa text-[11px] py-1 px-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Open for roles</span>
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight mb-2">
              Engineering Reliability
            </h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
              Turning complex business logic, transactional constraints, and live telemetry into reliable interfaces people trust.
            </p>
          </div>

          <div className="pt-6 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--text-muted)]">
            <span className="flex items-center gap-1.5 font-medium">
              <MapPin size={14} className="text-[var(--accent-primary)]" />
              <span>India · Open to Remote</span>
            </span>
            <span className="font-mono font-medium">
              {new Date().getFullYear()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
