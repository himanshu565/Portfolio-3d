"use client";

import { useState } from "react";
import { Terminal, Copy, Check, ArrowUpRight, Mail, MoveUpRight } from "lucide-react";
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
    <div className="contact-container">
      <div className="contact-content">
        <div className="section-kicker">
          <span>06</span>
          <span className="kicker-line" />
          <span>DIRECT DISPATCH // INQUIRIES</span>
        </div>
        <h2>
          Have a real problem
          <br />
          worth <em>solving?</em>
        </h2>
        <p>
          I&apos;m interested in full-stack engineering roles, ambitious teams, and projects where thoughtful software solves meaningful challenges.
        </p>

        <div className="contact-actions">
          <button type="button" className="button button-primary copy-btn" onClick={handleCopyEmail}>
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span>{copied ? "Email Copied to Clipboard!" : "Copy Email Address"}</span>
          </button>

          {siteConfig.email ? (
            <a className="button button-quiet" href={`mailto:${siteConfig.email}`}>
              <Mail size={16} /> Send Email <ArrowUpRight size={14} />
            </a>
          ) : null}

          <a className="button button-quiet" href={siteConfig.github} target="_blank" rel="noreferrer">
            <FaGithub size={16} /> GitHub <ArrowUpRight size={14} />
          </a>

          {siteConfig.linkedin ? (
            <a className="button button-quiet" href={siteConfig.linkedin} target="_blank" rel="noreferrer">
              <FaLinkedin size={16} /> LinkedIn <ArrowUpRight size={14} />
            </a>
          ) : null}

          {siteConfig.resumePath ? (
            <a className="button button-quiet" href={siteConfig.resumePath} target="_blank" rel="noreferrer">
              Resume <MoveUpRight size={14} />
            </a>
          ) : null}
        </div>
      </div>

      <div className="contact-side-card">
        <div className="contact-card-top-row">
          <span className="contact-card-icon">
            <Terminal size={18} />
          </span>
          <span className="contact-status-chip">
            <span className="live-dot" />
            <span>OPEN FOR ROLES</span>
          </span>
        </div>

        <span className="contact-card-eyebrow">SYSTEM IDENTITY</span>
        <strong>
          BUILD.
          <br />
          LEARN.
          <br />
          SHIP BETTER.
        </strong>
        <p>Turning domain-heavy workflows into software people trust.</p>

        <div className="contact-card-line" />
        <div className="contact-card-signature">
          <span>{siteConfig.name.toUpperCase()}</span>
          <b>INDIA // {new Date().getFullYear()}</b>
        </div>
      </div>
    </div>
  );
}

